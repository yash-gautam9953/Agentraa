"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
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
          className="fixed bottom-6 right-6 z-40 hidden md:block" // Hidden on small screens to avoid blocking content
        >
          <Link
            href="#contact"
            className="group flex items-center gap-3 px-6 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full shadow-2xl hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505] focus-visible:ring-indigo-500"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="font-semibold text-sm tracking-wide">Talk to Agentraa →</span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
