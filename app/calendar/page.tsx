'use client';

import { useState } from 'react';
import DashboardSidebar from '@/components/ui/DashboardSidebar';

import DayView from '@/components/ui/calendar/DayView';
import WeekView from '@/components/ui/calendar/WeekView';
import MonthView from '@/components/ui/calendar/MonthView';

type ViewMode = 'day' | 'week' | 'month';

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>('month');

  const handlePrev = () => {
    const d = new Date(selectedDate);
    if (viewMode === 'month') d.setMonth(d.getMonth() - 1);
    if (viewMode === 'week') d.setDate(d.getDate() - 7);
    if (viewMode === 'day') d.setDate(d.getDate() - 1);
    setSelectedDate(d);
  };

  const handleNext = () => {
    const d = new Date(selectedDate);
    if (viewMode === 'month') d.setMonth(d.getMonth() + 1);
    if (viewMode === 'week') d.setDate(d.getDate() + 7);
    if (viewMode === 'day') d.setDate(d.getDate() + 1);
    setSelectedDate(d);
  };

  const formatTitle = () => {
    if (viewMode === 'day') {
      return selectedDate.toLocaleDateString('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    }

    if (viewMode === 'week') {
      const start = new Date(selectedDate);
      const dayOfWeek = start.getDay();
      const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // esmaspäev
      start.setDate(start.getDate() + diff);

      const end = new Date(start);
      end.setDate(start.getDate() + 6);

      const formatDDMM = (d: Date) =>
        `${d.getDate().toString().padStart(2, '0')}.${(d.getMonth() + 1)
          .toString()
          .padStart(2, '0')}`;

      return `Week of ${formatDDMM(start)} - ${formatDDMM(end)}`;
    }

    return selectedDate.toLocaleDateString('en-GB', {
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen flex flex-col text-black">
      <div className="flex flex-1">
        <DashboardSidebar active="calendar" />

        <main className="flex-1 p-6">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-2">
              {(['day', 'week', 'month'] as ViewMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={` px-6 py-3
                  rounded-2xl
                  bg-white/60
                  backdrop-blur-md
                  border border-white/20
                  shadow-[0px_4px_20px_rgba(0,0,0,0.15)]
                  text-[#45433F]
                  font-['Gravitas_One']
                  text-sm
                  tracking-wide
                  transition-all duration-300
                  hover:bg-white/60
                  hover:scale-[1.02]
                  active:scale-[0.98] ${
                    viewMode === mode
                      ? 'bg-white/60 text-[#45433F]'
                      : 'bg-white/30 text-[#45433F]'
                  }`}
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={handlePrev}
                className="
                   px-6 py-3
                  rounded-2xl
                  bg-white/20
                  backdrop-blur-md
                  border border-white/20
                  shadow-[0px_4px_20px_rgba(0,0,0,0.15)]
                  text-white
                  font-['Gravitas_One']
                  text-sm
                  tracking-wide
                  transition-all duration-300
                  hover:bg-white/30
                  hover:scale-[1.02]
                  active:scale-[0.98]
                "
              >
                ←
              </button>

              <h2 className="text-3xl font-['Gravitas_One'] text-[#45433F] font-bold text-center min-w-[220px]">
                {formatTitle()}
              </h2>

              <button
                onClick={handleNext}
                className="
                   px-6 py-3
    rounded-2xl
    bg-white/20
    backdrop-blur-md
    border border-white/20
    shadow-[0px_4px_20px_rgba(0,0,0,0.15)]
    text-white
    font-['Gravitas_One']
    text-sm
    tracking-wide
    transition-all duration-300
    hover:bg-white/30
    hover:scale-[1.02]
    active:scale-[0.98]
                "
              >
                →
              </button>
            </div>
          </div>
          <div className="mt-10">
            {/* Active view */}
            {viewMode === 'day' && (
              <DayView
                selectedDate={selectedDate.toISOString().split('T')[0]}
              />
            )}
            {viewMode === 'week' && <WeekView selectedDate={selectedDate} />}
            {viewMode === 'month' && <MonthView selectedDate={selectedDate} />}
          </div>
        </main>
      </div>
    </div>
  );
}
