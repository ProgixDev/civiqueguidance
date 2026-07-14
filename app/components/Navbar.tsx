"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "/services", label: "Services" },
  { href: "/#app", label: "App" },
  { href: "/#expertise", label: "Expertise" },
  { href: "/a-propos", label: "À propos" },
  { href: "/compte", label: "Mon compte" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 border-b border-outline-variant transition-all ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-surface-container-lowest"
      }`}
    >
      <div className="flex justify-between items-center h-24 w-full pl-4 pr-4 md:pl-6 md:pr-16">
        <Link href="/" className="flex items-center gap-4">
          <Image
            src="/logo.png"
            alt="DémarchesCivique Logo"
            width={80}
            height={80}
            className="h-16 w-16 sm:h-20 sm:w-20 object-contain"
            priority
          />
          <span className="text-[24px] leading-8 font-bold text-french-blue tracking-tight">
            DémarchesCivique
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[14px] font-bold text-on-surface-variant hover:text-french-blue transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/#rendez-vous"
            className="inline-flex items-center gap-2 border-2 border-french-blue text-french-blue px-5 py-2.5 rounded-lg text-[14px] font-bold hover:bg-french-blue hover:text-white transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">
              calendar_month
            </span>
            Prendre rendez-vous
          </Link>
          <Link
            href="/demande"
            className="bg-french-blue text-white px-6 py-3 rounded-lg text-[14px] font-bold hover:opacity-90 transition-opacity active:scale-[0.98]"
          >
            Demander un service
          </Link>
        </div>

        <button
          className="md:hidden text-french-blue p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          <span className="material-symbols-outlined">
            {open ? "close" : "menu"}
          </span>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-outline-variant bg-white px-page py-4 flex flex-col gap-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-[14px] font-bold text-on-surface-variant hover:text-french-blue"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/#rendez-vous"
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center gap-2 border-2 border-french-blue text-french-blue px-6 py-3 rounded-lg text-[14px] font-bold text-center"
          >
            <span className="material-symbols-outlined text-[18px]">
              calendar_month
            </span>
            Prendre rendez-vous
          </Link>
          <Link
            href="/demande"
            onClick={() => setOpen(false)}
            className="bg-french-blue text-white px-6 py-3 rounded-lg text-[14px] font-bold text-center"
          >
            Demander un service
          </Link>
        </div>
      )}
    </nav>
  );
}
