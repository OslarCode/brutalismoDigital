// components/Technologies.tsx
"use client";

import { motion } from "framer-motion";
import {
  Cpu,
  Box,
  Wind,
  Braces,
  Server,
  Frame,
  Zap,
  Cube,
  Train,
  ScrollText,
} from "lucide-react";
import type { ComponentProps, ElementType } from "react";

type Tech = {
  name: string;
  icon: ElementType; // componente React válido
  note?: string;
};

// Fallback seguro si algún icono viene undefined
function FallbackIcon(props: ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={`h-6 w-6 border-2 border-current ${props.className ?? ""}`}
    />
  );
}

const techs: Tech[] = [
  { name: "React", icon: Cpu, note: "UI Library" },
  { name: "Next.js", icon: Box, note: "App Router" },
  { name: "Tailwind", icon: Wind, note: "Utility CSS" },
  { name: "TypeScript", icon: Braces, note: "Typed JS" },
  { name: "Node.js", icon: Server, note: "Runtime" },
  { name: "Framer Motion", icon: Frame, note: "Animations" },
  { name: "GSAP", icon: Zap, note: "Scroll/Timelines" },
  { name: "Three.js", icon: Cube, note: "WebGL" },
  { name: "Locomotive", icon: Train, note: "Smooth Scroll" },
  { name: "Lenis", icon: ScrollText, note: "Scroll Alt." },
];

const fadeUp = (d = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: "easeOut", delay: d },
  viewport: { once: true, amount: 0.2 },
});

export const Technologies = () => {
  return (
    <section id="technologies" className="bg-paper text-ink py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        {/* Cabecera editorial */}
        <div className="grid grid-cols-12 gap-6 mb-10">
          <motion.h2
            className="col-span-12 lg:col-span-7 font-serif text-display leading-[0.9] tracking-tight"
            {...fadeUp(0)}
          >
            Herramientas que potencian nuestras ideas
          </motion.h2>
          <motion.p
            className="col-span-12 lg:col-span-5 text-sm leading-relaxed text-ink/80 lg:pt-3"
            {...fadeUp(0.1)}
          >
            Seleccionamos cada herramienta por su capacidad de potenciar el
            diseño, optimizar la experiencia de usuario y garantizar resultados
            medibles.
          </motion.p>
        </div>

        {/* Grid brutalista */}
        <div className="grid grid-cols-12 gap-6">
          {techs.map((t, i) => {
            const IconComp = (t.icon as ElementType) || FallbackIcon;
            return (
              <motion.div
                key={t.name}
                className={`
                  group col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3
                  bg-white border-2 border-black shadow-brutal
                  p-6 flex items-center gap-4
                  transition-colors
                  hover:bg-black hover:text-white
                `}
                {...fadeUp(0.05 * i)}
              >
                <div
                  className={`
                    shrink-0 grid place-items-center
                    h-12 w-12 border-2 border-black
                    group-hover:border-white
                  `}
                >
                  <IconComp className="h-6 w-6" />
                </div>

                <div className="min-w-0">
                  <h3 className="font-serif text-xl leading-tight truncate">
                    {t.name}
                  </h3>
                  <p className="mt-1 text-[11px] uppercase tracking-wider opacity-70">
                    {t.note || "—"}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          className="mt-8 text-[11px] uppercase tracking-wider text-ink/60"
          {...fadeUp(0.2)}
        >
          Un stack pensado para rendimiento, accesibilidad y escalabilidad.
        </motion.p>
      </div>
    </section>
  );
};
