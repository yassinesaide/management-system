import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { comparePassword, generateToken } from '@/lib/server-auth';
import { executeQuery } from '@/lib/db';
import { errorResponse, successResponse } from '@/lib/api-utils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Validation
    if (!username || !password) {
      return errorResponse('Username and password are required');
    }

    // Fetch user from database
    const users = await executeQuery<any[]>({
      query: 'SELECT id, username, password, email, full_name, role FROM users WHERE username = ?',
      values: [username],
    });

    if (users.length === 0) {
      return errorResponse('Invalid username or password', 401);
    }

    const user = users[0];

    // Verify password
    const isPasswordValid = await comparePassword(password, user.password);
    
    if (!isPasswordValid) {
      return errorResponse('Invalid username or password', 401);
    }

    // Generate JWT token
    const token = generateToken({
      id: user.id,
      username: user.username,
      role: user.role,
    });

    // Set cookie
    const cookieStore = cookies();
    cookieStore.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: '/',
    });

    // Return user info (without password)
    const { password: _, ...userWithoutPassword } = user;
    
    return successResponse(
      {
        user: userWithoutPassword,
        token,
      },
      'Login successful'
    );
  } catch (error) {
    console.error('Login error:', error);
    return errorResponse('An error occurred during login', 500);
  }
} 