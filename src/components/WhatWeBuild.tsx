"use client";

import { motion } from "framer-motion";
import { LayoutTemplate, MessageCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function WhatWeBuild() {
  return (
    <section id="solutions" className="py-24 relative bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight font-heading">
            Our Core Expertise
          </h2>
          <p className="text-lg text-slate-400">
            We don't do everything. We specialize exclusively in two areas to deliver unparalleled quality.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Feature 1: Websites */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 md:p-12 rounded-[2rem] border border-white/5 hover:border-white/10 transition-colors group relative overflow-hidden flex flex-col"
          >
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20 bg-slate-400 transition-opacity group-hover:opacity-30" />
            
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-300">
              <LayoutTemplate className="w-8 h-8 text-white" />
            </div>
            
            <h3 className="text-3xl font-bold text-white mb-4">High-Performance<br/>Business Websites</h3>
            <p className="text-slate-400 mb-8 leading-relaxed text-lg">
              Your website is your most valuable digital asset. We build blazing-fast, SEO-optimized, and conversion-focused websites that turn visitors into paying customers.
            </p>
            
            <ul className="space-y-3 mb-10 mt-auto">
              {["Custom Premium Design", "Lightning Fast Load Times", "Mobile-First Architecture", "SEO & Lead Generation Focus"].map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3 text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-slate-500 shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            
            <div>
              <Link href="#contact" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-slate-200 transition-colors">
                Start Web Project
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Feature 2: WhatsApp Autobots */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-card p-8 md:p-12 rounded-[2rem] border border-white/5 hover:border-white/10 transition-colors group relative overflow-hidden flex flex-col bg-[#050505]/50"
          >
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-10 bg-green-500 transition-opacity group-hover:opacity-20" />
            
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 bg-green-500/10 border border-green-500/20 group-hover:scale-110 transition-transform duration-300">
              <MessageCircle className="w-8 h-8 text-green-400" />
            </div>
            
            <h3 className="text-3xl font-bold text-white mb-4">Intelligent<br/>WhatsApp Autobots</h3>
            <p className="text-slate-400 mb-8 leading-relaxed text-lg">
              Don't lose customers because you couldn't reply in time. We build smart WhatsApp bots that answer queries, qualify leads, and book appointments 24/7.
            </p>
            
            <ul className="space-y-3 mb-10 mt-auto">
              {["24/7 Automated Customer Support", "Lead Qualification & Routing", "Automated Appointment Booking", "CRM & System Integration"].map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3 text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-green-500/50 shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            
            <div>
              <Link href="#contact" className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-500 transition-colors">
                Automate WhatsApp
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
