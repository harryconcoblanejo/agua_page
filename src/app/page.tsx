'use client';

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { EventosProvider, useEventos } from "@/context/EventosContext";
import EditAboutForm from "@/components/EditAboutForm";
import Image from "next/image";

export default function Home() {
  const [aboutText, setAboutText] = useState('');
  const [showEditAbout, setShowEditAbout] = useState(false);
  const [aboutClickCount, setAboutClickCount] = useState(0);
  const [eventClickCount, setEventClickCount] = useState(0);
  const [carouselClickCount, setCarouselClickCount] = useState(0);

  const router = useRouter();

  // Obtener el texto de Sobre Nosotros desde la base de datos
  useEffect(() => {
    fetch("/api/about")
      .then(res => res.json())
      .then(data => {
        if (data && data.text) setAboutText(data.text);
      });
  }, []);

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

  useEffect(() => {
    if (carouselClickCount === 10) {
      router.push('/admin/carousel');
      setCarouselClickCount(0);
    }
  }, [carouselClickCount, router]);

  const handleTitleClick = () => {
    setAboutClickCount(prev => prev + 1);
  };

  const handleCarouselTitleClick = () => {
    setCarouselClickCount(prev => prev + 1);
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
          className="text-3xl mb-6 font-roboto text-center"
          style={{ color: "var(--sage-dark)" }}
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
                  <span className="font-semibold text-[var(--text-main)] text-lg font-roboto" >
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

  const handleEventTitleClick = () => {
    setEventClickCount(prev => prev + 1);
  };

  return (
    <EventosProvider>
      <main className="flex flex-col min-h-screen p-0 bg-[var(--beige)] text-[var(--text-main)] font-sans">
        {/* HERO */}
        <section className="relative flex flex-col items-center justify-center min-h-[40vh] md:min-h-[60vh] w-full overflow-hidden">
          {/* Fondo con blur y overlay oscuro */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/instrumento10.jpg"
              alt="Fondo"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          {/* Logo y texto */}
          <div className="relative z-10 flex flex-col items-center justify-center py-12 md:py-20 w-full px-4">
            <h1
              className="text-4xl md:text-5xl font-bold text-center mb-12 md:mb-16 text-[var(--beige-dark)]! drop-shadow-lg -mt-8 md:-mt-12"
              style={{
                lineHeight: 1.1,
                textShadow: "0 2px 16px rgba(0,0,0,0.18)",
              }}
            >
              <span className="font-andalusia text-[4.5em] font-normal">Agua</span>
              <br />
              <span className="text-2xl md:text-3xl font-roboto text-[1em] font-normal">Música para Ser</span>
            </h1>
            <button
              className="mt-8 md:mt-12 px-6 md:px-8 py-2 rounded-full bg-white text-[var(--sage-dark)] font-bold shadow-md border border-[var(--sage-dark)] transition hover:bg-[var(--sage)] hover:text-white text-sm md:text-base font-roboto"
            >
              <a href="https://linktr.ee/aguamusicaparaser" target="_blank" rel="noopener noreferrer">Escuchar ahora</a>
            </button>
          </div>
        </section>

        {/* SOBRE NOSOTROS */}
        <section className="bg-[var(--beige-dark)] w-full flex flex-col md:flex-row items-center gap-8 px-8 py-16">
          <div className="flex-1">
            <h2
              className="text-3xl mb-4 font-roboto"
              style={{ color: "var(--sage-dark)" }}
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
          <div className="flex-1 flex justify-center items-center">
            <div className="w-full max-w-xl h-[200px] sm:h-[300px] md:h-[400px] overflow-hidden rounded-2xl shadow-lg">
              <img src="/agua 5.jpg" alt="Imagen fija del carrusel" className="w-full h-full object-cover rounded-2xl" />
            </div>
          </div>
        </section>

        {/* VIDEOS */}
        <section className="bg-[var(--sage)] w-full px-8 py-16">
          <h2
            className="text-3xl mb-6 font-roboto text-center"
            style={{ color: "var(--beige-dark)" }}
            onClick={handleCarouselTitleClick}
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
