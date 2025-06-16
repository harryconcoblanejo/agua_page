import Image from "next/image";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <main className="pt-24 relative min-h-screen">
      {/* Background Image */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/instrumento10.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-black/50" /> {/* Overlay for better text readability */}
      </div>

      <section id="home" className="min-h-[60vh] flex flex-col justify-center items-center py-16">
        <h1 className="text-4xl font-bold text-white mb-4">Bienvenido a Meditación Sonora</h1>
        <p className="text-lg text-white max-w-xl text-center">Agua Armonización Sonora

          La música terapéutica crea un espacio de relax y bienestar para trabajar
          en los planos físico, mental, emocional y espiritual.
          El sonido de cuencos tibetanos, gongs, sitar y otros instrumentos ancestrales nos guian en un viaje sonoro
          de relajación, introspección y sanación.
          El agua es fundamental para la existencia de la vida y constituye aproximadamente el 70% de nuestro cuerpo,
          la vibración sonora modifica su estructura molecular recorriéndonos y trayendo múltiples beneficios:

          - Relaja profundamente.
          - Alivia el estrés, la ansiedad y las tensiones.
          - Mejora la concentración y la creatividad.
          - Equilibra nuestro cuerpo físico, nuestros pensamientos y emociones.
          - Facilita el acceso a la intuición y a la meditación.

          Te invitamos a participar de esta experiencia de autoconocimiento y sanación.</p>
      </section>
      <section id="about" className="min-h-[40vh] flex flex-col justify-center items-center py-16 bg-black/30">
        <h2 className="text-3xl font-semibold text-white mb-2">About</h2>
        <p className="text-md text-white max-w-lg text-center">Nuestra plataforma ofrece pistas cuidadosamente seleccionadas para acompañar tus sesiones de meditación y mindfulness.</p>
      </section>
      <section id="contact" className="min-h-[40vh] flex flex-col justify-center items-center py-16 bg-black/30">
        <h2 className="text-3xl font-semibold text-white mb-2">Contact</h2>
        <p className="text-md text-white max-w-lg text-center mb-6">¿Tienes preguntas o sugerencias? Contáctanos y comparte tu experiencia meditativa con nosotros.</p>
        <ContactForm />
      </section>
      <section id="downloads" className="min-h-[40vh] flex flex-col justify-center items-center py-16 bg-black/30">
        <h2 className="text-3xl font-semibold text-white mb-2">Downloads</h2>
        <p className="text-md text-white max-w-lg text-center">Descarga música exclusiva para tus prácticas de meditación y bienestar.</p>
      </section>
    </main>
  );
}
