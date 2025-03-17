"use client";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Jan",
    income: 4000,
    expense: 2400,
  },
  {
    name: "Feb ",
    income: 3000,
    expense: 1398,
  },
  {
    name: "Mar",
    income: 2000,
    expense: 9800,
  },
  {
    name: "April",
    income: 2780,
    expense: 3908,
  },
  {
    name: "May",
    income: 1890,
    expense: 4800,
  },
  {
    name: "June",
    income: 2390,
    expense: 3800,
  },
  {
    name: "July",
    income: 3490,
    expense: 4300,
  },
  {
    name: "August",
    income: 3490,
    expense: 4300,
  },
  {
    name: "sept",
    income: 3490,
    expense: 4300,
  },
  {
    name: "Octo",
    income: 3490,
    expense: 4300,
  },
  {
    name: "Nov",
    income: 3490,
    expense: 4300,
  },
  {
    name: "Dec",
    income: 3490,
    expense: 4300,
  },
];

const FinanceChart: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-full">
      <h3 className="text-xl font-semibold mb-4">Financial Overview</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-gray-500 text-sm">Total Revenue</p>
          <p className="text-3xl font-bold text-blue-700">$256,780</p>
          <p className="text-green-600 text-sm mt-2">+12% from last year</p>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-gray-500 text-sm">Fee Collection</p>
          <p className="text-3xl font-bold text-green-700">$198,520</p>
          <p className="text-gray-600 text-sm mt-2">92% collected</p>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="text-gray-500 text-sm">Expenses</p>
          <p className="text-3xl font-bold text-purple-700">$187,245</p>
          <p className="text-red-600 text-sm mt-2">+5% from last year</p>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-lg font-medium mb-3">Quarterly Revenue</h4>
        <div className="h-[120px] flex items-end space-x-2">
          <div className="bg-blue-600 w-1/4 h-[40%] rounded-t-md relative">
            <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-sm">
              Q1
            </span>
            <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-sm font-medium">
              $58K
            </span>
          </div>
          <div className="bg-blue-600 w-1/4 h-[75%] rounded-t-md relative">
            <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-sm">
              Q2
            </span>
            <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-sm font-medium">
              $89K
            </span>
          </div>
          <div className="bg-blue-600 w-1/4 h-[50%] rounded-t-md relative">
            <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-sm">
              Q3
            </span>
            <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-sm font-medium">
              $62K
            </span>
          </div>
          <div className="bg-blue-600 w-1/4 h-[90%] rounded-t-md relative">
            <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-sm">
              Q4
            </span>
            <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-sm font-medium">
              $104K
            </span>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-lg font-medium mb-3">Expense Breakdown</h4>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Salaries</span>
              <span>60%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: "60%" }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Infrastructure</span>
              <span>15%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full"
                style={{ width: "15%" }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Utilities</span>
              <span>10%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-yellow-600 h-2 rounded-full"
                style={{ width: "10%" }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Educational Resources</span>
              <span>12%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-600 h-2 rounded-full"
                style={{ width: "12%" }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Other Expenses</span>
              <span>3%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gray-600 h-2 rounded-full"
                style={{ width: "3%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceChart;
