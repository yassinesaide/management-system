"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { loginUser } from "@/lib/client-auth";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
} from "@/store/userSlice";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/dashboard";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [redirectTarget, setRedirectTarget] = useState("");
  const [debugInfo, setDebugInfo] = useState<string>("");

  // Use Redux hooks
  const dispatch = useAppDispatch();
  const { isLoading, error: authError } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Set error from Redux state if available
    if (authError) {
      setError(authError);
    }

    // Check if user is already logged in
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setDebugInfo(
            `Already logged in as: ${JSON.stringify(parsedUser, null, 2)}`
          );
          console.log("Login page: User already logged in:", parsedUser);
        } catch (parseError) {
          console.error("Error parsing stored user data:", parseError);
        }
      }
    } catch (err) {
      console.error("Error checking localStorage:", err);
    }
  }, [authError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    dispatch(loginStart());

    try {
      console.log("Attempting login with:", { username, password: "******" });
      const response = await loginUser(username, password);
      console.log("Raw login response:", JSON.stringify(response, null, 2));

      // Add debug logging
      console.log("User from login response:", response.user);
      console.log("User role from response:", response.user?.role);
      console.log("User ID from response:", response.user?.id);
      console.log("User username from response:", response.user?.username);

      // If any required field is missing, show an error and don't proceed
      if (
        !response.user ||
        !response.user.id ||
        !response.user.username ||
        !response.user.role
      ) {
        console.error(
          "LOGIN VALIDATION FAILED: Missing required user properties"
        );
        setError("Invalid user data received. Please contact support.");
        dispatch(
          loginFailure("Invalid user data structure received from server")
        );
        return;
      }

      // Dispatch success action to Redux
      dispatch(
        loginSuccess({
          user: response.user,
          token: response.token,
        })
      );

      // Add more debug logging
      setTimeout(() => {
        const reduxState = JSON.parse(localStorage.getItem("user") || "{}");
        console.log("Stored user in localStorage:", reduxState);
        console.log("Stored user role:", reduxState?.role);
      }, 100);

      // Determine redirect path based on user role
      const userRole = response.user?.role;
      console.log("User role:", userRole);

      let dashboardPath = "/direct-student"; // Default to the direct student page that works

      if (userRole === "student") {
        dashboardPath = "/direct-student"; // Use the direct student page that works
      } else if (userRole === "teacher") {
        dashboardPath = "/dashboard/teacher";
      } else if (userRole === "admin") {
        dashboardPath = "/direct-admin"; // We'll create this page
      } else if (userRole === "parent") {
        dashboardPath = "/dashboard/parent";
      }

      console.log("Setting redirect target to:", dashboardPath);
      setRedirectTarget(dashboardPath);

      // Use a timeout to ensure the state is updated before redirecting
      setTimeout(() => {
        console.log("Redirecting to:", dashboardPath);
        window.location.href = dashboardPath;
      }, 500);
    } catch (err: any) {
      console.error("Login error:", err);
      dispatch(loginFailure(err.message || "Login failed"));
      setError(err.message);
    }
  };

  // Function to handle mock student login
  const handleMockStudentLogin = () => {
    console.log("Performing mock student login");

    // Store mock user data directly in localStorage
    const mockUser = {
      id: 1,
      username: "testuser",
      email: "test@example.com",
      full_name: "Test User",
      role: "student" as "student", // Type assertion to fix the error
    };

    // Save to localStorage
    localStorage.setItem("user", JSON.stringify(mockUser));
    localStorage.setItem("token", "mock-token-for-testing");

    console.log("Mock student data saved to localStorage:", mockUser);

    // Dispatch success action to Redux
    dispatch(
      loginSuccess({
        user: mockUser,
        token: "mock-token-for-testing",
      })
    );

    // Show success message and set redirect
    setRedirectTarget("/direct-student");
    setDebugInfo(
      `Mock student login successful. Redirecting to: /direct-student\n\nUser data: ${JSON.stringify(
        mockUser,
        null,
        2
      )}`
    );

    // Redirect to direct student page
    setTimeout(() => {
      console.log("Redirecting to direct student page");
      window.location.href = "/direct-student";
    }, 1000);
  };

  // Function to handle mock admin login
  const handleMockAdminLogin = () => {
    console.log("Performing mock admin login");

    // Store mock admin data directly in localStorage
    const mockAdmin = {
      id: 1,
      username: "admin",
      email: "adminme@gmail.com",
      full_name: "Admin User",
      role: "admin" as "admin", // Type assertion to fix the error
    };

    // Save to localStorage
    localStorage.setItem("user", JSON.stringify(mockAdmin));
    localStorage.setItem("token", "mock-token-for-admin");

    console.log("Mock admin data saved to localStorage:", mockAdmin);

    // Dispatch success action to Redux
    dispatch(
      loginSuccess({
        user: mockAdmin,
        token: "mock-token-for-admin",
      })
    );

    // Show success message and set redirect
    setRedirectTarget("/direct-admin");
    setDebugInfo(
      `Mock admin login successful. Redirecting to: /direct-admin\n\nUser data: ${JSON.stringify(
        mockAdmin,
        null,
        2
      )}`
    );

    // Redirect to direct admin page
    setTimeout(() => {
      console.log("Redirecting to direct admin page");
      window.location.href = "/direct-admin";
    }, 1000);
  };

  // Function to clear user data
  const handleClearUserData = () => {
    console.log("Clearing all user data");

    // Clear localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.clear(); // Clear all items to be safe

    // Dispatch logout action to Redux
    dispatch(logout());

    // Reset state
    setDebugInfo("User data cleared from localStorage and Redux store");

    // Force reload the page to ensure everything is reset
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          School Management System
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Log in to your account
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {redirectTarget && (
            <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-green-700">
                    Login successful! Redirecting to dashboard...
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Debug Information */}
          {debugInfo && (
            <div className="bg-gray-50 border-l-4 border-gray-400 p-4 mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Debug Info:
              </h3>
              <div className="bg-white p-2 rounded overflow-auto max-h-40">
                <pre className="text-xs">{debugInfo}</pre>
              </div>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading || !!redirectTarget}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isLoading
                  ? "Signing in..."
                  : redirectTarget
                  ? "Redirecting..."
                  : "Sign in"}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or</span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  href="/register"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Register here
                </Link>
              </p>
            </div>

            {/* Quick Login Buttons */}
            <div className="mt-4 space-y-2">
              <button
                onClick={handleMockStudentLogin}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Quick Login as Student
              </button>

              <button
                onClick={handleMockAdminLogin}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Quick Login as Admin
              </button>

              <button
                onClick={handleClearUserData}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Clear User Data
              </button>
            </div>

            {/* Direct access for testing */}
            <div className="mt-4 p-3 bg-gray-100 rounded-md">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Testing Links:
              </p>
              <div className="flex flex-col space-y-2">
                <a
                  href="/dashboard/student"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Go directly to Student Dashboard
                </a>
                <a
                  href="/student-page"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Go to Standalone Student Page
                </a>
                <a
                  href="/direct-student"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Go to Direct Student Dashboard
                </a>
                <a
                  href="/direct-admin"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Go to Direct Admin Dashboard
                </a>
                <a
                  href="/debug"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Go to Debug Page
                </a>
                <a
                  href="/test"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Go to Test Page
                </a>
                <a
                  href="/user-debug"
                  className="text-sm text-purple-600 font-medium hover:underline"
                >
                  USER DATA DEBUG PAGE
                </a>
                <a
                  href="/clear-data"
                  className="text-sm text-red-600 font-medium hover:underline"
                >
                  FORCE CLEAR ALL USER DATA
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
