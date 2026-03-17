import { NextResponse } from 'next/server';

export function GET(request: Request) {
  const url = new URL('/es/proshop/delete-account', request.url);
  return NextResponse.redirect(url, 307);
}
