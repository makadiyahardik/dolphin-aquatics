"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTheme } from "../ThemeProvider";

const credentials = [
  { year: "1994", title: "Started Coaching", desc: "Began professional journey" },
  { year: "2010", title: "Dolphin Aquatics", desc: "Founded the academy" },
  { year: "2019", title: "Dronacharya Award", desc: "Highest coaching honor" },
  { year: "2024", title: "30+ Years", desc: "Of excellence" },
];

const certifications = ["ASCA Level 5", "AUSTSWIM", "NIS Diploma", "FINA Coach"];

export default function CoachElite() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const theme = useTheme();

  return (
    <section id="coach" className="relative py-32 overflow-hidden" style={{ background: theme.background }}>
      {/* Background accent */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full opacity-30"
        style={{ background: `linear-gradient(270deg, ${theme.primary}10, transparent)` }}
      />

      <div ref={ref} className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-16"
        >
          <span
            className="text-xs font-bold tracking-[0.5em] uppercase"
            style={{ color: theme.primary }}
          >
            The Coach
          </span>
          <div className="h-px flex-1" style={{ background: `${theme.primary}30` }} />
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left - Image placeholder & name */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5"
          >
            {/* Image area with initials */}
            <div className="relative">
              <div
                className="aspect-[3/4] flex items-center justify-center relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${theme.card}, ${theme.backgroundAlt})`,
                  border: `1px solid ${theme.primary}20`,
                }}
              >
                {/* Large initials */}
                <span
                  className="text-[150px] font-bold font-[family-name:var(--font-playfair)] opacity-10"
                  style={{ color: theme.primary }}
                >
                  NA
                </span>

                {/* Decorative corner accents */}
                <div
                  className="absolute top-0 left-0 w-20 h-20"
                  style={{ borderTop: `3px solid ${theme.primary}`, borderLeft: `3px solid ${theme.primary}` }}
                />
                <div
                  className="absolute bottom-0 right-0 w-20 h-20"
                  style={{ borderBottom: `3px solid ${theme.primary}`, borderRight: `3px solid ${theme.primary}` }}
                />

                {/* Award badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.8, type: "spring" }}
                  className="absolute bottom-6 right-6 w-24 h-24 rounded-full flex flex-col items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark})`,
                    boxShadow: `0 0 40px ${theme.primary}50`,
                  }}
                >
                  <svg className="w-8 h-8 text-black mb-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2Z" />
                  </svg>
                  <span className="text-[8px] font-bold text-black uppercase tracking-wider">Dronacharya</span>
                </motion.div>
              </div>

              {/* Name below image */}
              <div className="mt-8">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-playfair)]"
                >
                  <span className="text-white">NIHAR</span>{" "}
                  <span style={{ color: theme.primary }}>AMEEN</span>
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="text-gray-400 mt-2 uppercase tracking-widest text-sm"
                >
                  Head Coach & Founder
                </motion.p>
              </div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-7 lg:pl-8"
          >
            {/* Bio */}
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              Coach Nihar Ameen is the mastermind behind India&apos;s swimming revolution.
              With over three decades of experience and the highest international certifications,
              he has produced more national and international champions than any other Indian coach.
            </p>

            <p className="text-gray-400 leading-relaxed mb-12">
              Recipient of the prestigious Dronacharya Award in 2019, Coach Ameen holds the
              ASCA Level 5 certification &mdash; the highest qualification in swimming coaching
              globally. His athletes have brought glory to India at Asian Games, Commonwealth
              Games, and Olympic Games.
            </p>

            {/* Certifications row */}
            <div className="flex flex-wrap gap-3 mb-12">
              {certifications.map((cert, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                  className="px-4 py-2 text-sm font-medium"
                  style={{
                    background: `${theme.primary}15`,
                    border: `1px solid ${theme.primary}40`,
                    color: theme.primary,
                  }}
                >
                  {cert}
                </motion.span>
              ))}
            </div>

            {/* Timeline */}
            <div className="relative">
              <div
                className="absolute left-0 top-0 bottom-0 w-px"
                style={{ background: `linear-gradient(180deg, ${theme.primary}, ${theme.primary}20)` }}
              />
              <div className="space-y-8 pl-8">
                {credentials.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    className="relative"
                  >
                    {/* Timeline dot */}
                    <div
                      className="absolute -left-8 top-1 w-4 h-4 rounded-full -translate-x-1/2"
                      style={{ background: theme.primary }}
                    />
                    <span className="text-xs font-bold tracking-widest" style={{ color: theme.primary }}>
                      {item.year}
                    </span>
                    <h4 className="text-white font-semibold mt-1">{item.title}</h4>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
