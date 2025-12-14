"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useTheme } from "./ThemeProvider";

// Swimmer SVG Component
const Swimmer = ({ style, delay }) => {
  const theme = useTheme();
  return (
    <motion.svg
      viewBox="0 0 100 30"
      fill={theme.primary}
      style={style}
      className="absolute"
      initial={{ x: "-15%" }}
      animate={{ x: "115%" }}
      transition={{ duration: 12, repeat: Infinity, delay, ease: "linear" }}
    >
      <ellipse cx="25" cy="15" rx="12" ry="6" /> {/* body */}
      <circle cx="38" cy="13" r="5" /> {/* head */}
      <motion.path
        d="M15 12 Q5 8, 0 15 Q5 22, 15 18"
        animate={{ d: ["M15 12 Q5 8, 0 15 Q5 22, 15 18", "M15 12 Q5 18, 0 15 Q5 8, 15 18", "M15 12 Q5 8, 0 15 Q5 22, 15 18"] }}
        transition={{ duration: 0.6, repeat: Infinity }}
      /> {/* legs kicking */}
      <motion.path
        d="M30 10 Q40 5, 50 12"
        animate={{ d: ["M30 10 Q40 5, 50 12", "M30 10 Q40 15, 50 8", "M30 10 Q40 5, 50 12"] }}
        transition={{ duration: 0.4, repeat: Infinity }}
      /> {/* arm stroke */}
    </motion.svg>
  );
};

