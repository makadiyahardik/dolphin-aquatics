"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useTheme } from "./ThemeProvider";

// Animated Counter Component
function AnimatedCounter({ value, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const numericValue = parseInt(value.replace(/\D/g, "")) || 0;

  useEffect(() => {
    if (!isInView) return;

    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Easing function for smoother animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * numericValue);

      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isInView, numericValue, duration]);

  return (
    <span ref={ref}>
      {value.startsWith("#") ? "#" : ""}{count}{suffix}
    </span>
  );
}

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const theme = useTheme();
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Generate bubbles with random properties (reduced for performance)
  const bubbles = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    size: Math.random() * 20 + 5,
    left: Math.random() * 100,
    delay: Math.random() * 8,
    duration: Math.random() * 6 + 8,
  }));

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24"
      style={{ background: `linear-gradient(180deg, ${theme.background} 0%, ${theme.backgroundAlt} 50%, ${theme.background} 100%)` }}
    >
      {/* Background Image with underwater feel */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/media/optimized/image35.webp"
          alt="Swimmer performing butterfly stroke"
          fill
          className={`object-cover ${theme.isLight ? 'opacity-15' : 'opacity-25'}`}
          priority
        />
        <div className="absolute inset-0" style={{
          background: `linear-gradient(180deg, ${theme.background}95 0%, ${theme.background}70 30%, ${theme.background}80 70%, ${theme.background} 100%)`
        }} />
      </div>

      
      {/* Underwater Light Rays */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-0 light-ray"
            style={{
              left: `${15 + i * 18}%`,
              width: '8%',
              height: '100%',
              background: `linear-gradient(180deg, ${theme.primary}30 0%, ${theme.primary}10 30%, transparent 70%)`,
              filter: 'blur(20px)',
              transformOrigin: 'top center',
              animationDelay: `${i * 0.8}s`,
            }}
          />
        ))}
      </div>

      {/* Animated Bubbles */}
      <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
        {bubbles.map((bubble) => (
          <motion.div
            key={bubble.id}
            className="absolute rounded-full"
            style={{
              width: bubble.size,
              height: bubble.size,
              left: `${bubble.left}%`,
              bottom: '-5%',
              background: `radial-gradient(circle at 30% 30%, ${theme.primaryLight}60, ${theme.primary}30)`,
              border: `1px solid ${theme.primaryLight}40`,
              boxShadow: `inset -2px -2px 4px ${theme.primary}20, 0 0 10px ${theme.primary}20`,
            }}
            animate={{
              y: [0, -window.innerHeight * 1.2],
              x: [0, Math.sin(bubble.id) * 30, 0],
              scale: [1, 1.1, 0.9, 1],
            }}
            transition={{
              duration: bubble.duration,
              repeat: Infinity,
              delay: bubble.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Swimming Pool Lane Lines */}
      <div className="absolute inset-0 z-[1] pointer-events-none opacity-10">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-full w-px"
            style={{
              left: `${16 + i * 14}%`,
              background: `linear-gradient(180deg, transparent, ${theme.primary}, ${theme.primary}, transparent)`,
            }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Water Surface Effect at Top */}
      <div className="absolute top-0 left-0 right-0 h-32 z-[3] pointer-events-none overflow-hidden">
        <svg className="absolute top-0 w-full h-32" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="surface-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={theme.background} />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <motion.path
            fill="url(#surface-gradient)"
            d="M0,50 Q360,20 720,50 T1440,50 V0 H0 Z"
            animate={{
              d: [
                "M0,50 Q360,20 720,50 T1440,50 V0 H0 Z",
                "M0,50 Q360,80 720,50 T1440,50 V0 H0 Z",
                "M0,50 Q360,20 720,50 T1440,50 V0 H0 Z",
              ],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>

      {/* Animated Waves at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-64 z-[3] pointer-events-none overflow-hidden">
        <svg className="absolute bottom-0 w-[200%] h-full wave" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <defs>
            <linearGradient id="wave-gradient-1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={theme.primary} stopOpacity="0.4" />
              <stop offset="100%" stopColor={theme.background} stopOpacity="1" />
            </linearGradient>
          </defs>
          <path
            fill="url(#wave-gradient-1)"
            d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,138.7C672,128,768,160,864,181.3C960,203,1056,213,1152,192C1248,171,1344,117,1392,90.7L1440,64L1440,320L0,320Z"
          />
        </svg>
        <svg className="absolute bottom-0 w-[200%] h-3/4 wave" style={{ animationDelay: "-5s" }} viewBox="0 0 1440 320" preserveAspectRatio="none">
          <defs>
            <linearGradient id="wave-gradient-2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={theme.primaryLight} stopOpacity="0.2" />
              <stop offset="100%" stopColor={theme.background} stopOpacity="1" />
            </linearGradient>
          </defs>
          <path
            fill="url(#wave-gradient-2)"
            d="M0,256L48,234.7C96,213,192,171,288,176C384,181,480,235,576,234.7C672,235,768,181,864,165.3C960,149,1056,171,1152,197.3C1248,224,1344,256,1392,272L1440,288L1440,320L0,320Z"
          />
        </svg>
      </div>

      {/* Sparkle Effects (reduced for performance) */}
      <div className="absolute inset-0 z-[4] pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: theme.primaryLight,
              boxShadow: `0 0 6px ${theme.primaryLight}`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Interactive Underwater Glow */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full pointer-events-none z-[2]"
        style={{
          background: `radial-gradient(circle, ${theme.primary}25 0%, ${theme.primaryDark}10 40%, transparent 70%)`,
          left: "50%",
          top: "50%",
          x: mousePosition.x - 400,
          y: mousePosition.y - 400,
          filter: "blur(40px)",
        }}
      />

      {/* Content */}
      <motion.div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Badge with animated border */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative inline-flex mb-8 group"
          >
            {/* Animated gradient border */}
            <div
              className="absolute -inset-[2px] rounded-full opacity-75 blur-[1px]"
              style={{
                background: `linear-gradient(90deg, ${theme.primary}, ${theme.primaryLight}, ${theme.primaryDark}, ${theme.primary})`,
                backgroundSize: '300% 100%',
                animation: 'gradient-rotate 3s linear infinite',
              }}
            />
            <div
              className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full backdrop-blur-sm"
              style={{ background: theme.background }}
            >
              <motion.span
                className="w-2 h-2 rounded-full"
                style={{ background: theme.primary, boxShadow: `0 0 10px ${theme.primary}` }}
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm font-medium" style={{ color: theme.primary }}>
                India&apos;s #1 Swimming Team Since 2010
              </span>
            </div>
          </motion.div>

          {/* Main heading */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.6, 0.01, 0.05, 0.95] }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 font-[family-name:var(--font-playfair)]"
            >
              <span className="block drop-shadow-lg" style={{ color: theme.foreground }}>Dive Into</span>
              <motion.span
                className="block"
                style={{
                  background: `linear-gradient(135deg, ${theme.primaryLight} 0%, ${theme.primary} 50%, ${theme.primaryDark} 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: `drop-shadow(0 0 30px ${theme.primary}50)`,
                }}
              >
                Excellence
              </motion.span>
            </motion.h1>
          </div>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg md:text-xl max-w-2xl mx-auto mb-10" style={{ color: theme.foregroundMuted }}
          >
            World-class swim coaching at Centre for Sports Excellence.
            Led by Dronacharya Award winner Coach Nihar Ameen.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.a
              href="#contact"
              whileHover={{
                scale: 1.05,
                boxShadow: `0 0 50px ${theme.primary}60`,
              }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 font-bold rounded-full text-lg transition-all relative overflow-hidden group text-center"
              style={{
                color: theme.buttonText,
                background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark})`,
                boxShadow: `0 0 30px ${theme.primary}40`,
              }}
            >
              <span className="relative z-10">Start Your Journey</span>
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: `linear-gradient(135deg, ${theme.primaryLight}, ${theme.primary})` }}
              />
            </motion.a>
            <motion.a
              href="#facilities"
              whileHover={{ scale: 1.05, borderColor: theme.primary }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 font-semibold rounded-full text-lg transition-all backdrop-blur-sm text-center"
              style={{ border: `2px solid ${theme.primary}`, color: theme.foreground, background: `${theme.card}90` }}
            >
              View Programs
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-20 mb-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: "30", suffix: "+", label: "Years Experience" },
            { value: "500", suffix: "+", label: "Champions Trained" },
            { value: "50", suffix: "+", label: "International Medals" },
            { value: "#1", suffix: "", label: "Team in India" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4 + index * 0.15, type: "spring", stiffness: 100 }}
              whileHover={{ y: -5, boxShadow: `0 10px 40px ${theme.primary}20` }}
              className="text-center px-6 py-5 rounded-2xl backdrop-blur-sm"
              style={{
                background: `linear-gradient(135deg, ${theme.card}60, ${theme.card}40)`,
                border: `1px solid ${theme.primary}25`,
              }}
            >
              <motion.div
                className="text-3xl md:text-4xl font-bold mb-2"
                style={{
                  background: `linear-gradient(135deg, ${theme.primaryLight}, ${theme.primary})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={2000} />
              </motion.div>
              <div className="text-xs mt-2 uppercase tracking-widest" style={{ color: theme.foregroundMuted }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
