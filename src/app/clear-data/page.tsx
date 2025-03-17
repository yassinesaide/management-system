"use client";

import React, { useEffect } from "react";

export default function ClearDataPage() {
  useEffect(() => {
    try {
      // Clear all localStorage data
      localStorage.clear();
      console.log("All localStorage data has been cleared");

      // Redirect to login page after clearing data
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-4">
          Clearing User Data
        </h1>
        <p className="text-center mb-4">
          All user data is being cleared from your browser...
        </p>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
        </div>
        <p className="text-center text-sm text-gray-500 mt-4">
          You will be redirected to the login page automatically.
        </p>
      </div>
    </div>
  );
}
