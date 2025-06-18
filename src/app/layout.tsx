import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Allura } from "next/font/google";
import { Roboto } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import FontLoader from "@/components/FontLoader";

const inter = Inter({ subsets: ["latin"] });
const allura = Allura({ 
  weight: "400",
  subsets: ["latin"],
  variable: "--font-allura"
});
const roboto = Roboto({ 
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: 'swap'
});

export const metadata: Metadata = {
  title: "Agua música para Ser",
  description: "músicos y terapeutas del sonido",
  icons: {
    icon: "/logo22.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" type="image/png" href="/logo22.png" />
        {/* Precargar fuentes críticas */}
        <link 
          rel="preload" 
          href="https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxK.woff2" 
          as="font" 
          type="font/woff2" 
          crossOrigin="anonymous" 
        />
        <link 
          rel="preload" 
          href="/ANDALUSIA (1).TTF" 
          as="font" 
          type="font/ttf" 
        />
      </head>
      <body className={`${inter.className} ${allura.variable} ${roboto.variable} antialiased`}>
        <FontLoader>
          {/* <Header /> */}
          {children}
          <Footer />
        </FontLoader>
      </body>
    </html>
  );
}
