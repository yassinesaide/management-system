import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { successResponse } from '@/lib/api-utils';

export async function POST(request: NextRequest) {
  const cookieStore = cookies();
  
  // Clear the auth token cookie
  cookieStore.set('auth_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0, // Expire immediately
    path: '/',
  });
  
  return successResponse(null, 'Logged out successfully');
} 