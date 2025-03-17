"use client";

import React from "react";

const Announcements: React.FC = () => {
  try {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Announcements</h3>
        <div className="space-y-4">
          <div className="border-b pb-3">
            <h4 className="font-medium text-lg">Parent-Teacher Meeting</h4>
            <p className="text-gray-600 text-sm">
              The parent-teacher meeting is scheduled for next Friday. Please
              make sure to attend.
            </p>
            <p className="text-gray-500 text-xs mt-1">Posted 2 days ago</p>
          </div>
          <div className="border-b pb-3">
            <h4 className="font-medium text-lg">Final Exam Schedule</h4>
            <p className="text-gray-600 text-sm">
              The final exam schedule has been published. Please check the
              academic calendar.
            </p>
            <p className="text-gray-500 text-xs mt-1">Posted 1 week ago</p>
          </div>
          <div>
            <h4 className="font-medium text-lg">
              School Closed - Teacher Training
            </h4>
            <p className="text-gray-600 text-sm">
              The school will be closed on Monday for teacher training.
            </p>
            <p className="text-gray-500 text-xs mt-1">Posted 2 weeks ago</p>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error rendering Announcements component:", error);
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Announcements</h3>
        <p className="text-red-500">Unable to load announcements</p>
      </div>
    );
  }
};

export default Announcements;
