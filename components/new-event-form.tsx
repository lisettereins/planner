'use client';

import { useRouter } from 'next/navigation';
import { createEvent } from '@/app/events/action';
import { useState } from 'react';

export default function NewEventForm({ date: initialDate }: { date: string }) {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [time, setTime] = useState('')

  const date = initialDate;

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createEvent(title, location, date, time);
    setTitle('');
    setLocation('');
    setTime('');
    setShowForm(false);
    router.refresh();
  };
  if (!showForm)
    return (
      <button
        onClick={() => setShowForm(true)}
        className="w-7 h-7 rounded-full border border-[#45433F] bg-[#A2A29B] flex items-center justify-center"
      >
        <span className="font-['Gravitas_One'] text-[20px] text-[#45433F]">
            +
          </span>
      </button>
    );
  return (
    <div className="flex items-center justify-center bg-black/30 backdrop-blur-sm">
    <form
      onSubmit={handleSubmit}
      className="rounded-[32px] bg-[#787770] shadow-[0px_4px_27px_-1px_rgba(0,0,0,0.2)] backdrop-blur-[2px] p-7 "
    >
      <div className="flex flex-col items-center space-y-10 mt-8">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Event"
        className="w-full
    px-6 py-3
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
    hover:bg-white/30
    hover:scale-[1.02]
    active:scale-[0.98]
  "
        
      />
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location"
        className="w-full
    px-6 py-3
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
    hover:bg-white/30
    hover:scale-[1.02]
    active:scale-[0.98]"
      />
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        placeholder="Time"
        className="w-full
    px-6 py-3
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
    hover:bg-white/30
    hover:scale-[1.02]
    active:scale-[0.98]"
      />
      <div className="flex gap-28">
        <button
          type="submit"
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
          Add Event
        </button>
        <button
          type="button"
          onClick={() => setShowForm(false)}
          className="
    px-6 py-3
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
    hover:bg-white/30
    hover:scale-[1.02]
    active:scale-[0.98]
  "
        >
          Cancel
        </button>
      </div>
      </div>
    </form>
    </div>
  );
}
