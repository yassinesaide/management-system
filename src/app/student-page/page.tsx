"use client";

import React, { useEffect, useState } from "react";

export default function StandaloneStudentPage() {
  const [user, setUser] = useState<any>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsMounted(true);
    setIsLoading(true);

    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (err) {
      console.error("Error reading localStorage:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (!isMounted || isLoading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Student Dashboard (Standalone)
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">User Information</h2>
        {user ? (
          <div>
            <p className="mb-2">
              <span className="font-semibold">Username:</span> {user.username}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Role:</span> {user.role}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Email:</span> {user.email}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Full Name:</span> {user.full_name}
            </p>
          </div>
        ) : (
          <div>
            <p className="text-red-500">Not authenticated. Please log in.</p>
            <a
              href="/login"
              className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded"
            >
              Go to Login
            </a>
          </div>
        )}
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
          <a href="/dashboard" className="block text-blue-600 hover:underline">
            Main Dashboard
          </a>
          <a
            href="/dashboard/student"
            className="block text-blue-600 hover:underline"
          >
            Student Dashboard
          </a>
          <a href="/test" className="block text-blue-600 hover:underline">
            Test Page
          </a>
          <a href="/debug" className="block text-blue-600 hover:underline">
            Debug Page
          </a>
        </div>
      </div>
    </div>
  );
}
