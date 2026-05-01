import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('Received:', body);
    return NextResponse.json({ status: 'ok', received: body });
  } catch(err) {
    console.error('Error:', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}