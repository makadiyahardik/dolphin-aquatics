"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "../ThemeProvider";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Coach", href: "#coach" },
  { name: "Champions", href: "#champions" },
  { name: "Facilities", href: "#facilities" },
  { name: "Contact", href: "#contact" },
];

export default function NavigationElite() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "py-3" : "py-6"
        }`}
        style={{
          background: isScrolled ? `${theme.background}ee` : "transparent",
          backdropFilter: isScrolled ? "blur(20px)" : "none",
          borderBottom: isScrolled ? `1px solid ${theme.primary}20` : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="#home" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ rotate: 10 }}
                className="relative"
              >
                <svg viewBox="0 0 60 40" className="w-10 h-7" style={{ color: theme.primary }} fill="currentColor">
                  <path d="M55 20c-5 0-8-3-12-3s-7 3-12 3-8-3-12-3-7 3-12 3c-2 0-3.5-.5-5-1 1.5 8 10 14 24 14s22.5-6 24-14c-1.5.5-3 1-5 1z" />
                  <ellipse cx="50" cy="15" rx="3" ry="2" />
                  <path d="M5 18c3-2 6-4 10-4s8 2 12 2 8-2 12-2 8 2 12 2 7-2 10-4c-2-8-12-12-27-12S7 10 5 18z" />
                </svg>
              </motion.div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight font-[family-name:var(--font-playfair)] text-white">
                  DOLPHIN
                </span>
                <span
                  className="text-[8px] tracking-[0.3em] uppercase -mt-1"
                  style={{ color: theme.primary }}
                >
                  Aquatics
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item, index) => (
                <motion.div key={index} whileHover={{ y: -2 }}>
                  <Link
                    href={item.href}
                    className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors relative group"
                  >
                    {item.name}
                    <motion.span
                      className="absolute bottom-0 left-1/2 w-0 h-px group-hover:w-full group-hover:left-0 transition-all duration-300"
                      style={{ background: theme.primary }}
                    />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 text-sm font-bold text-black flex items-center gap-2"
                style={{ background: `linear-gradient(90deg, ${theme.primary}, ${theme.primaryDark})` }}
              >
                JOIN NOW
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            >
              <motion.span
                animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 block"
                style={{ background: theme.primary }}
              />
              <motion.span
                animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-6 h-0.5 block"
                style={{ background: theme.primary }}
              />
              <motion.span
                animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 block"
                style={{ background: theme.primary }}
              />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 lg:hidden"
            style={{ background: theme.background }}
          >
            <div className="flex flex-col items-center justify-center h-full">
              <div className="space-y-8 text-center">
                {navItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-3xl font-bold text-white hover:text-white/70 transition-colors font-[family-name:var(--font-playfair)] block"
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-12 px-10 py-4 text-black font-bold flex items-center gap-3"
                style={{ background: `linear-gradient(90deg, ${theme.primary}, ${theme.primaryDark})` }}
              >
                JOIN NOW
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
