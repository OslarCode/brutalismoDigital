// app/page.tsx
import { ClientLayout } from "@/components/ClientLayout";
import { Hero } from "@/components/Hero";
import { AboutMe } from "@/components/AboutMe";
import { MyWorks } from "@/components/MyWorks";
import { Technologies } from "@/components/Technologies";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <ClientLayout>
      <Hero />
      <AboutMe />
      <MyWorks />
      <Technologies />
      <Contact />
    </ClientLayout>
  );
}
