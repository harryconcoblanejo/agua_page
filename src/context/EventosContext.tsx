"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

export interface Evento {
  id: number;
  date: string | null;
  place: string | null;
  description: string | null;
  link: string | null;
}

interface EventosContextType {
  eventos: Evento[];
  refreshEventos: () => Promise<void>;
}

const EventosContext = createContext<EventosContextType>({ eventos: [], refreshEventos: async () => {} });

export const useEventos = () => useContext(EventosContext);

export const EventosProvider = ({ children }: { children: React.ReactNode }) => {
  const [eventos, setEventos] = useState<Evento[]>([]);

  const refreshEventos = async () => {
    const res = await fetch("/api/eventos");
    const data = await res.json();
    setEventos(data);
  };

  useEffect(() => {
    refreshEventos();
  }, []);

  return (
    <EventosContext.Provider value={{ eventos, refreshEventos }}>
      {children}
    </EventosContext.Provider>
  );
};
