"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "./ThemeProvider";

const champions = [
  { name: "Srihari Nataraj", achievement: "Two-time Olympian", event: "Tokyo 2020 & Paris 2024", highlight: "14 National Records", image: "/media/srihari-nataraj-new.jpg", olympics: "2024", medals: 14, bio: "India's most decorated swimmer with 14 national records. Represented India at both Tokyo 2020 and Paris 2024 Olympics." },
  { name: "Dhinidhi Desinghu", achievement: "Paris 2024 Olympian", event: "Freestyle Events", highlight: "Youngest Olympian", image: "/media/dhinidhi-desinghu-new.jpg", olympics: "2024", medals: 2, bio: "The youngest Indian swimmer to compete at the Olympics, making history at Paris 2024 at just 14 years old." },
  { name: "Nisha Millet", achievement: "Arjuna Award Winner", event: "Sydney 2000 Olympian", highlight: "14 Gold Medals", image: "/media/nisha-millet-new.jpg", olympics: "2000", medals: 14, bio: "Pioneer of Indian swimming, Sydney 2000 Olympian and Arjuna Award recipient with 14 gold medals." },
  { name: "Maana Patel", achievement: "Tokyo 2020 Olympian", event: "100m Backstroke", highlight: "First Indian Female", image: "/media/maana-patel-new.jpg", olympics: "2020", medals: 3, bio: "First Indian female swimmer to qualify for Olympics through universality quota. Backstroke specialist." },
  { name: "Rehan Poncha", achievement: "Arjuna Award Winner", event: "Beijing 2008 Olympian", highlight: "6x National Champ", image: "/media/rehan-poncha-new.jpg", olympics: "2008", medals: 6, bio: "Beijing 2008 Olympian and 6-time national champion. Arjuna Award winner for excellence in swimming." },
  { name: "Virdhawal Khade", achievement: "Arjuna Award Winner", event: "50m Butterfly", highlight: "Asian Games Bronze", image: "/media/virdhawal-khade-new.jpg", olympics: null, medals: 1, bio: "Asian Games bronze medalist and Arjuna Awardee. Specialist in butterfly and freestyle events." },
  { name: "Shikha Tandon", achievement: "Arjuna Award Winner", event: "146 National Medals", highlight: "36 Int'l Medals", image: "/media/shikha-tandon-new.jpg", olympics: null, medals: 146, bio: "India's most decorated swimmer with 146 national medals and 36 international medals." },
  { name: "Sandeep Sejwal", achievement: "Arjuna Award Winner", event: "Beijing 2008 Olympian", highlight: "Breaststroke", image: "/media/sandeep-sejwal-new.jpg", olympics: "2008", medals: 5, bio: "Beijing 2008 Olympian specializing in breaststroke. Multiple Asian Games medalist." },
  { name: "Rohith Benediction", achievement: "National Champion", event: "Multiple Events", highlight: "Rising Star", image: "/media/rohith-benediction.jpg", olympics: null, medals: 8, bio: "Rising star of Indian swimming with multiple national championship titles." },
  { name: "Rujula Shashidhara", achievement: "National Medalist", event: "Freestyle & Backstroke", highlight: "State Champion", image: "/media/rujula-shashidhara.jpg", olympics: null, medals: 5, bio: "State champion and national medalist in freestyle and backstroke events." },
  { name: "Hakimuddin Habibulla", achievement: "International Swimmer", event: "Sydney 2000", highlight: "Team Coach", image: "/media/hakimuddin-habibulla-new.jpg", olympics: "2000", medals: 3, bio: "Sydney 2000 Olympian, now serving as team coach at Dolphin Aquatics." },
];

// Animated counter component
const AnimatedCounter = ({ value, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const incrementTime = (duration * 1000) / end;
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start >= end) clearInterval(timer);
      }, incrementTime);
      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}</span>;
};

