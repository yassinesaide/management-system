// General authentication utilities that work on both client and server
// For server-only functions that use bcrypt, use server-auth.ts instead
import jwt from 'jsonwebtoken';

// Define the UserJwtPayload interface here to avoid import issues
export interface UserJwtPayload {
  id: number;
  username: string;
  role: 'admin' | 'teacher' | 'parent' | 'student';
}

// Verify JWT token
export function verifyToken(token: string): UserJwtPayload | null {
  try {
    const secret = process.env.JWT_SECRET || 'fallback_secret_not_for_production';
    // @ts-ignore - Ignore the JWT typing issues
    return jwt.verify(token, secret) as UserJwtPayload;
  } catch (error) {
    return null;
  }
}

// Check if user has required role
export function hasRole(user: UserJwtPayload | null, roles: string | string[]): boolean {
  if (!user) return false;
  
  const allowedRoles = Array.isArray(roles) ? roles : [roles];
  return allowedRoles.includes(user.role);
} 