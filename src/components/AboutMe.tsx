"use client";

import { motion } from "framer-motion";

const fadeUp = (d = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: "easeOut", delay: d },
  viewport: { once: true, amount: 0.3 },
});

export const AboutMe = () => {
  return (
    <section id="about" className="relative bg-paper text-ink py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        {/* Grid asimétrico: 12 columnas */}
        <div className="grid grid-cols-12 gap-8">
          {/* Columna izquierda: titular display brutal + breve deck */}
          <div className="col-span-12 lg:col-span-7">
            <motion.h2
              className="font-serif text-display leading-[0.9] tracking-tight"
              {...fadeUp(0)}
            >
              Diseñamos experiencias digitales que impulsan marcas.
            </motion.h2>

            <motion.p
              className="mt-6 text-deck text-ink/80 max-w-2xl"
              {...fadeUp(0.15)}
            >
              Combinamos diseño editorial, interacción digital y tecnología de
              vanguardia para crear sitios web y marcas que destacan. Cada
              proyecto es una pieza única adaptada a la identidad y objetivos de
              nuestros clientes.
            </motion.p>

            {/* Bloque “lámina” brutalista a modo de placeholder visual (sin assets) */}
            <motion.div
              className="mt-10 border-2 border-black bg-white shadow-brutal h-64 w-full grid place-items-center"
              {...fadeUp(0.25)}
            >
              <span className="uppercase text-xs tracking-widest">
                Lamina / Referencia editorial
              </span>
            </motion.div>
          </div>

          {/* Columna derecha: pull-quote + bio breve y datos */}
          <div className="col-span-12 lg:col-span-5 space-y-8">
            {/* Pull quote editorial */}
            <motion.blockquote
              className="relative border-2 border-black bg-white shadow-brutal p-6"
              {...fadeUp(0.2)}
            >
              <span className="pointer-events-none select-none absolute -top-6 left-4 text-7xl font-serif leading-none">
                “
              </span>
              <p className="mt-2 font-serif text-2xl leading-snug">
                El diseño no es decoración, es estrategia visual al servicio del
                mensaje.
              </p>
              <footer className="mt-4 text-[12px] uppercase tracking-[0.2em] text-ink/60">
                Principio de trabajo
              </footer>
            </motion.blockquote>

            {/* Bio en sans pequeña */}
            <motion.div {...fadeUp(0.3)} className="space-y-4">
              <p className="text-sm leading-relaxed text-ink/90">
                Trabajamos con Next.js, Tailwind y animaciones precisas para
                crear interfaces que transmiten identidad de marca. Usamos
                sistemas de diseño claros, jerarquías visuales efectivas y un
                lenguaje gráfico coherente con tu estrategia.
              </p>
              <p className="text-sm leading-relaxed text-ink/90">
                En cada proyecto priorizamos accesibilidad, rendimiento y
                consistencia visual. Creamos sistemas de diseño escalables que
                funcionan en todos los canales, no solo páginas aisladas.
              </p>
            </motion.div>

            {/* Ficha técnica breve (editorial, 2 columnas pequeñas) */}
            <motion.dl
              {...fadeUp(0.35)}
              className="grid grid-cols-2 gap-4 text-[12px] uppercase tracking-wide"
            >
              <div className="border-2 border-black bg-white shadow-brutal p-4">
                <dt className="text-ink/60">Stack</dt>
                <dd className="mt-1 text-ink">Next.js · Tailwind · Framer</dd>
              </div>
              <div className="border-2 border-black bg-white shadow-brutal p-4">
                <dt className="text-ink/60">Enfoque</dt>
                <dd className="mt-1 text-ink">Editorial · Brutalista</dd>
              </div>
              <div className="border-2 border-black bg-white shadow-brutal p-4">
                <dt className="text-ink/60">Performance</dt>
                <dd className="mt-1 text-ink">First · Lazy & Split</dd>
              </div>
              <div className="border-2 border-black bg-white shadow-brutal p-4">
                <dt className="text-ink/60">Modo</dt>
                <dd className="mt-1 text-ink">Mobile-first</dd>
              </div>
            </motion.dl>
          </div>
        </div>
      </div>
    </section>
  );
};
