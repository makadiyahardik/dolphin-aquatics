"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTheme } from "../ThemeProvider";

const socialLinks = [
  { name: "FB", href: "#" },
  { name: "IG", href: "#" },
  { name: "YT", href: "#" },
  { name: "TW", href: "#" },
];

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Coach", href: "#coach" },
  { name: "Champions", href: "#champions" },
  { name: "Facilities", href: "#facilities" },
];

export default function FooterElite() {
  const theme = useTheme();

  return (
    <footer id="contact" className="relative pt-32 pb-12 overflow-hidden" style={{ background: theme.backgroundAlt }}>
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${theme.primary}, transparent)` }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <span
            className="text-xs font-bold tracking-[0.5em] uppercase block mb-6"
            style={{ color: theme.primary }}
          >
            Ready to Begin?
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold font-[family-name:var(--font-playfair)] mb-8">
            <span className="text-white">START YOUR</span>
            <br />
            <span style={{ color: theme.primary }}>JOURNEY TODAY</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-10">
            Join India&apos;s #1 swimming academy and train with the best. Your path to becoming a champion starts here.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05, x: 10 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 text-black font-bold text-lg flex items-center justify-center gap-3"
              style={{
                background: `linear-gradient(90deg, ${theme.primary}, ${theme.primaryDark})`,
                boxShadow: `0 0 40px ${theme.primary}40`,
              }}
            >
              ENROLL NOW
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 font-bold text-lg"
              style={{
                border: `2px solid ${theme.primary}`,
                color: theme.primary,
              }}
            >
              CONTACT US
            </motion.button>
          </div>
        </motion.div>

        {/* Divider with logo */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-8 mb-16"
        >
          <div className="h-px flex-1" style={{ background: `${theme.primary}30` }} />
          <Link href="#home" className="flex items-center gap-3">
            <svg viewBox="0 0 60 40" className="w-12 h-8" style={{ color: theme.primary }} fill="currentColor">
              <path d="M55 20c-5 0-8-3-12-3s-7 3-12 3-8-3-12-3-7 3-12 3c-2 0-3.5-.5-5-1 1.5 8 10 14 24 14s22.5-6 24-14c-1.5.5-3 1-5 1z" />
              <ellipse cx="50" cy="15" rx="3" ry="2" />
              <path d="M5 18c3-2 6-4 10-4s8 2 12 2 8-2 12-2 8 2 12 2 7-2 10-4c-2-8-12-12-27-12S7 10 5 18z" />
            </svg>
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-tight font-[family-name:var(--font-playfair)] text-white">
                DOLPHIN
              </span>
              <span
                className="text-[10px] tracking-[0.3em] uppercase"
                style={{ color: theme.primary }}
              >
                Aquatics
              </span>
            </div>
          </Link>
          <div className="h-px flex-1" style={{ background: `${theme.primary}30` }} />
        </motion.div>

        {/* Footer grid */}
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4
              className="text-xs font-bold tracking-[0.3em] uppercase mb-6"
              style={{ color: theme.primary }}
            >
              Navigation
            </h4>
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h4
              className="text-xs font-bold tracking-[0.3em] uppercase mb-6"
              style={{ color: theme.primary }}
            >
              Contact
            </h4>
            <div className="space-y-3 text-gray-400">
              <p>Padukone David Centre</p>
              <p>Bengaluru, Karnataka, India</p>
              <p className="hover:text-white transition-colors cursor-pointer">info@dolphinaquatics.in</p>
            </div>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h4
              className="text-xs font-bold tracking-[0.3em] uppercase mb-6"
              style={{ color: theme.primary }}
            >
              Follow Us
            </h4>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 flex items-center justify-center text-sm font-bold transition-colors"
                  style={{
                    border: `1px solid ${theme.primary}40`,
                    color: theme.primary,
                  }}
                >
                  {social.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderTop: `1px solid ${theme.primary}20` }}
        >
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Dolphin Aquatics. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-gray-500 text-sm hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="#" className="text-gray-500 text-sm hover:text-white transition-colors">
              Terms
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
