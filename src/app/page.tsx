import Image from "next/image";
import ContactForm from "@/components/ContactForm";

export default function Home() {
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
          <div className="flex gap-10 text-3xl text-[var(--sage-dark)]">
            {/* Puedes reemplazar estos emojis por SVGs lineales si lo deseas */}
            <span title="Sonido">🔊</span>
            <span title="Naturaleza">🌱</span>
            <span title="Meditación">🧘</span>
            <span title="Música">🎵</span>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <Image
            src="/agua 5.jpg"
            alt="Sobre Nosotros"
            width={340}
            height={240}
            className="rounded-2xl object-cover shadow-md"
            style={{ maxHeight: 220 }}
          />
        </div>
      </section>

      {/* MÚSICA */}
      <section className="bg-[var(--sage)] w-full px-8 py-16">
        <h2
          className="text-3xl mb-8"
          style={{ fontFamily: "Roboto, Arial, sans-serif", color: "var(--beige-dark)" }}
        >
          Música
        </h2>
        <div className="flex flex-col md:flex-row gap-8 items-center">
          {/* Reproductor */}
          <div className="bg-[var(--beige-dark)] rounded-xl p-6 flex-1 min-w-[260px] shadow flex flex-col items-center max-w-md">
            <div className="mb-2 font-semibold text-[var(--text-main)]" style={{ fontFamily: "Roboto, Arial, sans-serif" }}>
              Chakras Sounds Vol. I
            </div>
            {/* Barra de progreso simulada */}
            <div className="w-full h-2 bg-[var(--sage)] rounded mb-4">
              <div className="h-2 bg-[var(--sage-dark)] rounded" style={{ width: "48%" }} />
            </div>
            {/* Controles */}
            <div className="flex items-center gap-4">
              <button className="text-2xl text-[var(--sage-dark)] hover:text-[var(--text-main)] transition">⏮️</button>
              <button className="text-2xl text-[var(--sage-dark)] hover:text-[var(--text-main)] transition">▶️</button>
              <button className="text-2xl text-[var(--sage-dark)] hover:text-[var(--text-main)] transition">⏭️</button>
            </div>
          </div>
          {/* Imágenes de álbumes/canciones */}
          <div className="flex-1 flex flex-row gap-6 justify-center">
            <div className="flex flex-col items-center">
              <Image
                src="/agua 5.jpg"
                alt="Sonidos del Alba"
                width={160}
                height={120}
                className="rounded-xl object-cover"
                style={{ aspectRatio: "1/1", maxHeight: 120 }}
              />
              <div className="mt-2 text-[var(--beige-dark)]" style={{ fontFamily: "Roboto, Arial, sans-serif" }}>
                Sonidos del Alba
              </div>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src="/instrumento10.jpg"
                alt="Live en el bosque sagrado"
                width={160}
                height={120}
                className="rounded-xl object-cover"
                style={{ aspectRatio: "1/1", maxHeight: 120 }}
              />
              <div className="mt-2 text-[var(--beige-dark)]" style={{ fontFamily: "Roboto, Arial, sans-serif" }}>
                Live en el bosque sagrado
              </div>
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
          <button
            className="px-8 py-2 rounded-full bg-[var(--sage-dark)] text-white font-bold shadow-md border border-[var(--sage-dark)] transition hover:bg-[var(--text-main)]"
            style={{ fontFamily: "Roboto, Arial, sans-serif" }}
          >
            Ver más
          </button>
        </div>
      </section>
    </main>
  );
}
