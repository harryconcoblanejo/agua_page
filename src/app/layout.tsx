import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Allura } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });
const allura = Allura({ 
  weight: "400",
  subsets: ["latin"],
  variable: "--font-allura"
});

export const metadata: Metadata = {
  title: "Agua música para Ser",
  description: "Colectivo de músicos y terapeutas del sonido",
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
      <body className={`${inter.className} ${allura.variable} antialiased`}>
        {/* <Header /> */}
        {children}
        <Footer />
      </body>
    </html>
  );
}
