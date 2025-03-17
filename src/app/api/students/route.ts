import { NextRequest } from 'next/server';
import { getAuthUser } from '@/lib/server-auth';
import { executeQuery, pool } from '@/lib/db';
import { errorResponse, successResponse, unauthorizedResponse, forbiddenResponse } from '@/lib/api-utils';

// Get all students (with pagination and filtering)
export async function GET(request: NextRequest) {
  try {
    const authUser = getAuthUser(request);
    
    if (!authUser) {
      return unauthorizedResponse();
    }
    
    // Extract query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const classId = searchParams.get('class_id');
    
    // Calculate offset
    const offset = (page - 1) * limit;
    
    // Build query based on filters
    let query = `
      SELECT s.id, s.admission_number, s.date_of_birth, s.gender, s.phone, 
             u.id as user_id, u.full_name, u.email, u.profile_image,
             c.id as class_id, c.name as class_name, c.section
      FROM students s
      JOIN users u ON s.user_id = u.id
      LEFT JOIN classes c ON s.class_id = c.id
      WHERE 1=1
    `;
    
    const queryParams: any[] = [];
    
    // Parent should only see their children
    if (authUser.role === 'parent') {
      query += `
        AND s.id IN (
          SELECT sp.student_id 
          FROM student_parent sp 
          JOIN parents p ON sp.parent_id = p.id 
          WHERE p.user_id = ?
        )
      `;
      queryParams.push(authUser.id);
    }
    
    // Search filter
    if (search) {
      query += `
        AND (
          u.full_name LIKE ? 
          OR s.admission_number LIKE ? 
          OR u.email LIKE ?
        )
      `;
      queryParams.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }
    
    // Class filter
    if (classId) {
      query += ' AND s.class_id = ?';
      queryParams.push(classId);
    }
    
    // Count total records (for pagination)
    const countQuery = `SELECT COUNT(*) as total FROM (${query}) as filtered_results`;
    const countResult = await executeQuery<any[]>({
      query: countQuery,
      values: queryParams,
    });
    
    const total = countResult[0].total;
    
    // Add pagination
    query += ' ORDER BY u.full_name LIMIT ? OFFSET ?';
    queryParams.push(limit, offset);
    
    // Execute the final query
    const students = await executeQuery<any[]>({
      query,
      values: queryParams,
    });
    
    return successResponse({
      students,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get students error:', error);
    return errorResponse('An error occurred while fetching students', 500);
  }
}

// Create a new student
export async function POST(request: NextRequest) {
  try {
    const authUser = getAuthUser(request);
    
    if (!authUser) {
      return unauthorizedResponse();
    }
    
    // Only admin and teachers can create students
    if (authUser.role !== 'admin' && authUser.role !== 'teacher') {
      return forbiddenResponse();
    }
    
    const body = await request.json();
    const { 
      username, 
      password, 
      email, 
      full_name, 
      admission_number, 
      class_id, 
      date_of_birth, 
      gender, 
      address, 
      phone,
      parent_ids = []
    } = body;
    
    // Validate required fields
    if (!username || !password || !email || !full_name || !admission_number) {
      return errorResponse('Missing required fields');
    }
    
    // Check if username or email already exists
    const existingUsers = await executeQuery<any[]>({
      query: 'SELECT id FROM users WHERE username = ? OR email = ?',
      values: [username, email],
    });
    
    if (existingUsers.length > 0) {
      return errorResponse('Username or email already exists');
    }
    
    // Check if admission_number already exists
    const existingStudents = await executeQuery<any[]>({
      query: 'SELECT id FROM students WHERE admission_number = ?',
      values: [admission_number],
    });
    
    if (existingStudents.length > 0) {
      return errorResponse('Admission number already exists');
    }
    
    // Use a transaction to create user and student
    const connection = await pool.getConnection();
    
    try {
      await connection.beginTransaction();
      
      // Create user
      const [userResult]: any = await connection.execute(
        'INSERT INTO users (username, password, email, full_name, role) VALUES (?, ?, ?, ?, ?)',
        [username, password, email, full_name, 'student']
      );
      
      const userId = userResult.insertId;
      
      // Create student
      const [studentResult]: any = await connection.execute(
        'INSERT INTO students (user_id, admission_number, class_id, date_of_birth, gender, address, phone) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [userId, admission_number, class_id || null, date_of_birth || null, gender || null, address || null, phone || null]
      );
      
      const studentId = studentResult.insertId;
      
      // Associate with parents if provided
      if (parent_ids.length > 0) {
        for (const parentInfo of parent_ids) {
          const { parent_id, relationship } = parentInfo;
          
          await connection.execute(
            'INSERT INTO student_parent (student_id, parent_id, relationship) VALUES (?, ?, ?)',
            [studentId, parent_id, relationship || 'guardian']
          );
        }
      }
      
      await connection.commit();
      
      return successResponse({ id: studentId, user_id: userId }, 'Student created successfully', 201);
    } catch (error) {
      await connection.rollback();
      console.error('Create student transaction error:', error);
      return errorResponse('Failed to create student');
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Create student error:', error);
    return errorResponse('An error occurred while creating student', 500);
  }
} 