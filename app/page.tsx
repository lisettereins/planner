'use client';

import Link from 'next/link';
// import { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  ListChecks,
  FileText,
  Image as ImageIcon,
} from 'lucide-react';

export default function Page() {
  // const [isScrolled, setIsScrolled] = useState(false);

  // const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
  //   const scrollY = e.currentTarget.scrollLeft;
  //   setIsScrolled(scrollY > 0);
  // };

  return (
    <div className="min-h-screen font-['Gravitas_One'] text-[#45433F] text-black overflow-x-hidden">
      {/* Hero Section */}
      <div className="min-h-screen flex flex-col justify-center items-center px-4 py-16 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-96 h-96 border border-black rounded-full"></div>
          <div className="absolute bottom-20 right-1/4 w-96 h-96 border border-black rounded-full"></div>
        </div>

        <div className="relative z-10 max-w-4xl text-center">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <div className="border-2 border-[#45433F] rounded-sm p-6 inline-block">
              <BookOpen
                className="w-12 h-12 text-[#45433F]"
                strokeWidth={1.5}
              />
            </div>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl text-[#45433F] font-bold mb-6 tracking-tight leading-tight">
            Organize Your Life
          </h1>
          <p className="text-xl sm:text-2xl text-[#45433F] mb-8 max-w-2xl mx-auto leading-relaxed font-light">
            Your digital planner. Keep all your thoughts, plans, and
            dreams in one elegant place.
          </p>

          {/* Features preview */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12 text-sm text-[#45433F]">
            <div className="flex flex-col items-center gap-2">
              <ListChecks
                className="w-5 h-5 text-[#45433F]"
                strokeWidth={1.5}
              />
              <span>Lists</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Calendar className="w-5 h-5 text-[#45433F]" strokeWidth={1.5} />
              <span>Calendar</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <FileText className="w-5 h-5 text-[#45433F]" strokeWidth={1.5} />
              <span>Notes</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <ImageIcon className="w-5 h-5 text-[#45433F]" strokeWidth={1.5} />
              <span>Photos</span>
            </div>
          </div>

          {/* Button */}
          <Link
            href="/login"
            className="inline-flex items-center gap-3 font-['Gravitas_One'] text-[#45433F] px-8 py-4 rounded-2xl font-semibold text-lg bg-white/20  
                  hover:bg-white/30
                  hover:scale-[1.02]
                  active:scale-[0.98]
                  border border-white/20"
          >
            Get Started
            <ArrowRight
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              strokeWidth={2}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
