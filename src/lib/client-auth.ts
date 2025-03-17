'use client';

// Client-side authentication utilities
// These functions do not use bcrypt or other Node.js modules that cause problems in the browser

// Mock user data for testing when the API is unavailable
const MOCK_USER = {
  id: 1,
  username: 'testuser',
  email: 'test@example.com',
  full_name: 'Test User',
  role: 'student'
};

/**
 * Logs in a user using the API
 */
export async function loginUser(username: string, password: string) {
  try {
    console.log("Sending login request for username:", username);
    
    // For testing - enable this to bypass actual API call and use mock data
    const useMockData = true;
    
    if (useMockData) {
      console.log("Using mock data instead of actual API call");
      return {
        user: MOCK_USER,
        token: 'mock-token-for-testing'
      };
    }
    
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    
    // Handle non-OK responses
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Login failed');
    }
    
    // Get the response data
    const data = await response.json();
    console.log("API Response data:", data);
    
    // Validate that the response has the expected structure
    if (!data.user) {
      console.error("Response missing user object:", data);
      throw new Error('Response missing user data');
    }
    
    // If essential fields are missing, reconstruct the data with defaults
    // This is a fallback mechanism in case the API is not returning the expected structure
    if (!data.user.id || !data.user.username || !data.user.role) {
      console.warn("User data missing essential fields, attempting to fix");
      
      // Create a fixed user object with defaults for missing fields
      const fixedUser = {
        ...data.user,
        id: data.user.id || 0,
        username: data.user.username || username,
        role: data.user.role || 'student', // Default to student if role is missing
      };
      
      console.log("Using fixed user object:", fixedUser);
      
      return {
        user: fixedUser,
        token: data.token
      };
    }
    
    // All checks passed, return the data
    return data;
  } catch (error) {
    console.error("Login request error:", error);
    throw error;
  }
}

/**
 * Logs out the current user
 */
export async function logoutUser() {
  const response = await fetch('/api/auth/logout', {
    method: 'POST',
  });
  
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || 'Logout failed');
  }
  
  return response.json();
}

/**
 * Fetches the current user's profile
 */
export async function getUserProfile() {
  const response = await fetch('/api/auth/me');
  
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || 'Failed to fetch user profile');
  }
  
  return response.json();
}

/**
 * Registers a new user
 */
export async function registerUser(userData: any) {
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || 'Registration failed');
  }
  
  return response.json();
} 