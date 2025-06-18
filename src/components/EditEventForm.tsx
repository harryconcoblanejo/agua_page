'use client';

import { useState } from 'react';

interface EditEventFormProps {
  initialDescription: string;
  initialLink?: string;
  onSave: (title: string, description: string, link: string) => void;
  onCancel: () => void;
  onDelete?: () => void;
}

export default function EditEventForm({ initialDescription, initialLink = '', onSave, onCancel, onDelete }: EditEventFormProps) {
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState(initialDescription);
  const [link, setLink] = useState(initialLink);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (date && location) {
      const formattedDate = new Date(date).toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'short'
      });
      const title = `${formattedDate} — ${location}`;
      onSave(title, description, link);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full bg-white/5 p-4 rounded-lg border border-[var(--sage-dark)]/10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
            Fecha del evento
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 text-[var(--text-main)] bg-transparent border border-[var(--sage-dark)]/20 rounded-lg focus:outline-none focus:border-[var(--sage-dark)]/40"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
            Ubicación
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 text-[var(--text-main)] bg-transparent border border-[var(--sage-dark)]/20 rounded-lg focus:outline-none focus:border-[var(--sage-dark)]/40"
            placeholder="Ej: Buenos Aires"
            required
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
          Descripción
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 text-[var(--text-secondary)] bg-transparent border border-[var(--sage-dark)]/20 rounded-lg focus:outline-none focus:border-[var(--sage-dark)]/40"
          placeholder="Descripción del evento"
          rows={3}
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
          Link del evento
        </label>
        <input
          type="url"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="w-full p-2 text-[var(--text-main)] bg-transparent border border-[var(--sage-dark)]/20 rounded-lg focus:outline-none focus:border-[var(--sage-dark)]/40"
          placeholder="https://..."
        />
      </div>
      <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-3">
        <div className="flex gap-2 w-full md:w-auto">
          {onDelete && (
            <button
              type="button"
              onClick={onDelete}
              className="px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200 transition w-full md:w-auto"
            >
              Eliminar
            </button>
          )}
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition w-full md:w-auto"
          >
            Cancelar
          </button>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-[var(--sage-dark)] text-white rounded hover:bg-[var(--sage)] transition w-full md:w-auto"
        >
          Guardar
        </button>
      </div>
    </form>
  );
} 