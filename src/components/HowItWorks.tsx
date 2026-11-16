"use client";

import { motion } from "framer-motion";
import { Search, PenTool, Link2, TrendingUp, Sparkles } from "lucide-react";
import { useRef } from "react";

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const steps = [
    {
      number: "01",
      title: "Understand Your Business",
      description: "We learn how your business works, where customers need help, and what is slowing your team down.",
      icon: Search,
      color: "text-indigo-400",
      bg: "bg-indigo-500/10",
      border: "border-indigo-500/20"
    },
    {
      number: "02",
      title: "Plan the Right Solution",
      description: "Together, we choose the right approach: a stronger website, a mobile app, or a connected workflow.",
      icon: PenTool,
      color: "text-fuchsia-400",
      bg: "bg-fuchsia-500/10",
      border: "border-fuchsia-500/20"
    },
    {
      number: "03",
      title: "Design & Build",
      description: "Our team creates a polished, reliable solution that fits your brand and works with the tools your business already uses.",
      icon: Link2,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/20"
    },
    {
      number: "04",
      title: "Launch & Improve",
      description: "We help you launch, gather feedback, and make thoughtful improvements as your business and customer needs evolve.",
      icon: TrendingUp,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20"
    },
  ];

  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-fuchsia-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={containerRef}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
          
          {/* Sticky Left Column */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-32">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border-white/20 bg-white/5 text-slate-300 text-sm font-medium mb-6"
              >
                <Sparkles className="w-4 h-4 text-white" />
                <span>Our Proven Process</span>
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight"
              >
                From business challenge to <br/>
                <span className="text-gradient">digital solution.</span>
              </motion.h2>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-lg text-slate-400 mb-8 max-w-md"
              >
                We take care of the design and engineering, so you can stay focused on running and growing your business.
              </motion.p>
            </div>
          </div>

          {/* Scrolling Right Column */}
          <div className="lg:col-span-7 relative">
            {/* Vertical Line */}
            <div className="absolute left-8 md:left-12 top-0 bottom-0 w-[1px] bg-white/10 hidden sm:block" />

            <div className="space-y-12 md:space-y-24">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="relative sm:pl-24 group"
                  >
                    {/* Node / Icon on the line */}
                    <div className={`hidden sm:flex absolute left-8 md:left-12 -translate-x-1/2 top-0 w-16 h-16 rounded-2xl ${step.bg} ${step.border} border items-center justify-center z-10 group-hover:scale-110 transition-transform duration-500 backdrop-blur-md shadow-xl`}>
                      <Icon className={`w-8 h-8 ${step.color}`} />
                    </div>

                    <div className="glass-card p-8 md:p-10 relative overflow-hidden">
                      {/* Large faded number background */}
                      <div className="absolute -top-10 -right-4 text-9xl font-bold text-white/[0.03] select-none pointer-events-none font-sans">
                        {step.number}
                      </div>

                      {/* Mobile Icon */}
                      <div className={`sm:hidden w-14 h-14 rounded-2xl ${step.bg} ${step.border} border flex items-center justify-center mb-6`}>
                        <Icon className={`w-7 h-7 ${step.color}`} />
                      </div>

                      <div className="flex items-center gap-4 mb-4">
                        <span className={`text-sm font-bold tracking-widest ${step.color}`}>STEP {step.number}</span>
                      </div>
                      
                      <h3 className="text-2xl md:text-3xl font-semibold text-white mb-4">
                        {step.title}
                      </h3>
                      
                      <p className="text-slate-400 text-lg leading-relaxed relative z-10">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
