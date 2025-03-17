import React from "react";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { redirect } from "next/navigation";
import Announcements from "@/components/Announcements";
import AttendanceChart from "@/components/AttendanceChart";
import CountChart from "@/components/CountChart";
import EventCalendar from "@/components/EventCalender";
import FinanceChart from "@/components/FinanceChart";
import UserCard from "@/components/UserCard";

export default function AdminDashboard() {
  // Verify user is admin
  const cookieStore = cookies();
  const token = cookieStore.get("auth_token")?.value;
  const user = token ? verifyToken(token) : null;

  // If not admin, redirect to dashboard
  if (!user || user.role !== "admin") {
    redirect("/dashboard");
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Admin Dashboard
        </h2>
        <p className="text-gray-600">Manage your school system</p>
      </div>

      {/* User Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <UserCard type="student" />
        <UserCard type="teacher" />
        <UserCard type="parent" />
        <UserCard type="staff" />
      </div>

      {/* Charts and Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-1">
          <CountChart />
        </div>
        <div className="lg:col-span-2">
          <AttendanceChart />
        </div>
      </div>

      <div className="mb-8">
        <FinanceChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Announcements />
        <EventCalendar />
      </div>
    </div>
  );
}
