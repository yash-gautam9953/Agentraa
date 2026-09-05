"use client";

import { motion } from "framer-motion";
import { Search, PenTool, Link2, TrendingUp, Sparkles } from "lucide-react";
import { useRef } from "react";

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const steps = [
    {
      number: "01",
      title: "Discovery & Analysis",
      description: "We dive deep into your business operations to identify bottlenecks, repetitive tasks, and areas where AI can drive the most impact. We don't just look for tasks to automate; we look for processes to transform.",
      icon: Search,
      color: "text-indigo-400",
      bg: "bg-indigo-500/10",
      border: "border-indigo-500/20"
    },
    {
      number: "02",
      title: "Custom AI Design",
      description: "Our engineers design a tailored AI architecture. Whether it's a customer support agent, a lead qualification bot, or an internal data analyst, the system is designed to match your brand's voice and specific logic.",
      icon: PenTool,
      color: "text-fuchsia-400",
      bg: "bg-fuchsia-500/10",
      border: "border-fuchsia-500/20"
    },
    {
      number: "03",
      title: "Seamless Integration",
      description: "We integrate the AI agents into your existing tech stack. From CRMs like Salesforce and HubSpot to communication channels like Slack and WhatsApp, the deployment is smooth and non-disruptive.",
      icon: Link2,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/20"
    },
    {
      number: "04",
      title: "Optimization & Scale",
      description: "Once live, we monitor the AI's performance, refine its responses, and scale its capabilities. As your business grows, your AI workforce scales instantly to meet demand without adding overhead.",
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
                From an outdated setup to <br/>
                <span className="text-gradient">digital excellence.</span>
              </motion.h2>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-lg text-slate-400 mb-8 max-w-md"
              >
                We handle the design and engineering complexity so you can focus on what you do best: running and growing your business.
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
