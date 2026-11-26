"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { name: "Solutions", href: "#solutions" },
  { name: "Our Work", href: "#our-work" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMobileMenuOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={`sticky top-0 inset-x-0 z-50 transition-shadow duration-200 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] ${
          isScrolled ? "shadow-sm" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="inline-flex min-h-11 items-center rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
              aria-label="Agentraa Home"
            >
              <Image
                src="/Agentraa Agency Orbital Logo.png"
                alt="Agentraa Agency"
                width={1536}
                height={1024}
                priority
                className="h-9 sm:h-11 w-auto object-contain"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8" aria-label="Primary navigation">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-[#475569] hover:text-[#2563EB] transition-colors py-1 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <Link
                href="#contact"
                className="inline-flex min-h-11 items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-[#2563EB] hover:bg-blue-700 rounded-lg transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2563EB]"
              >
                Discuss Your Project
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden min-h-11 min-w-11 flex items-center justify-center text-[#0B1220] hover:bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
              aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 z-[60] bg-[#0B1220]/40 backdrop-blur-xs md:hidden"
        >
          <div
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            onClick={(event) => event.stopPropagation()}
            className="absolute top-0 right-0 bottom-0 w-[min(85vw,22rem)] bg-white border-l border-[#E2E8F0] p-5 flex flex-col shadow-xl"
          >
            <div className="flex items-center justify-between pb-5 border-b border-[#E2E8F0]">
              <Image
                src="/Agentraa Agency Orbital Logo.png"
                alt="Agentraa Agency"
                width={1536}
                height={1024}
                className="h-9 w-auto object-contain"
              />
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="min-h-11 min-w-11 flex items-center justify-center text-[#475569] hover:text-[#0B1220] bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
                aria-label="Close mobile menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex flex-col gap-1 py-6 mb-auto" aria-label="Mobile navigation links">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex min-h-12 items-center rounded-lg px-3 text-base font-medium text-[#0B1220] hover:bg-[#F8FAFC] hover:text-[#2563EB] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="pt-5 border-t border-[#E2E8F0]">
              <Link
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex min-h-12 items-center justify-center w-full px-5 py-3 text-sm font-semibold text-white bg-[#2563EB] hover:bg-blue-700 rounded-lg transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2563EB]"
              >
                Discuss Your Project
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
