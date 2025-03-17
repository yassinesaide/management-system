"use client";

import React from "react";

interface UserCardProps {
  type: "student" | "teacher" | "parent" | "staff";
}

const UserCard: React.FC<UserCardProps> = ({ type }) => {
  let title = "";
  let count = 0;
  let iconColor = "";
  let bgColor = "";

  // Set properties based on type
  switch (type) {
    case "student":
      title = "Students";
      count = 520;
      iconColor = "text-blue-600";
      bgColor = "bg-blue-100";
      break;
    case "teacher":
      title = "Teachers";
      count = 48;
      iconColor = "text-green-600";
      bgColor = "bg-green-100";
      break;
    case "parent":
      title = "Parents";
      count = 360;
      iconColor = "text-purple-600";
      bgColor = "bg-purple-100";
      break;
    case "staff":
      title = "Staff";
      count = 32;
      iconColor = "text-orange-600";
      bgColor = "bg-orange-100";
      break;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-start gap-4">
        <div className={`${bgColor} p-3 rounded-lg`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-8 w-8 ${iconColor}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {type === "student" && (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            )}
            {type === "teacher" && (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            )}
            {type === "parent" && (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            )}
            {type === "staff" && (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            )}
          </svg>
        </div>
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h3 className="text-2xl font-bold">{count.toLocaleString()}</h3>
          <p className="text-sm text-gray-500 mt-1">
            Total {title.toLowerCase()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
