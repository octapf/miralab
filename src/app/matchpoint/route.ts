import { NextResponse } from 'next/server';

export function GET(request: Request) {
  const url = new URL('/es/matchpoint', request.url);
  return NextResponse.redirect(url, 307);
}
