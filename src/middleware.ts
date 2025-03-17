import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from './lib/auth';

// Define public paths that don't require authentication
const publicPaths = [
  '/api/auth/login',
  '/api/auth/register',
  '/login',
  '/register',
];

// Define path-role mappings for authorization
const rolePathMappings: Record<string, string[]> = {
  '/api/admin': ['admin'],
  '/api/teachers': ['admin', 'teacher'],
  '/api/students': ['admin', 'teacher', 'student', 'parent'],
  '/api/parents': ['admin', 'parent'],
  '/api/classes': ['admin', 'teacher'],
  '/api/attendance': ['admin', 'teacher'],
  '/api/exams': ['admin', 'teacher'],
  '/api/results': ['admin', 'teacher', 'student', 'parent'],
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip middleware for non-API routes (except protected pages)
  if (!pathname.startsWith('/api') && !pathname.startsWith('/dashboard')) {
    return NextResponse.next();
  }
  
  // Allow access to public paths
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }
  
  // Check for auth token
  const token = request.cookies.get('auth_token')?.value;
  
  if (!token) {
    // For API routes, return 401
    if (pathname.startsWith('/api')) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized access' },
        { status: 401 }
      );
    }
    
    // For protected pages, redirect to login
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }
  
  // Verify token
  const user = verifyToken(token);
  
  if (!user) {
    // Invalid token
    if (pathname.startsWith('/api')) {
      return NextResponse.json(
        { success: false, error: 'Invalid authentication token' },
        { status: 401 }
      );
    }
    
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }
  
  // Check role-based access for paths
  for (const [pathPrefix, roles] of Object.entries(rolePathMappings)) {
    if (pathname.startsWith(pathPrefix) && !roles.includes(user.role)) {
      // Unauthorized for this role
      if (pathname.startsWith('/api')) {
        return NextResponse.json(
          { success: false, error: 'Forbidden: insufficient permissions' },
          { status: 403 }
        );
      }
      
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }
  
  // Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/:path*',
    '/dashboard/:path*',
  ],
}; 