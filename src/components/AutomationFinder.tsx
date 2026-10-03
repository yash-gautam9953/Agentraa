"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, LayoutTemplate, MessageCircle, Layers, Target, Users, Zap, ShieldCheck, CheckCircle2, Smartphone } from "lucide-react";
import Link from "next/link";

export default function AutomationFinder() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    projectType: "",
    primaryGoal: "",
  });

  const projectTypes = [
    { id: "website", label: "Business Website", desc: "A high-converting online presence", icon: LayoutTemplate },
    { id: "app", label: "Mobile App", desc: "Native iOS & Android app", icon: Smartphone },
    { id: "whatsapp", label: "WhatsApp Autobot", desc: "Automate support & bookings", icon: MessageCircle },
    { id: "both", label: "Complete Digital Setup", desc: "Web, App & WhatsApp Setup", icon: Layers },
  ];

  const primaryGoals = [
    { id: "leads", label: "Get More Leads", icon: Target },
    { id: "support", label: "Automate Customer Support", icon: Users },
    { id: "credibility", label: "Build Brand Credibility", icon: ShieldCheck },
    { id: "time", label: "Save Operational Time", icon: Zap },
  ];

  const handleSelect = (field: keyof typeof answers, value: string) => {
    setAnswers(prev => ({ ...prev, [field]: value }));
    setTimeout(() => {
      setStep(prev => prev + 1);
    }, 400);
  };

  const getRecommendation = () => {
    const { projectType, primaryGoal } = answers;
    
    let title = "";
    let description = "";

    if (projectType === "both") {
      title = "The Complete Growth Engine";
      description = "A premium business website and mobile app to build trust, paired with a WhatsApp Autobot to instantly engage and convert leads 24/7.";
    } else if (projectType === "app") {
      title = "Premium Mobile Application";
      description = "A stunning, highly functional native mobile app that puts your business directly in your customers' pockets.";
    } else if (projectType === "website") {
      title = "High-Performance Business Website";
      description = primaryGoal === "leads" 
        ? "A conversion-optimized website designed specifically to turn your traffic into qualified leads."
        : "A stunning, fast-loading website that acts as your 24/7 digital storefront and builds massive brand trust.";
    } else {
      title = "Intelligent WhatsApp Autobot";
      description = primaryGoal === "support" || primaryGoal === "time"
        ? "An automated WhatsApp system that handles repetitive questions and bookings, saving you dozens of hours every week."
        : "A smart WhatsApp agent that instantly replies to new inquiries, ensuring you never lose a lead to a competitor.";
    }

    return { title, description };
  };

  return (
    <section id="automation-finder" className="py-24 relative bg-[#050505] border-y border-white/5">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-slate-800/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight font-heading">
            Start Your Project
          </h2>
          <p className="text-lg text-slate-400">
            Tell us what you're looking for, and we'll craft the perfect solution.
          </p>
        </div>

        <div className="glass-card rounded-3xl p-6 md:p-12 border border-white/10 shadow-2xl relative overflow-hidden bg-[#0a0a0a]/80 backdrop-blur-xl min-h-[400px] flex flex-col justify-center">
          
          {/* Progress Bar */}
          {step <= 2 && (
            <div className="absolute top-0 left-0 right-0 h-1 bg-white/5">
              <motion.div 
                className="h-full bg-white"
                initial={{ width: "0%" }}
                animate={{ width: `${(step / 2) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          )}

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full"
              >
                <h3 className="text-2xl font-bold text-white mb-8 text-center">1. What do you need to build?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {projectTypes.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleSelect("projectType", item.id)}
                      className={`flex flex-col items-center text-center gap-3 p-6 rounded-2xl border transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-white ${
                        answers.projectType === item.id 
                          ? "bg-white text-black border-white" 
                          : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20"
                      }`}
                    >
                      <item.icon className={`w-8 h-8 ${answers.projectType === item.id ? "text-black" : "text-slate-400"}`} />
                      <div>
                        <div className="font-bold mb-1">{item.label}</div>
                        <div className={`text-xs ${answers.projectType === item.id ? "text-slate-700" : "text-slate-500"}`}>{item.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full"
              >
                <h3 className="text-2xl font-bold text-white mb-8 text-center">2. What is your primary goal?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {primaryGoals.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleSelect("primaryGoal", item.id)}
                      className={`flex items-center gap-4 p-5 rounded-2xl border transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-white ${
                        answers.primaryGoal === item.id 
                          ? "bg-white text-black border-white" 
                          : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20"
                      }`}
                    >
                      <item.icon className={`w-6 h-6 ${answers.primaryGoal === item.id ? "text-black" : "text-slate-400"}`} />
                      <span className="font-bold">{item.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full text-center"
              >
                <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-sm font-bold tracking-widest text-slate-400 uppercase mb-2">
                  Our Recommendation
                </h3>
                
                <h4 className="text-3xl font-bold text-white mb-4">
                  {getRecommendation().title}
                </h4>
                
                <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                  {getRecommendation().description}
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link
                    href="#contact"
                    className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black rounded-full font-bold transition-all hover:bg-slate-200 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] focus-visible:ring-white"
                  >
                    Discuss this setup
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <button 
                    onClick={() => {
                      setStep(1);
                      setAnswers({ projectType: "", primaryGoal: "" });
                    }}
                    className="px-8 py-4 text-sm font-medium text-slate-400 hover:text-white transition-colors outline-none focus-visible:underline"
                  >
                    Start over
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
