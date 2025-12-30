"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { useTheme } from "./ThemeProvider";

const facilities = [
  {
    title: "Outdoor Pool",
    subtitle: "50m Olympic-Size Heated Pool",
    description: "50 metre, 10-lane Olympic-size heated swimming pool built by Myrtha - the world's leading Olympic pool designers. Tournament-ready facility hosting state, national & international competitions.",
    specs: ["50m x 10 Lanes", "Myrtha Built", "Heated Pool", "150 Seat Gallery"],
    icon: "pool",
    image: "/media/cse-pool-outdoor.jpg",
    highlight: "Olympic Standard"
  },
  {
    title: "Indoor Pool",
    subtitle: "20m Semi-Heated Training Pool",
    description: "20 metre, 5-lane semi-heated indoor pool designed for learn-to-swim programs and rehabilitation. Perfect environment for beginners and recovery training.",
    specs: ["20m x 5 Lanes", "Semi-Heated", "Learn to Swim", "50 Seat Gallery"],
    icon: "pool2",
    image: "/Website-Images/Pool Images/Screenshot 2025-12-30 190957.png",
    highlight: "Training Focus"
  },
  {
    title: "Fitness Centre",
    subtitle: "Strength & Conditioning",
    description: "State-of-the-art gymnasium with modern equipment for comprehensive athletic development, dryland training, and swimmer-specific conditioning programs.",
    specs: ["Modern Equipment", "Dryland Training", "Cardio Zone", "Personal Training"],
    icon: "gym",
    image: "/Website-Images/Fitness Centre Images/jpg.34738.png",
    highlight: "Elite Training"
  },
  {
    title: "Night Training",
    subtitle: "Extended Hours Facility",
    description: "World-class floodlit Olympic pool for extended training sessions. Perfect lighting for evening practice, allowing flexible schedules for competitive swimmers.",
    specs: ["Floodlit Pool", "Evening Sessions", "Extended Hours", "Competition Ready"],
    icon: "pool2",
    image: "/Website-Images/Pool Images/WhatsApp Image 2025-12-18 at 11.48.16 AM.jpeg",
    highlight: "24/7 Access"
  },
  {
    title: "Athletic Track",
    subtitle: "100m Running Track",
    description: "100 metre, 10-lane running track with inclined ramps and plyometric steps for resistance training, explosive power development, and endurance building.",
    specs: ["100m x 10 Lanes", "Inclined Ramps", "Plyometric Steps", "Speed Training"],
    icon: "track",
    image: "/media/image32.png",
    highlight: "Dryland"
  },
  {
    title: "Expert Coaching",
    subtitle: "Internationally Certified Team",
    description: "Led by Dronacharya Awardee Coach Nihar Ameen with ASCA Level 5 certified coaches. First AUSTSWIM recognised centre in India with 30+ years of excellence.",
    specs: ["Dronacharya Awardee", "ASCA Certified", "AUSTSWIM Centre", "30+ Years"],
    icon: "team",
    image: "/media/dronacharya-award.jpg",
    highlight: "World Class"
  },
];

const programs = [
  { name: "Learn to Swim", level: "Beginners", desc: "Water safety & basics" },
  { name: "Stroke Development", level: "Intermediate", desc: "Technique refinement" },
  { name: "Competitive Training", level: "Advanced", desc: "Race preparation" },
  { name: "Elite Squad", level: "Professional", desc: "National level" },
];

const icons = {
  pool: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4h18M3 8h18M3 12h18M3 16h18M3 20h18" /></svg>,
  pool2: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
  gym: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h7" /></svg>,
  health: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
  track: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  team: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
};

