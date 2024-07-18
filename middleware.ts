import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the incoming response
  const response = NextResponse.next();
    console.log(response);
  // Set the cookie
  response.cookies.set('token', 'your_token_value', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
  });

  return response;
}