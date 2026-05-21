import EventModalTrigger from '@/components/new-event-modal-trigger';
import Task from '@/components/Task';
import DashboardSidebar from '@/components/ui/DashboardSidebar';
import { createClient } from '@/lib/supabase/server';
import { Clock } from 'lucide-react';
import { redirect } from 'next/navigation';

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = await params;
  const supabase = await createClient();

  const selectedDate = new Date(date);

  const day = selectedDate.getDay(); // 0 = Sunday, 1 = Monday ...
  const diffToMonday = day === 0 ? -6 : 1 - day;

  const startOfWeek = new Date(selectedDate);
  startOfWeek.setDate(selectedDate.getDate() + diffToMonday);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  const formatDate = (d: Date) => d.toISOString().split('T')[0];

  const weekStart = formatDate(startOfWeek);
  const weekEnd = formatDate(endOfWeek);

  const formatTime = (time: string) => {
    if (/^\d{2}:\d{2}:\d{2}$/.test(time)) return time.slice(0, 5);
    return time;
  };

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const [{ data: events }, { data: notes }, { data: tasks }] =
    await Promise.all([
      supabase
        .from('events')
        .select()
        .eq('user_id', user.id)
        .gte('date', weekStart)
        .lte('date', weekEnd)
        .order('date', { ascending: true })
        .order('time', { ascending: true }),

      supabase
        .from('notes')
        .select()
        .eq('user_id', user.id)
        .gte('date', weekStart)
        .lte('date', weekEnd),

      supabase
        .from('tasks')
        .select()
        .eq('user_id', user.id)
        .gte('date', weekStart)
        .lte('date', weekEnd),
    ]);

  return (
    <div className="min-h-screen bg-[#787770]">
      {/* Background */}
      <div
        className="absolute inset-0 opacity-50 bg-cover bg-center"
        style={{ backgroundImage: "url('/image.png')" }}
      />

      {/* PAGE CONTAINER */}
      <div className=" max-w-6xl mx-auto px-8 py-10">
        {/* HEADER */}
        <div className="relative mb-10">
          {/* TOP LEFT BUTTON */}
          <div className="relative w-full">
            <div className="fixed left-3 top-3">
              <DashboardSidebar />
            </div>

            {/* CENTERED TITLE */}
            <div className="flex justify-center">
              <h1 className=" text-[80px] font-['Gravitas_One'] text-[#45433F] leading-none">
                P L A N N E R
              </h1>
            </div>

            {/* SAME LINE: This week + date */}
            <div className="flex justify-between items-center mt-5 text-[#45433F] font-['Gravitas_One'] text-[30px]">
              <p>This week:</p>
              <p>{date}</p>
            </div>
          </div>
        </div>

        {/* CARDS ROW */}
        <div className="mt-16 flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-24 justify-items-center">
            {/* EVENTS */}
            <div className="w-[280px] min-h-[360px] rounded-[32px] bg-white/20 shadow-[0px_4px_27px_-1px_rgba(0,0,0,0.2)] backdrop-blur-[2px] p-7 overflow-visible">
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <h1 className="font-['Gravitas_One'] text-2xl text-[#45433F]">
                  Events
                </h1>

                <EventModalTrigger date={date} />
              </div>

              {/* Events Content */}
              <div className="-mr-4 pr-4 overflow-y-auto max-h-[400px] glass-scrollbar">
                <div className="flex flex-col gap-2">
                  {events?.length === 0 ? (
                    <div className="flex items-center justify-center py-10">
                      <p className="text-[#45433F] text-sm">
                        No events for this week
                      </p>
                    </div>
                  ) : (
                    events?.map((event) => (
                      <div
                        key={event.id}
                        className="flex justify-between  border-b border-black/10 py-1 last:border-b-0"
                      >
                        <div className="flex flex-col min-w-0 max-w-[120px]">
                          <h3 className="font-['Gravitas_One'] text-[12px] text-[#45433F] ">
                            <span>{event.title}</span>
                          </h3>
                          <h3 className="font-['Gravitas_One'] text-[12px] text-[#45433F] ">
                            <span>@{event.location}</span>
                          </h3>
                        </div>

                        <div className="flex flex-col">
                          <h3 className="font-['Gravitas_One'] text-[12px] text-[#45433F] ">
                            <Clock className="inline-block w-3 h-3 shrink-0" />
                            <span>{formatTime(event.time)}</span>
                          </h3>
                          <h3 className="font-['Gravitas_One'] text-[12px] text-[#45433F] ">
                            <span>{event.date}</span>
                          </h3>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* NOTES */}
            <div className="relative w-[280px] min-h-[360px] rounded-[32px] bg-white/20 shadow-[0px_4px_27px_-1px_rgba(0,0,0,0.2)] backdrop-blur-[2px] p-7 overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <h1 className="font-['Gravitas_One'] text-2xl text-[#45433F]">
                  Notes
                </h1>

                <button className="w-7 h-7 rounded-full border border-[#45433F] bg-[#A2A29B] flex items-center justify-center">
                  <span className="font-['Gravitas_One'] text-[20px] text-[#45433F]">
                    +
                  </span>
                </button>
              </div>

              {/* Notes Content */}
              <div className="-mr-4 pr-4 overflow-y-auto max-h-[400px] glass-scrollbar">
                <div className="flex flex-col gap-2">
                  {notes?.length === 0 ? (
                    <div className="flex items-center justify-center py-10">
                      <p className="text-[#45433F] text-sm">
                        No notes for this week
                      </p>
                    </div>
                  ) : (
                    notes?.map((note) => (
                      <div
                        key={note.id}
                        className="border-b border-black/10 py-1 last:border-b-0"
                      >
                        <h3 className="font-['Gravitas_One'] text-[12px] text-[#45433F] mb-2 truncate">
                          {note.title}
                        </h3>
                        <p className="font-['Gravitas_One'] text-[12px] text-[#45433F] mb-2 truncate">
                          {note.note}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
            {/* TASKS */}
            <div className="relative w-[280px] min-h-[360px] rounded-[32px] bg-white/20 shadow-[0px_4px_27px_-1px_rgba(0,0,0,0.2)] backdrop-blur-[2px] p-7 overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <h1 className="font-['Gravitas_One'] text-2xl text-[#45433F]">
                  Tasks
                </h1>

                <button className="w-7 h-7 rounded-full border border-[#45433F] bg-[#A2A29B] flex items-center justify-center">
                  <span className="font-['Gravitas_One'] text-[20px] text-[#45433F]">
                    +
                  </span>
                </button>
              </div>

              {/* Tasks Content */}
              <div className="-mr-4 pr-4 overflow-y-auto max-h-[400px] glass-scrollbar">
                <div className="flex flex-col gap-2">
                  {tasks?.length === 0 ? (
                    <div className="flex items-center justify-center py-10">
                      <p className="text-[#45433F] text-sm">
                        No tasks for this week
                      </p>
                    </div>
                  ) : (
                    <Task tasks={tasks} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
