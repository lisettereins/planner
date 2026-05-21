'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase/supabaseClient';
import CalendarEntry from './CalendarEntry';

interface CalendarEntryType {
  id: string;
  title: string;
  content?: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:MM
  endTime: string; // HH:MM
}

interface WeekViewProps {
  selectedDate: Date;
}

export default function WeekView({ selectedDate }: WeekViewProps) {
  const startOfWeek = new Date(selectedDate);
  const dayOfWeek = startOfWeek.getDay();
  const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  startOfWeek.setDate(startOfWeek.getDate() + diff);

  const days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    return d.toISOString().split('T')[0]; // YYYY-MM-DD
  });

  const [entries, setEntries] = useState<CalendarEntryType[]>([]);

  const hours = Array.from({ length: 24 }, (_, i) => i);

  const parseTime = (time: string) => {
    const [hStr, mStr] = time.split(':');
    return { h: parseInt(hStr), m: parseInt(mStr) };
  };

  const getTop = (time: string) => {
    const { h, m } = parseTime(time);
    return (h + m / 60) * 40;
  };

  const handleDelete = async (id: string) => {
    await supabase.from('calendar_entries').delete().eq('id', id);
    setEntries(entries.filter((e) => e.id !== id));
  };

  return (
    <div className="overflow-x-auto">
      <h2
        className="text-[#45433F]
    font-['Gravitas_One'] text-xl font-bold mb-2 "
      >
        {new Date(days[0]).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
        })}{' '}
        -{' '}
        {new Date(days[6]).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
        })}
      </h2>
      <div className="bg-white/10">
        <div className="flex border-t border-white/20 min-w-[900px] relative ">
          <div className="w-12 flex flex-col">
            {hours.map((h) => (
              <div
                key={h}
                className="h-10 flex items-center justify-end pr-1 text-[12px] font-semibold text-[#45433F] font-['Gravitas_One'] border-b border-white/20"
              >
                {h.toString().padStart(2, '0')}:00
              </div>
            ))}
          </div>

          {days.map((day) => (
            <div key={day} className="flex-1 border-l border-white/10 relative">
              <div className="h-10 flex items-center justify-center border-b border-white/20 font-bold bg-white/20 text-sm text-[#45433F] font-['Gravitas_One'] sticky top-0 z-10">
                {new Date(day).toLocaleDateString('en-GB', {
                  weekday: 'short',
                  day: 'numeric',
                  month: 'short',
                })}
              </div>

              <div className="relative h-[960px]">
                {hours.map((h) => (
                  <div key={h} className="h-10 border-b border-white/20"></div>
                ))}

                {entries
                  .filter((e) => e.date === day)
                  .map((e) => {
                    const top = getTop(e.startTime);
                    const height = Math.max(getTop(e.endTime) - top, 28);
                    return (
                      <div
                        key={e.id}
                        className="absolute left-0 right-0"
                        style={{ top, height }}
                      >
                        <CalendarEntry
                          {...e}
                          onDelete={() => handleDelete(e.id)}
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
