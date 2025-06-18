'use client';

import { useState } from 'react';

interface EditAboutFormProps {
  initialText: string;
  onSave: (newText: string) => void;
  onCancel: () => void;
}

export default function EditAboutForm({ initialText, onSave, onCancel }: EditAboutFormProps) {
  const [text, setText] = useState(initialText);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(text);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 w-full md:max-w-xl">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full h-[400px] p-4 text-lg text-[var(--text-secondary)] bg-transparent border border-[var(--sage-dark)]/20 rounded-lg focus:outline-none focus:border-[var(--sage-dark)]/40"
        placeholder="Escribe el texto aquí..."
      />
      <div className="flex gap-2 justify-end mt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-[var(--sage-dark)] text-white rounded hover:bg-[var(--sage)] transition"
        >
          Guardar
        </button>
      </div>
    </form>
  );
} 