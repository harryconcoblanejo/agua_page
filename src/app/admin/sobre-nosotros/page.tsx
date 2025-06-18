"use client";
import { useState, useEffect } from "react";
import EditAboutForm from "@/components/EditAboutForm";
import Image from "next/image";

interface CarouselImage {
  src: string;
  alt: string;
}

export default function AdminSobreNosotros() {
  // Estado para el texto
  const [aboutText, setAboutText] = useState<string>(`Del yoga aprendimos la calma.\nDel arte marcial, la disciplina.\nDe la música, el lenguaje del alma.\n\nSomos Gustavo Nemitz (músico y profesor de yoga) y Rodrigo López (músico, terapeuta corporal y profesor de Ninjutsu).\nCombinamos nuestras trayectorias para ofrecer experiencias donde cuerpo, respiración y sonido trabajan juntos para generar presencia y equilibrio.\n\nA través de la armonización sonora, el yoga con música en vivo, las meditaciones guiadas y otros espacios de introspección, buscamos facilitar estados de conciencia, descanso y conexión interna.\n\nUna propuesta para quienes buscan armonía, serenidad y energía vital desde una mirada integral y respetuosa..`);
  const [isEditing, setIsEditing] = useState(false);

  // Estado para las imágenes del carrusel
  const [carouselImages, setCarouselImages] = useState<CarouselImage[]>([
    { src: "/imagenes_sobre_nosotros/IMG_20191208_161406_182.jpg", alt: "Sesión de música y meditación" },
    { src: "/imagenes_sobre_nosotros/calimba.jpg", alt: "Calimba - Instrumento de percusión" },
    { src: "/imagenes_sobre_nosotros/agua 5.jpg", alt: "Meditación con sonidos del agua" },
    { src: "/imagenes_sobre_nosotros/instrumentos 5.jpg", alt: "Colección de instrumentos" },
    { src: "/imagenes_sobre_nosotros/Gus.jpg", alt: "Gus - Músico y terapeuta" },
    { src: "/imagenes_sobre_nosotros/IMG-20191206-WA0042.jpg", alt: "Momento de meditación y sonido" },
  ]);

  // Cargar el texto actual desde la API
  useEffect(() => {
    fetch("/api/about")
      .then(res => res.json())
      .then(data => {
        if (data && data.text) setAboutText(data.text);
      });
  }, []);

  // Guardar el texto en la base de datos
  const handleSaveText = async (newText: string) => {
    await fetch("/api/about", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: newText })
    });
    setAboutText(newText);
    setIsEditing(false);
  };

  // Manejar selección de imágenes
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    const newImages: CarouselImage[] = files.map((file) => ({
      src: URL.createObjectURL(file),
      alt: file.name,
    }));
    setCarouselImages((prev) => [...prev, ...newImages]);
  };

  // Eliminar imagen del carrusel
  const handleRemoveImage = (index: number) => {
    setCarouselImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <main className="max-w-2xl mx-auto py-8 px-2 sm:px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Administrar Sobre Nosotros</h1>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Texto</h2>
        {isEditing ? (
          <EditAboutForm
            initialText={aboutText}
            onSave={handleSaveText}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <div className="mb-2 whitespace-pre-line text-lg text-[var(--text-secondary)]">{aboutText}</div>
        )}
        {!isEditing && (
          <button
            className="bg-yellow-500 text-white px-4 py-2 rounded mt-2"
            onClick={() => setIsEditing(true)}
          >
            Editar texto
          </button>
        )}
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-2">Imágenes del Carrusel</h2>
        <div className="flex flex-wrap gap-4 mb-4">
          {carouselImages.map((img, idx) => (
            <div key={idx} className="relative w-32 h-24">
              <Image src={img.src} alt={img.alt} fill className="object-cover rounded" />
              <button
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                onClick={() => handleRemoveImage(idx)}
                title="Eliminar"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="mb-4"
        />
      </section>
    </main>
  );
}
