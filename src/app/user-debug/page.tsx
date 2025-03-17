"use client";

import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/store/hooks";

export default function UserDebugPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [localStorageData, setLocalStorageData] = useState<Record<string, any>>(
    {}
  );
  const [error, setError] = useState("");

  // Get auth state from Redux
  const auth = useAppSelector((state) => state.auth);

  useEffect(() => {
    setIsMounted(true);

    try {
      // Get all localStorage data
      const data: Record<string, any> = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) {
          try {
            const value = localStorage.getItem(key);
            if (value) {
              try {
                data[key] = JSON.parse(value);
              } catch {
                data[key] = value;
              }
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

  if (!isMounted) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">User Debug Page</h1>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Redux Auth State</h2>
          <div className="bg-gray-100 p-4 rounded overflow-auto max-h-60">
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
          <h2 className="text-xl font-semibold mb-4">Actions</h2>
          <div className="space-y-4">
            <button
              onClick={clearLocalStorage}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Clear LocalStorage and Reload
            </button>
            <a
              href="/login"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Go to Login Page
            </a>
            <a
              href="/clear-data"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Go to Clear Data Page
            </a>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Explanation</h2>
          <div className="prose">
            <p>
              There are two different sets of user data in your application:
            </p>
            <ol>
              <li>
                <strong>Mock Data:</strong> Created by the "Quick Login" buttons
                on the login page and stored in localStorage
              </li>
              <li>
                <strong>Database Data:</strong> The actual user records in your
                database
              </li>
            </ol>
            <p>The confusion happens because:</p>
            <ul>
              <li>
                Your frontend (Next.js) is using the mock data from localStorage
                for authentication
              </li>
              <li>But your backend database has different user data</li>
            </ul>
            <p>To fix this:</p>
            <ol>
              <li>Clear localStorage completely using the button above</li>
              <li>
                Use the actual login form with credentials that match your
                database
              </li>
              <li>
                Or update the mock login functions to match your database
                records
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
