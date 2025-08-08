// components/MyWorks.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

type Project = {
  slug: string;
  title: string;
  year: string;
  role: string;
  cover: string; // ruta en /public
  accent?: "primary" | "electric";
  tags?: string[];
};

const projects: Project[] = [
  {
    slug: "mentema",
    title: "Mentema — Estrategia de marca y web corporativa",
    year: "2025",
    role: "Branding & Desarrollo Web",
    cover: "/works/pexels-kdadan97-31066045.jpg",
    accent: "primary",
    tags: ["Identidad Visual", "Next.js", "SEO"],
  },
  {
    slug: "vivo",
    title: "VIVO — Plataforma de empleo para talento senior",
    year: "2025",
    role: "UX Research & UI Design",
    cover: "/works/pexels-kdadan97-31066042.jpg",
    accent: "electric",
    tags: ["Experiencia de Usuario", "Accesibilidad", "React"],
  },
  {
    slug: "green-energy",
    title: "Green Energy — Landing Page para energías renovables",
    year: "2025",
    role: "Diseño Web & Optimización de Conversión",
    cover: "/works/pexels-codioful-6985055.jpg",
    tags: ["Landing Page", "GSAP Animations", "Performance"],
  },
  {
    slug: "brutalist-blog",
    title: "BrutalistBlog — Blog creativo y portafolio editorial",
    year: "2025",
    role: "Diseño Editorial & Desarrollo",
    cover: "/works/pexels-resourceboy-18541701.jpg",
    tags: ["Diseño Editorial", "Next.js", "SEO Avanzado"],
  },
];

const fadeUp = (d = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut", delay: d },
  viewport: { once: true, amount: 0.2 },
});

export const MyWorks = () => {
  return (
    <section id="projects" className="bg-paper text-ink py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        {/* Cabecera editorial asimétrica */}
        <div className="grid grid-cols-12 gap-6 mb-12">
          <motion.h2
            className="col-span-12 lg:col-span-7 font-serif text-display leading-[0.9] tracking-tight"
            {...fadeUp(0)}
          >
            Casos de éxito
          </motion.h2>
          <motion.p
            className="col-span-12 lg:col-span-5 text-sm leading-relaxed text-ink/80 lg:pt-3"
            {...fadeUp(0.1)}
          >
            Proyectos que combinan creatividad, diseño estratégico y desarrollo
            técnico para dar resultados reales a nuestros clientes.
          </motion.p>
        </div>

        {/* Rejilla editorial: 12 columnas, alturas automáticas */}
        <div className="grid grid-cols-12 gap-6 auto-rows-[1fr]">
          {projects.map((p, i) => (
            <motion.article
              key={p.slug}
              className={`
                group relative col-span-12 md:col-span-6 xl:col-span-4
                bg-white border-2 border-black shadow-brutal overflow-hidden
                focus-within:outline-none
              `}
              {...fadeUp(0.05 * i)}
            >
              {/* Imagen de portada */}
              <div className="relative aspect-[4/3]">
                <Image
                  src={p.cover}
                  alt={p.title}
                  fill
                  priority={i < 2}
                  sizes="(min-width:1280px) 33vw, (min-width:768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>

              {/* Capa de hover: fill negro desde abajo */}
              <div
                className={`
                  pointer-events-none absolute inset-0 -z-0
                  translate-y-full group-hover:translate-y-0 transition-transform duration-200
                  ${p.accent === "electric" ? "bg-electric" : "bg-black"}
                  mix-blend-multiply
                `}
              />

              {/* Contenido */}
              <div className="relative z-10 p-5">
                <header className="flex items-start justify-between gap-4">
                  <h3 className="font-serif text-2xl leading-tight">
                    {p.title}
                  </h3>
                  <span className="text-[11px] uppercase tracking-widest text-ink/60">
                    {p.year}
                  </span>
                </header>

                <p className="mt-2 text-[13px] uppercase tracking-wide text-ink/70">
                  {p.role}
                </p>

                {/* Tags pequeñas, editorial */}
                {p.tags && (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <li
                        key={t}
                        className="text-[11px] leading-none uppercase tracking-wider px-2 py-1 border border-black"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                )}

                {/* CTA brutal: cambia a blanco sobre hover negro */}
                <div className="mt-6">
                  <Link
                    href={`/${p.slug}`}
                    className={`
                      inline-block border-2 border-black px-4 py-2 text-sm font-semibold
                      transition-colors
                      group-hover:bg-black group-hover:text-white
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black
                    `}
                  >
                    Ver proyecto
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
