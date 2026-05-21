'use client';

import TaskDatePicker from './ui/tasks/TaskDatePicker';
import { useRouter } from 'next/navigation';

export default function EventPage({ selectedDate }: { selectedDate: string }) {
  const router = useRouter();

  const handleDateChange = (newDate: string) => {
    router.push(`/events/${newDate}`);
  };
  return (
    <main>
      <div>
        <TaskDatePicker
          selectedDate={selectedDate}
          onChange={handleDateChange}
        />
      </div>
    </main>
  );
}
