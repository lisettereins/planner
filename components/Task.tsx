'use client';

import { deleteTask, taskDone } from '@/app/daily-tasks/action';
import { CheckCircle2, Circle, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

type Task = {
  id: string;
  title: string;
  task: string;
  date: string;
  done: boolean;
};

interface TaskItemProps {
  tasks: Task[] | null;
}

export default function Task({ tasks }: TaskItemProps) {
  const router = useRouter();

  const handleToggle = async (e: React.FormEvent, task: Task) => {
    e.preventDefault();
    const setDone = !task.done;
    await taskDone(task.id, setDone);
    router.refresh();
  };

    const handleDelete = async (task:Task) => {
      await deleteTask(task.id);
      router.refresh();
    };

  return (
    <div className="flex flex-col gap-3">
  {tasks?.map((task) => (
    <div
      key={task.id}
      className={`border-b border-black/10 py-1 last:border-b-0 transition-all ${
        task?.done ? 'opacity-60' : ''
      }`}
    >
      <div className="flex items-start gap-4">
        
        {/* Toggle */}
        <button
          onClick={(e) => handleToggle(e, task)}
          className="mt-1 text-[#595753] hover:scale-105 transition-transform"
        >
          {task?.done ? (
            <CheckCircle2 className="w-5 h-5" strokeWidth={2} />
          ) : (
            <Circle className="w-5 h-5" strokeWidth={2} />
          )}
        </button>

        {/* Content */}
        <div className="flex-1">
          <h3
            className={`font-['Gravitas_One'] text-[13px] text-[#595753] mb-2 ${
              task?.done ? 'line-through opacity-70' : ''
            }`}
          >
            {task?.title}
          </h3>

         
        </div>

        {/* Delete */}
        <button
          onClick={() => handleDelete(task)}
          className="text-[#595753] hover:text-red-500 transition-colors"
        >
          <Trash2 className="w-4 h-4" strokeWidth={2} />
        </button>
      </div>
    </div>
  ))}
</div>
  );
}
