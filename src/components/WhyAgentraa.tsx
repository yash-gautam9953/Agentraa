"use client";

import { motion } from "framer-motion";
import { Search, Lightbulb, PenTool, Code, RefreshCcw } from "lucide-react";

export default function WhyAgentraa() {
  const steps = [
    {
      num: "01",
      title: "Understand",
      desc: "We understand your workflow.",
      icon: Search
    },
    {
      num: "02",
      title: "Identify",
      desc: "We identify repetitive or expensive processes.",
      icon: Lightbulb
    },
    {
      num: "03",
      title: "Design",
      desc: "We design the right AI workflow.",
      icon: PenTool
    },
    {
      num: "04",
      title: "Build",
      desc: "We connect the required systems.",
      icon: Code
    },
    {
      num: "05",
      title: "Improve",
      desc: "We continuously optimize the system.",
      icon: RefreshCcw
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-[#050505] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight font-heading">
            We Build What Your Business <br/>
            <span className="text-slate-400">Actually Needs.</span>
          </h2>
          <p className="text-lg text-slate-400">
            We are an engineering and design partner. We don't sell generic templates; we build custom websites and automated systems tailored to your workflow.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-[45px] left-10 right-10 h-px bg-white/10 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4 relative z-10">
            {steps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-center text-center lg:bg-[#050505] px-2"
              >
                <div className="w-20 h-20 rounded-2xl glass-card border border-white/10 flex items-center justify-center mb-6 relative group hover:border-indigo-500/50 hover:shadow-[0_0_20px_rgba(79,70,229,0.2)] transition-all duration-300">
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center border-4 border-[#050505]">
                    {step.num}
                  </div>
                  <step.icon className="w-8 h-8 text-slate-300 group-hover:text-indigo-400 transition-colors" />
                </div>
                
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-slate-400">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
