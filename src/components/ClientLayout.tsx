// components/ClientLayout.tsx
"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-white font-sans">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
