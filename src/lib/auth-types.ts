// Shared authentication types

// User JWT payload type
export interface UserJwtPayload {
  id: number;
  username: string;
  role: 'admin' | 'teacher' | 'parent' | 'student';
} 