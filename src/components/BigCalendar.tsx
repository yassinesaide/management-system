"use client";

import {
  Calendar,
  Day,
  View,
  Views,
  momentLocalizer,
} from "react-big-calendar";
import moment from "moment";
import { calendarEvents } from "@/lib/data";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";
const localizer = momentLocalizer(moment);

// Fallback calendar events if the imported ones are missing
const fallbackEvents = [
  {
    id: 1,
    title: "Math Class",
    start: new Date(2025, 3, 15, 9, 0, 0),
    end: new Date(2025, 3, 15, 10, 30, 0),
  },
  {
    id: 2,
    title: "Physics Lab",
    start: new Date(2025, 3, 15, 11, 0, 0),
    end: new Date(2025, 3, 15, 12, 30, 0),
  },
];

const BigCalendar = () => {
  const [view, setView] = useState<View>(Views.WORK_WEEK);

  // Use the imported events or fallback to sample data if they're missing
  const events =
    Array.isArray(calendarEvents) && calendarEvents.length > 0
      ? calendarEvents
      : fallbackEvents;

  console.log("Calendar events:", events);

  const handleOnChangeView = (selectedView: View) => {
    setView(selectedView);
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={["work_week", "day"]}
        view={view}
        style={{ height: 500 }} // Fixed height in pixels
        onView={handleOnChangeView}
        min={new Date(2025, 1, 0, 8, 0, 0)}
        max={new Date(2025, 1, 0, 17, 0, 0)}
      />
    </div>
  );
};

export default BigCalendar;
