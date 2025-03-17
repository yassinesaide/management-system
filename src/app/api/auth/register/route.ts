import { NextRequest } from 'next/server';
import { hashPassword } from '@/lib/server-auth';
import { executeQuery, pool } from '@/lib/db';
import { errorResponse, successResponse } from '@/lib/api-utils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password, email, full_name, role, additional_info } = body;

    // Basic validation
    if (!username || !password || !email || !full_name || !role) {
      return errorResponse('Missing required fields');
    }

    // Verify role is valid
    const validRoles = ['admin', 'teacher', 'parent', 'student'];
    if (!validRoles.includes(role)) {
      return errorResponse('Invalid role specified');
    }

    // Check if user already exists
    const existingUsers = await executeQuery<any[]>({
      query: 'SELECT id FROM users WHERE username = ? OR email = ?',
      values: [username, email],
    });

    if (existingUsers.length > 0) {
      return errorResponse('Username or email already exists');
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Use transaction to ensure consistent data
    const connection = await pool.getConnection();
    
    try {
      await connection.beginTransaction();

      // Insert user
      const [userResult]: any = await connection.execute(
        'INSERT INTO users (username, password, email, full_name, role) VALUES (?, ?, ?, ?, ?)',
        [username, hashedPassword, email, full_name, role]
      );
      
      const userId = userResult.insertId;

      // Handle additional info based on role
      if (role === 'student' && additional_info) {
        const { admission_number, class_id, date_of_birth, gender, address, phone } = additional_info;
        
        if (admission_number) {
          await connection.execute(
            'INSERT INTO students (user_id, admission_number, class_id, date_of_birth, gender, address, phone) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [userId, admission_number, class_id || null, date_of_birth || null, gender || null, address || null, phone || null]
          );
        }
      } else if (role === 'teacher' && additional_info) {
        const { employee_id, qualification, experience, joining_date, salary, phone, address } = additional_info;
        
        if (employee_id) {
          await connection.execute(
            'INSERT INTO teachers (user_id, employee_id, qualification, experience, joining_date, salary, phone, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [userId, employee_id, qualification || null, experience || null, joining_date || null, salary || null, phone || null, address || null]
          );
        }
      } else if (role === 'parent' && additional_info) {
        const { phone, address, occupation } = additional_info;
        
        await connection.execute(
          'INSERT INTO parents (user_id, phone, address, occupation) VALUES (?, ?, ?, ?)',
          [userId, phone || null, address || null, occupation || null]
        );
      }

      await connection.commit();
      
      return successResponse({ id: userId }, 'User registered successfully', 201);
    } catch (error) {
      await connection.rollback();
      console.error('Registration transaction error:', error);
      return errorResponse('Registration failed');
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Registration error:', error);
    return errorResponse('An error occurred during registration', 500);
  }
} 