// components/Footer.tsx
"use client";

import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

const nav = [
  { label: "Hello", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Tech", href: "#technologies" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  { label: "GitHub", href: "https://github.com/", Icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/", Icon: Linkedin },
  { label: "Email", href: "mailto:hello@example.com", Icon: Mail },
];

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-paper text-ink border-t-2 border-black">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 py-16">
        <div className="grid grid-cols-12 gap-8">
          {/* Marca / Claim */}
          <div className="col-span-12 lg:col-span-6">
            <h3 className="font-serif text-4xl sm:text-5xl leading-none tracking-tight">
              Brutalismo Digital
            </h3>
            <p className="mt-4 text-sm text-ink/80 max-w-md">
              Diseño editorial, microinteracciones duras y rendimiento real.
              Menos decoración, más dirección.
            </p>
          </div>

          {/* Navegación */}
          <nav className="col-span-12 sm:col-span-6 lg:col-span-3">
            <h4 className="uppercase text-[12px] tracking-widest text-ink/60">
              Navegación
            </h4>
            <ul className="mt-4 space-y-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="relative inline-block px-1 uppercase text-sm tracking-wider"
                  >
                    <span className="relative z-10">{item.label}</span>
                    <span className="absolute inset-0 -z-10 scale-y-0 origin-bottom bg-black transition-transform duration-200 hover:scale-y-100" />
                    <style jsx>{`
                      a:hover span:first-child {
                        color: white;
                      }
                    `}</style>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-3">
            <h4 className="uppercase text-[12px] tracking-widest text-ink/60">
              Conecta
            </h4>
            <ul className="mt-4 flex gap-3">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <Link
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      href.startsWith("http")
                        ? "noreferrer noopener"
                        : undefined
                    }
                    aria-label={label}
                    className="group grid place-items-center h-12 w-12 border-2 border-black bg-white shadow-brutal hover:bg-black transition-colors"
                    title={label}
                  >
                    <Icon className="h-5 w-5 text-black group-hover:text-white" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal / bottom bar */}
        <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t-2 border-black pt-4">
          <p className="text-[12px] uppercase tracking-wider text-ink/60">
            © {year} — Hecho con Next.js y Tailwind
          </p>
          <div className="flex gap-4 text-[12px] uppercase tracking-wider">
            <Link href="/privacy" className="relative px-1">
              <span className="relative z-10">Privacidad</span>
              <span className="absolute inset-0 -z-10 scale-y-0 origin-bottom bg-black transition-transform duration-200 hover:scale-y-100" />
              <style jsx>{`
                a:hover span:first-child {
                  color: white;
                }
              `}</style>
            </Link>
            <Link href="/terms" className="relative px-1">
              <span className="relative z-10">Términos</span>
              <span className="absolute inset-0 -z-10 scale-y-0 origin-bottom bg-black transition-transform duration-200 hover:scale-y-100" />
              <style jsx>{`
                a:hover span:first-child {
                  color: white;
                }
              `}</style>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
