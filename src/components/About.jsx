"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { useTheme } from "./ThemeProvider";

const achievements = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "ASCA Certified",
    description: "Coaches certified by American Swim Coaches Association",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "First AUSTSWIM Centre",
    description: "First internationally recognized swim centre in India",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title: "NCOE Centre",
    description: "Recognised by SAI as the National Centre of Excellence for Swimming",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    title: "Khelo India Centre",
    description: "Recognized Khelo India Centre for Sports Excellence",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    title: "World-Class Programs",
    description: "Excellence in swim teaching and coaching since 1992",
  },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const theme = useTheme();

  // For v=6: use WHITE background with dark text
  const isWhiteSection = theme.useAlternatingBg;
  const sectionBg = isWhiteSection ? theme.sectionWhite : theme.background;
  const textColor = isWhiteSection ? theme.darkText : theme.foreground;
  const textMuted = isWhiteSection ? theme.darkTextMuted : theme.foregroundMuted;
  const accentColor = theme.primary;

  return (
    <section id="about" className="relative py-32 overflow-hidden" style={{ background: sectionBg }}>
      {/* Background decorations - only show gradient for non-alternating themes */}
      {!theme.useAlternatingBg && (
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, ${theme.background} 0%, ${theme.backgroundAlt}50 50%, ${theme.background} 100%)`,
          }}
        />
      )}
      {!isWhiteSection && (
        <>
          <motion.div
            className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-10"
            style={{ background: theme.primary }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10"
            style={{ background: theme.primary }}
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.15, 0.1, 0.15] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </>
      )}

      <div ref={ref} className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span style={{ color: accentColor }} className="text-sm font-semibold tracking-widest uppercase">
            Our Legacy
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-playfair)]" style={{ color: textColor }}>
            The Dolphin{" "}
            <span
              style={{
                background: `linear-gradient(135deg, ${theme.primaryLight}, ${theme.primaryDark})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Story
            </span>
          </h2>
          <div
            className="mt-4 w-24 h-1 mx-auto"
            style={{
              background: `linear-gradient(90deg, transparent, ${theme.primary}, transparent)`,
            }}
          />
        </motion.div>

        {/* Mobile Images - Show at top on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:hidden grid grid-cols-2 gap-4 mb-10"
        >
          <div className="relative aspect-[3/4] rounded-xl overflow-hidden">
            <Image
              src="/media/image37.png"
              alt="Dolphin Aquatics Team with Trophy"
              fill
              className="object-cover"
              loading="lazy"
            />
            <div
              className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full whitespace-nowrap"
              style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark})`, boxShadow: `0 0 20px ${theme.primary}50` }}
            >
              <span className="text-xs sm:text-sm font-bold" style={{ color: theme.buttonText }}>Since 1992</span>
            </div>
          </div>
          <div className="relative aspect-[3/4] rounded-xl overflow-hidden">
            <Image
              src="/media/image32.png"
              alt="Olympic Swimming Pool"
              fill
              className="object-cover"
              loading="lazy"
            />
          </div>
        </motion.div>

        {/* Main content grid - 3 Column Layout */}
        <div className="grid lg:grid-cols-[280px_1fr_280px] gap-8 items-center">
          {/* Left side - Image (Desktop only) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <motion.div
              className="relative aspect-[3/4] rounded-2xl overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="/media/image37.png"
                alt="Dolphin Aquatics Team with Trophy"
                fill
                className="object-cover"
                loading="lazy"
              />
            </motion.div>
            {/* Floating badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 0.6, type: "spring" }}
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full"
              style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark})`, boxShadow: `0 0 30px ${theme.primary}50` }}
            >
              <span className="font-bold" style={{ color: theme.buttonText }}>Since 1992</span>
            </motion.div>
          </motion.div>

          {/* Center - Text content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6 text-center px-2 sm:px-0"
          >
            <p className="text-lg sm:text-xl md:text-2xl leading-relaxed font-light" style={{ color: textColor }}>
              Consistently{" "}
              <span style={{ color: accentColor }} className="font-semibold">
                India&apos;s top swim team since 2010
              </span>
              ,<br />
              under the visionary leadership of Coach<br />
              <span className="font-bold" style={{ color: accentColor }}>Nihar Ameen</span>.
            </p>
            <p className="text-sm sm:text-base leading-relaxed" style={{ color: textMuted }}>
              Dolphin Aquatics has established itself as a beacon of excellence in Indian swimming.
              Our world-class swim teaching and coaching programs have produced champions who have
              represented India at the highest levels of international competition.
            </p>
            <p className="text-sm sm:text-base leading-relaxed" style={{ color: textMuted }}>
              As the first AUSTSWIM Recognised swim centre in India, we maintain international
              standards of excellence. Our majority of coaches are certified by the American Swim
              Coaches Association and the National Institute of Sports, ensuring every swimmer
              receives world-class training.
            </p>
          </motion.div>

          {/* Right side - Image (Desktop only) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <motion.div
              className="relative aspect-[3/4] rounded-2xl overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="/media/image32.png"
                alt="Olympic Swimming Pool"
                fill
                className="object-cover"
                loading="lazy"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Achievement cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 mt-12 sm:mt-20"
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative p-6 rounded-2xl transition-all duration-300"
              style={{
                background: isWhiteSection
                  ? theme.sectionWater
                  : `linear-gradient(135deg, ${theme.card}80, ${theme.backgroundAlt}80)`,
                border: `1px solid ${isWhiteSection ? theme.backgroundAlt : (theme.border || theme.backgroundAlt)}`,
              }}
            >
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `${theme.primary}10` }}
              />
              <div className="relative">
                <div style={{ color: isWhiteSection ? theme.foreground : theme.primary }} className="mb-4">
                  {achievement.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: theme.foreground }}>{achievement.title}</h3>
                <p className="text-sm" style={{ color: theme.foregroundMuted }}>{achievement.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom highlight */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <div
            className="inline-flex items-center gap-4 px-8 py-4 rounded-full"
            style={{
              background: isWhiteSection ? theme.sectionWater : theme.card,
              border: `1px solid ${theme.border || theme.backgroundAlt}`,
            }}
          >
            <svg style={{ color: isWhiteSection ? theme.foreground : theme.primary }} className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
            <span className="text-lg font-medium" style={{ color: theme.foreground }}>
              In Pursuit of{" "}
              <span
                style={{
                  background: isWhiteSection
                    ? `linear-gradient(135deg, ${theme.foreground}, ${theme.foregroundMuted})`
                    : `linear-gradient(135deg, ${theme.primaryLight}, ${theme.primaryDark})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Excellence
              </span>
            </span>
            <svg style={{ color: isWhiteSection ? theme.foreground : theme.primary }} className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
