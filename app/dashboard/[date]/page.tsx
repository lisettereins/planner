import NewEventForm from '@/components/new-event-form';
import Task from '@/components/Task';
import DashboardSidebar from '@/components/ui/DashboardSidebar';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = await params;
  const supabase = await createClient();

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
      supabase.from('events').select().eq('date', date).eq('user_id', user.id),
      supabase.from('notes').select().eq('date', date).eq('user_id', user.id),
      supabase.from('tasks').select().eq('date', date).eq('user_id', user.id),
    ]);

  return (
    <div className="min-h-screen bg-[#787770]">

      {/* Background */}
      <div
        className="absolute inset-0 opacity-50 bg-cover bg-center"
        style={{ backgroundImage: "url('/image.png')" }}
      />

      {/* PAGE CONTAINER */}
      <div className="relative z-10 max-w-6xl mx-auto px-8 py-10">

       {/* HEADER */}
<div className="relative mb-10">

  {/* TOP LEFT BUTTON */}
  <div className="relative w-full">
  <div className="fixed left-3 top-3">
    
    <DashboardSidebar/>
  </div>

  {/* CENTERED TITLE */}
  <div className="flex justify-center">
    <h1 className="text-[100px] font-['Gravitas_One'] text-[#45433F] leading-none">
      Planner
    </h1>
  </div>

  {/* SAME LINE: This week + date */}
  <div className="flex justify-between items-center mt-6 text-[#45433F] font-['Gravitas_One'] text-xl">
    <p>This week:</p>
    <p>{date}</p>
  </div>
</div>
</div>

       {/* CARDS ROW */}
<div className="mt-16 flex justify-center">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-24 justify-items-center">
    
    {/* EVENTS */}
    <div className="relative w-[280px] min-h-[360px] rounded-[32px] bg-white/20 shadow-[0px_4px_27px_-1px_rgba(0,0,0,0.2)] backdrop-blur-[2px] p-7 overflow-visible">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h1 className="font-['Gravitas_One'] text-2xl text-[#45433F]">
          Events
        </h1>

        
          <NewEventForm date={date}/>
        
      </div>

      {/* Events Content */}
      <div className="flex flex-col">
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
              className="border-b border-black/10 py-1 last:border-b-0"
            >
              <h3 className="font-['Gravitas_One'] text-[12px] text-[#45433F] mb-2 truncate">
                {event.title}
              </h3>

              <p className="font-['Gravitas_One'] text-[12px] text-[#45433F] mb-2 truncate">
                {formatTime(event.time)}
              </p>
            </div>
          ))
        )}
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
      <div className="flex flex-col">
        {notes?.length === 0 ? (
          <div className="flex items-center justify-center py-10">
            <p className="text-[#45433F] text-sm">
              No notes for this date
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

             
            </div>
          ))
        )}
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
      <div className="flex flex-col">
        {tasks?.length === 0 ? (
          <div className="flex items-center justify-center py-10">
            <p className="text-[#45433F] text-sm">
              No tasks for this date
            </p>
          </div>
        ) : (
         <Task tasks={tasks}/>
        )}
      </div>
    </div>

  </div>
</div>
      </div>
    </div>
  );
}