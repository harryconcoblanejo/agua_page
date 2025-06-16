"use client";
import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md bg-white/80 rounded-lg shadow p-6 flex flex-col gap-4 border border-amber-200">
      <label className="font-medium text-amber-800">
        Nombre
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="mt-1 w-full rounded border border-amber-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
      </label>
      <label className="font-medium text-amber-800">
        Email
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          className="mt-1 w-full rounded border border-amber-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
      </label>
      <label className="font-medium text-amber-800">
        Mensaje
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={4}
          className="mt-1 w-full rounded border border-amber-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
      </label>
      <button
        type="submit"
        className="bg-amber-600 text-white font-semibold py-2 rounded hover:bg-amber-700 transition-colors"
      >
        Enviar
      </button>
      {sent && <p className="text-green-700 font-medium mt-2">¡Mensaje enviado!</p>}
    </form>
  );
}
