import { NextRequest } from 'next/server';
import { getAuthUser } from '@/lib/server-auth';
import { executeQuery } from '@/lib/db';
import { errorResponse, successResponse, unauthorizedResponse } from '@/lib/api-utils';

export async function GET(request: NextRequest) {
  try {
    // Get authenticated user from token
    const authUser = getAuthUser(request);
    
    if (!authUser) {
      return unauthorizedResponse();
    }
    
    // Fetch user details from database
    const users = await executeQuery<any[]>({
      query: 'SELECT id, username, email, full_name, role, profile_image, created_at FROM users WHERE id = ?',
      values: [authUser.id],
    });
    
    if (users.length === 0) {
      return errorResponse('User not found', 404);
    }
    
    const user = users[0];
    
    // Get additional information based on user role
    let additionalInfo = null;
    
    if (user.role === 'student') {
      const students = await executeQuery<any[]>({
        query: `
          SELECT s.*, c.name as class_name, c.section 
          FROM students s 
          LEFT JOIN classes c ON s.class_id = c.id 
          WHERE s.user_id = ?
        `,
        values: [user.id],
      });
      
      if (students.length > 0) {
        additionalInfo = students[0];
      }
    } else if (user.role === 'teacher') {
      const teachers = await executeQuery<any[]>({
        query: 'SELECT * FROM teachers WHERE user_id = ?',
        values: [user.id],
      });
      
      if (teachers.length > 0) {
        additionalInfo = teachers[0];
      }
    } else if (user.role === 'parent') {
      const parents = await executeQuery<any[]>({
        query: `
          SELECT p.*, 
                 JSON_ARRAYAGG(
                   JSON_OBJECT(
                     'id', s.id,
                     'name', u.full_name,
                     'admission_number', s.admission_number,
                     'class_name', c.name,
                     'section', c.section,
                     'relationship', sp.relationship
                   )
                 ) as children
          FROM parents p
          LEFT JOIN student_parent sp ON p.id = sp.parent_id
          LEFT JOIN students s ON sp.student_id = s.id
          LEFT JOIN users u ON s.user_id = u.id
          LEFT JOIN classes c ON s.class_id = c.id
          WHERE p.user_id = ?
          GROUP BY p.id
        `,
        values: [user.id],
      });
      
      if (parents.length > 0) {
        additionalInfo = parents[0];
      }
    }
    
    return successResponse({
      ...user,
      additionalInfo,
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    return errorResponse('An error occurred while fetching user profile', 500);
  }
} 