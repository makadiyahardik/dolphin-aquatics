"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { useTheme } from "./ThemeProvider";

const facilities = [
  { title: "Olympic-Size Pool", description: "World-class swimming pool meeting international standards at PDCSE", icon: "pool", features: ["50m Competition Pool", "Temperature Controlled", "Electronic Timing"], image: "/media/optimized/image15.webp" },
  { title: "Fitness Centre", description: "State-of-the-art gym equipment for comprehensive strength and conditioning", icon: "gym", features: ["Modern Equipment", "Personal Training", "Cardio Zone"], image: "/media/optimized/image30.webp" },
  { title: "Physiotherapy & Rehab", description: "Professional injury rehabilitation and sports physiotherapy services", icon: "health", features: ["Sports Medicine", "Recovery Programs", "Injury Prevention"], image: "/media/optimized/image19.webp" },
  { title: "Expert Coaching Team", description: "Internationally certified coaches dedicated to your swimming excellence", icon: "team", features: ["ASCA Certified", "AUSTSWIM Accredited", "NIS Qualified"], image: "/media/optimized/image39.webp" },
];

const programs = [
  { name: "Learn to Swim", level: "Beginners" },
  { name: "Stroke Development", level: "Intermediate" },
  { name: "Competitive Training", level: "Advanced" },
  { name: "Elite Squad", level: "Professional" },
];

const icons = {
  pool: <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4h18M3 8h18M3 12h18M3 16h18M3 20h18" /></svg>,
  gym: <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h7" /></svg>,
  health: <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
  team: <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
};

export default function Facilities() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeProgram, setActiveProgram] = useState(0);
  const theme = useTheme();

  return (
    <section id="facilities" className="relative py-32 overflow-hidden" style={{ background: theme.background }}>
      <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at center, ${theme.primary}08, transparent 70%)` }} />

      <div ref={ref} className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-20">
          <span style={{ color: theme.primary }} className="text-sm font-semibold tracking-widest uppercase">World-Class Infrastructure</span>
          <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-playfair)]">
            Our <span style={{ background: `linear-gradient(135deg, ${theme.primaryLight}, ${theme.primaryDark})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Facilities</span>
          </h2>
          <div className="mt-4 w-24 h-1 mx-auto" style={{ background: `linear-gradient(90deg, transparent, ${theme.primary}, transparent)` }} />
          <p className="mt-6 text-gray-400 max-w-2xl mx-auto">Train at the prestigious Padukone David Centre for Sports Excellence with state-of-the-art amenities designed for champions.</p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {facilities.map((facility, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }} className="group relative">
              <div className="relative aspect-square rounded-3xl flex flex-col transition-all duration-500 overflow-hidden"
                style={{ border: `1px solid ${theme.primary}15` }}>
                {/* Background Image */}
                <Image
                  src={facility.image}
                  alt={facility.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${theme.background}, ${theme.background}95, ${theme.background}60)` }} />

                <div className="relative flex flex-col h-full p-6">
                  <div className="mb-4">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center transition-colors" style={{ background: `${theme.primary}20`, color: theme.primary, backdropFilter: 'blur(8px)' }}>
                      {icons[facility.icon]}
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col mt-auto">
                    <h3 className="text-lg font-semibold text-white mb-2">{facility.title}</h3>
                    <p className="text-gray-300 text-xs mb-4 flex-1">{facility.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {facility.features.map((feature, fIndex) => (
                        <span key={fIndex} className="px-2 py-0.5 text-[10px] rounded-full" style={{ background: `${theme.primary}25`, color: theme.primaryLight, border: `1px solid ${theme.primary}40` }}>{feature}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.6 }} className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-playfair)]">
            Training <span style={{ background: `linear-gradient(135deg, ${theme.primaryLight}, ${theme.primaryDark})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Programs</span>
          </h3>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.7 }} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {programs.map((program, index) => (
            <motion.button key={index} onClick={() => setActiveProgram(index)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="relative p-6 rounded-2xl transition-all duration-300"
              style={{ border: `1px solid ${activeProgram === index ? theme.primary : theme.primary + '20'}`, background: activeProgram === index ? `${theme.primary}15` : `${theme.card}50` }}>
              <div className="w-3 h-3 rounded-full mx-auto mb-3" style={{ background: `linear-gradient(135deg, ${theme.primaryLight}, ${theme.primaryDark})` }} />
              <h4 className="font-semibold text-white mb-1">{program.name}</h4>
              <p className="text-xs text-gray-400">{program.level}</p>
            </motion.button>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-20 p-8 rounded-3xl" style={{ background: `linear-gradient(90deg, ${theme.card}80, ${theme.primary}15, ${theme.card}80)`, border: `1px solid ${theme.primary}30` }}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-white mb-2 font-[family-name:var(--font-playfair)]">Dolphin Aquatics Academy</h3>
              <p style={{ color: theme.primary }} className="font-medium">@ Padukone David Centre for Sports Excellence</p>
              <p className="text-gray-400 text-sm mt-2">Bengaluru, Karnataka, India</p>
            </div>
            <motion.a
              href="https://maps.google.com/?q=Padukone+David+Centre+for+Sports+Excellence+Bangalore"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 text-black font-bold rounded-full transition-all flex items-center gap-2"
              style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark})`, boxShadow: `0 4px 30px ${theme.primary}40` }}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              Get Directions
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
