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

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const nav = document.querySelector("nav");
			if (nav && !nav.contains(event.target as Node)) {
				setIsMenuOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<header className="w-full fixed top-0 left-0 z-50 bg-gradient-to-r from-amber-100 via-orange-100 to-yellow-100 border-b border-amber-200 shadow-md transition-all duration-500">
			<nav className="w-full mx-auto flex items-center justify-between py-4 px-4 md:px-12">
				<div className="flex items-center gap-4 pl-0">
					<Image
						src="/logos/logo 22.png"
						alt="Logo Agua Música para Ser"
						width={44}
						height={44}
						className="w-auto h-11 rounded-full shadow-md border border-amber-200 bg-white"
					/>
					<div className="text-xl md:text-2xl font-bold text-amber-700 transition-all duration-300 hover:text-amber-900 text-left font-['Roboto']">
						Agua Música para Ser
					</div>
				</div>
				{/* Hamburger Button */}
				<button
					className="lg:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 transition-transform duration-300 hover:scale-110"
					onClick={() => setIsMenuOpen(!isMenuOpen)}
					aria-label="Toggle menu"
				>
					<span
						className={`block w-6 h-0.5 bg-amber-700 transition-all duration-300 ${
							isMenuOpen ? "rotate-45 translate-y-2" : ""
						}`}
					/>
					<span
						className={`block w-6 h-0.5 bg-amber-700 transition-all duration-300 ${
							isMenuOpen ? "opacity-0" : ""
						}`}
					/>
					<span
						className={`block w-6 h-0.5 bg-amber-700 transition-all duration-300 ${
							isMenuOpen ? "-rotate-45 -translate-y-2" : ""
						}`}
					/>
				</button>
				{/* Navigation Menu */}
				<ul
					className={`lg:flex gap-12 text-lg font-medium ml-auto absolute lg:relative top-full left-0 w-full lg:w-auto bg-gradient-to-r from-amber-100 via-orange-100 to-yellow-100 lg:bg-transparent p-4 lg:p-0 shadow-lg lg:shadow-none transition-all duration-500 ease-in-out ${
						isMenuOpen
							? "opacity-100 visible translate-y-0"
							: "opacity-0 invisible lg:opacity-100 lg:visible -translate-y-2 lg:translate-y-0"
					}`}
				>
					{sections.map((section) => (
						<li key={section.id} className="py-2 lg:py-0">
							<Link
								href={`#${section.id}`}
								className={`transition-all duration-300 block relative group font-['Roboto'] ${section.color} ${
									active === section.id
										? "font-bold underline underline-offset-8 decoration-amber-700"
										: ""
								}`}
								onClick={() => setIsMenuOpen(false)}
							>
								{section.label}
								<span
									className={`absolute bottom-0 left-0 w-0 h-0.5 bg-amber-700 transition-all duration-300 group-hover:w-full ${
										active === section.id ? "w-full" : ""
									}`}
								/>
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</header>
	);
}
