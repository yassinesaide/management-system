"use client";
import React from "react";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Total",
    count: 106,
    fill: "white",
  },
  {
    name: "Girls",
    count: 53,
    fill: "yellow",
  },
  {
    name: "Boys",
    count: 53,
    fill: "blue",
  },
];

const CountChart: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-full">
      <h3 className="text-xl font-semibold mb-4">Enrollment Statistics</h3>

      <div className="space-y-6">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-blue-100 mb-3">
            <span className="text-3xl font-bold text-blue-600">520</span>
          </div>
          <p className="text-gray-600 font-medium">Total Students</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-3 rounded-lg text-center">
            <div className="text-xl font-bold text-indigo-600">52%</div>
            <div className="text-xs text-gray-500">Male Students</div>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg text-center">
            <div className="text-xl font-bold text-pink-600">48%</div>
            <div className="text-xs text-gray-500">Female Students</div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-600 mb-2">
            Grade Distribution
          </h4>
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Grade 9</span>
                <span>120 Students</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className="bg-green-500 h-1.5 rounded-full"
                  style={{ width: "23%" }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Grade 10</span>
                <span>140 Students</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className="bg-blue-500 h-1.5 rounded-full"
                  style={{ width: "27%" }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Grade 11</span>
                <span>130 Students</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className="bg-purple-500 h-1.5 rounded-full"
                  style={{ width: "25%" }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Grade 12</span>
                <span>130 Students</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className="bg-yellow-500 h-1.5 rounded-full"
                  style={{ width: "25%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountChart;
