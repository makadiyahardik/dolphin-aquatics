import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Dolphin Aquatics | India's Premier Swimming Academy",
  description: "India's #1 Swimming Team since 2010. Led by Dronacharya Award winner Nihar Ameen. World-class swim teaching and coaching programs at Centre for Sports Excellence, Bangalore.",
  keywords: ["swimming", "Dolphin Aquatics", "Nihar Ameen", "swimming academy", "Bangalore", "CSE", "India swimming", "competitive swimming", "learn to swim", "Khelo India"],
  authors: [{ name: "Dolphin Aquatics" }],
  creator: "Dolphin Aquatics",
  publisher: "Dolphin Aquatics",
  metadataBase: new URL("https://dolphinaquatics.in"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Dolphin Aquatics | India's Premier Swimming Academy",
    description: "India's #1 Swimming Team since 2010. Led by Dronacharya Award winner Nihar Ameen at Centre for Sports Excellence Bangalore.",
    url: "https://dolphinaquatics.in",
    siteName: "Dolphin Aquatics",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dolphin Aquatics | India's Premier Swimming Academy",
    description: "India's #1 Swimming Team since 2010. Led by Dronacharya Award winner Nihar Ameen.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
