"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Event {
  id: number;
  date: string | null;
  place: string | null;
  description: string | null;
  link: string | null;
}

function formatDateToSpanish(dateStr: string | null) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' });
}

const AdminEventosPage = () => {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEvent, setNewEvent] = useState({ date: "", place: "", description: "", link: "" });
  const [editStates, setEditStates] = useState<{ [id: number]: Omit<Event, "id"> }>({});
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // Cargar eventos desde la API
  const fetchEvents = async () => {
    setLoading(true);
    const res = await fetch("/api/eventos");
    const data = await res.json();
    setEvents(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    const initial: { [id: number]: Omit<Event, "id"> } = {};
    events.forEach((ev) => {
      initial[ev.id] = { date: ev.date, place: ev.place, description: ev.description, link: ev.link };
    });
    setEditStates(initial);
  }, [events.length]);

  const handleEditChange = (id: number, field: keyof Omit<Event, "id">, value: string) => {
    setEditStates((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const handleEditSave = async (id: number) => {
    const updated = editStates[id];
    await fetch(`/api/eventos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    setEditingId(null);
    fetchEvents();
  };

  const handleDelete = async (id: number) => {
    await fetch(`/api/eventos/${id}`, { method: "DELETE" });
    fetchEvents();
  };

  const handleAddEvent = async () => {
    await fetch("/api/eventos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEvent),
    });
    setNewEvent({ date: "", place: "", description: "", link: "" });
    setShowAddForm(false);
    fetchEvents();
  };

  const handleEditClick = (id: number) => {
    setEditingId(id);
  };

  const handleFinish = () => {
    router.push("/");
  };

  return (
    <main className="w-full max-w-2xl mx-auto py-8 px-2 sm:px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Administrar Eventos</h1>
      {loading ? (
        <div className="text-center py-8 text-[var(--text-secondary)]">Cargando eventos...</div>
      ) : events.length > 0 ? (
        <ul>
          {events.map((event) => (
            <li key={event.id} className="mb-4 p-2 border rounded bg-white shadow-sm flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex-1 min-w-0">
                {editingId === event.id ? (
                  <>
                    <input
                      type="date"
                      value={editStates[event.id]?.date?.slice(0, 10) || ""}
                      onChange={(e) => handleEditChange(event.id, "date", e.target.value)}
                      className="block w-full mb-1 p-1 border rounded text-sm"
                      placeholder="Fecha"
                    />
                    <input
                      type="text"
                      value={editStates[event.id]?.place || ""}
                      onChange={(e) => handleEditChange(event.id, "place", e.target.value)}
                      className="block w-full mb-1 p-1 border rounded text-sm"
                      placeholder="Lugar"
                    />
                    <textarea
                      value={editStates[event.id]?.description || ""}
                      onChange={(e) => handleEditChange(event.id, "description", e.target.value)}
                      className="block w-full mb-1 p-1 border rounded text-sm"
                      placeholder="Descripción"
                    />
                    <input
                      type="text"
                      value={editStates[event.id]?.link || ""}
                      onChange={(e) => handleEditChange(event.id, "link", e.target.value)}
                      className="block w-full mb-1 p-1 border rounded text-sm"
                      placeholder="Link"
                    />
                    <div className="flex flex-col sm:flex-row gap-2 mt-2">
                      <button
                        className="bg-blue-500 text-white px-2 py-1 rounded w-full sm:w-auto"
                        onClick={() => handleEditSave(event.id)}
                      >
                        Guardar
                      </button>
                      <button
                        className="bg-gray-500 text-white px-2 py-1 rounded w-full sm:w-auto"
                        onClick={() => setEditingId(null)}
                      >
                        Cancelar
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="font-semibold text-[var(--text-main)] mb-1 text-base">{formatDateToSpanish(event.date)}</div>
                    {event.place && <div className="text-[var(--text-secondary)] mb-1 text-sm break-words">{event.place}</div>}
                    {event.description && <div className="text-[var(--text-secondary)] mb-1 text-sm break-words">{event.description}</div>}
                    {event.link && (
                      <a href={event.link!} target="_blank" rel="noopener noreferrer" className="text-[var(--sage-dark)] hover:underline mb-1 block text-sm break-all">Ver más información</a>
                    )}
                  </>
                )}
              </div>
              <div className="flex flex-row gap-2 mt-2 sm:mt-0 sm:flex-col sm:gap-1 min-w-[100px] justify-end">
                {editingId !== event.id && (
                  <>
                    <button
                      className="bg-yellow-500 text-white px-2 py-1 rounded w-full sm:w-auto"
                      onClick={() => handleEditClick(event.id)}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded w-full sm:w-auto"
                      onClick={() => handleDelete(event.id)}
                    >
                      Eliminar
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center py-8 text-[var(--text-secondary)]">
          No hay eventos para editar
        </div>
      )}
      <button
        className="bg-green-500 text-white px-4 py-2 rounded mt-4 w-full sm:w-auto"
        onClick={() => setShowAddForm(true)}
      >
        Agregar Evento
      </button>
      {showAddForm && (
        <div className="mt-4 p-4 bg-gray-100 rounded shadow-md">
          <h3 className="text-lg font-bold mb-2 text-center">Agregar Nuevo Evento</h3>
          <input
            type="date"
            placeholder="Fecha"
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            className="block w-full mb-2 p-2 border rounded text-sm"
          />
          <input
            type="text"
            placeholder="Lugar"
            value={newEvent.place}
            onChange={(e) => setNewEvent({ ...newEvent, place: e.target.value })}
            className="block w-full mb-2 p-2 border rounded text-sm"
          />
          <textarea
            placeholder="Descripción"
            value={newEvent.description}
            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
            className="block w-full mb-2 p-2 border rounded text-sm"
          />
          <input
            type="text"
            placeholder="Link"
            value={newEvent.link}
            onChange={(e) => setNewEvent({ ...newEvent, link: e.target.value })}
            className="block w-full mb-2 p-2 border rounded text-sm"
          />
          <div className="flex flex-col sm:flex-row gap-2 mt-2">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-auto"
              onClick={handleAddEvent}
            >
              Guardar
            </button>
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded w-full sm:w-auto"
              onClick={() => setShowAddForm(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
      <button
        className="bg-gray-800 text-white px-4 py-2 rounded mt-8 w-full sm:w-auto"
        onClick={handleFinish}
      >
        Finalizar
      </button>
    </main>
  );
};

export default AdminEventosPage;