export default function Champions() {
  const ref = useRef(null);
  const scrollRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const theme = useTheme();

  const isWaterSection = theme.useAlternatingBg;
  const sectionBg = isWaterSection ? theme.sectionWater : theme.background;

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % champions.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Scroll to active card (horizontal only, no page scroll)
  useEffect(() => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const card = container.children[activeIndex];
      if (card) {
        const cardLeft = card.offsetLeft;
        const cardWidth = card.offsetWidth;
        const containerWidth = container.offsetWidth;
        const scrollPosition = cardLeft - (containerWidth / 2) + (cardWidth / 2);
        container.scrollTo({ left: scrollPosition, behavior: 'smooth' });
      }
    }
  }, [activeIndex]);

  const activeChampion = champions[activeIndex];

  const stats = [
    { label: "Olympians", value: 7 },
    { label: "Arjuna Awardees", value: 5 },
    { label: "National Records", value: 50, suffix: "+" },
    { label: "International Medals", value: 100, suffix: "+" },
  ];

  return (
    <section id="champions" className="relative py-24 md:py-32 overflow-hidden" style={{ background: sectionBg }}>
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full blur-3xl opacity-20"
          style={{ background: `radial-gradient(circle, ${theme.primary}, transparent)` }}
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
      </div>

      <div ref={ref} className="relative">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ type: "spring", delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{ background: `${theme.primary}15`, border: `1px solid ${theme.primary}30` }}
            >
              <span style={{ color: theme.primary }} className="text-sm font-semibold tracking-widest uppercase">Our Pride</span>
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-bold font-[family-name:var(--font-playfair)]" style={{ color: theme.foreground }}>
              Dolphin{" "}
              <span style={{
                background: `linear-gradient(135deg, ${theme.primaryLight}, ${theme.primaryDark})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}>Champions</span>
            </h2>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-6 mb-12 sm:mb-16 max-w-3xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="text-center p-3 md:p-4 rounded-2xl"
                style={{ background: isWaterSection ? `${theme.sectionDark}60` : `${theme.card}60`, backdropFilter: 'blur(10px)' }}
              >
                <div className="text-2xl md:text-4xl font-bold" style={{ color: theme.foreground }}>
                  <AnimatedCounter value={stat.value} />{stat.suffix || ''}
                </div>
                <div className="text-[10px] md:text-xs font-medium mt-1" style={{ color: theme.foregroundMuted }}>{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Featured Spotlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-6xl mx-auto px-6 lg:px-8 mb-8"
        >
          <div
            className="relative rounded-3xl overflow-hidden"
            style={{
              background: isWaterSection ? theme.sectionDark : theme.card,
              boxShadow: `0 25px 80px -20px ${theme.primary}30`
            }}
          >
            <div className="grid md:grid-cols-2 gap-0">
              {/* Image Side */}
              <div className="relative h-[300px] md:h-[450px] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={activeChampion.image}
                      alt={activeChampion.name}
                      fill
                      className="object-cover"
                      priority
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(90deg, transparent 50%, ${isWaterSection ? theme.sectionDark : theme.card} 100%), linear-gradient(to top, ${isWaterSection ? theme.sectionDark : theme.card}80, transparent 50%)`
                      }}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Olympic Badge */}
                {activeChampion.olympics && (
                  <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="absolute top-6 left-6 px-4 py-2 rounded-full font-bold flex items-center gap-2"
                    style={{
                      background: 'linear-gradient(135deg, #FFD700, #FF8C00)',
                      color: '#000',
                      boxShadow: '0 8px 30px rgba(255,215,0,0.4)'
                    }}
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <circle cx="8" cy="8" r="3"/>
                      <circle cx="16" cy="8" r="3"/>
                      <circle cx="12" cy="14" r="3"/>
                    </svg>
                    <span>Olympics {activeChampion.olympics}</span>
                  </motion.div>
                )}
              </div>

              {/* Content Side */}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.4 }}
                  >
                    <motion.span
                      className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4"
                      style={{
                        background: `${theme.primary}20`,
                        color: theme.primary,
                        border: `1px solid ${theme.primary}40`
                      }}
                    >
                      {activeChampion.highlight}
                    </motion.span>

                    <h3
                      className="text-3xl md:text-5xl font-bold mb-3 font-[family-name:var(--font-playfair)]"
                      style={{ color: theme.foreground }}
                    >
                      {activeChampion.name}
                    </h3>

                    <p
                      className="text-lg md:text-xl font-semibold mb-4"
                      style={{
                        background: `linear-gradient(90deg, ${theme.primary}, ${theme.primaryLight})`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent"
                      }}
                    >
                      {activeChampion.achievement}
                    </p>

                    <p className="mb-6 leading-relaxed" style={{ color: theme.foregroundMuted }}>
                      {activeChampion.bio}
                    </p>

                    <div className="flex flex-wrap gap-3">
                      <div
                        className="px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2"
                        style={{ background: `${theme.primary}15`, color: theme.foreground }}
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z"/>
                        </svg>
                        {activeChampion.medals} Medals
                      </div>
                      <div
                        className="px-4 py-2 rounded-full text-sm font-medium"
                        style={{ background: `${theme.primary}15`, color: theme.foreground }}
                      >
                        {activeChampion.event}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Progress indicators */}
                <div className="flex gap-2 mt-8">
                  {champions.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => { setActiveIndex(index); setIsAutoPlaying(false); }}
                      className="relative h-1 rounded-full overflow-hidden transition-all"
                      style={{
                        width: index === activeIndex ? '40px' : '20px',
                        background: `${theme.primary}30`
                      }}
                    >
                      {index === activeIndex && (
                        <motion.div
                          className="absolute inset-0 rounded-full"
                          style={{ background: theme.primary }}
                          initial={{ scaleX: 0, originX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 5, ease: "linear" }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Horizontal Scroll Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative"
        >
          {/* Navigation Arrows */}
          <button
            onClick={() => { setActiveIndex((prev) => (prev - 1 + champions.length) % champions.length); setIsAutoPlaying(false); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110"
            style={{
              background: `${theme.card}ee`,
              backdropFilter: 'blur(10px)',
              boxShadow: `0 4px 20px ${theme.primary}30`,
              border: `1px solid ${theme.primary}30`
            }}
          >
            <svg className="w-6 h-6" style={{ color: theme.foreground }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={() => { setActiveIndex((prev) => (prev + 1) % champions.length); setIsAutoPlaying(false); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110"
            style={{
              background: `${theme.card}ee`,
              backdropFilter: 'blur(10px)',
              boxShadow: `0 4px 20px ${theme.primary}30`,
              border: `1px solid ${theme.primary}30`
            }}
          >
            <svg className="w-6 h-6" style={{ color: theme.foreground }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Gradient Fades */}
          <div className="absolute left-0 top-0 bottom-0 w-20 z-[5] pointer-events-none" style={{ background: `linear-gradient(90deg, ${sectionBg}, transparent)` }} />
          <div className="absolute right-0 top-0 bottom-0 w-20 z-[5] pointer-events-none" style={{ background: `linear-gradient(-90deg, ${sectionBg}, transparent)` }} />

          {/* Scrollable Cards */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto px-16 py-4 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {champions.map((champion, index) => (
              <motion.div
                key={index}
                onClick={() => { setActiveIndex(index); setIsAutoPlaying(false); }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="flex-shrink-0 cursor-pointer"
                animate={{
                  scale: index === activeIndex ? 1.05 : 1,
                  opacity: index === activeIndex ? 1 : 0.6,
                }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className="relative w-[160px] md:w-[200px] aspect-[3/4] rounded-2xl overflow-hidden"
                  style={{
                    boxShadow: index === activeIndex
                      ? `0 20px 50px -15px ${theme.primary}50, 0 0 0 3px ${theme.primary}`
                      : `0 10px 30px -10px rgba(0,0,0,0.3)`,
                    border: index === activeIndex ? `3px solid ${theme.primary}` : `1px solid ${isWaterSection ? 'rgba(255,255,255,0.1)' : theme.border || theme.backgroundAlt}`
                  }}
                >
                  <Image
                    src={champion.image}
                    alt={champion.name}
                    fill
                    className="object-cover"
                    loading="lazy"
                  />

                  {/* Overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: index === activeIndex
                        ? `linear-gradient(to top, ${theme.primary}ee, ${theme.primary}80 30%, transparent 60%)`
                        : `linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.4) 40%, transparent 70%)`
                    }}
                  />

                  {/* Olympic indicator */}
                  {champion.olympics && (
                    <div
                      className="absolute top-2 left-2 w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, #FFD700, #FF8C00)' }}
                    >
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3">
                        <circle cx="8" cy="8" r="3"/>
                        <circle cx="16" cy="8" r="3"/>
                        <circle cx="12" cy="14" r="3"/>
                      </svg>
                    </div>
                  )}

                  {/* Active indicator */}
                  {index === activeIndex && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-2 right-2 w-3 h-3 rounded-full"
                      style={{ background: '#fff', boxShadow: '0 0 10px #fff' }}
                    />
                  )}

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h4
                      className="text-sm md:text-base font-bold truncate"
                      style={{ color: '#fff' }}
                    >
                      {champion.name}
                    </h4>
                    <p className="text-[10px] md:text-xs truncate" style={{ color: 'rgba(255,255,255,0.8)' }}>
                      {champion.achievement}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-center mt-16 px-6"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 font-bold rounded-full"
            style={{
              color: isWaterSection ? theme.foreground : theme.buttonText,
              background: isWaterSection
                ? `linear-gradient(135deg, ${theme.sectionDark}, ${theme.primary})`
                : `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark})`,
              boxShadow: `0 10px 40px ${theme.primary}40`
            }}
          >
            Start Your Champion Journey
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
