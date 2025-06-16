"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const sections = [
  { id: "home", label: "Home", color: "text-amber-700 hover:text-amber-900" },
  { id: "about", label: "About", color: "text-orange-700 hover:text-orange-900" },
  { id: "contact", label: "Contact", color: "text-yellow-800 hover:text-yellow-900" },
  { id: "downloads", label: "Downloads", color: "text-amber-600 hover:text-amber-800" },
];

export default function Header() {
  const [active, setActive] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const nav = document.querySelector('nav');
      if (nav && !nav.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-gradient-to-r from-amber-100 via-orange-100 to-yellow-100 shadow-md transition-all duration-500">
      <nav className="w-full max-w-7xl mx-auto flex items-center justify-between py-6 px-12">
        <div className="flex items-center gap-4">
          <Image
            src="/logos/logo 22.png"
            alt="Logo Agua Música para Ser"
            width={50}
            height={50}
            className="w-auto h-12"
          />
          <div className="text-2xl font-bold text-amber-700 transition-colors duration-300 text-left">Agua Música para Ser</div>
        </div>
        
        {/* Hamburger Button */}
        <button
          className="lg:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-amber-700 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-amber-700 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-amber-700 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>

        {/* Navigation Menu */}
        <ul className={`lg:flex gap-12 text-lg font-medium ml-auto absolute lg:relative top-full left-0 w-full lg:w-auto bg-gradient-to-r from-amber-100 via-orange-100 to-yellow-100 lg:bg-transparent p-4 lg:p-0 shadow-lg lg:shadow-none transition-all duration-300 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible lg:opacity-100 lg:visible'}`}>
          {sections.map((section) => (
            <li key={section.id} className="py-2 lg:py-0">
              <Link
                href={`#${section.id}`}
                className={`${section.color} transition-colors duration-300 block ${active === section.id ? "underline underline-offset-8 decoration-amber-700 font-bold" : ""}`}
                onClick={() => setIsMenuOpen(false)}
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
