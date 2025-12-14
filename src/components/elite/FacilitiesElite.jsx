"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useTheme } from "../ThemeProvider";

const facilities = [
  {
    id: "01",
    title: "Olympic Pool",
    subtitle: "50m Competition Standard",
    description: "Train in a world-class Olympic-size pool meeting international FINA standards with electronic timing systems.",
    features: ["Temperature Controlled", "Electronic Timing", "8 Lane Competition"],
  },
  {
    id: "02",
    title: "Fitness Centre",
    subtitle: "Strength & Conditioning",
    description: "State-of-the-art gym equipment designed specifically for swimmers to build power and endurance.",
    features: ["Modern Equipment", "Personal Training", "Recovery Zone"],
  },
  {
    id: "03",
    title: "Sports Medicine",
    subtitle: "Physiotherapy & Rehab",
    description: "Professional injury rehabilitation and prevention programs to keep athletes performing at their best.",
    features: ["Sports Physio", "Injury Prevention", "Performance Analysis"],
  },
  {
    id: "04",
    title: "Expert Coaches",
    subtitle: "World-Class Team",
    description: "Learn from internationally certified coaches with decades of experience producing champions.",
    features: ["ASCA Certified", "AUSTSWIM Accredited", "NIS Qualified"],
  },
];

export default function FacilitiesElite() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState(0);
  const theme = useTheme();

  return (
    <section id="facilities" className="relative py-32 overflow-hidden" style={{ background: theme.background }}>
      {/* Geometric accent */}
      <div
        className="absolute top-0 left-0 w-1/3 h-full opacity-5"
        style={{
          background: `repeating-linear-gradient(
            45deg,
            ${theme.primary},
            ${theme.primary} 1px,
            transparent 1px,
            transparent 40px
          )`,
        }}
      />

      <div ref={ref} className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="flex items-end justify-between flex-wrap gap-8">
            <div>
              <span
                className="text-xs font-bold tracking-[0.5em] uppercase block mb-4"
                style={{ color: theme.primary }}
              >
                World-Class Infrastructure
              </span>
              <h2 className="text-5xl md:text-7xl font-bold font-[family-name:var(--font-playfair)]">
                <span className="text-white">OUR</span>{" "}
                <span style={{ color: theme.primary }}>FACILITIES</span>
              </h2>
            </div>
            <div className="text-right">
              <p className="text-gray-400 max-w-md">
                Train at the prestigious Padukone David Centre for Sports Excellence
              </p>
            </div>
          </div>
        </motion.div>

        {/* Tabs navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex gap-2 mb-12 overflow-x-auto pb-4"
        >
          {facilities.map((facility, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveTab(index)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="flex-shrink-0 px-6 py-4 transition-all duration-300 flex items-center gap-4"
              style={{
                background: activeTab === index
                  ? `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark})`
                  : `${theme.card}80`,
                color: activeTab === index ? theme.background : "white",
                border: activeTab === index ? "none" : `1px solid ${theme.primary}20`,
              }}
            >
              <span className={`text-sm font-bold ${activeTab === index ? "" : "opacity-50"}`}>
                {facility.id}
              </span>
              <span className="font-semibold">{facility.title}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Active facility display */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid lg:grid-cols-2 gap-12"
        >
          {/* Left - Visual */}
          <div
            className="aspect-video lg:aspect-square flex items-center justify-center relative"
            style={{
              background: `linear-gradient(135deg, ${theme.card}, ${theme.backgroundAlt})`,
              border: `1px solid ${theme.primary}20`,
            }}
          >
            {/* Large number */}
            <span
              className="text-[250px] font-bold font-[family-name:var(--font-playfair)] opacity-5"
              style={{ color: theme.primary }}
            >
              {facilities[activeTab].id}
            </span>

            {/* Floating icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="absolute w-24 h-24 rounded-full flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark})`,
                boxShadow: `0 0 60px ${theme.primary}40`,
              }}
            >
              <svg className="w-10 h-10 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </motion.div>

            {/* Corner accents */}
            <div
              className="absolute top-0 right-0 w-32 h-32"
              style={{
                borderTop: `3px solid ${theme.primary}`,
                borderRight: `3px solid ${theme.primary}`,
              }}
            />
            <div
              className="absolute bottom-0 left-0 w-32 h-32"
              style={{
                borderBottom: `3px solid ${theme.primary}`,
                borderLeft: `3px solid ${theme.primary}`,
              }}
            />
          </div>

          {/* Right - Content */}
          <div className="flex flex-col justify-center">
            <span
              className="text-6xl font-bold font-[family-name:var(--font-playfair)] mb-4 opacity-20"
              style={{ color: theme.primary }}
            >
              {facilities[activeTab].id}
            </span>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 font-[family-name:var(--font-playfair)]">
              {facilities[activeTab].title}
            </h3>
            <p className="text-lg mb-6" style={{ color: theme.primary }}>
              {facilities[activeTab].subtitle}
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              {facilities[activeTab].description}
            </p>

            {/* Features */}
            <div className="flex flex-wrap gap-3 mb-10">
              {facilities[activeTab].features.map((feature, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="px-4 py-2 text-sm"
                  style={{
                    background: `${theme.primary}15`,
                    border: `1px solid ${theme.primary}30`,
                    color: theme.primary,
                  }}
                >
                  {feature}
                </motion.span>
              ))}
            </div>

            {/* Navigation arrows */}
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setActiveTab((prev) => (prev === 0 ? facilities.length - 1 : prev - 1))}
                className="w-12 h-12 flex items-center justify-center"
                style={{ border: `1px solid ${theme.primary}40` }}
              >
                <svg className="w-5 h-5" style={{ color: theme.primary }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setActiveTab((prev) => (prev === facilities.length - 1 ? 0 : prev + 1))}
                className="w-12 h-12 flex items-center justify-center"
                style={{ background: theme.primary }}
              >
                <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Location bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 p-8 flex flex-col md:flex-row items-center justify-between gap-6"
          style={{
            background: `linear-gradient(90deg, ${theme.card}80, ${theme.primary}10, ${theme.card}80)`,
            borderTop: `1px solid ${theme.primary}30`,
            borderBottom: `1px solid ${theme.primary}30`,
          }}
        >
          <div>
            <h4 className="text-xl font-bold text-white mb-1 font-[family-name:var(--font-playfair)]">
              Padukone David Centre for Sports Excellence
            </h4>
            <p className="text-gray-400">Bengaluru, Karnataka, India</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 text-black font-bold flex items-center gap-3"
            style={{ background: `linear-gradient(90deg, ${theme.primary}, ${theme.primaryDark})` }}
          >
            GET DIRECTIONS
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
