import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { signToken } from '../../../lib/auth';

export async function POST(request: Request) {
  try {
    const { name, email, role, password } = await request.json();

    if (!email || !name) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    const lowerEmail = email.toLowerCase();

    // Query database ONLY during registration
    let user = await prisma.user.findUnique({
      where: { email: lowerEmail },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        points: true,
        tier: true
      }
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          name,
          email: lowerEmail,
          password: password || null,
          role: role || 'customer',
          points: 100,
          tier: 'Bronze'
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          points: true,
          tier: true
        }
      });
    }

    const token = signToken({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      points: user.points,
      tier: user.tier
    });

    const response = NextResponse.json({ success: true, user, token });

    response.cookies.set({
      name: 'auth_token',
      value: token,
      httpOnly: true,
      path: '/',
      maxAge: 7 * 86400,
      sameSite: 'lax'
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Registration error' }, { status: 500 });
  }
}
