import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Agua Música para Ser",
  description: "Meditación Sonora - Música y sonidos para meditar y relajarte",
  // icons: {
  //   icon: "/favicon.png",
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        {/* <Header /> */}
        {children}
        <Footer />
      </body>
    </html>
  );
}
