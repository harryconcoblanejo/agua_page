"use client";
import { useState } from "react";
import Image from "next/image";
import { upload } from '@vercel/blob/client';

interface CarouselImage {
  id?: number;
  src: string;
  alt: string;
}

interface EditCarouselFormProps {
  initialImages: CarouselImage[];
  onSave: (images: CarouselImage[]) => void;
  onCancel: () => void;
}

export default function EditCarouselForm({ initialImages, onSave, onCancel }: EditCarouselFormProps) {
  const [images, setImages] = useState<CarouselImage[]>(initialImages);

  // Subida real de archivos directamente a Vercel Blob
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    const uploadedImages: CarouselImage[] = [];
    for (const file of files) {
      // Sube directamente a Vercel Blob
      const { url } = await upload(file.name, file, { access: 'public' });
      // Guarda la URL en la base de datos
      const res = await fetch('/api/carousel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ images: [{ src: url, alt: file.name }] })
      });
      if (res.ok) {
        // Opcional: podrías obtener el id de la imagen guardada si tu API lo devuelve
        uploadedImages.push({ src: url, alt: file.name });
      }
    }
    setImages((prev) => [...prev, ...uploadedImages]);
  };

  const handleRemoveImage = async (index: number) => {
    const img = images[index];
    if (img.id) {
      await fetch('/api/carousel', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: img.id })
      });
    }
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Solo actualizar textos (alt) y orden
    await fetch('/api/carousel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ images })
    });
    onSave(images);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 w-full md:max-w-xl">
      <div className="flex flex-wrap gap-4 mb-4">
        {images.length === 0 ? (
          <div className="text-center w-full text-[var(--text-secondary)]">no hay imagenes</div>
        ) : (
          images.map((img, idx) => (
            <div key={idx} className="relative w-32 h-24">
              <Image src={img.src} alt={img.alt} fill className="object-cover rounded" />
              <button
                type="button"
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                onClick={() => handleRemoveImage(idx)}
                title="Eliminar"
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        className="mb-4"
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
