import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function POST(request: Request) {
  try {
    const { name, email, role, password } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const user = await prisma.user.upsert({
      where: { email: email.toLowerCase() },
      update: {
        name: name || undefined,
        role: role || undefined
      },
      create: {
        name: name || email.split('@')[0],
        email: email.toLowerCase(),
        password: password || 'demo123',
        role: role || (email.toLowerCase().includes('admin') ? 'admin' : 'customer'),
        points: 100,
        tier: 'Bronze'
      }
    });

    return NextResponse.json({ success: true, user });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Authentication error' }, { status: 500 });
  }
}
