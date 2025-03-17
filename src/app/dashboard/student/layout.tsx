"use client";

import React, { useEffect, useState } from "react";
import { User } from "@/store/userSlice";

export default function StudentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMounted, setIsMounted] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Mark component as mounted (client-side only)
    setIsMounted(true);

    // Try to get user from localStorage directly
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        console.log(
          "Student layout: User loaded from localStorage:",
          parsedUser
        );
      }
    } catch (err) {
      console.error("Error reading localStorage:", err);
    }
  }, []);

  // Simple loading state during server-side rendering
  if (!isMounted) {
    return <div className="p-8">Loading student dashboard layout...</div>;
  }

  // Simple layout with minimal logic
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white">
        <div className="p-4">
          <h2 className="text-xl font-bold">Student Portal</h2>
          {user && (
            <>
              <p className="text-sm text-gray-400">
                Welcome, {user.username || "User"}
              </p>
              <p className="text-xs text-gray-400">Role: {user.role}</p>
            </>
          )}

          {/* Direct links */}
          <div className="mt-4 p-2 bg-blue-600 rounded">
            <p className="text-white text-sm font-bold mb-2">Navigation:</p>
            <a
              href="/dashboard/student"
              className="block text-white text-sm underline hover:text-blue-200 mb-1"
            >
              Student Dashboard
            </a>
            <a
              href="/student-page"
              className="block text-white text-sm underline hover:text-blue-200 mb-1"
            >
              Standalone Page
            </a>
            <a
              href="/debug"
              className="block text-white text-sm underline hover:text-blue-200"
            >
              Debug Page
            </a>
          </div>
        </div>

        <nav className="mt-8">
          <ul className="space-y-2 px-4">
            <li>
              <a
                href="/dashboard"
                className="block py-2 px-4 rounded hover:bg-gray-700"
              >
                Main Dashboard
              </a>
            </li>
            <li>
              <a
                href="/dashboard/student/schedule"
                className="block py-2 px-4 rounded hover:bg-gray-700"
              >
                My Schedule
              </a>
            </li>
            <li>
              <a
                href="/dashboard/student/assignments"
                className="block py-2 px-4 rounded hover:bg-gray-700"
              >
                Assignments
              </a>
            </li>
            <li>
              <a
                href="/dashboard/student/grades"
                className="block py-2 px-4 rounded hover:bg-gray-700"
              >
                Grades
              </a>
            </li>
            <li>
              <a
                href="/dashboard/profile"
                className="block py-2 px-4 rounded hover:bg-gray-700"
              >
                Profile
              </a>
            </li>
            <li>
              <a
                href="/login"
                className="block py-2 px-4 rounded hover:bg-gray-700"
              >
                Logout
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 bg-gray-100">
        <header className="bg-white shadow">
          <div className="mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Student Dashboard
            </h1>
          </div>
        </header>
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
