"use client";

import { motion } from "framer-motion";
import { ArrowDown, XCircle, CheckCircle2 } from "lucide-react";

export default function BeforeAfter() {
  const beforeSteps = [
    "No credible online presence",
    "Customer asks a question on WhatsApp",
    "You are busy and miss the message",
    "Customer gets frustrated waiting",
    "They contact your competitor",
    "You lose the lead"
  ];

  const afterSteps = [
    "High-converting premium website builds trust",
    "Customer clicks your WhatsApp link",
    "Agentraa Autobot replies instantly",
    "Bot answers queries and qualifies lead",
    "Appointment is booked automatically",
    "You wake up to a new customer"
  ];

  return (
    <section className="py-24 relative bg-[#050505] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight font-heading">
            The Cost of an Outdated Setup.
          </h2>
          <p className="text-lg text-slate-400">
            Without a strong website and instant communication, you are leaking revenue every single day. Here's how we fix it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 relative max-w-5xl mx-auto">
          
          {/* Vertical divider on desktop */}
          <div className="hidden md:block absolute top-10 bottom-10 left-1/2 -translate-x-1/2 w-px bg-white/10" />

          {/* Before */}
          <div>
            <div className="flex items-center gap-3 mb-10 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20">
                <XCircle className="w-5 h-5 text-red-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-300">Without a System</h3>
            </div>
            
            <div className="space-y-4">
              {beforeSteps.map((step, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative flex flex-col items-center md:items-start"
                >
                  <div className="glass-card w-full p-4 text-center md:text-left rounded-xl border border-white/5 bg-white/[0.02] text-slate-400">
                    {step}
                  </div>
                  {idx < beforeSteps.length - 1 && (
                    <ArrowDown className="w-5 h-5 text-slate-600 my-2" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* After */}
          <div>
            <div className="flex items-center gap-3 mb-10 justify-center md:justify-start mt-12 md:mt-0">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">With Agentraa</h3>
            </div>
            
            <div className="space-y-4">
              {afterSteps.map((step, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative flex flex-col items-center md:items-start"
                >
                  <div className={`glass-card w-full p-4 text-center md:text-left rounded-xl border ${
                    idx === 0 || idx === 3 
                      ? "bg-white/10 border-white/30 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]" 
                      : "bg-white/[0.05] border-white/10 text-slate-300"
                  }`}>
                    {step}
                  </div>
                  {idx < afterSteps.length - 1 && (
                    <ArrowDown className="w-5 h-5 text-white/30 my-2 animate-bounce" style={{ animationDuration: "3s" }} />
                  )}
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
