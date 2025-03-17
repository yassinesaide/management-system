"use client";

import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Get user data from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Welcome, {user.username}!
        </h2>
        <p className="text-gray-600">
          Here's what's happening with your school today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Summary Cards */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-medium text-lg text-gray-700 mb-2">Students</h3>
          <p className="text-3xl font-bold text-blue-600">250</p>
          <p className="text-gray-500 text-sm mt-2">Total enrolled students</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-medium text-lg text-gray-700 mb-2">Teachers</h3>
          <p className="text-3xl font-bold text-green-600">32</p>
          <p className="text-gray-500 text-sm mt-2">Faculty members</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-medium text-lg text-gray-700 mb-2">Classes</h3>
          <p className="text-3xl font-bold text-purple-600">18</p>
          <p className="text-gray-500 text-sm mt-2">Active classes</p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-medium text-lg text-gray-700 mb-4">
            Recent Activity
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start space-x-3 border-b border-gray-100 pb-3">
              <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <p className="text-gray-700">
                  New student enrollment:{" "}
                  <span className="font-medium">John Doe</span>
                </p>
                <p className="text-gray-500 text-sm">2 hours ago</p>
              </div>
            </li>
            <li className="flex items-start space-x-3 border-b border-gray-100 pb-3">
              <div className="bg-green-100 text-green-600 p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-700">
                  Math exam grades posted for{" "}
                  <span className="font-medium">Class 10A</span>
                </p>
                <p className="text-gray-500 text-sm">Yesterday</p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <div className="bg-yellow-100 text-yellow-600 p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 2H8l-1-2H5V5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <p className="text-gray-700">
                  School announcement:{" "}
                  <span className="font-medium">Parent-Teacher Meeting</span>
                </p>
                <p className="text-gray-500 text-sm">2 days ago</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-medium text-lg text-gray-700 mb-4">
            Upcoming Events
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start space-x-3 border-b border-gray-100 pb-3">
              <div className="bg-red-100 text-red-600 p-2 rounded-full min-w-[40px] text-center font-medium">
                15
              </div>
              <div>
                <p className="text-gray-700 font-medium">Science Fair</p>
                <p className="text-gray-500 text-sm">
                  April 15, 2023 • 9:00 AM
                </p>
                <p className="text-gray-600 text-sm mt-1">
                  All students are invited to participate
                </p>
              </div>
            </li>
            <li className="flex items-start space-x-3 border-b border-gray-100 pb-3">
              <div className="bg-indigo-100 text-indigo-600 p-2 rounded-full min-w-[40px] text-center font-medium">
                22
              </div>
              <div>
                <p className="text-gray-700 font-medium">Final Exams Begin</p>
                <p className="text-gray-500 text-sm">
                  April 22, 2023 • 8:30 AM
                </p>
                <p className="text-gray-600 text-sm mt-1">
                  Schedule available in student portal
                </p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <div className="bg-emerald-100 text-emerald-600 p-2 rounded-full min-w-[40px] text-center font-medium">
                30
              </div>
              <div>
                <p className="text-gray-700 font-medium">School Assembly</p>
                <p className="text-gray-500 text-sm">
                  April 30, 2023 • 10:00 AM
                </p>
                <p className="text-gray-600 text-sm mt-1">
                  End of month celebrations
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
