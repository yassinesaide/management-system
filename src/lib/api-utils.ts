import { NextResponse } from 'next/server';

export type ApiResponse<T = any> = {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
};

// Success response helper
export function successResponse<T>(data: T, message = 'Success', status = 200): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
    },
    { status }
  );
}

// Error response helper
export function errorResponse(error: string, status = 400): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error,
    },
    { status }
  );
}

// Unauthorized response
export function unauthorizedResponse(message = 'Unauthorized access'): NextResponse<ApiResponse> {
  return errorResponse(message, 401);
}

// Forbidden response
export function forbiddenResponse(message = 'Forbidden access'): NextResponse<ApiResponse> {
  return errorResponse(message, 403);
}

// Not found response
export function notFoundResponse(message = 'Resource not found'): NextResponse<ApiResponse> {
  return errorResponse(message, 404);
}

// Server error response
export function serverErrorResponse(message = 'Internal server error'): NextResponse<ApiResponse> {
  return errorResponse(message, 500);
} 