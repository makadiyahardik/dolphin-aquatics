"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { themes } from "./ThemeProvider";

export default function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentV = searchParams.get("v") || "1";

  const handleThemeChange = (v) => {
    router.push(`?v=${v}`);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-2xl"
        style={{
          background: `linear-gradient(135deg, var(--primary-light), var(--primary-dark))`,
          boxShadow: `0 0 30px var(--primary)`
        }}
      >
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="absolute bottom-20 right-0 p-4 rounded-2xl border shadow-2xl min-w-[200px]"
            style={{
              background: "var(--bg-alt)",
              borderColor: "var(--primary)",
              boxShadow: `0 0 40px rgba(0,0,0,0.5)`
            }}
          >
            <p className="text-xs uppercase tracking-widest mb-3 opacity-60">Select Theme</p>
            <div className="space-y-2">
              {Object.entries(themes).map(([key, theme]) => (
                <motion.button
                  key={key}
                  whileHover={{ x: 5 }}
                  onClick={() => handleThemeChange(key)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                    currentV === key
                      ? "bg-white/10"
                      : "hover:bg-white/5"
                  }`}
                >
                  <div
                    className="w-8 h-8 rounded-full"
                    style={{
                      background: `linear-gradient(135deg, ${theme.primaryLight}, ${theme.primaryDark})`,
                      boxShadow: currentV === key ? `0 0 15px ${theme.primary}` : "none"
                    }}
                  />
                  <span className="text-sm font-medium">{theme.name}</span>
                  {currentV === key && (
                    <motion.svg
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-4 h-4 ml-auto"
                      style={{ color: theme.primary }}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </motion.svg>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
