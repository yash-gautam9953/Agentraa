"use client";

import { motion } from "framer-motion";
import { ArrowRight, Puzzle, Blocks, Infinity } from "lucide-react";
import Link from "next/link";

export default function Pricing() {
  const approaches = [
    {
      icon: Puzzle,
      title: "Single Agent",
      description: "Perfect for automating one specific bottleneck, like customer support or lead qualification."
    },
    {
      icon: Blocks,
      title: "Connected System",
      description: "Multiple agents working together to automate an entire business function end-to-end."
    },
    {
      icon: Infinity,
      title: "Enterprise Scale",
      description: "Continuous optimization and custom engineering for large-scale operations."
    }
  ];

  return (
    <section className="py-24 relative bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight font-heading">
            Every Business Is Different
          </h2>
          <p className="text-lg text-slate-400">
            Some businesses need a single AI agent. Others need an entire automation system. We scope the solution around your workflow and requirements, ensuring you only pay for what actually drives value.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          {approaches.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card p-8 rounded-2xl border border-white/5 bg-white/[0.02]"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-6 border border-indigo-500/20">
                <item.icon className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="#contact"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-semibold transition-all hover:glow-effect hover:scale-105 active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] focus-visible:ring-indigo-500"
          >
            Discuss Your Business
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
