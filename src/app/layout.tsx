import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Agentraa | Your Technology Solutions Partner",
  description:
    "From software development and AI automation to cloud infrastructure and cybersecurity, Agentraa helps businesses solve challenges with the right technology.",
  keywords: [
    "technology solutions partner",
    "software development",
    "AI business automation",
    "cloud and devops",
    "cybersecurity",
    "IT consulting",
  ],
  icons: {
    icon: "/Agentraa Agency Orbital Logo.png",
    apple: "/Agentraa Agency Orbital Logo.png",
  },
  openGraph: {
    title: "Agentraa | Your Technology Solutions Partner",
    description:
      "We solve business problems with technology—across software development, AI automation, cloud infrastructure, cybersecurity, and IT consulting.",
    url: "https://agentraa.com",
    siteName: "Agentraa",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agentraa | Your Technology Solutions Partner",
    description:
      "We solve business problems with technology—across software development, AI automation, cloud infrastructure, cybersecurity, and IT consulting.",
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
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${outfit.variable} font-sans min-h-screen bg-white text-[#0B1220] flex flex-col antialiased selection:bg-[#2563EB]/15 selection:text-[#0B1220] overflow-x-clip`}
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
