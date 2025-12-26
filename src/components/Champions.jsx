"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { useTheme } from "./ThemeProvider";

const champions = [
  { name: "Nisha Millet", achievement: "Arjuna Award Winner", event: "Sydney 2000 Olympian", highlight: "14 Gold Medals", initials: "NM", image: "/media/nisha-millet-new.jpg" },
  { name: "Shikha Tandon", achievement: "Arjuna Award Winner", event: "146 National Medals", highlight: "36 Int'l Medals", initials: "ST", image: "/media/shikha-tandon-new.jpg" },
  { name: "Rehan Poncha", achievement: "Arjuna Award Winner", event: "Beijing 2008 Olympian", highlight: "6x National Champ", initials: "RP", image: "/media/rehan-poncha-new.jpg" },
  { name: "Virdhawal Khade", achievement: "Arjuna Award Winner", event: "50m Butterfly", highlight: "Asian Games Bronze", initials: "VK", image: "/media/virdhawal-khade-new.jpg" },
  { name: "Sandeep Sejwal", achievement: "Arjuna Award Winner", event: "Beijing 2008 Olympian", highlight: "Breaststroke", initials: "SS", image: "/media/sandeep-sejwal-new.jpg" },
  { name: "Maana Patel", achievement: "Tokyo 2020 Olympian", event: "100m Backstroke", highlight: "First Indian Female", initials: "MP", image: "/media/maana-patel-new.jpg" },
  { name: "Srihari Nataraj", achievement: "Two-time Olympian", event: "Tokyo 2020 & Paris 2024", highlight: "14 National Records", initials: "SN", image: "/media/srihari-nataraj-new.jpg" },
  { name: "Dhinidhi Desinghu", achievement: "Paris 2024 Olympian", event: "Freestyle Events", highlight: "Youngest at Olympics", initials: "DD", image: "/media/dhinidhi-desinghu-new.jpg" },
  { name: "Rohith Benediction", achievement: "National Champion", event: "Multiple Events", highlight: "Rising Star", initials: "RB", image: "/media/rohith-benediction.jpg" },
  { name: "Rujula Shashidhara", achievement: "National Medalist", event: "Freestyle & Backstroke", highlight: "State Champion", initials: "RS", image: "/media/rujula-shashidhara.jpg" },
  { name: "Hakimuddin Habibulla", achievement: "International Swimmer", event: "Sydney 2000", highlight: "Team Coach", initials: "HH", image: "/media/hakimuddin-habibulla-new.jpg" },
];

export default function Champions() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const theme = useTheme();

  // For v=6: use WATER BLUE background (same as hero)
  const isWaterSection = theme.useAlternatingBg;
  const sectionBg = isWaterSection ? theme.sectionWater : theme.background;
  // For v=6: use dark navy for card overlays to ensure text readability
  const cardOverlay = isWaterSection ? theme.sectionDark : sectionBg;

  return (
    <section id="champions" className="relative py-32 overflow-hidden" style={{ background: sectionBg }}>
      {!theme.useAlternatingBg && (
        <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${theme.background}, ${theme.backgroundAlt}, ${theme.background})` }} />
      )}
      {!isWaterSection && (
        <motion.div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10" style={{ background: theme.primary }} />
      )}

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
                className="relative aspect-square rounded-2xl overflow-hidden" style={{ border: isWaterSection ? `2px solid ${theme.sectionDark}40` : `1px solid ${theme.border || theme.backgroundAlt}` }}>
                <Image
                  src={champion.image}
                  alt={champion.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Dark overlay for text readability */}
                <div className="absolute inset-0" style={{
                  background: isWaterSection
                    ? `linear-gradient(to top, ${cardOverlay}ff, ${cardOverlay}dd 40%, ${cardOverlay}00 70%)`
                    : `linear-gradient(to top, ${sectionBg}, ${sectionBg}${theme.isLight ? 'dd' : '90'}, ${sectionBg}${theme.isLight ? '80' : '00'})`
                }} />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h3 className="text-lg font-semibold mb-1" style={{ color: theme.foreground }}>{champion.name}</h3>
                  <p className="text-xs font-medium mb-1" style={{ color: isWaterSection ? theme.sectionWater : theme.primary }}>{champion.achievement}</p>
                  <p className="text-xs" style={{ color: theme.foregroundMuted }}>{champion.event}</p>
                </div>
                {hoveredIndex === index && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold"
                    style={{ color: isWaterSection ? theme.sectionDark : theme.buttonText, background: isWaterSection ? theme.sectionWater : theme.primary }}>{champion.highlight}</motion.div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 1 }} className="mt-16 text-center">
          <motion.a href="#contact" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block px-8 py-4 font-bold rounded-full transition-all"
            style={{
              color: isWaterSection ? theme.foreground : theme.buttonText,
              background: isWaterSection
                ? theme.sectionDark
                : `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark})`,
              boxShadow: isWaterSection ? `0 4px 30px ${theme.sectionDark}60` : `0 4px 30px ${theme.primary}40`
            }}>
            Start Training Today
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
