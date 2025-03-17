"use client";
import React from "react";

const AttendanceChart: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-full">
      <h3 className="text-xl font-semibold mb-4">Attendance Overview</h3>

      <div className="mt-4 space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Overall Attendance</span>
            <span className="text-sm font-medium">92%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-green-600 h-2.5 rounded-full"
              style={{ width: "92%" }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Class 10A</span>
            <span className="text-sm font-medium">88%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: "88%" }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Class 9B</span>
            <span className="text-sm font-medium">94%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: "94%" }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Class 8C</span>
            <span className="text-sm font-medium">90%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: "90%" }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Class 7A</span>
            <span className="text-sm font-medium">96%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: "96%" }}
            ></div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3 text-center">
        <div className="bg-green-50 p-3 rounded-lg">
          <p className="font-bold text-green-600 text-xl">92%</p>
          <p className="text-xs text-gray-500">Present</p>
        </div>
        <div className="bg-red-50 p-3 rounded-lg">
          <p className="font-bold text-red-600 text-xl">5%</p>
          <p className="text-xs text-gray-500">Absent</p>
        </div>
        <div className="bg-yellow-50 p-3 rounded-lg">
          <p className="font-bold text-yellow-600 text-xl">3%</p>
          <p className="text-xs text-gray-500">Late</p>
        </div>
      </div>
    </div>
  );
};

export default AttendanceChart;
