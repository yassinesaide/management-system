"use client";

import React, { useEffect, useState } from "react";
import { User } from "@/store/userSlice";

export default function StudentDashboard() {
  // State for client-side rendering
  const [isMounted, setIsMounted] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mark component as mounted
    setIsMounted(true);
    setIsLoading(true);

    console.log("Student dashboard mounted");

    // Try to get user from localStorage
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        console.log("User loaded from localStorage:", parsedUser);
      }
    } catch (err) {
      console.error("Error reading localStorage:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Simple loading state during server-side rendering
  if (!isMounted || isLoading) {
    return <div className="p-8">Loading student dashboard...</div>;
  }

  return (
    <div className="p-4">
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h1 className="text-2xl font-bold mb-4">Student Dashboard</h1>

        {!user ? (
          <div>
            <p className="text-red-500">Not authenticated. Please log in.</p>
            <a
              href="/login"
              className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded"
            >
              Go to Login
            </a>
          </div>
        ) : (
          <div>
            <p className="mb-2">
              <span className="font-semibold">
                Welcome, {user.username || "Student"}!
              </span>
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
    </div>
  );
}
