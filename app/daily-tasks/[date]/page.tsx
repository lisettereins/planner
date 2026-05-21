import NewDatePicker from '@/components/new-datepicker';
import NewHeader from '@/components/new-header';
import Task from '@/components/Task';
import DashboardSidebar from '@/components/ui/DashboardSidebar';
import AddTaskForm from '@/components/ui/tasks/AddTaskForm';
import TaskItem from '@/components/ui/tasks/TaskItem';
import { createClient } from '@/lib/supabase/server';
import { CheckSquare } from 'lucide-react';
import { redirect } from 'next/navigation';

export default async function DailyTasksPage({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login');
  }

  const { data: tasks } = await supabase
    .from('tasks')
    .select()
    .eq('date', date)
    .eq('user_id', user.id);

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />

      <main className="flex-1 flex justify-center">
        <div className="relative max-w-3xl w-full overflow-y-auto glass-scrollbar p-4 rounded-[32px] bg-white/20 shadow-[0px_4px_27px_-1px_rgba(0,0,0,0.2)]">
          <h2 className="text-3xl font-['Gravitas_One'] text-[#45433F] font-bold text-center">
            T A S K S
          </h2>

          <div className="flex flex-col gap-2">
            {tasks?.length === 0 ? (
              <div className="flex items-center justify-center">
                <p className="text-[#45433F] text-sm">No tasks for this week</p>
              </div>
            ) : (
              <Task tasks={tasks} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
