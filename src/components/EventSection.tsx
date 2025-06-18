"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Event {
  id: number;
  title: string;
  date: string;
  description: string;
}

interface EventSectionProps {
  events: Event[];
  onAddEvent: (event: Omit<Event, 'id'>) => void;
  onEditEvent: (id: number, updatedEvent: Omit<Event, 'id'>) => void;
  onDeleteEvent: (id: number) => void;
}

const EventSection: React.FC<EventSectionProps> = ({ events, onAddEvent, onEditEvent, onDeleteEvent }) => {
  const [clickCount, setClickCount] = useState(0);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSectionClick = () => {
    setClickCount((prev) => prev + 1);
    if (clickCount + 1 === 10) {
      router.push('/admin/eventos');
    }
  };

  if (!mounted) return null;

  return (
    <section className="bg-white/5 p-4 rounded-lg border border-[var(--sage-dark)]/10">
      <div onClick={handleSectionClick} className="cursor-pointer">
        <h2 className="text-xl font-bold mb-4">Próximos Eventos</h2>
        <div>
          {events.length > 0 ? (
            <ul>
              {events.map((event) => (
                <li key={event.id} className="mb-4">
                  <h3 className="text-lg font-semibold">{event.title}</h3>
                  <p className="text-sm text-gray-500">{event.date}</p>
                  <p>{event.description}</p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-8 text-[var(--text-secondary)]">
              No hay próximos eventos
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default EventSection;