// Jellyfish Component
const Jellyfish = ({ size, left, delay }) => {
  const theme = useTheme();
  return (
    <motion.div
      className="absolute"
      style={{ left: `${left}%`, width: size, height: size * 1.5 }}
      initial={{ y: "100vh", opacity: 0 }}
      animate={{ y: "-100vh", opacity: [0, 1, 1, 0] }}
      transition={{ duration: 20, repeat: Infinity, delay, ease: "linear" }}
    >
      <motion.svg viewBox="0 0 50 75" className="w-full h-full">
        <defs>
          <radialGradient id={`jelly-${left}`} cx="50%" cy="30%" r="50%">
            <stop offset="0%" stopColor={theme.primaryLight} stopOpacity="0.8" />
            <stop offset="100%" stopColor={theme.primary} stopOpacity="0.3" />
          </radialGradient>
        </defs>
        <motion.ellipse
          cx="25" cy="20" rx="20" ry="18"
          fill={`url(#jelly-${left})`}
          animate={{ ry: [18, 15, 18], rx: [20, 22, 20] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        {[...Array(5)].map((_, i) => (
          <motion.path
            key={i}
            d={`M${10 + i * 8} 35 Q${12 + i * 8} 50, ${10 + i * 8} 70`}
            stroke={theme.primaryLight}
            strokeWidth="2"
            fill="none"
            opacity="0.6"
            animate={{ d: [`M${10 + i * 8} 35 Q${15 + i * 8} 50, ${10 + i * 8} 70`, `M${10 + i * 8} 35 Q${5 + i * 8} 50, ${10 + i * 8} 70`] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </motion.svg>
    </motion.div>
  );
};

// Sea Turtle Component
const SeaTurtle = ({ direction = 1, top, delay }) => {
  const theme = useTheme();
  return (
    <motion.svg
      viewBox="0 0 80 50"
      className="absolute w-20 h-12"
      style={{ top: `${top}%`, scaleX: direction }}
      initial={{ x: direction === 1 ? "-20%" : "120%" }}
      animate={{ x: direction === 1 ? "120vw" : "-20vw" }}
      transition={{ duration: 25, repeat: Infinity, delay, ease: "linear" }}
    >
      <ellipse cx="40" cy="25" rx="25" ry="18" fill="#15803d" />
      <ellipse cx="40" cy="25" rx="20" ry="14" fill="#22c55e" />
      <circle cx="60" cy="22" r="6" fill="#15803d" />
      <circle cx="63" cy="20" r="1.5" fill="#000" />
      <motion.ellipse cx="20" cy="18" rx="8" ry="4" fill="#15803d"
        animate={{ rotate: [-20, 20, -20] }} transition={{ duration: 1, repeat: Infinity }} />
      <motion.ellipse cx="20" cy="32" rx="8" ry="4" fill="#15803d"
        animate={{ rotate: [20, -20, 20] }} transition={{ duration: 1, repeat: Infinity, delay: 0.5 }} />
      <motion.ellipse cx="55" cy="18" rx="6" ry="3" fill="#15803d"
        animate={{ rotate: [15, -15, 15] }} transition={{ duration: 0.8, repeat: Infinity }} />
      <motion.ellipse cx="55" cy="32" rx="6" ry="3" fill="#15803d"
        animate={{ rotate: [-15, 15, -15] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }} />
    </motion.svg>
  );
};

// Splash Particle
const SplashParticle = ({ x, delay }) => {
  const theme = useTheme();
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        left: x,
        bottom: "30%",
        width: 8,
        height: 8,
        background: theme.primaryLight,
        boxShadow: `0 0 10px ${theme.primary}`,
      }}
      initial={{ y: 0, opacity: 1, scale: 1 }}
      animate={{
        y: [-50, -120, -80],
        x: [0, (Math.random() - 0.5) * 100, (Math.random() - 0.5) * 150],
        opacity: [1, 0.8, 0],
        scale: [1, 0.5, 0],
      }}
      transition={{ duration: 1.5, repeat: Infinity, delay, ease: "easeOut" }}
    />
  );
};

export default function OceanAnimation() {
  const theme = useTheme();
  const containerRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!mounted) return null;

  // Generate fish school
  const fishSchool = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: 12 + Math.random() * 18,
    top: 25 + Math.random() * 55,
    delay: Math.random() * 12,
    duration: 6 + Math.random() * 8,
    color: ["#38bdf8", "#7dd3fc", "#0284c7", "#f97316", "#fbbf24"][i % 5],
  }));

  // Bubble config
  const bubbles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    size: 4 + Math.random() * 16,
    left: Math.random() * 100,
    delay: Math.random() * 8,
    duration: 5 + Math.random() * 5,
  }));

  return (
    <section
      ref={containerRef}
      className="relative h-[500px] overflow-hidden"
      style={{
        background: `linear-gradient(180deg,
          #1e3a5f 0%,
          #0c2340 20%,
          #041525 50%,
          #020a10 100%)`,
      }}
    >
      {/* Aurora/Northern Lights Effect at top */}
      <div className="absolute top-0 left-0 right-0 h-40 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(90deg,
              transparent,
              ${theme.primary}20,
              ${theme.primaryLight}30,
              ${theme.primary}20,
              transparent)`,
            filter: "blur(30px)",
          }}
          animate={{
            x: ["-50%", "50%", "-50%"],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(90deg,
              transparent,
              #22c55e20,
              ${theme.primaryLight}25,
              #a855f720,
              transparent)`,
            filter: "blur(40px)",
          }}
          animate={{
            x: ["50%", "-50%", "50%"],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        />
      </div>

      {/* Underwater Light Rays */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-0"
          style={{
            left: `${5 + i * 10}%`,
            width: "3%",
            height: "100%",
            background: `linear-gradient(180deg, ${theme.primaryLight}40, ${theme.primary}15, transparent 60%)`,
            filter: "blur(8px)",
            transformOrigin: "top center",
          }}
          animate={{
            opacity: [0.2, 0.6, 0.2],
            scaleX: [1, 1.8, 1],
            rotate: [-5, 5, -5],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}

      {/* Interactive Glow following mouse */}
      <motion.div
        className="absolute w-64 h-64 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${theme.primary}30, transparent 70%)`,
          filter: "blur(40px)",
          left: `${mousePos.x * 100}%`,
          top: `${mousePos.y * 100}%`,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Real Dolphin Images - Multiple jumping */}
      {[
        { delay: 0, duration: 5, startX: -15, startY: 90, peakY: -20, endX: 50, size: 180, rotate: [-20, -40, 20] },
        { delay: 2.5, duration: 6, startX: 30, startY: 95, peakY: -30, endX: 85, size: 150, rotate: [-15, -50, 25] },
        { delay: 5, duration: 5.5, startX: 60, startY: 88, peakY: -25, endX: 115, size: 160, rotate: [-25, -45, 15] },
      ].map((dolphin, i) => (
        <motion.div
          key={i}
          className="absolute z-20"
          style={{ width: dolphin.size }}
          initial={{ x: `${dolphin.startX}vw`, y: `${dolphin.startY}%` }}
          animate={{
            x: [`${dolphin.startX}vw`, `${(dolphin.startX + dolphin.endX) / 2}vw`, `${dolphin.endX}vw`],
            y: [`${dolphin.startY}%`, `${dolphin.peakY}%`, `${dolphin.startY}%`],
            rotate: dolphin.rotate,
          }}
          transition={{
            duration: dolphin.duration,
            repeat: Infinity,
            delay: dolphin.delay,
            ease: "easeInOut",
          }}
        >
          <Image
            src="/media/dolphin1.png"
            alt="Jumping Dolphin"
            width={dolphin.size}
            height={dolphin.size * 0.6}
            className="drop-shadow-[0_0_30px_rgba(56,189,248,0.8)]"
            style={{ filter: `drop-shadow(0 0 20px ${theme.primary})` }}
          />
        </motion.div>
      ))}

      {/* Splash Effects for each dolphin */}
      {[15, 45, 75].map((x, i) => (
        <div key={i} className="absolute" style={{ left: `${x}%`, bottom: "25%" }}>
          {[...Array(8)].map((_, j) => (
            <SplashParticle key={j} x={`${(j - 4) * 15}px`} delay={i * 2.5 + j * 0.1} />
          ))}
        </div>
      ))}

      {/* Swimming Fish */}
      {fishSchool.map((fish) => (
        <motion.div
          key={fish.id}
          className="absolute"
          style={{ top: `${fish.top}%` }}
          initial={{ x: fish.id % 2 === 0 ? "-5%" : "105%" }}
          animate={{ x: fish.id % 2 === 0 ? "105%" : "-5%" }}
          transition={{
            duration: fish.duration,
            repeat: Infinity,
            delay: fish.delay,
            ease: "linear",
          }}
        >
          <motion.svg
            viewBox="0 0 30 20"
            fill={fish.color}
            style={{ width: fish.size, height: fish.size * 0.67, scaleX: fish.id % 2 === 0 ? 1 : -1 }}
            animate={{ y: [-3, 3, -3] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <ellipse cx="12" cy="10" rx="10" ry="6" />
            <polygon points="22,10 30,3 30,17" />
            <circle cx="6" cy="8" r="1.5" fill="#000" opacity="0.5" />
          </motion.svg>
        </motion.div>
      ))}

      {/* Swimmers */}
      <Swimmer style={{ top: "35%", width: 80 }} delay={0} />
      <Swimmer style={{ top: "55%", width: 60, opacity: 0.7 }} delay={4} />
      <Swimmer style={{ top: "70%", width: 50, opacity: 0.5 }} delay={8} />

      {/* Jellyfish */}
      <Jellyfish size={40} left={10} delay={0} />
      <Jellyfish size={30} left={25} delay={5} />
      <Jellyfish size={50} left={80} delay={3} />
      <Jellyfish size={35} left={60} delay={8} />

      {/* Sea Turtles */}
      <SeaTurtle direction={1} top={40} delay={0} />
      <SeaTurtle direction={-1} top={65} delay={10} />

      {/* Rising Bubbles */}
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: `${bubble.left}%`,
            bottom: "-20px",
            background: `radial-gradient(circle at 30% 30%, ${theme.primaryLight}90, ${theme.primary}50)`,
            border: `1px solid ${theme.primaryLight}70`,
            boxShadow: `inset -2px -2px 4px ${theme.primary}30, 0 0 8px ${theme.primary}40`,
          }}
          animate={{
            y: [0, -550],
            x: [0, Math.sin(bubble.id) * 40, 0],
            scale: [1, 1.2, 0.8],
            opacity: [0.9, 0.7, 0],
          }}
          transition={{
            duration: bubble.duration,
            repeat: Infinity,
            delay: bubble.delay,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Multi-layer Animated Waves */}
      <div className="absolute bottom-0 left-0 right-0 h-48 overflow-hidden">
        {/* Wave Layer 1 - Deep */}
        <motion.svg
          className="absolute bottom-0 w-[300%]"
          viewBox="0 0 2160 150"
          preserveAspectRatio="none"
          style={{ height: "100%" }}
          animate={{ x: [0, "-66.67%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <defs>
            <linearGradient id="deepWave" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={theme.primaryDark} stopOpacity="0.4" />
              <stop offset="100%" stopColor="#020a10" />
            </linearGradient>
          </defs>
          <path fill="url(#deepWave)" d="M0,60 C180,100 360,20 540,60 C720,100 900,20 1080,60 C1260,100 1440,20 1620,60 C1800,100 1980,20 2160,60 L2160,150 L0,150 Z" />
        </motion.svg>

        {/* Wave Layer 2 - Mid */}
        <motion.svg
          className="absolute bottom-0 w-[300%]"
          viewBox="0 0 2160 120"
          preserveAspectRatio="none"
          style={{ height: "75%" }}
          animate={{ x: ["-33%", "-100%"] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          <defs>
            <linearGradient id="midWave" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={theme.primary} stopOpacity="0.5" />
              <stop offset="100%" stopColor="#041525" />
            </linearGradient>
          </defs>
          <path fill="url(#midWave)" d="M0,50 C240,20 360,80 600,50 C840,20 960,80 1200,50 C1440,20 1560,80 1800,50 C2040,20 2100,80 2160,50 L2160,120 L0,120 Z" />
        </motion.svg>

        {/* Wave Layer 3 - Front */}
        <motion.svg
          className="absolute bottom-0 w-[300%]"
          viewBox="0 0 2160 100"
          preserveAspectRatio="none"
          style={{ height: "55%" }}
          animate={{ x: ["-66.67%", 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        >
          <defs>
            <linearGradient id="frontWave" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={theme.primaryLight} stopOpacity="0.6" />
              <stop offset="100%" stopColor="#0c2340" />
            </linearGradient>
          </defs>
          <path fill="url(#frontWave)" d="M0,40 C270,70 540,10 810,40 C1080,70 1350,10 1620,40 C1890,70 2070,30 2160,40 L2160,100 L0,100 Z" />
        </motion.svg>

        {/* Foam/Spray on waves */}
        <motion.div
          className="absolute bottom-[35%] left-0 right-0 h-4"
          style={{
            background: `linear-gradient(90deg, transparent, ${theme.primaryLight}40, transparent, ${theme.primaryLight}30, transparent)`,
            filter: "blur(2px)",
          }}
          animate={{ x: ["-10%", "10%", "-10%"] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>

      {/* Ocean Floor Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none">
        {/* Seaweed */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bottom-0"
            style={{
              left: `${3 + i * 5}%`,
              width: 6 + Math.random() * 6,
              height: 30 + Math.random() * 50,
              background: `linear-gradient(180deg, ${i % 3 === 0 ? "#22c55e" : i % 3 === 1 ? "#16a34a" : "#15803d"}90, transparent)`,
              borderRadius: "50% 50% 0 0",
              transformOrigin: "bottom center",
            }}
            animate={{
              rotate: [-15, 15, -15],
              scaleY: [1, 1.1, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.15,
            }}
          />
        ))}

        {/* Starfish */}
        {[10, 40, 70, 90].map((left, i) => (
          <motion.div
            key={i}
            className="absolute bottom-2"
            style={{ left: `${left}%` }}
            animate={{ rotate: [0, 10, 0, -10, 0] }}
            transition={{ duration: 8, repeat: Infinity, delay: i }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill={i % 2 === 0 ? "#f97316" : "#ef4444"}>
              <path d="M12 2L14.5 9H22L16 13.5L18.5 21L12 16.5L5.5 21L8 13.5L2 9H9.5L12 2Z" />
            </svg>
          </motion.div>
        ))}

        {/* Shells */}
        {[25, 55, 85].map((left, i) => (
          <motion.div
            key={i}
            className="absolute bottom-1"
            style={{ left: `${left}%` }}
          >
            <svg width="16" height="12" viewBox="0 0 20 15" fill={["#fbbf24", "#f472b6", "#a78bfa"][i]}>
              <path d="M10 0 C5 0, 0 5, 0 12 Q5 15, 10 12 Q15 15, 20 12 C20 5, 15 0, 10 0 Z" opacity="0.8" />
              <path d="M10 2 L10 12 M6 4 L10 12 M14 4 L10 12 M3 7 L10 12 M17 7 L10 12" stroke="#fff" strokeWidth="0.5" opacity="0.3" />
            </svg>
          </motion.div>
        ))}

        {/* Coral formations */}
        <motion.svg
          className="absolute bottom-0 left-[5%]"
          width="100"
          height="70"
          viewBox="0 0 100 70"
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <path d="M10,70 Q20,40 25,50 Q30,25 40,45 Q50,15 60,40 Q70,30 80,50 Q85,35 90,70" fill="#f97316" opacity="0.8" />
          <circle cx="30" cy="55" r="10" fill="#fb923c" opacity="0.7" />
          <circle cx="60" cy="50" r="12" fill="#fdba74" opacity="0.6" />
          <circle cx="45" cy="60" r="8" fill="#f97316" opacity="0.8" />
        </motion.svg>

        <motion.svg
          className="absolute bottom-0 right-[8%]"
          width="120"
          height="80"
          viewBox="0 0 120 80"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1.5 }}
        >
          <path d="M20,80 Q30,50 40,60 Q55,30 70,55 Q80,40 90,60 Q100,35 110,80" fill="#ec4899" opacity="0.7" />
          <ellipse cx="50" cy="65" rx="18" ry="12" fill="#f472b6" opacity="0.6" />
          <ellipse cx="85" cy="60" rx="14" ry="10" fill="#fb7185" opacity="0.7" />
        </motion.svg>
      </div>

      {/* Center Text with Glow */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-30"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
      >
        <div className="text-center">
          <motion.div
            className="relative"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <h3
              className="text-5xl md:text-6xl lg:text-7xl font-bold font-[family-name:var(--font-playfair)] mb-4 relative z-10"
              style={{
                background: `linear-gradient(135deg, #fff, ${theme.primaryLight}, ${theme.primary})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: `0 0 60px ${theme.primary}`,
              }}
            >
              Dive Into Excellence
            </h3>
            {/* Text glow effect */}
            <motion.div
              className="absolute inset-0 -z-10"
              style={{
                background: `radial-gradient(ellipse at center, ${theme.primary}50, transparent 70%)`,
                filter: "blur(30px)",
              }}
              animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>
          <motion.p
            className="text-xl md:text-2xl text-gray-200 font-light tracking-wide"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            Where Champions Are Made
          </motion.p>
        </div>
      </motion.div>

      {/* Bioluminescence particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 3 + Math.random() * 5,
            height: 3 + Math.random() * 5,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: ["#38bdf8", "#22c55e", "#a855f7", "#fbbf24"][i % 4],
            boxShadow: `0 0 ${10 + Math.random() * 10}px currentColor`,
          }}
          animate={{
            scale: [0, 1.5, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}
    </section>
  );
}
