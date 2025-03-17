"use client";

import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/store/hooks";

export default function DebugPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [localStorageData, setLocalStorageData] = useState<Record<string, any>>(
    {}
  );
  const [currentUrl, setCurrentUrl] = useState("");
  const [error, setError] = useState("");

  // Get auth state from Redux
  const auth = useAppSelector((state) => state.auth);

  useEffect(() => {
    setIsMounted(true);

    try {
      // Get current URL
      setCurrentUrl(window.location.href);

      // Get all localStorage data
      const data: Record<string, any> = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) {
          try {
            const value = localStorage.getItem(key);
            if (value && (key === "user" || key === "token")) {
              try {
                data[key] = JSON.parse(value);
              } catch {
                data[key] = value;
              }
            } else if (value) {
              data[key] = value;
            }
          } catch (err) {
            console.error(`Error reading localStorage key ${key}:`, err);
          }
        }
      }
      setLocalStorageData(data);
    } catch (err) {
      console.error("Error in debug page:", err);
      setError(err instanceof Error ? err.message : String(err));
    }
  }, []);

  const clearLocalStorage = () => {
    try {
      localStorage.clear();
      window.location.reload();
    } catch (err) {
      console.error("Error clearing localStorage:", err);
      setError(err instanceof Error ? err.message : String(err));
    }
  };

  const setMockStudentData = () => {
    try {
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
    } catch (err) {
      console.error("Error setting mock student data:", err);
      setError(err instanceof Error ? err.message : String(err));
    }
  };

  const setMockAdminData = () => {
    try {
      const mockAdmin = {
        id: 1,
        username: "admin",
        email: "adminme@gmail.com",
        full_name: "Admin User",
        role: "admin",
      };
      localStorage.setItem("user", JSON.stringify(mockAdmin));
      localStorage.setItem("token", "mock-token-for-admin");
      window.location.reload();
    } catch (err) {
      console.error("Error setting mock admin data:", err);
      setError(err instanceof Error ? err.message : String(err));
    }
  };

  if (!isMounted) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Debug Page</h1>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Current URL</h2>
          <div className="bg-gray-100 p-4 rounded">
            <p className="font-mono text-sm break-all">{currentUrl}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Redux State</h2>
          <div className="bg-gray-100 p-4 rounded overflow-auto max-h-60">
            <h3 className="font-medium mb-2">Auth State:</h3>
            <pre className="text-xs">{JSON.stringify(auth, null, 2)}</pre>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">LocalStorage Data</h2>
          <div className="bg-gray-100 p-4 rounded overflow-auto max-h-60">
            <pre className="text-xs">
              {JSON.stringify(localStorageData, null, 2)}
            </pre>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Navigation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="/"
              className="block p-4 bg-blue-50 rounded-lg hover:bg-blue-100"
            >
              <div className="font-medium text-blue-700">Home</div>
            </a>
            <a
              href="/login"
              className="block p-4 bg-blue-50 rounded-lg hover:bg-blue-100"
            >
              <div className="font-medium text-blue-700">Login Page</div>
            </a>
            <a
              href="/direct-student"
              className="block p-4 bg-green-50 rounded-lg hover:bg-green-100"
            >
              <div className="font-medium text-green-700">
                Direct Student Dashboard
              </div>
            </a>
            <a
              href="/direct-admin"
              className="block p-4 bg-purple-50 rounded-lg hover:bg-purple-100"
            >
              <div className="font-medium text-purple-700">
                Direct Admin Dashboard
              </div>
            </a>
            <a
              href="/dashboard/student"
              className="block p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100"
            >
              <div className="font-medium text-yellow-700">
                Student Dashboard (with Layout)
              </div>
            </a>
            <a
              href="/test"
              className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
            >
              <div className="font-medium text-gray-700">Test Page</div>
            </a>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Actions</h2>
          <div className="space-y-4">
            <button
              onClick={clearLocalStorage}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Clear LocalStorage
            </button>
            <button
              onClick={setMockStudentData}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Set Mock Student Data
            </button>
            <button
              onClick={setMockAdminData}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Set Mock Admin Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
