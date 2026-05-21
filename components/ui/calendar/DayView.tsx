"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";
import CalendarEntry from "./CalendarEntry";

export interface CalendarEntryType {
  id: string;
  title: string;
  content?: string;
  date: string;
  startTime: string; // HH:MM 24h
  endTime: string;   // HH:MM 24h
}

interface DayViewProps {
  selectedDate: string; // YYYY-MM-DD
}

export default function DayView({ selectedDate }: DayViewProps) {
  const [entries, setEntries] = useState<CalendarEntryType[]>([]);

  // ---- Load entries from Supabase ----
  useEffect(() => {
    const fetchEntries = async () => {
      const { data } = await supabase
        .from("calendar_entries")
        .select("*")
        .eq("date", selectedDate)
        .order("start_time", { ascending: true });

      if (data) {
        setEntries(
          data.map((d) => ({
            id: String(d.id),
            title: d.title,
            content: d.content ?? "",
            date: d.date,
            startTime: (d.start_time ?? "00:00").slice(0, 5),
            endTime: (d.end_time ?? "00:00").slice(0, 5),
          }))
        );
      }
    };

    fetchEntries();
  }, [selectedDate]);

  const handleDelete = async (id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
    await supabase.from("calendar_entries").delete().eq("id", id);
  };

  const hours = Array.from({ length: 24 }, (_, i) => i);

  const getTopPosition = (time: string) => {
    const [h, m] = time.split(":").map(Number);
    return (h + m / 60) * 50; // 50px per hour
  };

  return (
    <div className="relative max-w-4xl max-h-[calc(100vh-10rem)] mx-auto overflow-y-auto glass-scrollbar p-4 rounded-[32px] bg-white/20 shadow-[0px_4px_27px_-1px_rgba(0,0,0,0.2)]">
      <h2 className="text-3xl font-['Gravitas_One'] text-[#45433F] font-bold text-center min-w-[220px]">
        {new Date(selectedDate).toLocaleDateString("en-GB", {
          weekday: "long",
          month: "long",
          day: "numeric",
        })}
      </h2>

      <div className="relative" style={{ height: hours.length * 50 }}>
        {/* TIME ROWS */}
        {hours.map((h) => (
          <div
            key={h}
            className="absolute left-0 right-0 flex items-center"
            style={{ top: h * 50 }}
          >
            <span className="w-12 text-xs font-semibold">{String(h).padStart(2, "0")}:00</span>
            <div className="flex-1 ml-2 border-t border-gray-300"></div>
          </div>
        ))}

        {/* CALENDAR ENTRIES */}
        {entries.map((entry) => {
          const top = getTopPosition(entry.startTime) + 2;
          const bottom = getTopPosition(entry.endTime);
          const height = bottom - top;

          return (
            <div key={entry.id} style={{ top, height }} className="absolute left-12 right-2">
              <CalendarEntry
                id={entry.id}
                title={entry.title}
                content={entry.content}
                startTime={entry.startTime}
                endTime={entry.endTime}
                onDelete={handleDelete}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
