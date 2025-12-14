"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { useTheme } from "./ThemeProvider";

const careerHighlights = [
  { year: "2015", title: "Dronacharya Award", description: "First swimming coach to receive this prestigious lifetime achievement award" },
  { year: "2010+", title: "Dolphin Aquatics @ PDCSE", description: "Program Director at Padukone David Centre for Sports Excellence" },
  { year: "1994-2010", title: "K.C. Reddy Swim Team", description: "Program Director at Sadashiva Nagar" },
  { year: "1992-94", title: "Basavangudi Aquatic Centre", description: "Program Director in Bengaluru" },
  { year: "1990-92", title: "Fort Lauderdale Swim Team", description: "Assistant National Coach & Head Coach Jack Nelson Swim Camp, Florida USA" },
];

const credentials = [
  "ASCA Level 5 International Professional Coach",
  "Internationally Recognised Swim Coach",
  "First Dronacharya Award Winner in Swimming",
  "30+ Years of Coaching Excellence",
];

export default function Coach() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const theme = useTheme();

  return (
    <section id="coach" className="relative py-32 overflow-hidden" style={{ background: theme.background }}>
      <div className="absolute inset-0" style={{ background: `linear-gradient(90deg, ${theme.primary}08, transparent, ${theme.primary}08)` }} />
      <motion.div className="absolute top-1/4 right-0 w-72 h-72 rounded-full blur-3xl opacity-15" style={{ background: theme.primary }}
        animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 10, repeat: Infinity }} />

      <div ref={ref} className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-20">
          <span style={{ color: theme.primary }} className="text-sm font-semibold tracking-widest uppercase">Leadership</span>
          <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-playfair)]">
            Meet Coach{" "}
            <span style={{ background: `linear-gradient(135deg, ${theme.primaryLight}, ${theme.primaryDark})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Nihar Ameen
            </span>
          </h2>
          <div className="mt-4 w-24 h-1 mx-auto" style={{ background: `linear-gradient(90deg, transparent, ${theme.primary}, transparent)` }} />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden" style={{ background: `linear-gradient(135deg, ${theme.card}, ${theme.backgroundAlt})`, border: `1px solid ${theme.primary}30` }}>
                <div className="relative aspect-[4/3]">
                  <Image
                    src="/media/optimized/image17.webp"
                    alt="Coach Nihar Ameen receiving Dronacharya Award"
                    fill
                    className="object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${theme.background}95, ${theme.background}50, transparent)` }} />
                  <div className="absolute inset-x-0 bottom-0 p-8 text-center">
                    <h3 className="text-3xl font-bold text-white mb-2 font-[family-name:var(--font-playfair)]">Nihar Ameen</h3>
                    <p style={{ color: theme.primary }} className="font-medium">Founder & Program Director</p>
                  </div>
                </div>
                <div className="p-8" style={{ borderTop: `1px solid ${theme.primary}20` }}>
                  <h4 className="text-sm uppercase tracking-widest mb-4" style={{ color: theme.primary }}>Credentials</h4>
                  <div className="space-y-3">
                    {credentials.map((credential, index) => (
                      <motion.div key={index} initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }} className="flex items-center gap-3">
                        <svg style={{ color: theme.primary }} className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-300 text-sm">{credential}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full flex items-center justify-center shadow-2xl"
                style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark})`, boxShadow: `0 0 40px ${theme.primary}50` }}>
                <div className="text-center text-black">
                  <svg className="w-8 h-8 mx-auto mb-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                  <span className="text-xs font-bold leading-tight block">DRONACHARYA<br/>AWARD</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.4 }}>
            <h3 className="text-2xl font-bold text-white mb-8 font-[family-name:var(--font-playfair)]">
              Career <span style={{ background: `linear-gradient(135deg, ${theme.primaryLight}, ${theme.primaryDark})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Journey</span>
            </h3>
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-px" style={{ background: `linear-gradient(180deg, ${theme.primary}, ${theme.primary}50, transparent)` }} />
              <div className="space-y-8">
                {careerHighlights.map((item, index) => (
                  <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }} className="relative pl-20">
                    <div className="absolute left-6 top-1 w-4 h-4 rounded-full" style={{ background: theme.primary, border: `4px solid ${theme.background}` }} />
                    <span className="inline-block px-3 py-1 text-xs font-bold rounded-full mb-2" style={{ color: theme.primary, background: `${theme.primary}15` }}>{item.year}</span>
                    <h4 className="text-lg font-semibold text-white mb-1">{item.title}</h4>
                    <p className="text-gray-400 text-sm">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-12 p-6 rounded-2xl" style={{ background: `linear-gradient(135deg, ${theme.primary}15, transparent)`, border: `1px solid ${theme.primary}30` }}>
              <p className="text-gray-300 italic">&quot;Coach Nihar Ameen has produced India&apos;s best swimmers who have won medals at the Asian Games, Commonwealth Games, Asian Indoor Games, Asian Swimming Championships and Asian Para Games.&quot;</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
