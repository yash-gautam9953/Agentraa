"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 500px down
      const scrolledDown = window.scrollY > 500;
      
      // Hide if the contact section is in view
      const contactSection = document.getElementById("contact");
      let contactInView = false;
      if (contactSection) {
        const rect = contactSection.getBoundingClientRect();
        // If the top of the contact section is above the bottom of the viewport 
        // and the bottom is below the top of the viewport
        contactInView = rect.top <= window.innerHeight && rect.bottom >= 0;
      }
      
      setIsVisible(scrolledDown && !contactInView);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          className="mobile-floating-cta fixed z-40"
        >
          <Link
            href="#contact"
            onClick={(event) => {
              const contactSection = document.getElementById("contact");
              if (!contactSection) return;

              event.preventDefault();
              window.history.replaceState(null, "", "#contact");
              contactSection.scrollIntoView({
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
                block: "start",
              });
            }}
            className="mobile-floating-cta__link group inline-flex min-h-11 w-auto items-center justify-center gap-2 px-4 py-2.5 md:min-h-12 md:gap-3 md:px-6 md:py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full shadow-2xl hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505] focus-visible:ring-indigo-500"
          >
            <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
            <span className="whitespace-nowrap font-semibold text-xs md:text-sm tracking-wide">Talk to Agentraa <span aria-hidden="true">→</span></span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
