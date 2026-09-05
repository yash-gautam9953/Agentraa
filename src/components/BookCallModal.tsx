"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, Video } from "lucide-react";

export default function BookCallModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#book-call") {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange(); // Init

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const closeModal = () => {
    window.location.hash = "";
    setIsOpen(false);
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="absolute inset-0 bg-[#050505]/80 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-[0_0_50px_rgba(79,70,229,0.15)] overflow-hidden z-10 flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Header pattern */}
            <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-indigo-900/30 to-transparent pointer-events-none" />
            
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 z-20"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8 sm:p-10 relative z-10 flex-1 overflow-y-auto">
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6">
                <Calendar className="w-8 h-8 text-indigo-400" />
              </div>
              
              <h2 id="modal-title" className="text-3xl font-bold text-white mb-4">Book a Strategy Call</h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Let's understand your workflow and identify exactly where AI automation can create the biggest impact for your business.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4 text-slate-300 bg-white/5 p-4 rounded-xl border border-white/5">
                  <Clock className="w-5 h-5 text-indigo-400 shrink-0" />
                  <span className="font-medium">30-minute Strategy Session</span>
                </div>
                <div className="flex items-center gap-4 text-slate-300 bg-white/5 p-4 rounded-xl border border-white/5">
                  <Video className="w-5 h-5 text-fuchsia-400 shrink-0" />
                  <span className="font-medium">Video Call (Google Meet or Zoom)</span>
                </div>
              </div>

              <button
                onClick={() => {
                  // In a real app, this would open Calendly or redirect
                  alert("Redirecting to Calendly...");
                }}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-lg transition-all hover:glow-effect outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] focus-visible:ring-indigo-500"
              >
                Continue to Scheduling
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
