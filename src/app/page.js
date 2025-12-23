"use client";

import { Suspense } from "react";
import ThemeProvider from "@/components/ThemeProvider";

import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Coach from "@/components/Coach";
import Champions from "@/components/Champions";
import Facilities from "@/components/Facilities";
import Footer from "@/components/Footer";

function HomeContent() {
  return (
    <ThemeProvider>
      <main className="relative">
        <Navigation />
        <Hero />
        <About />
        <Coach />
        <Champions />
        <Facilities />
        <Footer />
      </main>
    </ThemeProvider>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <HomeContent />
    </Suspense>
  );
}
