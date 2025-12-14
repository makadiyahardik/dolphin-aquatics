"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTheme } from "../ThemeProvider";

export default function HeroElite() {
  const theme = useTheme();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <section ref={containerRef} id="home" className="relative min-h-screen overflow-hidden" style={{ background: theme.background }}>
      {/* Diagonal split background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0" style={{
          background: `linear-gradient(135deg, ${theme.background} 50%, ${theme.backgroundAlt} 50%)`
        }} />
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20"
          style={{ background: `linear-gradient(180deg, ${theme.primary}30, transparent)` }} />
      </div>

      {/* Animated lines */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-px w-full"
          style={{ top: `${20 + i * 15}%`, background: `linear-gradient(90deg, transparent, ${theme.primary}30, transparent)` }}
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "linear" }}
        />
      ))}

      {/* Content - Split layout */}
      <div className="relative z-10 min-h-screen flex">
        {/* Left side - Text */}
        <div className="w-full lg:w-1/2 flex items-center px-8 lg:px-16">
          <motion.div initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
            {/* Vertical accent line */}
            <motion.div
              className="w-1 h-20 mb-8 rounded-full"
              style={{ background: `linear-gradient(180deg, ${theme.primary}, ${theme.primaryDark})` }}
              initial={{ height: 0 }} animate={{ height: 80 }} transition={{ delay: 0.5, duration: 0.8 }}
            />

            <motion.span
              className="text-sm font-bold tracking-[0.5em] uppercase block mb-4"
              style={{ color: theme.primary }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            >
              Since 2010
            </motion.span>

            <motion.h1
              className="text-6xl lg:text-8xl font-bold leading-none mb-6 font-[family-name:var(--font-playfair)]"
              initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }}
            >
              <span className="text-white block">DOLPHIN</span>
              <span style={{
                background: `linear-gradient(90deg, ${theme.primaryLight}, ${theme.primary})`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
              }}>AQUATICS</span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-400 mb-10 max-w-md"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            >
              India&apos;s #1 Swimming Academy. World-class coaching by Dronacharya Award winner.
            </motion.p>

            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
            >
              <motion.button
                whileHover={{ scale: 1.05, x: 10 }}
                whileTap={{ scale: 0.95 }}
                className="group px-8 py-4 text-black font-bold text-lg flex items-center gap-3"
                style={{ background: `linear-gradient(90deg, ${theme.primary}, ${theme.primaryDark})` }}
              >
                ENROLL NOW
                <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Right side - Visual element */}
        <motion.div style={{ y }} className="hidden lg:flex w-1/2 items-center justify-center relative">
          {/* Large circle decoration */}
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full"
            style={{ border: `1px solid ${theme.primary}30` }}
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full"
            style={{ border: `1px solid ${theme.primary}20` }}
            animate={{ rotate: -360 }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          />

          {/* Center content */}
          <motion.div
            className="relative z-10 text-center"
            initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}
          >
            <div className="w-48 h-48 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark})`, boxShadow: `0 0 100px ${theme.primary}50` }}>
              <span className="text-7xl font-bold text-black font-[family-name:var(--font-playfair)]">#1</span>
            </div>
            <p className="text-white text-xl font-bold">IN INDIA</p>
            <p className="text-gray-400">Since 2010</p>
          </motion.div>

          {/* Stats floating around */}
          {[
            { value: "30+", label: "Years", pos: "top-20 right-20" },
            { value: "500+", label: "Champions", pos: "bottom-32 right-10" },
            { value: "50+", label: "Medals", pos: "bottom-20 left-20" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className={`absolute ${stat.pos} text-center p-4 rounded-xl`}
              style={{ background: `${theme.card}90`, border: `1px solid ${theme.primary}30` }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + i * 0.2 }}
              whileHover={{ scale: 1.1 }}
            >
              <div className="text-2xl font-bold" style={{ color: theme.primary }}>{stat.value}</div>
              <div className="text-xs text-gray-400 uppercase">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2"
        animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-8 h-12 rounded-full flex items-center justify-center" style={{ border: `2px solid ${theme.primary}50` }}>
          <motion.div className="w-2 h-2 rounded-full" style={{ background: theme.primary }}
            animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }} />
        </div>
      </motion.div>
    </section>
  );
}
