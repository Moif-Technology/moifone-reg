import { Navbar } from "@/components/Navbar";
import { SidebarNav } from "@/components/SidebarNav";
import { Hero } from "@/components/sections/Hero";
import { BusinessTypes } from "@/components/sections/BusinessTypes";
import { Features } from "@/components/sections/Features";
import { WhyMoifone } from "@/components/sections/WhyMoifone";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <SidebarNav />
      <main className="flex-1">
        <Hero />
        <BusinessTypes />
        <Features />
        <WhyMoifone />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
