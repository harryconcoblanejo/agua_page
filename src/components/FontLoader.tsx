'use client';

import { useEffect, useState } from 'react';

export default function FontLoader({ children }: { children: React.ReactNode }) {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    // Función para verificar si las fuentes están cargadas
    const checkFontsLoaded = () => {
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
          setFontsLoaded(true);
        });
      } else {
        // Fallback para navegadores que no soportan document.fonts
        setTimeout(() => {
          setFontsLoaded(true);
        }, 1000);
      }
    };

    // Verificar carga de fuentes
    checkFontsLoaded();
  }, []);

  if (!fontsLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--beige)]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--sage-dark)] mx-auto mb-4"></div>
          <p className="text-[var(--text-secondary)]">Cargando...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
} 