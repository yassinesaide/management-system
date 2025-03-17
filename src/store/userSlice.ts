import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the user interface
export interface User {
  id: number;
  username: string;
  email: string;
  full_name: string;
  role: 'admin' | 'teacher' | 'parent' | 'student';
}

// Define the auth state interface
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Define the initial state
const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null
};

// Try to load state from localStorage on initialization
if (typeof window !== 'undefined') {
  try {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    
    if (storedUser && storedToken) {
      const parsedUser = JSON.parse(storedUser);
      
      // Validate that user has required properties
      if (parsedUser && 
          parsedUser.id && 
          parsedUser.username && 
          parsedUser.role) {
        initialState.user = parsedUser;
        initialState.token = storedToken;
        initialState.isAuthenticated = true;
      } else {
        // Clean up localStorage if invalid
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
  } catch (error) {
    // If there's an error parsing, just use the initial state
    // Clear potentially corrupt localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }
}

// Create the user slice
const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<{ user: User, token: string }>) => {
      // Validate user object has minimum required properties
      const { user, token } = action.payload;
      
      if (!user || !user.id || !user.username || !user.role) {
        state.isLoading = false;
        state.error = 'Invalid user data received from server';
        return;
      }
      
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = user;
      state.token = token;
      state.error = null;
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('token', token);
        } catch (e) {
          // Silent error handling
        }
      }
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = null;
      
      // Clear localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    },
    clearError: (state) => {
      state.error = null;
    }
  }
});

// Export actions and reducer
export const { loginStart, loginSuccess, loginFailure, logout, clearError } = userSlice.actions;
export default userSlice.reducer; 