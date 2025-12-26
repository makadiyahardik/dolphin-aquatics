"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useTheme } from "./ThemeProvider";

const contactInfo = {
  address: "Centre for Sports Excellence (CSE), Tavarekere, Bengaluru, Karnataka 560029",
  phone: "+91 80 2634 5678",
  email: "info@dolphinaquatics.in",
  mapUrl: "https://maps.google.com/?q=Centre+for+Sports+Excellence+Bangalore",
};

const footerLinks = {
  programs: [{ name: "Learn to Swim", href: "#facilities" }, { name: "Competitive Training", href: "#facilities" }, { name: "Adult Swimming", href: "#facilities" }, { name: "Private Coaching", href: "#facilities" }],
  about: [{ name: "Our Story", href: "#about" }, { name: "Coach Nihar Ameen", href: "#coach" }, { name: "Champions", href: "#champions" }, { name: "Facilities", href: "#facilities" }],
};

const socialLinks = [
  { name: "Facebook", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg> },
  { name: "Instagram", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" /></svg> },
  { name: "YouTube", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg> },
  { name: "Twitter", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg> },
];

// Google Apps Script URL - Replace with your deployed script URL
const GOOGLE_SCRIPT_URL = "YOUR_GOOGLE_SCRIPT_URL_HERE";

export default function Footer() {
  const theme = useTheme();
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // For v=6: use brighter accent colors on dark footer
  const accentGradient = theme.useAlternatingBg
    ? `linear-gradient(135deg, ${theme.sectionWater}, ${theme.backgroundAlt})`
    : `linear-gradient(135deg, ${theme.primaryLight}, ${theme.primaryDark})`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      // Send data to Google Sheets via Apps Script
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", // Required for Google Apps Script
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Since no-cors doesn't return response, we assume success
      setFormSubmitted(true);
      setFormData({ name: "", email: "", phone: "", message: "" });

      setTimeout(() => {
        setShowContactForm(false);
        setFormSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer id="contact" className="relative pt-24 pb-12 overflow-hidden" style={{ background: `linear-gradient(180deg, ${theme.primary}, #021015)` }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${theme.primary}80, transparent)` }} />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-playfair)] mb-4" style={{ color: theme.foreground }}>
            Ready to Make <span style={{ background: accentGradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Waves</span>?
          </h2>
          <p className="max-w-xl mx-auto mb-8" style={{ color: theme.foregroundMuted }}>Join India&apos;s #1 swimming academy and start your journey towards excellence today.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              onClick={() => setShowContactForm(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 font-bold rounded-full transition-all"
              style={{
                color: theme.useAlternatingBg ? theme.primary : theme.buttonText,
                background: theme.useAlternatingBg
                  ? `linear-gradient(135deg, ${theme.sectionWater}, ${theme.backgroundAlt})`
                  : `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark})`,
                boxShadow: theme.useAlternatingBg ? `0 4px 30px ${theme.sectionWater}40` : `0 4px 30px ${theme.primary}40`
              }}>
              Enroll Now
            </motion.button>
            <motion.a
              href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 font-semibold rounded-full transition-all text-center"
              style={{ border: `2px solid ${theme.useAlternatingBg ? theme.sectionWater : theme.primary}`, color: theme.foreground }}>
              Call Us Now
            </motion.a>
          </div>
        </motion.div>

        {/* Contact Form Modal */}
        {showContactForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && setShowContactForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full max-w-md p-8 rounded-3xl relative"
              style={{ background: theme.card, border: `1px solid ${theme.border || theme.backgroundAlt}` }}
            >
              <button
                onClick={() => setShowContactForm(false)}
                className="absolute top-4 right-4 transition-colors"
                style={{ color: theme.foregroundMuted }}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {formSubmitted ? (
                <div className="text-center py-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                    style={{ background: `${theme.primary}20` }}
                  >
                    <svg className="w-8 h-8" style={{ color: theme.primary }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: theme.foreground }}>Thank You!</h3>
                  <p style={{ color: theme.foregroundMuted }}>We&apos;ll get back to you soon.</p>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold mb-2 font-[family-name:var(--font-playfair)]" style={{ color: theme.foreground }}>Join Dolphin Aquatics</h3>
                  <p className="text-sm mb-6" style={{ color: theme.foregroundMuted }}>Fill out the form and we&apos;ll contact you shortly.</p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="text"
                      placeholder="Your Name"
                      required
                      disabled={isSubmitting}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border focus:outline-none transition-colors disabled:opacity-50"
                      style={{ borderColor: `${theme.primary}50`, background: `${theme.background}`, color: theme.foreground }}
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      required
                      disabled={isSubmitting}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border focus:outline-none transition-colors disabled:opacity-50"
                      style={{ borderColor: `${theme.primary}50`, background: `${theme.background}`, color: theme.foreground }}
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      required
                      disabled={isSubmitting}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border focus:outline-none transition-colors disabled:opacity-50"
                      style={{ borderColor: `${theme.primary}50`, background: `${theme.background}`, color: theme.foreground }}
                    />
                    <textarea
                      placeholder="Tell us about your swimming goals..."
                      rows={3}
                      disabled={isSubmitting}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border focus:outline-none transition-colors resize-none disabled:opacity-50"
                      style={{ borderColor: `${theme.primary}50`, background: `${theme.background}`, color: theme.foreground }}
                    />
                    {submitError && (
                      <p className="text-red-500 text-sm text-center">{submitError}</p>
                    )}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                      className="w-full py-4 font-bold rounded-xl transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                      style={{ color: theme.buttonText, background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark})` }}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        "Submit Enquiry"
                      )}
                    </motion.button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* Contact Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6 mb-16"
        >
          <a
            href={contactInfo.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 rounded-2xl transition-all hover:scale-[1.02]"
            style={{ background: theme.card, border: `1px solid ${theme.border || theme.backgroundAlt}` }}
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{
              background: theme.useAlternatingBg ? '#FFFFFF' : `${theme.primary}20`,
              boxShadow: theme.useAlternatingBg ? '0 4px 15px rgba(0,0,0,0.1)' : 'none'
            }}>
              <svg className="w-6 h-6" style={{ color: theme.useAlternatingBg ? theme.primary : theme.primary }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h4 className="font-semibold mb-2" style={{ color: theme.foreground }}>Location</h4>
            <p className="text-sm" style={{ color: theme.foregroundMuted }}>{contactInfo.address}</p>
          </a>

          <a
            href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
            className="p-6 rounded-2xl transition-all hover:scale-[1.02]"
            style={{ background: theme.card, border: `1px solid ${theme.border || theme.backgroundAlt}` }}
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{
              background: theme.useAlternatingBg ? '#FFFFFF' : `${theme.primary}20`,
              boxShadow: theme.useAlternatingBg ? '0 4px 15px rgba(0,0,0,0.1)' : 'none'
            }}>
              <svg className="w-6 h-6" style={{ color: theme.useAlternatingBg ? theme.primary : theme.primary }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h4 className="font-semibold mb-2" style={{ color: theme.foreground }}>Phone</h4>
            <p className="text-sm" style={{ color: theme.foregroundMuted }}>{contactInfo.phone}</p>
          </a>

          <a
            href={`mailto:${contactInfo.email}`}
            className="p-6 rounded-2xl transition-all hover:scale-[1.02]"
            style={{ background: theme.card, border: `1px solid ${theme.border || theme.backgroundAlt}` }}
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{
              background: theme.useAlternatingBg ? '#FFFFFF' : `${theme.primary}20`,
              boxShadow: theme.useAlternatingBg ? '0 4px 15px rgba(0,0,0,0.1)' : 'none'
            }}>
              <svg className="w-6 h-6" style={{ color: theme.useAlternatingBg ? theme.primary : theme.primary }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h4 className="font-semibold mb-2" style={{ color: theme.foreground }}>Email</h4>
            <p className="text-sm" style={{ color: theme.foregroundMuted }}>{contactInfo.email}</p>
          </a>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="col-span-2 md:col-span-1">
            <Link href="#home" className="flex items-center mb-6">
              <div className="relative w-36 h-10">
                <Image
                  src="/media/image7.png"
                  alt="Dolphin Aquatics Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-sm mb-6" style={{ color: theme.foregroundMuted }}>In Pursuit of Excellence. India&apos;s premier swimming academy since 1992.</p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a key={index} href="#" whileHover={{ scale: 1.1 }} className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                  style={{ background: `${theme.card}80`, color: theme.foregroundMuted }}>{social.icon}</motion.a>
              ))}
            </div>
          </div>

          {Object.entries({ Programs: footerLinks.programs, About: footerLinks.about }).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: theme.foreground }}>{title}</h4>
              <ul className="space-y-3">
                {links.map((link, index) => (
                  <li key={index}><Link href={link.href} className="text-sm transition-colors" style={{ color: theme.foregroundMuted }}>{link.name}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8" style={{ borderTop: `1px solid ${theme.border || theme.backgroundAlt}` }}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm" style={{ color: theme.foregroundMuted }}>© {new Date().getFullYear()} Dolphin Aquatics. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="#" className="text-sm transition-colors" style={{ color: theme.foregroundMuted }}>Privacy Policy</Link>
              <Link href="#" className="text-sm transition-colors" style={{ color: theme.foregroundMuted }}>Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
