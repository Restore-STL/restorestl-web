import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body?.email || typeof body.email !== 'string') {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }
  console.log('[newsletter] stub received', { email: body.email, source: body.source });
  return NextResponse.json({ ok: true });
}
