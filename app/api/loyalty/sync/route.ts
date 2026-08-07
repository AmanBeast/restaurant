import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET() {
  try {
    // Parallel optimized query execution with field projections & limits
    const [users, transactions] = await Promise.all([
      prisma.user.findMany({
        take: 100,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          points: true,
          tier: true,
          phone: true,
          avatar: true,
          createdAt: true
        },
        orderBy: { updatedAt: 'desc' }
      }),
      prisma.loyaltyTransaction.findMany({
        take: 100,
        select: {
          id: true,
          userId: true,
          userName: true,
          type: true,
          points: true,
          description: true,
          date: true,
          orderId: true,
          rewardTitle: true,
          createdAt: true
        },
        orderBy: { createdAt: 'desc' }
      })
    ]);

    return NextResponse.json(
      { success: true, users, transactions },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=5, stale-while-revalidate=10'
        }
      }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Sync error' }, { status: 500 });
  }
}
