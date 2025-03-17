"use client";

import React from "react";

const EventCalender: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Upcoming Events</h3>

      <div className="space-y-4">
        <div className="flex items-start gap-3 border-b pb-3">
          <div className="bg-red-100 text-red-600 rounded p-2 text-sm font-medium min-w-[45px] text-center">
            Apr
            <br />
            15
          </div>
          <div>
            <h4 className="font-medium">Science Fair</h4>
            <p className="text-gray-600 text-sm">9:00 AM - 3:00 PM</p>
            <p className="text-gray-500 text-xs mt-1">Main Hall</p>
          </div>
        </div>

        <div className="flex items-start gap-3 border-b pb-3">
          <div className="bg-blue-100 text-blue-600 rounded p-2 text-sm font-medium min-w-[45px] text-center">
            Apr
            <br />
            22
          </div>
          <div>
            <h4 className="font-medium">Final Exams Begin</h4>
            <p className="text-gray-600 text-sm">8:30 AM - 12:30 PM</p>
            <p className="text-gray-500 text-xs mt-1">All Classrooms</p>
          </div>
        </div>

        <div className="flex items-start gap-3 border-b pb-3">
          <div className="bg-green-100 text-green-600 rounded p-2 text-sm font-medium min-w-[45px] text-center">
            Apr
            <br />
            25
          </div>
          <div>
            <h4 className="font-medium">Sports Day</h4>
            <p className="text-gray-600 text-sm">10:00 AM - 2:00 PM</p>
            <p className="text-gray-500 text-xs mt-1">School Grounds</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="bg-purple-100 text-purple-600 rounded p-2 text-sm font-medium min-w-[45px] text-center">
            Apr
            <br />
            30
          </div>
          <div>
            <h4 className="font-medium">School Assembly</h4>
            <p className="text-gray-600 text-sm">10:00 AM - 11:00 AM</p>
            <p className="text-gray-500 text-xs mt-1">Auditorium</p>
          </div>
        </div>
      </div>

      <div className="mt-4 text-center">
        <button className="text-blue-600 text-sm font-medium hover:underline">
          View All Events
        </button>
      </div>
    </div>
  );
};

export default EventCalender;
