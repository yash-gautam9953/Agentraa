import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import BookCallModal from "@/components/BookCallModal";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Agentraa | Digital Solutions for Growing Businesses",
  description: "Agentraa helps businesses grow with high-performing websites, mobile apps, and practical AI-powered automation built around the way they work.",
  keywords: ["digital solutions for business", "business websites", "mobile app development", "AI automation", "business automation", "digital agency India"],
  openGraph: {
    title: "Agentraa | Digital Solutions for Growing Businesses",
    description: "Websites, mobile apps, and AI-powered automation to help businesses operate better and grow.",
    url: "https://agentraa.com",
    siteName: "Agentraa",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agentraa | Digital Solutions for Growing Businesses",
    description: "Websites, mobile apps, and AI-powered automation to help businesses operate better and grow.",
  },
  alternates: {
    canonical: "https://agentraa.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} ${outfit.variable} font-sans min-h-screen bg-[#050505] text-slate-200 flex flex-col antialiased selection:bg-indigo-500/30 selection:text-indigo-200 overflow-x-hidden`}>
        {/* Subtle background noise texture */}
        <div className="fixed inset-0 z-[-1] opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>
        
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingCTA />
        <BookCallModal />
      </body>
    </html>
  );
}
