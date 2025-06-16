import Image from "next/image";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen p-4 bg-[var(--beige)] text-[var(--text-main)]">
      {/* HERO SECTION */}
      <section className="relative flex flex-col items-center justify-center min-h-[60vh] w-full" style={{background: 'linear-gradient(rgba(20,20,20,0.62),rgba(20,20,20,0.62)), url(/instrumento10.jpg) center/cover no-repeat'}}>
        <div className="flex flex-col items-center justify-center py-16 w-full">
          <div className="mb-6 w-full flex justify-center">
            <Image src="/logos/logo 22.png" alt="Logo" width={80} height={80} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 text-white! drop-shadow-md">
  Sonidos que guían tu respiración, vibraciones que sanan tu alma
</h1>

          <button className="btn mt-2">Escuchar ahora</button>
        </div>
      </section>

      {/* SOBRE NOSOTROS */}
      <section className="bg-[var(--beige-dark)] w-full flex flex-col md:flex-row items-center gap-8 px-8 py-10">
        <div className="flex-1">
          <h2 className="text-3xl mb-4 text-[var(--text-main)]">Sobre Nosotros</h2>
          <p className="mb-6 text-lg text-[var(--text-secondary)]">Somos un colectivo de músicos, terapeutas y exploradores del sonido. Fusionamos cuencos, flauta nativa, voz armónica y paisajes sonoros naturales.</p>
          <div className="flex gap-8 text-3xl text-[var(--sage-dark)]">
            <span>🔊</span>
            <span>🌱</span>
            <span>🧘</span>
            <span>🎵</span>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <Image src="/agua 5.jpg" alt="Sobre Nosotros" width={320} height={220} className="rounded-xl object-cover shadow-md" />
        </div>
      </section>

      {/* MÚSICA */}
      <section className="bg-[var(--sage)] w-full px-8 py-10">
        <h2 className="text-3xl mb-6 text-[var(--text-main)]">Música</h2>
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="bg-[var(--beige-dark)] rounded-xl p-6 flex-1 min-w-[260px] shadow">
            <div className="mb-2 font-semibold text-[var(--text-main)]">Chakras Sounds Vol. I</div>
            <div className="w-full h-2 bg-[var(--sage)] rounded mb-4">
              <div className="h-2 bg-[var(--sage-dark)] rounded" style={{width: '48%'}}></div>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-2xl btn bg-[var(--btn-bg)]">⏮️</button>
              <button className="text-2xl btn bg-[var(--btn-bg)]">▶️</button>
              <button className="text-2xl btn bg-[var(--btn-bg)]">⏭️</button>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <Image src="/agua 5.jpg" alt="Sonidos del Alba" width={180} height={120} className="rounded-lg object-cover" />
                <div className="mt-2 text-[var(--text-main)]">Sonidos del Alba</div>
              </div>
              <div className="flex-1">
                <Image src="/instrumento10.jpg" alt="Live en el bosque sagrado" width={180} height={120} className="rounded-lg object-cover" />
                <div className="mt-2 text-[var(--text-main)]">Live en el bosque sagrado</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRÓXIMOS EVENTOS */}
      <section className="bg-[var(--beige-dark)] w-full px-8 py-10 flex-1 flex flex-col justify-end">
        <h2 className="text-3xl mb-4 text-[var(--text-main)]">Próximos eventos</h2>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="font-semibold text-[var(--text-main)]">20 Jul — Buenos Aires</div>
            <div className="text-[var(--text-secondary)]">Concierto meditativo con sonido envolvente y sesión de reiki colectivo</div>
          </div>
          <button className="btn mt-4 md:mt-0">Ver más</button>
        </div>
      </section>
    </main>
  );
}
