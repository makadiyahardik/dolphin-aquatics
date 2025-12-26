"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "./ThemeProvider";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Coach", href: "#coach" },
  { name: "Champions", href: "#champions" },
  { name: "Facilities", href: "#facilities" },
  { name: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: isScrolled ? `${theme.headerBackground || theme.card}f5` : "transparent",
          backdropFilter: isScrolled ? "blur(12px)" : "none",
          borderBottom: isScrolled ? `1px solid rgba(255, 255, 255, 0.1)` : "none",
          boxShadow: isScrolled ? `0 4px 30px rgba(0, 0, 0, 0.3)` : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="#home" className="flex items-center gap-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative w-32 sm:w-40 h-10 sm:h-12"
              >
                <Image
                  src="/media/image7.png"
                  alt="Dolphin Aquatics Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <Link
                    href={item.href}
                    className="relative text-base font-semibold transition-colors group underline-animation" style={{ color: theme.foreground }}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <motion.a
                href="#contact"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2.5 font-bold text-base rounded-full transition-all"
                style={{
                  color: theme.buttonText,
                  background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark})`,
                  boxShadow: `0 4px 20px ${theme.primary}40`,
                }}
              >
                Join Now
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative w-10 h-10 flex items-center justify-center"
            >
              <div className="flex flex-col gap-1.5">
                <motion.span
                  animate={{
                    rotate: isMobileMenuOpen ? 45 : 0,
                    y: isMobileMenuOpen ? 8 : 0,
                  }}
                  className="w-6 h-0.5 block origin-center"
                  style={{ background: theme.primary }}
                />
                <motion.span
                  animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                  className="w-6 h-0.5 block"
                  style={{ background: theme.primary }}
                />
                <motion.span
                  animate={{
                    rotate: isMobileMenuOpen ? -45 : 0,
                    y: isMobileMenuOpen ? -8 : 0,
                  }}
                  className="w-6 h-0.5 block origin-center"
                  style={{ background: theme.primary }}
                />
              </div>
            </button>
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
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              className="absolute right-0 top-0 h-full w-[85vw] max-w-[300px] p-6 sm:p-8 pt-20 sm:pt-24"
              style={{
                background: theme.background,
                borderLeft: `1px solid ${theme.primary}33`,
              }}
            >
              <div className="flex flex-col gap-6">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-lg font-medium transition-colors"
                      style={{ color: theme.foregroundMuted }}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.a
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mt-4 px-6 py-3 font-semibold rounded-full text-center block"
                  style={{
                    color: theme.buttonText,
                    background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark})`,
                  }}
                >
                  Join Now
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
