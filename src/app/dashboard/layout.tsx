"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/userSlice";
import { User } from "@/store/userSlice";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const reduxState = useAppSelector((state) => state.auth);

  // Create local state to prevent hydration errors
  const [isMounted, setIsMounted] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Mark component as mounted (client-side only)
    setIsMounted(true);

    // Update state from Redux (client-side only)
    if (reduxState.user) {
      setUser(reduxState.user);
      setIsAuthenticated(reduxState.isAuthenticated);
    } else {
      // Try to get from localStorage directly as a fallback
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.error("Error reading localStorage:", err);
      }
    }
  }, [reduxState]);

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/login";
  };

  // Simple loading state during server-side rendering
  if (!isMounted) {
    return <div className="p-8">Loading dashboard...</div>;
  }

  // Simple layout with minimal logic
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white">
        <div className="p-4">
          <h2 className="text-xl font-bold">School Management</h2>
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
                href="/dashboard/profile"
                className="block py-2 px-4 rounded hover:bg-gray-700"
              >
                Profile
              </a>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="block w-full text-left py-2 px-4 rounded hover:bg-gray-700"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 bg-gray-100">
        <header className="bg-white shadow">
          <div className="mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          </div>
        </header>
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
