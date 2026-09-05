"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Utensils, Home, Scissors, Briefcase, Store, ArrowRight, User, Bot, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function Industries() {
  const [activeIndustry, setActiveIndustry] = useState("restaurant");

  const industries = [
    { id: "restaurant", label: "Restaurant", icon: Utensils },
    { id: "realestate", label: "Real Estate", icon: Home },
    { id: "salon", label: "Clinic / Salon", icon: Scissors },
    { id: "agency", label: "Agencies", icon: Briefcase },
    { id: "ecommerce", label: "E-commerce", icon: Store },
  ];

  const workflows = {
    restaurant: {
      title: "Automate Reservations & Orders",
      steps: [
        { role: "Customer", text: "Table for 4 at 8 PM tonight?" },
        { role: "AI Agent", text: "Checking availability...", active: true },
        { role: "System", text: "Reservation Confirmed", success: true },
        { role: "AI Agent", text: "Sends confirmation & menu link." }
      ]
    },
    realestate: {
      title: "Qualify & Route Leads 24/7",
      steps: [
        { role: "Customer", text: "Is this property still available?" },
        { role: "AI Agent", text: "Qualifying budget & timeline...", active: true },
        { role: "System", text: "High-value lead matched", success: true },
        { role: "AI Agent", text: "Routes to senior sales agent." }
      ]
    },
    salon: {
      title: "Smart Booking & Follow-ups",
      steps: [
        { role: "Customer", text: "Do you have time for a haircut?" },
        { role: "AI Agent", text: "Scanning calendar slots...", active: true },
        { role: "System", text: "Appointment Booked", success: true },
        { role: "AI Agent", text: "Triggers 24hr reminder." }
      ]
    },
    agency: {
      title: "Client Onboarding & Updates",
      steps: [
        { role: "Customer", text: "Can I get an update on the project?" },
        { role: "AI Agent", text: "Retrieving project status...", active: true },
        { role: "System", text: "Report Generated", success: true },
        { role: "AI Agent", text: "Sends summary to client." }
      ]
    },
    ecommerce: {
      title: "Instant Support & Upsells",
      steps: [
        { role: "Customer", text: "Where is my order #12345?" },
        { role: "AI Agent", text: "Checking Shopify API...", active: true },
        { role: "System", text: "Tracking Info Found", success: true },
        { role: "AI Agent", text: "Sends update + 10% discount code." }
      ]
    }
  };

  const currentWorkflow = workflows[activeIndustry as keyof typeof workflows];

  return (
    <section id="industries" className="py-24 relative bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight font-heading">
            AI automation for the way <br/>
            <span className="text-indigo-400">your business works.</span>
          </h2>
          <p className="text-lg text-slate-400">
            Select your industry to see how an AI agent handles your specific workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
          
          {/* Left: Industry Selector */}
          <div className="lg:col-span-4 space-y-2">
            {industries.map((ind) => (
              <button
                key={ind.id}
                onClick={() => setActiveIndustry(ind.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 text-left outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                  activeIndustry === ind.id
                    ? "bg-indigo-600/10 border-indigo-500/30 text-white shadow-[inset_0_0_20px_rgba(79,70,229,0.1)] border"
                    : "bg-transparent border-transparent text-slate-400 hover:text-slate-200 hover:bg-white/5 border"
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  activeIndustry === ind.id ? "bg-indigo-500 text-white" : "bg-white/5 text-slate-400"
                }`}>
                  <ind.icon className="w-5 h-5" />
                </div>
                <span className="font-medium text-lg">{ind.label}</span>
                {activeIndustry === ind.id && (
                  <ArrowRight className="w-4 h-4 ml-auto text-indigo-400" />
                )}
              </button>
            ))}
          </div>

          {/* Right: Dynamic Visualization */}
          <div className="lg:col-span-8">
            <div className="glass-card rounded-3xl p-8 md:p-12 border border-white/10 h-full relative overflow-hidden bg-[#050505]/50 backdrop-blur-xl">
              
              {/* Background glow based on active state */}
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[80px]" />

              <h3 className="text-2xl font-bold text-white mb-8 relative z-10">{currentWorkflow.title}</h3>
              
              <div className="space-y-6 relative z-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndustry}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    {currentWorkflow.steps.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 mt-1 border ${
                          step.role === "Customer" ? "bg-slate-800 border-white/10 text-slate-400" :
                          step.role === "AI Agent" ? "bg-indigo-900/50 border-indigo-500/30 text-indigo-400" :
                          "bg-green-900/30 border-green-500/30 text-green-400"
                        }`}>
                          {step.role === "Customer" && <User className="w-5 h-5" />}
                          {step.role === "AI Agent" && <Bot className="w-5 h-5" />}
                          {step.role === "System" && <CheckCircle2 className="w-5 h-5" />}
                        </div>
                        
                        <div className="flex-1">
                          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">{step.role}</div>
                          <div className={`text-sm md:text-base p-4 rounded-2xl ${
                            step.role === "Customer" ? "bg-white/5 text-slate-200 rounded-tl-none inline-block" :
                            step.role === "AI Agent" ? "bg-indigo-500/10 text-indigo-100 rounded-tl-none border border-indigo-500/20 inline-block" :
                            "bg-green-500/10 text-green-300 rounded-tl-none border border-green-500/20 font-medium inline-block flex items-center gap-2"
                          }`}>
                            {step.text}
                          </div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-12 relative z-10 pt-8 border-t border-white/10">
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-2 text-indigo-400 font-medium hover:text-indigo-300 transition-colors group outline-none focus-visible:underline"
                >
                  Automate this workflow
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

            </div>
          </div>
        </div>

        {/* Who We Help - Expanded List */}
        <div className="mt-32 max-w-5xl mx-auto text-center border-t border-white/5 pt-16">
          <h3 className="text-2xl font-bold text-white mb-10 font-heading">Built for Businesses That Are Ready to Automate</h3>
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {["Restaurants", "Clinics", "Real Estate", "Salons", "Agencies", "E-commerce", "Consultants", "Coaches", "Local Services", "Professional Services"].map((ind) => (
              <div key={ind} className="px-6 py-3 rounded-full border border-white/10 bg-white/5 text-slate-300 font-medium text-sm">
                {ind}
              </div>
            ))}
          </div>
          
          <div className="glass-card p-8 rounded-3xl border border-indigo-500/20 bg-indigo-500/5 max-w-2xl mx-auto">
            <h4 className="text-lg font-bold text-white mb-2">Not sure if your business is a fit?</h4>
            <p className="text-slate-400 mb-6 text-sm">We've built custom automation for dozens of niche industries.</p>
            <Link
              href="#automation-finder"
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-medium transition-all hover:glow-effect active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              Find My Automation Opportunity
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
