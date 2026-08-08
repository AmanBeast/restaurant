import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userEmail = searchParams.get('email')?.toLowerCase();

    // Fetch users, transactions, and settings in parallel
    const [dbUsers, dbTransactions, settingsObj] = await Promise.all([
      userEmail 
        ? prisma.user.findMany({ where: { email: userEmail }, select: { id: true, name: true, email: true, role: true, points: true, tier: true, phone: true, avatar: true, createdAt: true } })
        : prisma.user.findMany({ take: 100, select: { id: true, name: true, email: true, role: true, points: true, tier: true, phone: true, avatar: true, createdAt: true } }),
      prisma.loyaltyTransaction.findMany({
        take: 100,
        orderBy: { createdAt: 'desc' },
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
        }
      }),
      prisma.programSettings.findUnique({ where: { id: 'default' } })
    ]);

    const validityMonths = settingsObj?.pointsValidityMonths ?? 2;

    let validTransactions = dbTransactions;
    if (validityMonths > 0) {
      const cutoffDate = new Date();
      cutoffDate.setMonth(cutoffDate.getMonth() - validityMonths);
      validTransactions = dbTransactions.filter(tx => new Date(tx.createdAt) >= cutoffDate);
    }

    const response = NextResponse.json({
      success: true,
      users: dbUsers,
      transactions: validTransactions,
      settings: {
        pointsValidityMonths: validityMonths,
        pointsEarningRate: settingsObj?.pointsEarningRate ?? 1
      }
    });

    response.headers.set('Cache-Control', 's-maxage=2, stale-while-revalidate=5');
    return response;
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
