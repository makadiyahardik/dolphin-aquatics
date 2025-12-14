"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTheme } from "../ThemeProvider";

const achievements = [
  { number: "01", title: "ASCA Level 5", desc: "Highest coaching certification" },
  { number: "02", title: "AUSTSWIM", desc: "International accreditation" },
  { number: "03", title: "NIS Certified", desc: "National Institute of Sports" },
  { number: "04", title: "30+ Years", desc: "Excellence in coaching" },
];

export default function AboutElite() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const theme = useTheme();

  return (
    <section id="about" className="relative py-32 overflow-hidden" style={{ background: theme.backgroundAlt }}>
      {/* Geometric background pattern */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-32 h-32 border rotate-45"
            style={{
              left: `${(i % 5) * 25}%`,
              top: `${Math.floor(i / 5) * 25}%`,
              borderColor: theme.primary,
            }}
          />
        ))}
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header with horizontal line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="flex items-center gap-8 mb-20"
        >
          <motion.div
            className="h-px flex-1"
            style={{ background: `linear-gradient(90deg, transparent, ${theme.primary})` }}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          />
          <h2 className="text-5xl md:text-7xl font-bold font-[family-name:var(--font-playfair)]">
            <span className="text-white">THE</span>{" "}
            <span style={{ color: theme.primary }}>STORY</span>
          </h2>
          <motion.div
            className="h-px flex-1"
            style={{ background: `linear-gradient(90deg, ${theme.primary}, transparent)` }}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          />
        </motion.div>

        {/* Two column layout */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Left - Large quote */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative">
              <span
                className="absolute -top-8 -left-4 text-9xl font-serif opacity-20"
                style={{ color: theme.primary }}
              >
                &ldquo;
              </span>
              <p className="text-2xl md:text-3xl text-white leading-relaxed font-light">
                In pursuit of excellence, we have transformed swimming in India,
                creating champions who make the nation proud on the world stage.
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="w-16 h-1" style={{ background: theme.primary }} />
                <span className="text-gray-400 uppercase tracking-widest text-sm">Since 2010</span>
              </div>
            </div>
          </motion.div>

          {/* Right - Stats grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 gap-4"
          >
            {achievements.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="p-6 relative group"
                style={{
                  background: `linear-gradient(135deg, ${theme.card}90, ${theme.background}90)`,
                  borderLeft: `3px solid ${theme.primary}`,
                }}
              >
                <span
                  className="text-4xl font-bold opacity-20 absolute top-2 right-4"
                  style={{ color: theme.primary }}
                >
                  {item.number}
                </span>
                <h4 className="text-lg font-bold text-white mb-1">{item.title}</h4>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom section - Mission statement */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="relative"
        >
          <div
            className="p-12 md:p-16"
            style={{
              background: `linear-gradient(90deg, ${theme.primary}10, transparent, ${theme.primary}10)`,
              borderTop: `1px solid ${theme.primary}30`,
              borderBottom: `1px solid ${theme.primary}30`,
            }}
          >
            <div className="max-w-4xl mx-auto text-center">
              <motion.span
                className="inline-block px-4 py-1 text-xs uppercase tracking-widest mb-6"
                style={{ background: theme.primary, color: theme.background }}
              >
                Our Mission
              </motion.span>
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                Dolphin Aquatics Academy is dedicated to nurturing swimming talent from grassroots to elite level,
                providing world-class coaching and facilities to produce champions who represent India with pride.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
