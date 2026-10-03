"use client";

import { motion } from "framer-motion";
import { ArrowRight, Layout, MessageCircle, Smartphone, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 50, damping: 20 } },
  };

  return (
    <section className="relative pt-32 pb-20 flex items-center overflow-hidden bg-[#050505]">
      {/* Subtle Premium Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-slate-800/20 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-white/5 rounded-full blur-[150px] mix-blend-screen" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          
          {/* Left: Copy */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-2xl"
          >
            <motion.h1 variants={itemVariants} className="text-5xl lg:text-7xl font-bold tracking-tight text-white mb-6 font-heading leading-[1.1]">
              Digital Excellence for <br />
              <span className="text-gradient">
                Modern Businesses.
              </span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-lg lg:text-xl text-slate-400 mb-10 leading-relaxed max-w-xl">
              We build high-performance websites, custom mobile apps, and intelligent WhatsApp autobots to help your business capture leads and scale effortlessly.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link 
                href="#automation-finder" 
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-black transition-all duration-300 bg-white border border-transparent rounded-full hover:bg-slate-200 hover:scale-105 active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505] focus-visible:ring-white"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="#contact" 
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-slate-300 transition-all duration-300 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:text-white outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505] focus-visible:ring-white"
              >
                Talk to Agentraa
              </Link>
            </motion.div>

            {/* Value Pillars */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-white/10">
              <div>
                <div className="flex items-center gap-2 text-white mb-2">
                  <Layout className="w-5 h-5 text-slate-400" />
                  <h3 className="font-semibold text-slate-200">Premium Web</h3>
                </div>
                <p className="text-sm text-slate-500">High-converting designs.</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-white mb-2">
                  <MessageCircle className="w-5 h-5 text-slate-400" />
                  <h3 className="font-semibold text-slate-200">WhatsApp Bots</h3>
                </div>
                <p className="text-sm text-slate-500">24/7 automated support.</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-white mb-2">
                  <Smartphone className="w-5 h-5 text-slate-400" />
                  <h3 className="font-semibold text-slate-200">Mobile Apps</h3>
                </div>
                <p className="text-sm text-slate-500">Native iOS & Android.</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Visual Setup */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, type: "spring", stiffness: 40 }}
            className="relative lg:h-[600px] flex items-center justify-center mt-12 lg:mt-0"
          >
            <div className="relative w-full max-w-lg mx-auto">
              
              {/* Premium Website Mockup */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 right-10 left-10 h-64 bg-[#0a0a0a] border border-white/10 rounded-t-2xl shadow-2xl overflow-hidden z-10 flex flex-col"
              >
                {/* Browser Header */}
                <div className="h-8 border-b border-white/10 bg-white/5 flex items-center px-4 gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                </div>
                {/* Website Content */}
                <div className="p-6 flex-1 relative">
                  <div className="w-1/3 h-4 bg-white/10 rounded-full mb-6"></div>
                  <div className="w-3/4 h-8 bg-white/20 rounded-lg mb-4"></div>
                  <div className="w-1/2 h-8 bg-white/20 rounded-lg mb-8"></div>
                  <div className="flex gap-4">
                    <div className="w-24 h-8 bg-white/30 rounded-full"></div>
                    <div className="w-24 h-8 bg-white/5 rounded-full border border-white/10"></div>
                  </div>
                </div>
              </motion.div>

              {/* WhatsApp Bot Mockup Floating */}
              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-10 -right-4 w-64 glass-card bg-[#050505]/90 border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-20"
              >
                <div className="h-12 bg-green-600/20 border-b border-green-500/20 flex items-center px-4 gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-[#050505]" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">Agentraa Bot</div>
                    <div className="text-[10px] text-green-400">Online</div>
                  </div>
                </div>
                <div className="p-4 space-y-4">
                  <div className="flex items-start gap-2">
                    <div className="bg-slate-800 text-slate-300 text-xs py-2 px-3 rounded-2xl rounded-tl-sm max-w-[80%]">
                      Hi, do you build websites?
                    </div>
                  </div>
                  <div className="flex items-start gap-2 flex-row-reverse">
                    <div className="bg-green-600 text-white text-xs py-2 px-3 rounded-2xl rounded-tr-sm max-w-[80%]">
                      Yes! We build high-converting business websites. How can we help?
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
