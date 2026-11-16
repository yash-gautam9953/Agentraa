"use client";

import { motion } from "framer-motion";
import { Search, PenTool, Code, Rocket, RefreshCcw } from "lucide-react";

export default function TrustBar() {
  const steps = [
    { name: "Discover", icon: Search },
    { name: "Design", icon: PenTool },
    { name: "Build", icon: Code },
    { name: "Deploy", icon: Rocket },
    { name: "Improve", icon: RefreshCcw },
  ];

  return (
    <section className="py-10 sm:py-16 relative bg-[#050505] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-7 sm:mb-10">
          <h3 className="text-xs sm:text-sm font-bold text-slate-500 tracking-[0.18em] uppercase mb-2">Methodology</h3>
          <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">Built Around Your Business</h2>
        </div>

        <div className="grid grid-cols-3 gap-2.5 sm:gap-4 md:flex md:items-center md:justify-between md:gap-4 max-w-5xl mx-auto relative">
          
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-8 right-8 h-px bg-white/10 -translate-y-1/2 z-0" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="relative z-10 flex flex-col items-center justify-center gap-2 sm:gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-3 sm:rounded-none sm:border-0 sm:bg-[#050505] sm:px-4 sm:py-0"
              >
                <div className="w-11 h-11 sm:w-16 sm:h-16 rounded-xl sm:rounded-full glass-card border border-white/10 flex items-center justify-center text-slate-400 group hover:border-indigo-500/50 hover:text-indigo-400 hover:shadow-[0_0_20px_rgba(79,70,229,0.2)] transition-all duration-300">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="text-[10px] sm:text-sm font-semibold text-slate-300 uppercase tracking-[0.08em] sm:tracking-wide">
                  {step.name}
                </div>
              </motion.div>
            );
          })}
          
        </div>
      </div>
    </section>
  );
}
