"use client";

import Link from "next/link";
import { Calendar, ListChecks, Image as ImageIcon, Settings, CheckSquare, FileText, BookOpen, Target, Activity, Minus } from "lucide-react";
import { useState } from "react";

interface DashboardSidebarProps {
  active?: string; 
}

export default function DashboardSidebar({ active }: DashboardSidebarProps) {
  const today = new Date().toISOString().split("T")[0];
  const [showForm, setShowForm] = useState(false);

  const getLinkClasses = (name: string) =>
    `hover:text-gray-600 flex items-center gap-2 ${active === name ? "font-bold text-black" : ""}`;

if (!showForm)
    return (
      <button
        onClick={() => setShowForm(true)}
        className="w-8 h-8 rounded-full bg-[#BDBCB5] border border-[#595753] flex items-center justify-center"
      >
        <span className="text-[#595753] font-['Gravitas_One']">
        &gt;
      </span>
      </button>
    );
  return (
    <aside className="min-h-screen rounded-[32px] bg-white/20 shadow-[0px_4px_27px_-1px_rgba(0,0,0,0.2)] backdrop-blur-[2px] p-7 overflow-hidden w-64 p-6">
      <div className="flex justfy-right">
      <button
        onClick={() => setShowForm(false)}
        className="w-8 h-8 rounded-full bg-[#BDBCB5] border border-[#595753] flex items-center justify-center"
      >
        <span className="text-[#595753] font-['Gravitas_One']">
        <Minus/>
      </span>
      </button>
      </div>
      <nav className="flex flex-col items-center space-y-10 mt-8">
       

        {/* My Items */}
        <div>
          
          <ul className="text-[#45433F] font-['Gravitas_One'] space-y-5 text-xl flex flex-col items-center">
            <li>
              <Link href="/daily-tasks" className={getLinkClasses("daily-tasks")}>
                <CheckSquare className="w-4 h-4" strokeWidth={2} /> Daily Tasks
              </Link>
            </li>
            <li>
              <Link href={`/notes/${today}`} className={getLinkClasses("notes")}>
                <FileText className="w-4 h-4" strokeWidth={2} /> Notes
              </Link>
            </li>
            <li>
              <Link href={`/events/${today}`} className={getLinkClasses("events")}>
                <Calendar className="w-4 h-4" strokeWidth={2} /> Events
              </Link>
            </li>
            <li>
              <Link href="/planner" className={getLinkClasses("planner")}>
                <BookOpen className="w-4 h-4" strokeWidth={2} /> My Planner
              </Link>
            </li>
            <li>
              <Link href="/goals" className={getLinkClasses("goals")}>
                <Target className="w-4 h-4" strokeWidth={2} /> Goals
              </Link>
            </li>
            <li>
              <Link href="/habits" className={getLinkClasses("habits")}>
                <Activity className="w-4 h-4" strokeWidth={2} /> Habits
              </Link>
            </li>
            <li>
              <Link href="/lists" className={getLinkClasses("lists")}>
                <ListChecks className="w-4 h-4" strokeWidth={2} /> Lists
              </Link>
            </li>
            <li>
              <Link href="/gallery" className={getLinkClasses("gallery")}>
                <ImageIcon className="w-4 h-4" strokeWidth={2} /> Photos
              </Link>
            </li>
          </ul>
        </div>

        {/* Settings */}
        <div>
          <h3 className="text-[#595753] font-['Gravitas_One'] mt-6 mb-2 flex flex-col items-center">Settings</h3>
          <ul className="text-[#45433F] font-['Gravitas_One'] space-y-5 text-xl flex flex-col items-center">
            <li>
              <Link href="/profile" className={getLinkClasses("profile")}>
                <Settings className="w-4 h-4" strokeWidth={2} /> My Account
              </Link>
            </li>
          </ul>
        </div>

      </nav>
    </aside>
  );
}
