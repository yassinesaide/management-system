// SERVER-SIDE ONLY
// This file should only be imported in server components or API routes
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

// Define the UserJwtPayload interface here to avoid import issues
export interface UserJwtPayload {
  id: number;
  username: string;
  role: 'admin' | 'teacher' | 'parent' | 'student';
}

// Hash a password
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

// Compare password with hash
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}

// Generate JWT token
export function generateToken(user: UserJwtPayload): string {
  const secret = process.env.JWT_SECRET || 'fallback_secret_not_for_production';
  const expiresIn = process.env.JWT_EXPIRE || '30d';
  
  // @ts-ignore - Ignore the JWT typing issues
  return jwt.sign(user, secret, { expiresIn });
}

// Get authenticated user from request
export function getAuthUser(req: NextRequest): UserJwtPayload | null {
  const cookieStore = cookies();
  const token = req.cookies.get('auth_token')?.value || cookieStore.get('auth_token')?.value;
  
  if (!token) return null;
  
  return verifyToken(token);
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