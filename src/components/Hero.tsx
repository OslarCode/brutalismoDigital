"use client";

import { motion } from "framer-motion";

export function Hero() {
  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {/* Video de fondo */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      >
        <source src="/videos/2047965-hd_1280_720_30fps.mp4" type="video/mp4" />
        Tu navegador no soporta video HTML5.
      </video>

      {/* Overlay editorial duro (banda superior) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-16 bg-white border-b-2 border-black shadow-brutal" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-transparent" />
      </div>

      {/* Contenido */}
      <div className="relative z-10 h-full grid items-center">
        <div className="px-6 sm:px-12 lg:px-20">
          <motion.h1
            className="font-serif leading-none tracking-tight text-white"
            style={{ textShadow: "0 0 0 #000" }}
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="block text-display uppercase">
              Agencia de Diseño
            </span>
            <span className="block text-display uppercase text-primary">
              Digital & Creativo
            </span>
          </motion.h1>

          <motion.p
            className="mt-6 max-w-2xl text-white/90 text-deck"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Creamos experiencias visuales que combinan estética brutalista con
            precisión técnica. Branding, diseño web y desarrollo digital para
            marcas que buscan destacar en un mercado saturado.
          </motion.p>

          <motion.div
            className="mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <a href="#projects" className="brutal-btn inline-block">
              Ver proyectos
            </a>
          </motion.div>
        </div>
      </div>

      {/* Claim inferior */}
      <motion.p
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-xs tracking-[0.2em] uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        Diseño que comunica. Desarrollo que funciona.
      </motion.p>
    </section>
  );
}
