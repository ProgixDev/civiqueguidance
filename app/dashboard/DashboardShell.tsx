"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getCurrentUser, logout } from "@/lib/admin-auth";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Services" },
  { href: "/a-propos", label: "À propos" },
  { href: "/demande", label: "Contact" },
  { href: "/dashboard", label: "Dashboard" },
];

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const user = await getCurrentUser();
      if (!user) {
        router.replace("/admin/login");
        return;
      }
      setEmail(user.email ?? null);
      setReady(true);
    })();
  }, [router]);

  async function onLogout() {
    await logout();
    router.replace("/");
    router.refresh();
  }

  if (!ready) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-[14px] text-on-surface-variant">Chargement…</p>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f6fa]">
      <header className="bg-white border-b border-ink-black/8 sticky top-0 z-40">
        <div className="flex items-center justify-between gap-6 px-4 md:px-8 h-16 max-w-content mx-auto">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Logo"
              width={36}
              height={36}
              className="h-9 w-9 object-contain"
            />
            <span className="text-[16px] font-black tracking-tight text-ink-black hidden sm:inline">
              DÉMARCHES CIVIQUES
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`text-[13px] font-bold transition-colors ${
                    active
                      ? "text-french-blue"
                      : "text-on-surface-variant hover:text-french-blue"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            {email && (
              <span className="hidden lg:inline text-[12px] text-on-surface-variant">
                {email}
              </span>
            )}
            <button
              type="button"
              onClick={onLogout}
              className="inline-flex items-center gap-2 bg-marianne-red/5 hover:bg-marianne-red text-marianne-red hover:text-white border border-marianne-red/20 hover:border-marianne-red px-4 py-2 rounded-lg text-[13px] font-bold transition-all"
            >
              <span
                className="material-symbols-outlined text-[18px]"
                style={{ fontVariationSettings: "'wght' 400" }}
              >
                logout
              </span>
              <span className="hidden sm:inline">Déconnexion</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-content mx-auto px-4 md:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
