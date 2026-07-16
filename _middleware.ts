import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Laisser passer les assets importants et la page de maintenance elle-même
  if (
    pathname.startsWith('/_next') || 
    pathname.startsWith('/api') || 
    pathname.startsWith('/static') ||
    pathname === '/maintenance' ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // 2. Rediriger le reste du trafic vers la maintenance
  return NextResponse.redirect(new URL('/maintenance', request.url));
}