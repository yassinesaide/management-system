"use client";

import React, { useEffect, useState } from "react";

export default function DirectAdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [debugInfo, setDebugInfo] = useState<string>("");

  useEffect(() => {
    setIsMounted(true);
    setIsLoading(true);

    try {
      // Log all localStorage keys for debugging
      const allKeys = Object.keys(localStorage);
      console.log("All localStorage keys:", allKeys);

      const storedUser = localStorage.getItem("user");
      console.log("Raw user data from localStorage:", storedUser);

      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          console.log(
            "Admin dashboard: User loaded from localStorage:",
            parsedUser
          );

          // Set debug info
          setDebugInfo(JSON.stringify(parsedUser, null, 2));
        } catch (parseError) {
          console.error("Error parsing user data:", parseError);
          setDebugInfo(
            `Error parsing user data: ${parseError.message}\nRaw data: ${storedUser}`
          );
        }
      } else {
        console.log("No user data found in localStorage");
        setDebugInfo("No user data found in localStorage");
      }
    } catch (err) {
      console.error("Error reading localStorage:", err);
      setDebugInfo(`Error reading localStorage: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (!isMounted || isLoading) {
    return <div className="p-8">Loading...</div>;
  }

  // Check if user is admin
  const isAdmin = user && user.role === "admin";
  if (!isAdmin) {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <div className="bg-red-50 p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-red-700 mb-4">
            Access Denied
          </h1>
          <p className="text-red-600 mb-4">
            You do not have permission to access the admin dashboard.
          </p>
          <p className="text-red-600 mb-4">
            Current user role: {user ? user.role : "No user data"}
          </p>
          <div className="bg-white p-4 rounded mb-4 overflow-auto max-h-60">
            <pre className="text-xs">{debugInfo}</pre>
          </div>
          <a
            href="/login"
            className="inline-block bg-blue-500 text-white px-4 py-2 rounded"
          >
            Return to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-indigo-800 text-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div>
            {user && (
              <div className="text-right">
                <p className="text-sm">Logged in as: {user.username}</p>
                <p className="text-xs opacity-75">Role: {user.role}</p>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Admin Information</h2>
            <div>
              <p className="mb-2">
                <span className="font-semibold">
                  Welcome, {user.full_name || user.username}!
                </span>
              </p>
              <p className="mb-2">
                <span className="font-semibold">Username:</span> {user.username}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Email:</span> {user.email}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Role:</span> {user.role}
              </p>
            </div>
          </div>

          {/* Debug Information */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Debug Information</h2>
            <div className="bg-gray-100 p-4 rounded overflow-auto max-h-60">
              <pre className="text-xs">{debugInfo}</pre>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Users</h2>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-indigo-600">125</p>
                  <p className="text-gray-500">Total Users</p>
                </div>
                <div className="bg-indigo-100 p-3 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
              </div>
              <a
                href="#"
                className="block mt-4 text-sm text-indigo-600 hover:underline"
              >
                View all users
              </a>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Students</h2>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-green-600">85</p>
                  <p className="text-gray-500">Total Students</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                    />
                  </svg>
                </div>
              </div>
              <a
                href="#"
                className="block mt-4 text-sm text-green-600 hover:underline"
              >
                Manage students
              </a>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Teachers</h2>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-blue-600">24</p>
                  <p className="text-gray-500">Total Teachers</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                    />
                  </svg>
                </div>
              </div>
              <a
                href="#"
                className="block mt-4 text-sm text-blue-600 hover:underline"
              >
                Manage teachers
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
              <div className="space-y-4">
                <div className="border-b pb-3">
                  <p className="font-medium">New Student Registration</p>
                  <p className="text-gray-600 text-sm">
                    John Doe was registered as a new student.
                  </p>
                  <p className="text-gray-400 text-xs mt-1">2 hours ago</p>
                </div>
                <div className="border-b pb-3">
                  <p className="font-medium">Exam Schedule Updated</p>
                  <p className="text-gray-600 text-sm">
                    Final exam schedule has been updated.
                  </p>
                  <p className="text-gray-400 text-xs mt-1">Yesterday</p>
                </div>
                <div className="border-b pb-3">
                  <p className="font-medium">New Teacher Added</p>
                  <p className="text-gray-600 text-sm">
                    Jane Smith was added as a Science teacher.
                  </p>
                  <p className="text-gray-400 text-xs mt-1">3 days ago</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                <a
                  href="#"
                  className="block p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100"
                >
                  <div className="font-medium text-indigo-700">Add User</div>
                  <div className="text-sm text-indigo-500">
                    Create a new user account
                  </div>
                </a>
                <a
                  href="#"
                  className="block p-4 bg-green-50 rounded-lg hover:bg-green-100"
                >
                  <div className="font-medium text-green-700">Add Student</div>
                  <div className="text-sm text-green-500">
                    Register a new student
                  </div>
                </a>
                <a
                  href="#"
                  className="block p-4 bg-blue-50 rounded-lg hover:bg-blue-100"
                >
                  <div className="font-medium text-blue-700">Add Teacher</div>
                  <div className="text-sm text-blue-500">
                    Register a new teacher
                  </div>
                </a>
                <a
                  href="#"
                  className="block p-4 bg-purple-50 rounded-lg hover:bg-purple-100"
                >
                  <div className="font-medium text-purple-700">
                    Create Class
                  </div>
                  <div className="text-sm text-purple-500">
                    Set up a new class
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Navigation</h2>
            <div className="space-y-2">
              <a href="/" className="block text-blue-600 hover:underline">
                Home
              </a>
              <a href="/login" className="block text-blue-600 hover:underline">
                Login Page
              </a>
              <a
                href="/direct-student"
                className="block text-blue-600 hover:underline"
              >
                Student Dashboard
              </a>
              <a
                href="/direct-admin"
                className="block text-blue-600 hover:underline"
              >
                Admin Dashboard
              </a>
              <a href="/debug" className="block text-blue-600 hover:underline">
                Debug Page
              </a>
              <a href="/test" className="block text-blue-600 hover:underline">
                Test Page
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
