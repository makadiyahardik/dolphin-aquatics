"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useTheme } from "../ThemeProvider";

const champions = [
  { name: "Virdhawal Khade", achievement: "Asian Games Bronze", event: "50m Butterfly", year: "2010", initials: "VK" },
  { name: "Sandeep Sejwal", achievement: "Asian Games Bronze", event: "50m Breaststroke", year: "2014", initials: "SS" },
  { name: "Srihari Natraj", achievement: "National Record", event: "Backstroke", year: "2021", initials: "SN" },
  { name: "Nisha Millet", achievement: "Olympian", event: "Multiple Events", year: "2000", initials: "NM" },
  { name: "Shikha Tandon", achievement: "Arjuna Award", event: "Multiple Events", year: "2008", initials: "ST" },
  { name: "Maana Patel", achievement: "Olympian", event: "Backstroke", year: "2021", initials: "MP" },
];

export default function ChampionsElite() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const theme = useTheme();

  return (
    <section id="champions" className="relative py-32 overflow-hidden" style={{ background: theme.backgroundAlt }}>
      {/* Vertical lines background */}
      <div className="absolute inset-0 flex justify-around opacity-5">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="w-px h-full" style={{ background: theme.primary }} />
        ))}
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span
            className="text-xs font-bold tracking-[0.5em] uppercase block mb-4"
            style={{ color: theme.primary }}
          >
            Hall of Fame
          </span>
          <h2 className="text-5xl md:text-7xl font-bold font-[family-name:var(--font-playfair)]">
            <span className="text-white">OUR</span>{" "}
            <span style={{ color: theme.primary }}>CHAMPIONS</span>
          </h2>
          <div className="mt-6 flex items-center justify-center gap-4">
            <div className="w-16 h-px" style={{ background: theme.primary }} />
            <span className="text-gray-400 text-sm">Making India Proud</span>
            <div className="w-16 h-px" style={{ background: theme.primary }} />
          </div>
        </motion.div>

        {/* Featured Champion Display */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Left - Featured */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div
              className="aspect-square flex items-center justify-center relative"
              style={{
                background: `linear-gradient(135deg, ${theme.card}, ${theme.background})`,
                border: `1px solid ${theme.primary}30`,
              }}
            >
              {/* Large initials */}
              <motion.span
                key={activeIndex}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.1 }}
                transition={{ duration: 0.3 }}
                className="text-[200px] font-bold font-[family-name:var(--font-playfair)]"
                style={{ color: theme.primary }}
              >
                {champions[activeIndex].initials}
              </motion.span>

              {/* Year badge */}
              <div
                className="absolute top-8 left-8 px-4 py-2"
                style={{ background: theme.primary }}
              >
                <span className="text-black font-bold">{champions[activeIndex].year}</span>
              </div>

              {/* Achievement badge */}
              <motion.div
                key={`badge-${activeIndex}`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-8 right-8 text-right"
              >
                <span
                  className="text-sm font-bold uppercase tracking-wider block"
                  style={{ color: theme.primary }}
                >
                  {champions[activeIndex].achievement}
                </span>
                <span className="text-gray-400 text-xs">{champions[activeIndex].event}</span>
              </motion.div>
            </div>

            {/* Name below */}
            <motion.div
              key={`name-${activeIndex}`}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="mt-6"
            >
              <h3 className="text-3xl md:text-4xl font-bold text-white font-[family-name:var(--font-playfair)]">
                {champions[activeIndex].name}
              </h3>
            </motion.div>
          </motion.div>

          {/* Right - Champion list */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col justify-center"
          >
            <div className="space-y-4">
              {champions.map((champion, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                  className={`w-full p-6 text-left transition-all duration-300 flex items-center justify-between group ${
                    activeIndex === index ? "pl-10" : ""
                  }`}
                  style={{
                    background: activeIndex === index
                      ? `linear-gradient(90deg, ${theme.primary}20, transparent)`
                      : "transparent",
                    borderLeft: activeIndex === index
                      ? `4px solid ${theme.primary}`
                      : `4px solid transparent`,
                  }}
                >
                  <div className="flex items-center gap-6">
                    <span
                      className="text-2xl font-bold font-[family-name:var(--font-playfair)] w-12"
                      style={{ color: activeIndex === index ? theme.primary : theme.primary + "40" }}
                    >
                      {champion.initials}
                    </span>
                    <div>
                      <h4 className={`font-semibold transition-colors ${
                        activeIndex === index ? "text-white" : "text-gray-400"
                      }`}>
                        {champion.name}
                      </h4>
                      <p className="text-xs text-gray-500">{champion.achievement}</p>
                    </div>
                  </div>
                  <svg
                    className={`w-5 h-5 transition-all ${
                      activeIndex === index ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                    }`}
                    style={{ color: theme.primary }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center"
        >
          <p className="text-gray-400 mb-6">Join the legacy. Become the next champion.</p>
          <motion.button
            whileHover={{ scale: 1.05, x: 10 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 text-black font-bold flex items-center gap-3 mx-auto"
            style={{ background: `linear-gradient(90deg, ${theme.primary}, ${theme.primaryDark})` }}
          >
            START YOUR JOURNEY
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
