'use client';

import { useRouter } from 'next/navigation';
import { createEvent } from '@/app/events/action';
import { useState } from 'react';

export default function NewEventForm({
  date: initialDate,
  onClose,
}: {
  date: string;
  onClose: () => void;
}) {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [time, setTime] = useState('');
  const [newdate, setNewDate] = useState(initialDate);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createEvent(title, location, newdate, time);
    setTitle('');
    setLocation('');
    setTime('');
    onClose();
    setNewDate(initialDate);
    router.refresh();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
      w-[300px]
      min-h-[400px]
      rounded-[32px]
      bg-[#787770]
      shadow-[0px_4px_27px_-1px_rgba(0,0,0,0.2)]
      p-7
      
    "
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
        <input
          type="date"
          value={newdate}
          onChange={(e) => setNewDate(e.target.value)}
          placeholder="Date"
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
        <div className="flex gap-8">
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
            onClick={onClose}
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
  );
}
