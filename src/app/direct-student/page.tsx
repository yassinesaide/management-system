"use client";

import React, { useEffect, useState } from "react";

export default function DirectStudentDashboard() {
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
      console.log("Student dashboard: All localStorage keys:", allKeys);

      const storedUser = localStorage.getItem("user");
      console.log(
        "Student dashboard: Raw user data from localStorage:",
        storedUser
      );

      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          console.log(
            "Student dashboard: User loaded from localStorage:",
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

  // Check if user is a student
  const isStudent = user && user.role === "student";
  if (!isStudent) {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <div className="bg-red-50 p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-red-700 mb-4">
            Access Denied
          </h1>
          <p className="text-red-600 mb-4">
            You do not have permission to access the student dashboard.
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
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Direct Student Dashboard
          </h1>
          <div>
            {user && (
              <div className="text-right">
                <p className="text-sm text-gray-600">
                  Logged in as: {user.username}
                </p>
                <p className="text-xs text-gray-500">Role: {user.role}</p>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Debug Information */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Debug Information</h2>
            <div className="bg-gray-100 p-4 rounded overflow-auto max-h-60">
              <pre className="text-xs">{debugInfo}</pre>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">User Information</h2>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Your Schedule</h2>
              <div className="mt-4 space-y-2">
                <div className="p-2 bg-blue-50 rounded">
                  <p className="font-medium">Math Class</p>
                  <p className="text-sm text-gray-600">9:00 AM - 10:30 AM</p>
                </div>
                <div className="p-2 bg-green-50 rounded">
                  <p className="font-medium">Science Lab</p>
                  <p className="text-sm text-gray-600">11:00 AM - 12:30 PM</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Announcements</h2>
              <div className="space-y-4">
                <div className="border-b pb-3">
                  <h4 className="font-medium">Parent-Teacher Meeting</h4>
                  <p className="text-gray-600 text-sm">
                    The parent-teacher meeting is scheduled for next Friday.
                  </p>
                </div>
                <div className="border-b pb-3">
                  <h4 className="font-medium">Final Exam Schedule</h4>
                  <p className="text-gray-600 text-sm">
                    The final exam schedule has been published.
                  </p>
                </div>
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
                href="/student-page"
                className="block text-blue-600 hover:underline"
              >
                Standalone Student Page
              </a>
              <a
                href="/direct-student"
                className="block text-blue-600 hover:underline"
              >
                Direct Student Dashboard
              </a>
              <a
                href="/direct-admin"
                className="block text-blue-600 hover:underline"
              >
                Direct Admin Dashboard
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
