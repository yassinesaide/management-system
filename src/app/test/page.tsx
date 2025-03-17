"use client";

import React, { useEffect, useState } from "react";

export default function TestPage() {
  const [user, setUser] = useState<any>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (err) {
      console.error("Error reading localStorage:", err);
    }
  }, []);

  if (!isMounted) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Test Page</h1>

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
          <p>No user data found in localStorage</p>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
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
          <a href="/debug" className="block text-blue-600 hover:underline">
            Debug Page
          </a>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Actions</h2>
        <div className="space-y-2">
          <button
            onClick={() => {
              localStorage.removeItem("user");
              localStorage.removeItem("token");
              window.location.reload();
            }}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Clear localStorage and Reload
          </button>

          <button
            onClick={() => {
              const mockUser = {
                id: 1,
                username: "testuser",
                email: "test@example.com",
                full_name: "Test User",
                role: "student",
              };
              localStorage.setItem("user", JSON.stringify(mockUser));
              localStorage.setItem("token", "mock-token-for-testing");
              window.location.reload();
            }}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Set Mock User Data and Reload
          </button>
        </div>
      </div>
    </div>
  );
}
