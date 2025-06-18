'use client';

import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import ImageCarousel from "@/components/ImageCarousel";
import EditAboutForm from "@/components/EditAboutForm";
import EditEventForm from "@/components/EditEventForm";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { EventosProvider, useEventos } from "@/context/EventosContext";

interface Event {
  id: number;
  date: string;
  place: string;
  description: string;
  link: string;
}

export default function Home() {
  const [clickCount, setClickCount] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [aboutText, setAboutText] = useState(`Del yoga aprendimos la calma.
Del arte marcial, la disciplina.
De la música, el lenguaje del alma.

Somos Gustavo Nemitz (músico y profesor de yoga) y Rodrigo López (músico, terapeuta corporal y profesor de Ninjutsu).
Combinamos nuestras trayectorias para ofrecer experiencias donde cuerpo, respiración y sonido trabajan juntos para generar presencia y equilibrio.

A través de la armonización sonora, el yoga con música en vivo, las meditaciones guiadas y otros espacios de introspección, buscamos facilitar estados de conciencia, descanso y conexión interna.

Una propuesta para quienes buscan armonía, serenidad y energía vital desde una mirada integral y respetuosa..`);

  const [eventClickCount, setEventClickCount] = useState(0);
  const [isEventEditing, setIsEventEditing] = useState(false);
  const [events, setEvents] = useState<Event[]>([]); // SIEMPRE INICIA VACÍO

  const router = useRouter();

  useEffect(() => {
    if (eventClickCount === 10) {
      router.push('/admin/eventos');
      setEventClickCount(0);
    }
  }, [eventClickCount, router]);

  // Carga los eventos desde localStorage solo en el cliente
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedEvents = localStorage.getItem('events');
      if (savedEvents) setEvents(JSON.parse(savedEvents));
    }
  }, []);

  const handleTitleClick = () => {
    setClickCount(prev => {
      const newCount = prev + 1;
      if (newCount === 10) {
        setIsEditing(true);
        return 0;
      }
      return newCount;
    });
  };

  const handleSave = (newText: string) => {
    setAboutText(newText);
    setIsEditing(false);
    // Here you would typically also save to your backend
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleAddEvent = () => {
    setEvents((prev: Event[]) => [...prev, {
      id: Date.now(),
      date: "",
      place: "",
      description: "",
      link: ""
    }]);
  };

  const handleUpdateEvent = (id: number, date: string, place: string, description: string, link: string) => {
    setEvents((prev: Event[]) => prev.map((event: Event) =>
      event.id === id ? { ...event, date, place, description, link } : event
    ));
  };

  const handleDeleteEvent = (id: number) => {
    setEvents((prev: Event[]) => prev.filter((event: Event) => event.id !== id));
  };

  const formatDateToSpanish = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' });
  };

  function EventosSection({ onSecretClick }: { onSecretClick: () => void }) {
    const { eventos } = useEventos();
    return (
      <section className="bg-[var(--beige-dark)] w-full px-4 sm:px-8 py-12 sm:py-16 flex-1 flex flex-col justify-end">
        <h2
          className="text-3xl mb-6 hover:opacity-80 transition text-center"
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
                className="bg-white/50 shadow-lg border border-[var(--sage-dark)]/20 rounded-xl p-5 flex flex-col gap-2 min-h-[170px]"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-block w-2 h-2 rounded-full bg-[var(--sage-dark)] mr-2"></span>
                  <span className="font-semibold text-[var(--text-main)] text-xl" style={{ fontFamily: 'Roboto, Arial, sans-serif' }}>
                    {formatDateToSpanish(event.date || "")}
                  </span>
                </div>
                {event.place && (
                  <div className="text-[var(--text-secondary)] text-lg font-medium truncate" title={event.place}>
                    {event.place}
                  </div>
                )}
                {event.description && (
                  <div className="text-[var(--text-main)] text-base mt-1 line-clamp-3">
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

  const carouselImages = [
    {
      src: "/imagenes_sobre_nosotros/IMG_20191208_161406_182.jpg",
      alt: "Sesión de música y meditación"
    },
    {
      src: "/imagenes_sobre_nosotros/calimba.jpg",
      alt: "Calimba - Instrumento de percusión"
    },
    {
      src: "/imagenes_sobre_nosotros/agua 5.jpg",
      alt: "Meditación con sonidos del agua"
    },
    {
      src: "/imagenes_sobre_nosotros/instrumentos 5.jpg",
      alt: "Colección de instrumentos"
    },
    {
      src: "/imagenes_sobre_nosotros/Gus.jpg",
      alt: "Gus - Músico y terapeuta"
    },
    {
      src: "/imagenes_sobre_nosotros/IMG-20191206-WA0042.jpg",
      alt: "Momento de meditación y sonido"
    }
  ];

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
              style={{ filter: "blur(2.5px) brightness(0.9)" }}
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
              className="text-3xl mb-4 cursor-pointer"
              style={{ fontFamily: "Roboto, Arial, sans-serif", color: "var(--sage-dark)" }}
              onClick={handleTitleClick}
            >
              Sobre Nosotros
            </h2>
            {isEditing ? (
              <EditAboutForm
                initialText={aboutText}
                onSave={handleSave}
                onCancel={handleCancel}
              />
            ) : (
              <p className="mb-8 text-lg text-[var(--text-secondary)] max-w-xl whitespace-pre-line">
                {aboutText}
              </p>
            )}
            {/* <div className="flex gap-10 text-3xl text-[var(--sage-dark)]">
           
            <span title="Sonido">🔊</span>
            <span title="Naturaleza">🌱</span>
            <span title="Meditación">🧘</span>
            <span title="Música">🎵</span>
          </div> */}
          </div>
          <div className="flex-1 flex justify-center">
            <ImageCarousel images={carouselImages} />
          </div>
        </section>

        {/* MÚSICA */}
        <section className="bg-[var(--sage)] w-full px-8 py-16">
          <h2
            className="text-3xl mb-8"
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
        <EventosSection onSecretClick={() => setEventClickCount(c => c + 1)} />
      </main>
    </EventosProvider>
  );
}
