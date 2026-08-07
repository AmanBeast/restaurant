import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function POST(request: Request) {
  try {
    const { userId, userEmail, points, description, orderId } = await request.json();
    const pts = Number(points) || 0;

    // Single indexed query to find user
    let user = null;
    if (userId) {
      user = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, name: true, email: true, points: true }
      });
    }
    if (!user && userEmail) {
      user = await prisma.user.findUnique({
        where: { email: userEmail.toLowerCase() },
        select: { id: true, name: true, email: true, points: true }
      });
    }

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const newPoints = (user.points || 0) + pts;
    const getTier = (p: number) => p >= 1000 ? 'Platinum' : p >= 500 ? 'Gold' : p >= 200 ? 'Silver' : 'Bronze';

    // Execute User update and Transaction creation in an atomic $transaction
    const [updatedUser, tx] = await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: {
          points: newPoints,
          tier: getTier(newPoints)
        },
        select: {
          id: true,
          name: true,
          email: true,
          points: true,
          tier: true
        }
      }),
      prisma.loyaltyTransaction.create({
        data: {
          userId: user.id,
          userName: user.name,
          type: 'EARNED',
          points: pts,
          description: description || `Online Order #${orderId}`,
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          orderId
        },
        select: {
          id: true,
          userId: true,
          points: true,
          description: true,
          orderId: true,
          createdAt: true
        }
      })
    ]);

    return NextResponse.json({ success: true, user: updatedUser, transaction: tx });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error earning points' }, { status: 500 });
  }
}
