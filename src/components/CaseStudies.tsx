"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CaseStudies() {
  const cases = [
    {
      industry: "Local Service Business",
      problem: "Leads arrive through WhatsApp but follow-ups are inconsistent.",
      solution: "AI Lead Qualification + Follow-Up Agent.",
    },
    {
      industry: "E-commerce Business",
      problem: "Customer support takes hours every day.",
      solution: "AI Customer Support Agent.",
    },
    {
      industry: "Real Estate Business",
      problem: "Agents spend too much time answering repetitive property questions.",
      solution: "AI Property Inquiry + Appointment Agent.",
    },
  ];

  return (
    <section className="py-24 relative bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12 text-center md:text-left">
          <p className="text-sm font-medium text-blue-400 mb-2 tracking-wider uppercase">Example Workflows</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">How businesses use Agentraa</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {cases.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="p-8 rounded-3xl glass-card border border-white/5"
            >
              <h3 className="text-xl font-semibold text-white mb-6 pb-4 border-b border-white/10">
                {item.industry}
              </h3>
              
              <div className="space-y-6">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-2 font-medium">Problem</p>
                  <p className="text-sm text-slate-300 leading-relaxed">{item.problem}</p>
                </div>
                <div>
                  <p className="text-xs text-blue-400 uppercase tracking-wider mb-2 font-medium">Solution</p>
                  <p className="text-sm text-white font-medium">{item.solution}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link href="#contact" className="inline-flex items-center gap-2 text-white font-medium hover:text-blue-400 transition-colors group text-lg">
            Want something similar for your business?
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
