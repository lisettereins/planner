'use client';

import { useState } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import NewEventForm from '@/components/new-event-form';

export default function EventModalTrigger({ date }: { date: string }) {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
    
      {/* OPEN BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="w-7 h-7 rounded-full border border-[#45433F]  flex items-center justify-center transition-all duration-300 hover:scale-105 hover:bg-[#B7B6AF]"
      >
        <span className="font-['Gravitas_One'] text-[20px] text-[#45433F]">
          +
        </span>
      </button>

      {/* MODAL */}
     <Dialog
  open={isOpen}
  onClose={() => setOpen(false)}
  className="relative z-50"
>

  {/* BACKDROP */}
  <div
    className="fixed inset-0 bg-black/20 backdrop-blur-sm"
    aria-hidden="true"
  />

  {/* MODAL CONTAINER */}
  <div className="fixed inset-0 pointer-events-none">

    {/* POSITIONED PANEL */}
    <div
      className="
        absolute
        top-[0]
        left-[10px]
        pointer-events-auto
      "
    >
      <DialogPanel
        className="
          animate-in fade-in zoom-in-95 duration-200
        "
      >
        <NewEventForm
          date={date}
          onClose={() => setOpen(false)}
        />
      </DialogPanel>
    </div>

  </div>
</Dialog>
    </>
  );
}