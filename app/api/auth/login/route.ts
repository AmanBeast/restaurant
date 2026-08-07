import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { signToken } from '../../../lib/auth';

export async function POST(request: Request) {
  try {
    const { email, role, name } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const lowerEmail = email.toLowerCase();

    // Query database ONLY during login verification
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
          name: name || lowerEmail.split('@')[0],
          email: lowerEmail,
          role: role || (lowerEmail.includes('admin') ? 'admin' : 'customer'),
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

    // Generate stateless JWT token
    const token = signToken({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      points: user.points,
      tier: user.tier
    });

    const response = NextResponse.json({ success: true, user, token });

    // Store JWT token in secure cookie
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
    return NextResponse.json({ error: error.message || 'Authentication error' }, { status: 500 });
  }
}
