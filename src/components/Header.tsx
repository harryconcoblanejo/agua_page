"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const sections = [
  { id: "home", label: "Home", color: "text-amber-700 hover:text-amber-900" },
  { id: "about", label: "About", color: "text-orange-700 hover:text-orange-900" },
  { id: "contact", label: "Contact", color: "text-yellow-800 hover:text-yellow-900" },
  { id: "downloads", label: "Downloads", color: "text-amber-600 hover:text-amber-800" },
];

export default function Header() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      let current = "home";
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const offset = el.offsetTop - 80;
          if (scrollY >= offset) {
            current = section.id;
          }
        }
      }
      setActive(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-gradient-to-r from-amber-100 via-orange-100 to-yellow-100 shadow-md transition-all duration-500">
      <nav className="max-w-5xl mx-auto flex items-center justify-between py-4 px-6">
        <div className="text-2xl font-bold text-amber-700 transition-colors duration-300">Meditación Sonora</div>
        <ul className="flex gap-8 text-lg font-medium">
          {sections.map((section) => (
            <li key={section.id}>
              <Link
                href={`#${section.id}`}
                className={`${section.color} transition-colors duration-300 ${active === section.id ? "underline underline-offset-8 decoration-amber-700 font-bold" : ""}`}
              >
                {section.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
