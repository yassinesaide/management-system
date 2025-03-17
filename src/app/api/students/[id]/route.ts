import { NextRequest } from 'next/server';
import { getAuthUser, hashPassword } from '@/lib/server-auth';
import { executeQuery, pool } from '@/lib/db';
import { errorResponse, successResponse, unauthorizedResponse, forbiddenResponse, notFoundResponse } from '@/lib/api-utils';

// Get student by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authUser = getAuthUser(request);
    
    if (!authUser) {
      return unauthorizedResponse();
    }
    
    const studentId = parseInt(params.id);
    
    // Parents can only view their children
    if (authUser.role === 'parent') {
      const isParentOfStudent = await executeQuery<any[]>({
        query: `
          SELECT 1 FROM student_parent sp
          JOIN parents p ON sp.parent_id = p.id
          WHERE sp.student_id = ? AND p.user_id = ?
        `,
        values: [studentId, authUser.id],
      });
      
      if (isParentOfStudent.length === 0) {
        return forbiddenResponse();
      }
    }
    
    // Fetch detailed student information
    const students = await executeQuery<any[]>({
      query: `
        SELECT s.*, u.id as user_id, u.username, u.email, u.full_name, u.profile_image, 
               c.id as class_id, c.name as class_name, c.section
        FROM students s
        JOIN users u ON s.user_id = u.id
        LEFT JOIN classes c ON s.class_id = c.id
        WHERE s.id = ?
      `,
      values: [studentId],
    });
    
    if (students.length === 0) {
      return notFoundResponse('Student not found');
    }
    
    const student = students[0];
    
    // Get the parents of this student
    const parents = await executeQuery<any[]>({
      query: `
        SELECT p.id, u.full_name, u.email, p.phone, sp.relationship
        FROM student_parent sp
        JOIN parents p ON sp.parent_id = p.id
        JOIN users u ON p.user_id = u.id
        WHERE sp.student_id = ?
      `,
      values: [studentId],
    });
    
    // Get attendance summary
    const attendance = await executeQuery<any[]>({
      query: `
        SELECT 
          COUNT(*) as total_days,
          SUM(CASE WHEN status = 'present' THEN 1 ELSE 0 END) as present_days,
          SUM(CASE WHEN status = 'absent' THEN 1 ELSE 0 END) as absent_days,
          SUM(CASE WHEN status = 'late' THEN 1 ELSE 0 END) as late_days
        FROM attendance
        WHERE student_id = ?
      `,
      values: [studentId],
    });
    
    // Get exam results
    const examResults = await executeQuery<any[]>({
      query: `
        SELECT 
          e.id as exam_id, e.name as exam_name, 
          s.id as subject_id, s.name as subject_name, s.code as subject_code,
          es.max_marks, es.passing_marks, r.marks_obtained, 
          (r.marks_obtained >= es.passing_marks) as passed
        FROM results r
        JOIN exam_subjects es ON r.exam_subject_id = es.id
        JOIN exams e ON es.exam_id = e.id
        JOIN class_subjects cs ON es.class_subject_id = cs.id
        JOIN subjects s ON cs.subject_id = s.id
        WHERE r.student_id = ?
        ORDER BY e.start_date DESC, s.name
      `,
      values: [studentId],
    });
    
    return successResponse({
      ...student,
      parents,
      attendance: attendance[0],
      examResults,
    });
  } catch (error) {
    console.error('Get student error:', error);
    return errorResponse('An error occurred while fetching student details', 500);
  }
}

