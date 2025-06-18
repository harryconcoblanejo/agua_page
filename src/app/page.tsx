'use client';

import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import ImageCarousel from "@/components/ImageCarousel";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { EventosProvider, useEventos } from "@/context/EventosContext";
import EditAboutForm from "@/components/EditAboutForm"; // Asegúrate de que la ruta sea correcta
import EditCarouselForm from "@/components/EditCarouselForm";

interface Event {
  id: number;
  date: string;
  place: string;
  description: string;
  link: string;
}

interface CarouselImage {
  src: string;
  alt: string;
}

export default function Home() {
  const [aboutText, setAboutText] = useState('');
  const [showEditAbout, setShowEditAbout] = useState(false);
  const [showEditCarousel, setShowEditCarousel] = useState(false);
  const [carouselImages, setCarouselImages] = useState<CarouselImage[]>([]);
  const [carouselClickCount, setCarouselClickCount] = useState(0);
  const [aboutClickCount, setAboutClickCount] = useState(0);
  const [eventClickCount, setEventClickCount] = useState(0);

  const router = useRouter();

  // Obtener el texto de Sobre Nosotros desde la base de datos
  useEffect(() => {
    fetch("/api/about")
      .then(res => res.json())
      .then(data => {
        if (data && data.text) setAboutText(data.text);
      });
  }, []);

  // Cargar imágenes del carrusel desde la base de datos
  useEffect(() => {
    fetch("/api/carousel")
      .then(res => res.ok ? res.json() : [])
      .then(data => {
        if (Array.isArray(data)) setCarouselImages(data as CarouselImage[]);
      })
      .catch(() => setCarouselImages([]));
  }, []);

  useEffect(() => {
    if (carouselClickCount === 10) {
      setShowEditCarousel(true);
      setCarouselClickCount(0);
    }
  }, [carouselClickCount]);

  useEffect(() => {
    if (aboutClickCount === 10) {
      setShowEditAbout(true);
      setAboutClickCount(0);
    }
  }, [aboutClickCount]);

  useEffect(() => {
    if (eventClickCount === 10) {
      router.push('/admin/eventos');
      setEventClickCount(0);
    }
  }, [eventClickCount, router]);

  const handleTitleClick = () => {
    setAboutClickCount(prev => prev + 1);
  };

  const handleSave = (newText: string) => {
    setAboutText(newText);
    // Here you would typically also save to your backend
  };

  const handleCancel = () => {
    // Eliminadas referencias a setIsEditing y isEditing
  };

  const formatDateToSpanish = (dateStr: string) => {
    if (!dateStr) return "";
    // Extraer solo la parte de la fecha si viene en formato ISO
    const cleanDate = dateStr.split('T')[0];
    const [yearStr, monthStr, dayStr] = cleanDate.split('-');
    const date = new Date(Number(yearStr), Number(monthStr) - 1, Number(dayStr));
    if (isNaN(date.getTime())) return dateStr;
    const months = {
      0: 'enero', 1: 'febrero', 2: 'marzo', 3: 'abril', 4: 'mayo', 5: 'junio',
      6: 'julio', 7: 'agosto', 8: 'septiembre', 9: 'octubre', 10: 'noviembre', 11: 'diciembre'
    };
    const formattedDay = date.getDate();
    const monthName = months[date.getMonth() as keyof typeof months];
    return `${formattedDay} de ${monthName}`;
  };

  function EventosSection({ onSecretClick }: { onSecretClick: () => void }) {
    const { eventos } = useEventos();
    return (
      <section className="bg-[var(--beige-dark)] w-full px-4 sm:px-8 py-12 sm:py-16 flex-1 flex flex-col justify-end">
        <h2
          className="text-3xl mb-6  text-center"
          style={{ fontFamily: "Roboto, Arial, sans-serif", color: "var(--sage-dark)" }}
          onClick={onSecretClick}
        >
          Próximos eventos
        </h2>
        <div className="max-h-[60vh] overflow-y-auto pr-0 sm:pr-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          {eventos.length === 0 ? (
            <div className="text-center py-8 text-[var(--text-secondary)] col-span-full">
              no hay eventos
            </div>
          ) : (
            eventos.map((event) => (
              <div
                key={event.id}
                className="bg-white/50 shadow-lg border border-[var(--sage-dark)]/20 rounded-xl p-4 flex flex-col gap-2 min-h-[150px] max-w-md"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-block w-2 h-2 rounded-full bg-[var(--sage-dark)] mr-2"></span>
                  <span className="font-semibold text-[var(--text-main)] text-lg" style={{ fontFamily: 'Roboto, Arial, sans-serif' }}>
                    {formatDateToSpanish(event.date || "")}
                  </span>
                </div>
                {event.place && (
                  <div className="text-[var(--text-secondary)] text-base font-medium truncate" title={event.place}>
                    {event.place}
                  </div>
                )}
                {event.description && (
                  <div className="text-[var(--text-main)] text-sm mt-1 line-clamp-3">
                    {event.description}
                  </div>
                )}
                {event.link && (
                  <a
                    href={event.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--sage-dark)] hover:underline mt-2 inline-block text-sm font-semibold"
                  >
                    Ver más información
                  </a>
                )}
              </div>
            ))
          )}
        </div>
      </section>
    );
  }

  // Lógica para 10 clicks en el carrusel
  const handleCarouselTitleClick = () => {
    setCarouselClickCount(prev => prev + 1);
  };

  // Guardar imágenes del carrusel en la base de datos
  const handleSaveCarousel = async (images: { src: string; alt: string }[]) => {
    await fetch("/api/carousel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ images })
    });
    try {
      setCarouselImages(images as CarouselImage[]);
    } catch (error) {
      console.error('Error setting carousel images:', error);
    }
    setShowEditCarousel(false);
  };

  const handleEventTitleClick = () => {
    setEventClickCount(prev => prev + 1);
  };

  return (
    <EventosProvider>
      <main className="flex flex-col min-h-screen p-0 bg-[var(--beige)] text-[var(--text-main)] font-sans">
        {/* HERO */}
        <section className="relative flex flex-col items-center justify-center min-h-[50vh] md:min-h-[70vh] w-full overflow-hidden">
          {/* Fondo con blur y overlay oscuro */}
          <div className="absolute inset-0 z-0">
            <img
              src="/instrumento10.jpg"
              alt="Fondo"
              className="w-full h-full object-cover"
              style={{ filter: "blur(1px) brightness(1)" }}
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          {/* Logo y texto */}
          <div className="relative z-10 flex flex-col items-center justify-center py-12 md:py-20 w-full px-4">
            <h1
              className="text-4xl md:text-5xl font-bold text-center mb-12 md:mb-16 text-[var(--beige-dark)]! drop-shadow-lg -mt-8 md:-mt-12"
              style={{
                fontFamily: "Roboto, Arial, sans-serif",
                lineHeight: 1.1,
                textShadow: "0 2px 16px rgba(0,0,0,0.18)",
              }}
            >
              <span style={{ fontFamily: "var(--font-allura)", fontSize: "2.5em" }}>Agua</span>
              <br />
              <span className="text-2xl md:text-3xl" style={{ fontFamily: "var(--font-roboto)", fontSize: "1em" }}  >Música para Ser</span>
            </h1>
            <button
              className="mt-8 md:mt-12 px-6 md:px-8 py-2 rounded-full bg-white text-[var(--sage-dark)] font-bold shadow-md border border-[var(--sage-dark)] transition hover:bg-[var(--sage)] hover:text-white text-sm md:text-base"
              style={{ fontFamily: "Roboto, Arial, sans-serif" }}
            >
              <a href="https://linktr.ee/aguamusicaparaser" target="_blank" rel="noopener noreferrer">Escuchar ahora</a>
            </button>
          </div>
        </section>

        {/* SOBRE NOSOTROS */}
        <section className="bg-[var(--beige-dark)] w-full flex flex-col md:flex-row items-center gap-8 px-8 py-16">
          <div className="flex-1">
            <h2
              className="text-3xl mb-4 "
              style={{ fontFamily: "Roboto, Arial, sans-serif", color: "var(--sage-dark)" }}
              onClick={handleTitleClick}
            >
              Sobre Nosotros
            </h2>
            {showEditAbout ? (
              <EditAboutForm
                initialText={aboutText}
                onSave={async (newText) => {
                  try {
                    console.log('Sending request to update about text:', newText);
                    const response = await fetch("/api/about", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                      },
                      body: JSON.stringify({ text: newText })
                    });

                    console.log('Response status:', response.status);
                    const data = await response.json();
                    console.log('Response data:', data);

                    if (!response.ok) {
                      throw new Error(data.error || 'Error al guardar el texto');
                    }

                    if (!data || !data.text) {
                      throw new Error('Respuesta inválida del servidor');
                    }

                    console.log('Successfully updated about text:', data);
                    setAboutText(data.text);
                    setShowEditAbout(false);
                  } catch (error) {
                    console.error('Error saving about text:', error);
                    alert(error instanceof Error ? error.message : 'Error al guardar el texto');
                  }
                }}
                onCancel={() => setShowEditAbout(false)}
              />
            ) : (
              <p className="mb-8 text-lg text-[var(--text-secondary)] max-w-xl whitespace-pre-line">
                {aboutText}
              </p>
            )}
          </div>
          <div className="flex-1 flex flex-col items-center">
            {/* <h3
              className="text-xl font-semibold mb-2 cursor-pointer"
              style={{ color: "var(--sage-dark)" }}
              onClick={handleCarouselTitleClick}
            >
              Carrusel de imágenes
            </h3> */}
            {showEditCarousel ? (
              <EditCarouselForm
                initialImages={carouselImages}
                onSave={handleSaveCarousel}
                onCancel={() => setShowEditCarousel(false)}
              />
            ) : (
              carouselImages.length === 0 ? (
                <div className="text-center py-8 text-[var(--text-secondary)]"   onClick={handleCarouselTitleClick}>no hay imagenes</div>
              ) : (
                <div onClick={handleCarouselTitleClick}>
                  <ImageCarousel images={carouselImages} />
                </div>
                
              )
            )}
          </div>
        </section>

        {/* VIDEOS */}
        <section className="bg-[var(--sage)] w-full px-8 py-16">
          <h2
            className="text-3xl mb-6 text-center"
            style={{ fontFamily: "Roboto, Arial, sans-serif", color: "var(--beige-dark)" }}
          >
            Videos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* First YouTube Video Embed */}
            <div className="w-full">
              <div className="relative pb-[56.25%] h-0">
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-xl"
                  src="https://www.youtube.com/embed/EwJkvcYG5i4"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            {/* Second YouTube Video Embed */}
            <div className="w-full">
              <div className="relative pb-[56.25%] h-0">
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-xl"
                  src="https://www.youtube.com/embed/gN6cQ4xk-HI"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            {/* Third YouTube Video Embed */}
            <div className="w-full">
              <div className="relative pb-[56.25%] h-0">
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-xl"
                  src="https://www.youtube.com/embed/OG9toS1u10s"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        {/* PRÓXIMOS EVENTOS */}
        <EventosSection onSecretClick={handleEventTitleClick} />
      </main>
    </EventosProvider>
  );
}
