'use client';

import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import ImageCarousel from "@/components/ImageCarousel";
import EditAboutForm from "@/components/EditAboutForm";
import EditEventForm from "@/components/EditEventForm";
import { useState, useEffect } from "react";

interface Event {
  id: number;
  title: string;
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
  const [events, setEvents] = useState<Event[]>(() => {
    if (typeof window !== 'undefined') {
      const savedEvents = localStorage.getItem('events');
      return savedEvents ? JSON.parse(savedEvents) : [];
    }
    return [];
  });

  // Save events to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('events', JSON.stringify(events));
    }
  }, [events]);

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
      title: "",
      description: "",
      link: ""
    }]);
  };

  const handleUpdateEvent = (id: number, title: string, description: string, link: string) => {
    setEvents((prev: Event[]) => prev.map((event: Event) => 
      event.id === id ? { ...event, title, description, link } : event
    ));
  };

  const handleDeleteEvent = (id: number) => {
    setEvents((prev: Event[]) => prev.filter((event: Event) => event.id !== id));
  };

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
      <section className="bg-[var(--beige-dark)] w-full px-8 py-16 flex-1 flex flex-col justify-end">
        <h2
          className="text-3xl mb-6 cursor-pointer hover:opacity-80 transition"
          style={{ fontFamily: "Roboto, Arial, sans-serif", color: "var(--sage-dark)" }}
          onClick={() => {
            setEventClickCount(prev => {
              const newCount = prev + 1;
              if (newCount === 10) {
                setIsEventEditing(true);
                return 0;
              }
              return newCount;
            });
          }}
        >
          Próximos eventos
        </h2>
        {isEventEditing ? (
          <div className="w-full">
            <div className="flex justify-end mb-6">
              <button
                onClick={handleAddEvent}
                className="px-6 py-2 bg-[var(--sage-dark)] text-white rounded-full hover:bg-[var(--sage)] transition flex items-center gap-2"
              >
                <span>+</span> Agregar evento
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto pr-4 space-y-6">
              {events.length === 0 ? (
                <div className="text-center py-8 text-[var(--text-secondary)]">
                  No hay próximos eventos
                </div>
              ) : (
                events.map((event) => (
                  <div key={event.id}>
                    <EditEventForm
                      initialTitle={event.title}
                      initialDescription={event.description}
                      initialLink={event.link}
                      onSave={(title, description, link) => {
                        handleUpdateEvent(event.id, title, description, link);
                      }}
                      onCancel={() => {}}
                      onDelete={() => handleDeleteEvent(event.id)}
                    />
                  </div>
                ))
              )}
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setIsEventEditing(false)}
                className="px-6 py-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
              >
                Finalizar edición
              </button>
            </div>
          </div>
        ) : (
          <div className="max-h-[60vh] overflow-y-auto pr-4 space-y-6">
            {events.length === 0 ? (
              <div className="text-center py-8 text-[var(--text-secondary)]">
                No hay próximos eventos
              </div>
            ) : (
              events.map((event) => (
                <div key={event.id} className="bg-white/5 p-4 rounded-lg border border-[var(--sage-dark)]/10">
                  <div>
                    <div className="font-semibold text-[var(--text-main)]" style={{ fontFamily: "Roboto, Arial, sans-serif" }}>
                      {event.title}
                    </div>
                    <div className="text-[var(--text-secondary)] mt-2">
                      {event.description}
                    </div>
                    {event.link && (
                      <a 
                        href={event.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--sage-dark)] hover:underline mt-3 inline-block"
                      >
                        Ver más información
                      </a>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </section>
    </main>
  );
}
