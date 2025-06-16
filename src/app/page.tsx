import Image from "next/image";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <main className="pt-24">
      <section id="home" className="min-h-[60vh] flex flex-col justify-center items-center bg-amber-50 py-16">
        <h1 className="text-4xl font-bold text-amber-800 mb-4">Bienvenido a Meditación Sonora</h1>
        <p className="text-lg text-amber-700 max-w-xl text-center">Explora música y sonidos para meditar, relajarte y conectar con tu interior.</p>
      </section>
      <section id="about" className="min-h-[40vh] flex flex-col justify-center items-center bg-orange-50 py-16">
        <h2 className="text-3xl font-semibold text-orange-800 mb-2">About</h2>
        <p className="text-md text-orange-700 max-w-lg text-center">Nuestra plataforma ofrece pistas cuidadosamente seleccionadas para acompañar tus sesiones de meditación y mindfulness.</p>
      </section>
      <section id="contact" className="min-h-[40vh] flex flex-col justify-center items-center bg-yellow-50 py-16">
        <h2 className="text-3xl font-semibold text-yellow-800 mb-2">Contact</h2>
        <p className="text-md text-yellow-700 max-w-lg text-center mb-6">¿Tienes preguntas o sugerencias? Contáctanos y comparte tu experiencia meditativa con nosotros.</p>
        <ContactForm />
      </section>
      <section id="downloads" className="min-h-[40vh] flex flex-col justify-center items-center bg-amber-100 py-16">
        <h2 className="text-3xl font-semibold text-amber-700 mb-2">Downloads</h2>
        <p className="text-md text-amber-600 max-w-lg text-center">Descarga música exclusiva para tus prácticas de meditación y bienestar.</p>
      </section>
    </main>
  );
}
