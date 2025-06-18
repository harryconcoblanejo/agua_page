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

    // Precargar fuentes críticas
    const preloadFonts = async () => {
      try {
        // Precargar Roboto desde Google Fonts
        const robotoLink = document.createElement('link');
        robotoLink.rel = 'preload';
        robotoLink.as = 'font';
        robotoLink.type = 'font/woff2';
        robotoLink.href = 'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxK.woff2';
        robotoLink.crossOrigin = 'anonymous';
        document.head.appendChild(robotoLink);

        // Precargar Andalusia
        const andalusiaLink = document.createElement('link');
        andalusiaLink.rel = 'preload';
        andalusiaLink.as = 'font';
        andalusiaLink.type = 'font/ttf';
        andalusiaLink.href = '/ANDALUSIA (1).TTF';
        document.head.appendChild(andalusiaLink);

        // Verificar carga de fuentes
        checkFontsLoaded();
      } catch (error) {
        console.warn('Error preloading fonts:', error);
        // Si hay error, continuar de todas formas
        setFontsLoaded(true);
      }
    };

    preloadFonts();
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