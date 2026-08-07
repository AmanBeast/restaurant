import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function POST(request: Request) {
  try {
    const { email, role, name } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    let user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          name: name || email.split('@')[0],
          email: email.toLowerCase(),
          role: role || (email.toLowerCase().includes('admin') ? 'admin' : 'customer'),
          points: 100,
          tier: 'Bronze'
        }
      });
    }

    return NextResponse.json({ success: true, user });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Authentication error' }, { status: 500 });
  }
}
