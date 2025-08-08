"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Hello", href: "#home" },
  { label: "Projects", href: "#projects" }, // corrige typo "Proyects"
  { label: "About", href: "#about" },
  { label: "Tech", href: "#technologies" },
  { label: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 4);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 w-full z-50 border-b-2 border-black bg-white text-black font-sans`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      style={{
        // efecto sticky brutal: sombra dura cuando scrollea
        boxShadow: isScrolled ? "6px 6px 0 0 #000" : "none",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 flex justify-between items-center">
        <Link
          href="#home"
          className="font-serif text-lg tracking-tight hover:opacity-80"
        >
          Portfolio
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative uppercase text-sm tracking-wider"
            >
              <span className="relative z-10 px-1"> {item.label} </span>
              {/* hover brutal: fill rectángulo negro */}
              <span className="absolute inset-0 -z-10 scale-y-0 origin-bottom bg-black transition-transform duration-200 group-hover:scale-y-100 md:hover:scale-y-100"></span>
              <style jsx>{`
                a:hover span:first-child {
                  color: white;
                }
              `}</style>
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            className="p-2 border-2 border-black hover:bg-black hover:text-white"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-white border-t-2 border-black"
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className="block uppercase tracking-wider"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
