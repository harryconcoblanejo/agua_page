import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import ImageCarousel from "@/components/ImageCarousel";

export default function Home() {
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
      <section className="relative flex flex-col items-center justify-center min-h-[70vh] w-full overflow-hidden">
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
        <div className="relative z-10 flex flex-col items-center justify-center py-20 w-full">
          {/* <img
            src="/logos/logo 22.png"
            alt="Logo Agua Música para Ser"
            width={90}
            height={90}
            className="mb-8"
            style={{ background: "transparent", borderRadius: 0, boxShadow: "none" }}
          /> */}
          <h1
            className="text-4xl md:text-5xl font-bold text-center mb-8 text-[var(--beige-dark)]! drop-shadow-lg"
            style={{
              fontFamily: "Roboto, Arial, sans-serif",
              lineHeight: 1.1,
              textShadow: "0 2px 16px rgba(0,0,0,0.18)",
            }}
          >
           Agua <br /> música para Ser
          </h1>
          <button
            className="mt-2 px-8 py-2 rounded-full bg-white text-[var(--sage-dark)] font-bold shadow-md border border-[var(--sage-dark)] transition hover:bg-[var(--sage)] hover:text-white"
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
            className="text-3xl mb-4"
            style={{ fontFamily: "Roboto, Arial, sans-serif", color: "var(--sage-dark)" }}
          >
            Sobre Nosotros
          </h2>
          <p className="mb-8 text-lg text-[var(--text-secondary)] max-w-xl">
            Somos un colectivo de músicos, terapeutas y exploradores del sonido. Fusionamos cuencos, flauta nativa, voz armónica y paisajes sonoros naturales.
          </p>
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
          className="text-3xl mb-6"
          style={{ fontFamily: "Roboto, Arial, sans-serif", color: "var(--sage-dark)" }}
        >
          Próximos eventos
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="font-semibold text-[var(--text-main)]" style={{ fontFamily: "Roboto, Arial, sans-serif" }}>
              20 Jul — Buenos Aires
            </div>
            <div className="text-[var(--text-secondary)]">
              Concierto meditativo con sonido envolvente y sesión de reiki colectivo
            </div>
          </div>
          {/* <button
            className="px-8 py-2 rounded-full bg-[var(--sage-dark)] text-white font-bold shadow-md border border-[var(--sage-dark)] transition hover:bg-[var(--text-main)]"
            style={{ fontFamily: "Roboto, Arial, sans-serif" }}
          >
            Ver más
          </button> */}
        </div>
      </section>
    </main>
  );
}
