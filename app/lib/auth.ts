import crypto from 'crypto';

const JWT_SECRET = process.env.JWT_SECRET || 'luxe_bistro_jwt_super_secret_key_2026';

export interface JWTPayload {
  id: string;
  name: string;
  email: string;
  role: string;
  points: number;
  tier: string;
  iat?: number;
  exp?: number;
}

// Sign JWT token using HMAC-SHA256
export function signToken(payload: Omit<JWTPayload, 'iat' | 'exp'>, expiresInDays = 7): string {
  const header = { alg: 'HS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  const exp = now + expiresInDays * 86400;

  const fullPayload: JWTPayload = {
    ...payload,
    iat: now,
    exp: exp
  };

  const b64Header = Buffer.from(JSON.stringify(header)).toString('base64url');
  const b64Payload = Buffer.from(JSON.stringify(fullPayload)).toString('base64url');
  const signatureInput = `${b64Header}.${b64Payload}`;

  const signature = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(signatureInput)
    .digest('base64url');

  return `${signatureInput}.${signature}`;
}

// Verify JWT token statelessly without database lookup
export function verifyToken(token: string): JWTPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const [b64Header, b64Payload, signature] = parts;
    const expectedSignature = crypto
      .createHmac('sha256', JWT_SECRET)
      .update(`${b64Header}.${b64Payload}`)
      .digest('base64url');

    if (signature !== expectedSignature) return null;

    const payload: JWTPayload = JSON.parse(Buffer.from(b64Payload, 'base64url').toString('utf-8'));
    const now = Math.floor(Date.now() / 1000);

    if (payload.exp && payload.exp < now) return null;

    return payload;
  } catch (err) {
    return null;
  }
}
