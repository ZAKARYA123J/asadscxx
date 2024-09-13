import { NextResponse, NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token');

  // Check if the user is trying to access the dashboard
  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    // If there is no token, redirect to the login page
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  // Allow the request to proceed if token is present or if it's not the dashboard
  return NextResponse.next();
}
