"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useTheme, heroVariations } from "./ThemeProvider";

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
  const searchParams = useSearchParams();

  // Get hero variation from URL param (default: 2 = Deep Ocean gradient)
  const heroVariant = parseInt(searchParams.get("hero") || "2");
  const variation = heroVariations[heroVariant] || heroVariations[2];

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

  // Determine text color based on variation
  const isLightBg = variation?.lightTop;
  // For dark backgrounds (diagonal-right, ocean-gradient, ocean-depth, 3d-beams), force white text
  const isDarkVariation = variation?.waveStyle === "diagonal-right" || variation?.waveStyle === "ocean-gradient" || variation?.waveStyle === "ocean-depth" || variation?.waveStyle === "3d-beams";
  const textColor = isDarkVariation ? "#FFFFFF" : (variation?.headingColor || (isLightBg ? theme.darkText : theme.foreground));
  const textMutedColor = isDarkVariation ? "#E0F7FF" : (variation?.subheadingColor || (isLightBg ? theme.darkTextMuted : theme.foregroundMuted));

  // Card colors - use consistent dark colors for white card backgrounds
  const cardTextPrimary = "#023E8A"; // Deep navy for headings
  const cardTextSecondary = "#0466A8"; // Darker blue for subtext (better contrast)
  const cardAccentBg = "#E8F4F8"; // Very light gray-cyan for swimmer rows

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24"
      style={{
        background: variation
          ? variation.background
          : `linear-gradient(180deg, ${theme.background} 0%, ${theme.backgroundAlt} 50%, ${theme.background} 100%)`
      }}
    >
      {/* Wave Style: diagonal-right (V1) - Full screen vertical beams - alternating pattern */}
      {variation?.waveStyle === "diagonal-right" && (
        <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
          {/* Alternating Vertical Stripes - consistent widths */}
          <div className="absolute inset-0" style={{
            background: `
              repeating-linear-gradient(90deg,
                #023E8A 0%,
                #023E8A 8.33%,
                #0077B6 8.33%,
                #0077B6 16.66%
              )
            `,
          }} />
        </div>
      )}

      {/* Wave Style: 3d-beams (V3) - 3D cylindrical beams like curtain folds */}
      {variation?.waveStyle === "3d-beams" && (
        <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
          {/* SVG with 3D cylindrical beams */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <defs>
              {/* Create gradients for each beam to simulate 3D cylinder effect */}
              {[...Array(12)].map((_, i) => (
                <linearGradient key={`beam-grad-${i}`} id={`beam3d-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#023E8A" />
                  <stop offset="15%" stopColor="#0466C8" />
                  <stop offset="35%" stopColor="#0096C7" />
                  <stop offset="50%" stopColor="#48CAE4" />
                  <stop offset="65%" stopColor="#0096C7" />
                  <stop offset="85%" stopColor="#0466C8" />
                  <stop offset="100%" stopColor="#023E8A" />
                </linearGradient>
              ))}
              {/* Highlight gradient for depth */}
              <linearGradient id="beam-highlight" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="40%" stopColor="rgba(255,255,255,0.1)" />
                <stop offset="50%" stopColor="rgba(255,255,255,0.2)" />
                <stop offset="60%" stopColor="rgba(255,255,255,0.1)" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
              {/* Ambient glow filter */}
              <filter id="glow3d" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Render 12 3D cylindrical beams */}
            {[...Array(12)].map((_, i) => {
              const beamWidth = 100 / 12;
              const x = i * beamWidth;
              return (
                <g key={`beam-group-${i}`}>
                  {/* Main beam with 3D gradient */}
                  <rect
                    x={`${x}%`}
                    y="0"
                    width={`${beamWidth}%`}
                    height="100%"
                    fill={`url(#beam3d-${i})`}
                  />
                  {/* Highlight overlay for extra depth */}
                  <rect
                    x={`${x}%`}
                    y="0"
                    width={`${beamWidth}%`}
                    height="100%"
                    fill="url(#beam-highlight)"
                    opacity="0.5"
                  />
                </g>
              );
            })}
          </svg>

          {/* Subtle animated light sweep for extra wow */}
          <motion.div
            className="absolute inset-y-0 w-[300px]"
            style={{
              background: `linear-gradient(90deg,
                transparent 0%,
                rgba(255,255,255,0.03) 30%,
                rgba(255,255,255,0.08) 50%,
                rgba(255,255,255,0.03) 70%,
                transparent 100%
              )`,
            }}
            animate={{
              x: ['-300px', 'calc(100vw + 300px)'],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 3,
            }}
          />

          {/* Top fade for smooth transition with nav */}
          <div
            className="absolute top-0 left-0 right-0 h-32"
            style={{
              background: 'linear-gradient(180deg, rgba(2,8,24,0.5) 0%, transparent 100%)',
            }}
          />
        </div>
      )}

      {/* Wave Style: ocean-gradient (V2) - Rich layered ocean gradient */}
      {variation?.waveStyle === "ocean-gradient" && (
        <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
          <svg className="absolute w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="none">
            {/* Base gradient */}
            <defs>
              <linearGradient id="ocean-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#023E8A" />
                <stop offset="50%" stopColor="#0077B6" />
                <stop offset="100%" stopColor="#00B4D8" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#ocean-grad)" />
            {/* Subtle wave accent at bottom */}
            <path
              d="M0,700 Q200,650 400,680 Q600,710 800,670 Q1000,630 1200,680 Q1400,730 1440,700 L1440,900 L0,900 Z"
              fill={variation.waveColor3}
              opacity="0.4"
            />
            <path
              d="M0,780 Q300,740 600,770 Q900,800 1200,760 Q1400,730 1440,760 L1440,900 L0,900 Z"
              fill={variation.waveColor3}
              opacity="0.3"
            />
          </svg>
        </div>
      )}

      {/* Wave Style: diagonal-left (V3) - Mirror, waves flowing to left */}
      {variation?.waveStyle === "diagonal-left" && (
        <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
          <svg className="absolute w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="none">
            {/* White area - larger, covers content */}
            <path
              d="M0,0 L1440,0 L1440,620 Q1200,660 1040,600 Q840,540 540,560 Q240,580 0,520 Z"
              fill="#FFFFFF"
            />
            {/* Wave 1 - Teal */}
            <path
              d="M0,520 Q240,580 540,560 Q840,540 1040,600 Q1200,660 1440,620
                 L1440,740 Q1200,780 1040,720 Q840,660 540,680 Q240,700 0,650 Z"
              fill={variation.waveColor1}
            />
            {/* Wave 2 - Medium blue */}
            <path
              d="M0,650 Q240,700 540,680 Q840,660 1040,720 Q1200,780 1440,740
                 L1440,850 Q1200,880 1040,830 Q840,780 540,800 Q240,820 0,780 Z"
              fill={variation.waveColor2}
            />
            {/* Wave 3 - Dark navy */}
            <path
              d="M0,780 Q240,820 540,800 Q840,780 1040,830 Q1200,880 1440,850
                 L1440,900 L0,900 Z"
              fill={variation.waveColor3}
            />
          </svg>
        </div>
      )}

      {/* Wave Style: layered-horizontal (V4) - Multiple elegant horizontal waves */}
      {variation?.waveStyle === "layered-horizontal" && (
        <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
          <svg className="absolute w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="none">
            {/* White top area - larger */}
            <path
              d="M0,0 L1440,0 L1440,580
                 Q1320,610 1200,590 Q1080,570 960,600 Q840,630 720,610
                 Q600,590 480,620 Q360,650 240,630 Q120,610 0,640 Z"
              fill="#FFFFFF"
            />
            {/* Wave 1 - Light cyan */}
            <path
              d="M0,640 Q120,610 240,630 Q360,650 480,620 Q600,590 720,610
                 Q840,630 960,600 Q1080,570 1200,590 Q1320,610 1440,580
                 L1440,700 Q1320,720 1200,700 Q1080,680 960,710 Q840,740 720,720
                 Q600,700 480,730 Q360,760 240,740 Q120,720 0,750 Z"
              fill={variation.waveColor1}
            />
            {/* Wave 2 - Bright cyan */}
            <path
              d="M0,750 Q120,720 240,740 Q360,760 480,730 Q600,700 720,720
                 Q840,740 960,710 Q1080,680 1200,700 Q1320,720 1440,700
                 L1440,790 Q1320,810 1200,790 Q1080,770 960,800 Q840,830 720,810
                 Q600,790 480,820 Q360,850 240,830 Q120,810 0,840 Z"
              fill={variation.waveColor2}
            />
            {/* Wave 3 - Medium blue */}
            <path
              d="M0,840 Q120,810 240,830 Q360,850 480,820 Q600,790 720,810
                 Q840,830 960,800 Q1080,770 1200,790 Q1320,810 1440,790
                 L1440,870 Q1320,885 1200,870 Q1080,855 960,875 Q840,895 720,880
                 Q600,865 480,885 Q360,905 240,890 Q120,875 0,895 Z"
              fill={variation.waveColor3}
            />
            {/* Wave 4 - Deep navy */}
            <path
              d="M0,895 Q120,875 240,890 Q360,905 480,885 Q600,865 720,880
                 Q840,895 960,875 Q1080,855 1200,870 Q1320,885 1440,870
                 L1440,900 L0,900 Z"
              fill={variation.waveColor4}
            />
          </svg>
        </div>
      )}

      {/* Wave Style: ocean-depth (V5) - Dramatic dark with glowing wave accents */}
      {variation?.waveStyle === "ocean-depth" && (
        <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
          <svg className="absolute w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="none">
            {/* Dark gradient base */}
            <defs>
              <linearGradient id="depth-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#03045E" />
                <stop offset="50%" stopColor="#023E8A" />
                <stop offset="100%" stopColor="#0077B6" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#depth-grad)" />
            {/* Glowing wave accent 1 */}
            <path
              d="M0,500 Q200,450 400,480 Q600,510 800,470 Q1000,430 1200,470 Q1400,510 1440,480
                 L1440,550 Q1400,580 1200,540 Q1000,500 800,540 Q600,580 400,550 Q200,520 0,560 Z"
              fill={variation.waveColor1}
              opacity="0.3"
            />
            {/* Glowing wave accent 2 */}
            <path
              d="M0,620 Q300,580 600,610 Q900,640 1200,600 Q1400,570 1440,600
                 L1440,680 Q1400,710 1200,680 Q900,720 600,690 Q300,660 0,700 Z"
              fill={variation.waveColor2}
              opacity="0.4"
            />
            {/* Bottom glow */}
            <path
              d="M0,750 Q360,710 720,740 Q1080,770 1440,730 L1440,900 L0,900 Z"
              fill={variation.waveColor3}
              opacity="0.25"
            />
          </svg>
          {/* Glow orbs */}
          <div
            className="absolute w-[500px] h-[500px] rounded-full"
            style={{
              left: '10%',
              top: '20%',
              background: `radial-gradient(circle, ${variation.waveColor2}20 0%, transparent 70%)`,
              filter: 'blur(40px)',
            }}
          />
          <div
            className="absolute w-[400px] h-[400px] rounded-full"
            style={{
              right: '15%',
              bottom: '25%',
              background: `radial-gradient(circle, ${variation.waveColor3}25 0%, transparent 70%)`,
              filter: 'blur(50px)',
            }}
          />
        </div>
      )}

      {/* Background Image - ONLY show for default theme (no variation) */}
      {!variation && (
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
      )}

      {/* Water effects - only show when NO variation is active (default theme) */}
      {!variation && (
        <>
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
        </>
      )}

      {/* Content - 3 Column Layout */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile: Featured Record Holders Card - HERO PLACEMENT */}
        <div className="lg:hidden mb-6 mt-2">
          {/* FEATURED: 2025 National Record Holders - Full Width Hero Card */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
            className="relative"
          >
            {/* Rotating Border - travels around all 4 sides */}
            <div className="absolute -inset-[3px] rounded-2xl overflow-hidden">
              <motion.div
                className="absolute w-[200%] h-[200%] top-[-50%] left-[-50%]"
                style={{
                  background: `conic-gradient(
                    from 0deg,
                    transparent 0deg,
                    transparent 340deg,
                    #FFD700 345deg,
                    #00FF88 350deg,
                    #00B4D8 355deg,
                    #FF6B6B 358deg,
                    transparent 360deg
                  )`,
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              />
            </div>

            {/* Glowing effect - rotating */}
            <div className="absolute -inset-[3px] rounded-2xl overflow-hidden">
              <motion.div
                className="absolute w-[200%] h-[200%] top-[-50%] left-[-50%]"
                style={{
                  background: `conic-gradient(
                    from 0deg,
                    transparent 0deg,
                    transparent 330deg,
                    #FFD700 340deg,
                    #00FF88 348deg,
                    #00B4D8 355deg,
                    #FF6B6B 358deg,
                    transparent 360deg
                  )`,
                  filter: 'blur(12px)',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              />
            </div>

            <div
              className="relative rounded-2xl p-4 sm:p-5 backdrop-blur-md overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${theme.foreground}fc 0%, ${theme.foreground}f8 100%)`,
                boxShadow: `0 15px 40px ${cardTextPrimary}30`,
              }}
            >

              {/* Header with trophy icon */}
              <div className="flex items-center justify-center gap-2 mb-3">
                <motion.div
                  animate={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                </motion.div>
                <h3 className="text-sm sm:text-base font-bold" style={{ color: cardTextPrimary }}>
                  2025 National Record Holders
                </h3>
                <motion.div
                  animate={{ rotate: [0, 10, -10, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                </motion.div>
              </div>

              {/* 4 Swimmers in 2x2 Grid */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {[
                  { name: "Srihari Nataraj", event: "100m Freestyle", time: "49.46s", image: "/Website-Images/Swimmer Photos/Srihari Nataraj_.jpg" },
                  { name: "Dhinidhi Desinghu", event: "200m Freestyle", time: "2:02.97s", image: "/Website-Images/Swimmer Photos/Dhinidhi-Desinghu_.jpg" },
                  { name: "Rohit Benedicton", event: "50m Butterfly", time: "23.89s", image: "/Website-Images/Swimmer Photos/Rohith Benediction_.jpg" },
                  { name: "Rujula Shashidhara", event: "50m Freestyle", time: "26.34s", image: "/Website-Images/Swimmer Photos/Rujula Shashidhara.jpg" },
                ].map((swimmer, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + idx * 0.1, duration: 0.5 }}
                    className="flex items-center gap-2 p-2 rounded-xl"
                    style={{ background: cardAccentBg }}
                  >
                    <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-cyan-400/30">
                      <Image src={swimmer.image} alt={swimmer.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] sm:text-xs font-bold truncate" style={{ color: cardTextPrimary }}>{swimmer.name}</p>
                      <p className="text-[9px] sm:text-[10px]" style={{ color: cardTextSecondary }}>{swimmer.event}</p>
                      <p className="text-[9px] sm:text-[10px] font-semibold" style={{ color: '#00B4D8' }}>{swimmer.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>

        <div className="grid lg:grid-cols-[280px_1fr_280px] gap-6 items-center min-h-[50vh] lg:min-h-[70vh]">

          {/* LEFT Panel - National Games Winners (Desktop only) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="hidden lg:block"
          >
            <div
              className="rounded-3xl p-6 backdrop-blur-sm"
              style={{ background: `${theme.foreground}f0`, boxShadow: `0 20px 60px ${cardTextPrimary}30` }}
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4">
                <Image
                  src="/media/srihari-dhinidhi-national-games.jpg"
                  alt="Srihari Nataraj and Dhinidhi Desinghu - National Games Winners"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg font-bold mb-1" style={{ color: cardTextPrimary }}>
                Srihari &amp; Dhinidhi
              </h3>
              <p className="text-sm font-medium" style={{ color: cardTextSecondary }}>
                National Games 2023
              </p>
              <p className="text-xs mt-2" style={{ color: cardTextSecondary }}>
                Best Male &amp; Female Swimmer
              </p>
            </div>
          </motion.div>

          {/* CENTER Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center"
          >
            {/* Small badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="relative inline-flex mb-4 group"
            >
              <div
                className="absolute -inset-[2px] rounded-full opacity-75 blur-[1px]"
                style={{
                  background: `linear-gradient(90deg, #023E8A, #00B4D8, #0077B6, #023E8A)`,
                  backgroundSize: '300% 100%',
                  animation: 'gradient-rotate 3s linear infinite',
                }}
              />
              <div
                className="relative inline-flex items-center gap-2 px-5 py-3 rounded-full backdrop-blur-sm"
                style={{
                  background: '#023E8A',
                  border: '3px solid #FFFFFF',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
                }}
              >
                <motion.span
                  className="w-2 h-2 rounded-full"
                  style={{ background: '#FFFFFF', boxShadow: '0 0 10px rgba(255,255,255,0.8)' }}
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-lg md:text-xl lg:text-2xl font-bold" style={{ color: '#FFFFFF' }}>
                  India&apos;s #1 Swimming Team
                </span>
              </div>
            </motion.div>

            {/* Main heading */}
            <div className="overflow-hidden">
              <motion.h1
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8, ease: [0.6, 0.01, 0.05, 0.95] }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 font-[family-name:var(--font-playfair)]"
              >
                <span className="block drop-shadow-lg" style={{ color: textColor }}>Dive Into</span>
                <motion.span
                  className="block"
                  style={isDarkVariation ? {
                    color: "#FFFFFF",
                    textShadow: "0 0 30px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.3)",
                  } : {
                    background: variation?.textGradient || `linear-gradient(135deg, ${theme.primaryLight} 0%, ${theme.primary} 50%, ${theme.primaryDark} 100%)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    filter: `drop-shadow(0 0 30px ${variation?.waveColor1 || theme.primary}50)`,
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
              className="text-base md:text-lg max-w-xl mx-auto mb-8" style={{ color: textMutedColor }}
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
                  boxShadow: isDarkVariation ? '0 0 40px rgba(255,255,255,0.4)' : `0 0 50px ${variation?.waveColor1 || theme.primary}60`,
                }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 font-bold rounded-full text-lg transition-all relative overflow-hidden group text-center"
                style={{
                  color: isDarkVariation ? "#023E8A" : "#FFFFFF",
                  background: isDarkVariation
                    ? "#FFFFFF"
                    : (variation ? `linear-gradient(135deg, ${variation.waveColor1}, #023E8A)` : `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark})`),
                  boxShadow: isDarkVariation ? '0 0 30px rgba(255,255,255,0.3)' : `0 0 30px ${variation?.waveColor1 || theme.primary}40`,
                }}
              >
                <span className="relative z-10">Start Your Journey</span>
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: isDarkVariation
                      ? "#CAF0F8"
                      : (variation ? `linear-gradient(135deg, ${variation.waveColor2}, ${variation.waveColor1})` : `linear-gradient(135deg, ${theme.primaryLight}, ${theme.primary})`)
                  }}
                />
              </motion.a>
              <motion.a
                href="#facilities"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 font-semibold rounded-full text-lg transition-all text-center"
                style={{
                  border: isDarkVariation
                    ? '3px solid #FFFFFF'
                    : `2px solid ${isLightBg ? (variation?.waveColor3 || theme.primary) : theme.primary}`,
                  color: '#FFFFFF',
                  background: isDarkVariation
                    ? '#062535'
                    : (isLightBg ? (variation?.waveColor3 || variation?.waveColor2 || theme.primary) : `${theme.card}90`)
                }}
              >
                View Programs
              </motion.a>
            </motion.div>

            {/* Mobile Only: National Games Winners - Below Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="lg:hidden mt-6"
            >
              <div
                className="rounded-xl p-3 backdrop-blur-sm flex items-center gap-3 max-w-md mx-auto"
                style={{ background: `${theme.foreground}e8`, boxShadow: `0 8px 20px ${cardTextPrimary}15` }}
              >
                <div className="relative w-16 h-12 sm:w-20 sm:h-14 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src="/media/srihari-dhinidhi-national-games.jpg"
                    alt="Srihari Nataraj and Dhinidhi Desinghu - National Games Winners"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xs sm:text-sm font-bold" style={{ color: cardTextPrimary }}>
                    National Games 2023 Champions
                  </h3>
                  <p className="text-[10px] sm:text-xs" style={{ color: cardTextSecondary }}>
                    Srihari &amp; Dhinidhi - Best Male &amp; Female
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT Panel - 2025 National Record Holders */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="hidden lg:block relative"
          >
            {/* Rotating Border - Desktop - travels around all 4 sides */}
            <div className="absolute -inset-[3px] rounded-3xl overflow-hidden">
              <motion.div
                className="absolute w-[200%] h-[200%] top-[-50%] left-[-50%]"
                style={{
                  background: `conic-gradient(
                    from 0deg,
                    transparent 0deg,
                    transparent 340deg,
                    #FFD700 345deg,
                    #00FF88 350deg,
                    #00B4D8 355deg,
                    #FF6B6B 358deg,
                    transparent 360deg
                  )`,
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              />
            </div>

            {/* Glowing effect - Desktop rotating */}
            <div className="absolute -inset-[3px] rounded-3xl overflow-hidden">
              <motion.div
                className="absolute w-[200%] h-[200%] top-[-50%] left-[-50%]"
                style={{
                  background: `conic-gradient(
                    from 0deg,
                    transparent 0deg,
                    transparent 330deg,
                    #FFD700 340deg,
                    #00FF88 348deg,
                    #00B4D8 355deg,
                    #FF6B6B 358deg,
                    transparent 360deg
                  )`,
                  filter: 'blur(12px)',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              />
            </div>

            <div
              className="relative rounded-3xl p-6 backdrop-blur-sm"
              style={{ background: `${theme.foreground}fc`, boxShadow: `0 20px 60px ${cardTextPrimary}30` }}
            >
              <h3 className="text-lg font-bold mb-4 text-center" style={{ color: cardTextPrimary }}>
                2025 National Record Holders
              </h3>
              <div className="space-y-2">
                {[
                  { name: "Srihari Nataraj", event: "100m Freestyle", time: "49.46s", image: "/Website-Images/Swimmer Photos/Srihari Nataraj_.jpg" },
                  { name: "Rohit Benedicton", event: "50m Butterfly", time: "23.89s", image: "/Website-Images/Swimmer Photos/Rohith Benediction_.jpg" },
                  { name: "Dhinidhi Desinghu", event: "200m Freestyle", time: "2:02.97s", image: "/Website-Images/Swimmer Photos/Dhinidhi-Desinghu_.jpg" },
                  { name: "Rujula Shashidhara", event: "50m Freestyle", time: "26.34s", image: "/Website-Images/Swimmer Photos/Rujula Shashidhara.jpg" },
                ].map((swimmer, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 rounded-xl" style={{ background: cardAccentBg }}>
                    <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                      <Image src={swimmer.image} alt={swimmer.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold truncate" style={{ color: cardTextPrimary }}>{swimmer.name}</p>
                      <p className="text-[10px]" style={{ color: cardTextSecondary }}>{swimmer.event} • {swimmer.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats - with highlighted colors */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-8 mb-16 grid grid-cols-2 md:grid-cols-4 gap-4"
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
              whileHover={{ y: -5, boxShadow: `0 10px 40px ${cardTextPrimary}40` }}
              className="text-center px-4 py-4 rounded-2xl"
              style={{
                background: `${theme.foreground}e8`,
                boxShadow: `0 8px 32px ${cardTextPrimary}20`,
              }}
            >
              <motion.div
                className="text-2xl md:text-3xl font-bold mb-1"
                style={{ color: cardTextPrimary }}
              >
                <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={2000} />
              </motion.div>
              <div className="text-xs uppercase tracking-wider font-medium" style={{ color: cardTextSecondary }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