// Update student by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authUser = getAuthUser(request);
    
    if (!authUser) {
      return unauthorizedResponse();
    }
    
    // Only admin and teachers can update students
    if (authUser.role !== 'admin' && authUser.role !== 'teacher') {
      return forbiddenResponse();
    }
    
    const studentId = parseInt(params.id);
    const body = await request.json();
    
    // First, check if the student exists
    const students = await executeQuery<any[]>({
      query: 'SELECT user_id FROM students WHERE id = ?',
      values: [studentId],
    });
    
    if (students.length === 0) {
      return notFoundResponse('Student not found');
    }
    
    const userId = students[0].user_id;
    
    // Extract update data
    const {
      email,
      full_name,
      password,
      admission_number,
      class_id,
      date_of_birth,
      gender,
      address,
      phone,
      parent_ids,
    } = body;
    
    // Start transaction
    const connection = await pool.getConnection();
    
    try {
      await connection.beginTransaction();
      
      // Update user table
      const userUpdates = [];
      const userValues = [];
      
      if (email) {
        userUpdates.push('email = ?');
        userValues.push(email);
      }
      
      if (full_name) {
        userUpdates.push('full_name = ?');
        userValues.push(full_name);
      }
      
      if (password) {
        const hashedPassword = await hashPassword(password);
        userUpdates.push('password = ?');
        userValues.push(hashedPassword);
      }
      
      if (userUpdates.length > 0) {
        userValues.push(userId);
        await connection.execute(
          `UPDATE users SET ${userUpdates.join(', ')} WHERE id = ?`,
          userValues
        );
      }
      
      // Update student table
      const studentUpdates = [];
      const studentValues = [];
      
      if (admission_number) {
        // Check if admission number already exists with a different student
        const existingAdmission = await executeQuery<any[]>({
          query: 'SELECT id FROM students WHERE admission_number = ? AND id != ?',
          values: [admission_number, studentId],
        });
        
        if (existingAdmission.length > 0) {
          await connection.rollback();
          return errorResponse('Admission number already in use');
        }
        
        studentUpdates.push('admission_number = ?');
        studentValues.push(admission_number);
      }
      
      if (class_id !== undefined) {
        studentUpdates.push('class_id = ?');
        studentValues.push(class_id);
      }
      
      if (date_of_birth) {
        studentUpdates.push('date_of_birth = ?');
        studentValues.push(date_of_birth);
      }
      
      if (gender) {
        studentUpdates.push('gender = ?');
        studentValues.push(gender);
      }
      
      if (address) {
        studentUpdates.push('address = ?');
        studentValues.push(address);
      }
      
      if (phone) {
        studentUpdates.push('phone = ?');
        studentValues.push(phone);
      }
      
      if (studentUpdates.length > 0) {
        studentValues.push(studentId);
        await connection.execute(
          `UPDATE students SET ${studentUpdates.join(', ')} WHERE id = ?`,
          studentValues
        );
      }
      
      // Update parent associations if provided
      if (parent_ids && Array.isArray(parent_ids)) {
        // Remove existing associations
        await connection.execute(
          'DELETE FROM student_parent WHERE student_id = ?',
          [studentId]
        );
        
        // Add new associations
        for (const parentInfo of parent_ids) {
          const { parent_id, relationship } = parentInfo;
          
          if (parent_id) {
            await connection.execute(
              'INSERT INTO student_parent (student_id, parent_id, relationship) VALUES (?, ?, ?)',
              [studentId, parent_id, relationship || 'guardian']
            );
          }
        }
      }
      
      await connection.commit();
      
      return successResponse({ id: studentId }, 'Student updated successfully');
    } catch (error) {
      await connection.rollback();
      console.error('Update student transaction error:', error);
      return errorResponse('Failed to update student');
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Update student error:', error);
    return errorResponse('An error occurred while updating student', 500);
  }
}

// Delete student by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authUser = getAuthUser(request);
    
    if (!authUser) {
      return unauthorizedResponse();
    }
    
    // Only admin can delete students
    if (authUser.role !== 'admin') {
      return forbiddenResponse();
    }
    
    const studentId = parseInt(params.id);
    
    // Get user_id first for cascading delete
    const students = await executeQuery<any[]>({
      query: 'SELECT user_id FROM students WHERE id = ?',
      values: [studentId],
    });
    
    if (students.length === 0) {
      return notFoundResponse('Student not found');
    }
    
    const userId = students[0].user_id;
    
    // Start transaction
    const connection = await pool.getConnection();
    
    try {
      await connection.beginTransaction();
      
      // Delete from student_parent (if any)
      await connection.execute(
        'DELETE FROM student_parent WHERE student_id = ?',
        [studentId]
      );
      
      // Delete from attendance (if any)
      await connection.execute(
        'DELETE FROM attendance WHERE student_id = ?',
        [studentId]
      );
      
      // Delete from results (if any)
      await connection.execute(
        'DELETE FROM results WHERE student_id = ?',
        [studentId]
      );
      
      // Delete from students
      await connection.execute(
        'DELETE FROM students WHERE id = ?',
        [studentId]
      );
      
      // Delete from users
      await connection.execute(
        'DELETE FROM users WHERE id = ?',
        [userId]
      );
      
      await connection.commit();
      
      return successResponse(null, 'Student deleted successfully');
    } catch (error) {
      await connection.rollback();
      console.error('Delete student transaction error:', error);
      return errorResponse('Failed to delete student');
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Delete student error:', error);
    return errorResponse('An error occurred while deleting student', 500);
  }
} 