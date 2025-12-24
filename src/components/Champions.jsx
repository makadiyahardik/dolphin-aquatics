"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { useTheme } from "./ThemeProvider";

const champions = [
  { name: "Nisha Millet", achievement: "Olympian", event: "Sydney 2000", highlight: "Double Olympian", initials: "NM", image: "/media/nisha-millet.jpg" },
  { name: "Virdhawal Khade", achievement: "Asian Games Bronze", event: "Men's 50m Butterfly", highlight: "First medal since 1986", initials: "VK", image: "/media/virdhawal-khade.jpg" },
  { name: "Sandeep Sejwal", achievement: "Asian Games Bronze", event: "Men's 50m Breaststroke", highlight: "Incheon 2014", initials: "SS", image: "/media/sandeep-sejwal.jpg" },
  { name: "Shikha Tandon", achievement: "Arjuna Award Winner", event: "Multiple Events", highlight: "Olympian", initials: "ST", image: "/media/shikha-tandon.jpg" },
  { name: "Rehan Poncha", achievement: "International Medalist", event: "Multiple Events", highlight: "Asian Games", initials: "RP", image: "/media/rehan-poncha.jpg" },
  { name: "Srihari Nataraj", achievement: "National Record Holder", event: "Backstroke Events", highlight: "Olympian", initials: "SN", image: "/media/srihari-nataraj.jpg" },
  { name: "Maana Patel", achievement: "Olympian", event: "Backstroke Events", highlight: "Tokyo 2020", initials: "MP", image: "/media/maana-patel.jpg" },
  { name: "Dhinidhi Desinghu", achievement: "Olympian", event: "Paris 2024", highlight: "Youngest Swimmer", initials: "DD", image: "/media/dhinidhi-desinghu.jpg" },
  { name: "Hakimuddin Habibulla", achievement: "International Swimmer", event: "Multiple Events", highlight: "Team Coach", initials: "HH", image: "/media/hakimuddin-habibulla.jpg" },
];

export default function Champions() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const theme = useTheme();

  return (
    <section id="champions" className="relative py-32 overflow-hidden" style={{ background: theme.background }}>
      <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${theme.background}, ${theme.backgroundAlt}, ${theme.background})` }} />
      <motion.div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10" style={{ background: theme.primary }} />

      <div ref={ref} className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-8">
          <span style={{ color: theme.primary }} className="text-sm font-semibold tracking-widest uppercase">Our Pride</span>
          <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-playfair)]">
            Dolphin <span style={{ background: `linear-gradient(135deg, ${theme.primaryLight}, ${theme.primaryDark})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Champions</span>
          </h2>
          <div className="mt-4 w-24 h-1 mx-auto" style={{ background: `linear-gradient(90deg, transparent, ${theme.primary}, transparent)` }} />
        </motion.div>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }} className="text-center max-w-3xl mx-auto mb-16" style={{ color: theme.foregroundMuted }}>
          In international competitions, the highest honours achieved by Indian swimmers are from Dolphin.
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {champions.map((champion, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)} className="group relative">
              <motion.div animate={{ scale: hoveredIndex === index ? 1.05 : 1 }} transition={{ duration: 0.3 }}
                className="relative aspect-square rounded-2xl overflow-hidden" style={{ border: `1px solid ${theme.border || theme.backgroundAlt}` }}>
                <Image
                  src={champion.image}
                  alt={champion.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${theme.background}, ${theme.background}${theme.isLight ? 'dd' : '90'}, ${theme.background}${theme.isLight ? '80' : '00'})` }} />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h3 className="text-lg font-semibold mb-1" style={{ color: theme.foreground }}>{champion.name}</h3>
                  <p className="text-xs font-medium mb-1" style={{ color: theme.primary }}>{champion.achievement}</p>
                  <p className="text-xs" style={{ color: theme.foregroundMuted }}>{champion.event}</p>
                </div>
                {hoveredIndex === index && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold"
                    style={{ color: theme.buttonText, background: theme.primary }}>{champion.highlight}</motion.div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 1 }} className="mt-16 text-center">
          <motion.a href="#contact" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block px-8 py-4 font-bold rounded-full transition-all"
            style={{ color: theme.buttonText, background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark})`, boxShadow: `0 4px 30px ${theme.primary}40` }}>
            Start Training Today
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