export default function Facilities() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeProgram, setActiveProgram] = useState(0);
  const [hoveredFacility, setHoveredFacility] = useState(null);
  const theme = useTheme();

  // For v=6: use WHITE background with dark text
  const isWhiteSection = theme.useAlternatingBg;
  const sectionBg = isWhiteSection ? theme.sectionWhite : theme.background;
  const textColor = isWhiteSection ? theme.darkText : theme.foreground;
  const textMuted = isWhiteSection ? theme.darkTextMuted : theme.foregroundMuted;
  const accentColor = theme.primary;

  return (
    <section id="facilities" className="relative py-32 overflow-hidden" style={{ background: sectionBg }}>
      {!theme.useAlternatingBg && (
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at center, ${theme.primary}08, transparent 70%)` }} />
      )}

      <div ref={ref} className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-16">
          <span style={{ color: accentColor }} className="text-sm font-semibold tracking-widest uppercase">World-Class Infrastructure</span>
          <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-playfair)]" style={{ color: textColor }}>
            Our <span style={{ background: `linear-gradient(135deg, ${theme.primaryLight}, ${theme.primaryDark})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Facilities</span>
          </h2>
          <div className="mt-4 w-24 h-1 mx-auto" style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }} />
          <p className="mt-6 max-w-2xl mx-auto text-lg" style={{ color: textMuted }}>
            Train at the prestigious Centre for Sports Excellence with state-of-the-art amenities designed for champions.
          </p>
        </motion.div>

        {/* Facilities Grid - CSE Inspired */}
        {isWhiteSection ? (
          /* Beautiful card grid for v=6 */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-16 sm:mb-20">
            {facilities.map((facility, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                onMouseEnter={() => setHoveredFacility(index)}
                onMouseLeave={() => setHoveredFacility(null)}
                className="group relative"
              >
                <div className="relative h-80 rounded-2xl overflow-hidden cursor-pointer"
                  style={{ boxShadow: hoveredFacility === index ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)' : '0 10px 40px -15px rgba(0, 0, 0, 0.1)' }}>
                  {/* Background Image */}
                  <Image
                    src={facility.image}
                    alt={facility.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />

                  {/* Default State - Title Visible */}
                  <div className="absolute inset-0 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(to top, ${theme.sectionDark}ee 0%, ${theme.sectionDark}90 30%, transparent 60%)`,
                      opacity: hoveredFacility === index ? 0 : 1
                    }}
                  />

                  {/* Hover State - Full Details */}
                  <div className="absolute inset-0 transition-opacity duration-500 flex flex-col justify-end p-6"
                    style={{
                      background: `linear-gradient(to top, ${theme.sectionDark}ff 0%, ${theme.sectionDark}ee 50%, ${theme.sectionDark}cc 100%)`,
                      opacity: hoveredFacility === index ? 1 : 0
                    }}
                  >
                    {/* Highlight Badge */}
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold"
                      style={{ background: theme.sectionWater, color: '#FFFFFF' }}>
                      {facility.highlight}
                    </div>

                    {/* Icon */}
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={{ background: `${theme.sectionWater}30`, color: theme.sectionWater }}>
                      {icons[facility.icon]}
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold mb-1" style={{ color: '#FFFFFF' }}>{facility.title}</h3>
                    <p className="text-sm font-medium mb-3" style={{ color: theme.sectionWater }}>{facility.subtitle}</p>
                    <p className="text-sm mb-4 leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }}>{facility.description}</p>

                    {/* Specs */}
                    <div className="flex flex-wrap gap-2">
                      {facility.specs.slice(0, 3).map((spec, sIndex) => (
                        <span key={sIndex} className="px-2 py-1 text-[10px] rounded-full font-medium"
                          style={{ background: 'rgba(255,255,255,0.15)', color: '#FFFFFF', backdropFilter: 'blur(4px)' }}>
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Default Title Bar */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 transition-opacity duration-500"
                    style={{ opacity: hoveredFacility === index ? 0 : 1 }}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ background: theme.sectionWater, color: '#FFFFFF' }}>
                        {icons[facility.icon]}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold" style={{ color: '#FFFFFF' }}>{facility.title}</h3>
                        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.7)' }}>{facility.subtitle}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Original design for other themes */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 mb-16 sm:mb-20">
            {facilities.map((facility, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }} className="group relative">
                <div className="relative aspect-square rounded-3xl flex flex-col transition-all duration-500 overflow-hidden"
                  style={{ border: `1px solid ${theme.border || theme.backgroundAlt}` }}>
                  <Image src={facility.image} alt={facility.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${sectionBg}, ${sectionBg}${theme.isLight ? 'ee' : '95'}, ${sectionBg}${theme.isLight ? 'cc' : '60'})` }} />
                  <div className="relative flex flex-col h-full p-6">
                    <div className="mb-4">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: `${theme.primary}20`, color: theme.primary }}>
                        {icons[facility.icon]}
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col mt-auto">
                      <h3 className="text-lg font-semibold mb-2" style={{ color: theme.foreground }}>{facility.title}</h3>
                      <p className="text-xs mb-4 flex-1" style={{ color: theme.foregroundMuted }}>{facility.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Training Programs */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.6 }} className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-playfair)]" style={{ color: textColor }}>
            Training <span style={{ background: `linear-gradient(135deg, ${theme.primaryLight}, ${theme.primaryDark})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Programs</span>
          </h3>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.7 }} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-16 sm:mb-20">
          {programs.map((program, index) => {
            const isActive = activeProgram === index;
            return (
              <motion.button
                key={index}
                onClick={() => setActiveProgram(index)}
                whileHover={{ scale: 1.03, y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="relative p-6 rounded-2xl transition-all duration-300 overflow-hidden text-left"
                style={{
                  background: isActive
                    ? `linear-gradient(135deg, ${theme.primary}, ${theme.sectionDark})`
                    : isWhiteSection ? '#FFFFFF' : theme.card,
                  border: `2px solid ${isActive ? theme.primary : (isWhiteSection ? theme.backgroundAlt : theme.border || theme.backgroundAlt)}`,
                  boxShadow: isActive ? `0 15px 40px ${theme.primary}30` : '0 4px 20px rgba(0,0,0,0.08)'
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 rounded-full" style={{
                    background: isActive ? '#FFFFFF' : theme.sectionWater,
                    boxShadow: `0 0 10px ${theme.sectionWater}60`
                  }} />
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{
                    color: isActive ? 'rgba(255,255,255,0.8)' : theme.sectionWater
                  }}>{program.level}</span>
                </div>
                <h4 className="font-bold text-lg mb-1" style={{ color: isActive ? '#FFFFFF' : textColor }}>{program.name}</h4>
                <p className="text-sm" style={{ color: isActive ? 'rgba(255,255,255,0.7)' : textMuted }}>{program.desc}</p>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Location Card */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.9 }}
          className="p-8 rounded-3xl" style={{
            background: isWhiteSection ? `linear-gradient(135deg, ${theme.sectionDark}, ${theme.primary})` : theme.card,
            border: `1px solid ${theme.border || theme.backgroundAlt}`
          }}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2 font-[family-name:var(--font-playfair)]" style={{ color: '#FFFFFF' }}>Dolphin Aquatics Academy</h3>
              <p style={{ color: theme.sectionWater }} className="font-medium">@ Centre for Sports Excellence</p>
              <p className="text-sm mt-2" style={{ color: 'rgba(255,255,255,0.7)' }}>Bengaluru, Karnataka, India</p>
            </div>
            <motion.a
              href="https://maps.google.com/?q=Centre+for+Sports+Excellence+Bangalore"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 font-bold rounded-full transition-all flex items-center gap-2"
              style={{ color: theme.sectionDark, background: '#FFFFFF', boxShadow: '0 4px 30px rgba(0,0,0,0.2)' }}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              Get Directions
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
