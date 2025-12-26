"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { useTheme } from "./ThemeProvider";

const careerHighlights = [
  { year: "2015", title: "Dronacharya Award", description: "First swimming coach to receive this prestigious lifetime achievement award" },
  { year: "2010+", title: "Dolphin Aquatics @ CSE", description: "Program Director at Centre for Sports Excellence" },
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

  // For v=6: use DARK NAVY (footer-like) background
  const isDarkSection = theme.useAlternatingBg;
  const sectionBg = isDarkSection ? theme.sectionDark : theme.background;
  // On dark section, use lighter accent colors for visibility
  const accentColor = isDarkSection ? theme.sectionWater : theme.primary;

  return (
    <section id="coach" className="relative py-32 overflow-hidden" style={{ background: sectionBg }}>
      {!theme.useAlternatingBg && (
        <div className="absolute inset-0" style={{ background: `linear-gradient(90deg, ${theme.primary}08, transparent, ${theme.primary}08)` }} />
      )}
      {!isDarkSection && (
        <motion.div className="absolute top-1/4 right-0 w-72 h-72 rounded-full blur-3xl opacity-15" style={{ background: theme.primary }}
          animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 10, repeat: Infinity }} />
      )}

      <div ref={ref} className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-20">
          <span style={{ color: accentColor }} className="text-sm font-semibold tracking-widest uppercase">Leadership</span>
          <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-playfair)]" style={{ color: theme.foreground }}>
            Meet Coach{" "}
            <span style={{ background: isDarkSection
              ? `linear-gradient(135deg, ${theme.sectionWater}, ${theme.backgroundAlt})`
              : `linear-gradient(135deg, ${theme.primaryLight}, ${theme.primaryDark})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Nihar Ameen
            </span>
          </h2>
          <div className="mt-4 w-24 h-1 mx-auto" style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }} />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${accentColor}40` }}>
                {/* Image at top - no padding, cropped to remove white frame */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src="/media/optimized/image17.webp"
                    alt="Coach Nihar Ameen receiving Dronacharya Award"
                    fill
                    className="object-cover"
                    style={{ objectPosition: '50% 30%', transform: 'scale(1.25)' }}
                    loading="lazy"
                  />
                </div>
                {/* Text content below with padding */}
                <div className="p-6" style={{ background: isDarkSection ? theme.card : theme.card }}>
                  <h3 className="text-2xl font-bold mb-1 font-[family-name:var(--font-playfair)]" style={{ color: theme.foreground }}>Nihar Ameen</h3>
                  <p style={{ color: isDarkSection ? theme.foreground : accentColor }} className="font-medium text-sm mb-4">Founder & Program Director</p>
                  <div style={{ borderTop: `1px solid ${theme.border || theme.backgroundAlt}` }} className="pt-4">
                    <h4 className="text-sm uppercase tracking-widest mb-4" style={{ color: isDarkSection ? theme.foreground : accentColor }}>Credentials</h4>
                    <div className="space-y-3">
                      {credentials.map((credential, index) => (
                        <motion.div key={index} initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }} className="flex items-center gap-3">
                          <svg style={{ color: isDarkSection ? theme.foreground : accentColor }} className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm" style={{ color: theme.foregroundMuted }}>{credential}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute -bottom-4 -right-2 sm:-bottom-6 sm:-right-6 w-24 h-24 sm:w-36 sm:h-36 rounded-xl sm:rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl"
                style={{ border: `3px solid ${theme.primary}`, boxShadow: `0 0 30px ${theme.primary}50`, background: '#1a1a2e' }}>
                <div className="relative w-full h-full p-2">
                  <Image
                    src="/media/dronacharya-award.jpg"
                    alt="Dronacharya Award Trophy"
                    fill
                    className="object-contain"
                  />
                  <div className="absolute bottom-0 left-0 right-0 py-1 text-center" style={{ background: `linear-gradient(to top, ${theme.primaryDark}, transparent)` }}>
                    <span className="text-[9px] font-bold" style={{ color: theme.buttonText }}>DRONACHARYA 2015</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.4 }}>
            <h3 className="text-2xl font-bold mb-8 font-[family-name:var(--font-playfair)]" style={{ color: theme.foreground }}>
              Career <span style={{ background: isDarkSection
                ? `linear-gradient(135deg, ${theme.sectionWater}, ${theme.backgroundAlt})`
                : `linear-gradient(135deg, ${theme.primaryLight}, ${theme.primaryDark})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Journey</span>
            </h3>
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-px" style={{ background: `linear-gradient(180deg, ${accentColor}, ${accentColor}50, transparent)` }} />
              <div className="space-y-8">
                {careerHighlights.map((item, index) => (
                  <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }} className="relative pl-20">
                    <div className="absolute left-6 top-1 w-4 h-4 rounded-full" style={{ background: accentColor, border: `4px solid ${sectionBg}` }} />
                    <span className="inline-block px-3 py-1 text-xs font-bold rounded-full mb-2" style={{ color: isDarkSection ? theme.foreground : accentColor, background: `${accentColor}25` }}>{item.year}</span>
                    <h4 className="text-lg font-semibold mb-1" style={{ color: theme.foreground }}>{item.title}</h4>
                    <p className="text-sm" style={{ color: theme.foregroundMuted }}>{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-12 p-6 rounded-2xl" style={{ background: isDarkSection ? theme.backgroundAlt : theme.card, border: `1px solid ${theme.border || theme.backgroundAlt}` }}>
              <p className="italic" style={{ color: theme.foregroundMuted }}>&quot;Coach Nihar Ameen has produced India&apos;s best swimmers who have won medals at the Asian Games, Commonwealth Games, Asian Indoor Games, Asian Swimming Championships and Asian Para Games.&quot;</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
