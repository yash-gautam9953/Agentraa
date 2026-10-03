"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutTemplate, MessageCircle, Bot, User, CheckCircle2, Activity, Smartphone, Monitor } from "lucide-react";

export default function Showcase() {
  const [activeTab, setActiveTab] = useState("website");
  const [demoStep, setDemoStep] = useState(0);

  const tabs = [
    { id: "website", label: "Website Development", icon: LayoutTemplate },
    { id: "app", label: "Mobile Apps", icon: Smartphone },
    { id: "whatsapp", label: "WhatsApp Autobots", icon: MessageCircle },
  ];

  const botDemo = {
    messages: [
      { type: "user", text: "Hi, I want to book a consultation for tomorrow." },
      { type: "ai", text: "Hello! I can help with that. What time works best for you?" },
      { type: "user", text: "4 PM." },
      { type: "ai", text: "4 PM is available. I've reserved it for you. You'll receive a confirmation SMS shortly." },
    ],
    actions: [
      "Customer intent recognized",
      "Calendar availability checked",
      "Appointment created in CRM",
      "Confirmation SMS triggered"
    ],
  };

  // Auto-play the bot demo
  useEffect(() => {
    if (activeTab !== "whatsapp") return;
    
    setDemoStep(0);
    const maxSteps = botDemo.messages.length;
    
    const interval = setInterval(() => {
      setDemoStep(prev => {
        if (prev < maxSteps) return prev + 1;
        return prev;
      });
    }, 2500); // 2.5 seconds per message

    return () => clearInterval(interval);
  }, [activeTab]);

  return (
    <section id="demos" className="py-24 relative bg-[#0a0a0a] overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-slate-800/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight font-heading">
            See the difference <br/>
            <span className="text-slate-400">quality engineering makes.</span>
          </h2>
          <p className="text-lg text-slate-500">
            Whether it's a stunning visual experience or a complex automated workflow, we build systems that perform.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-white ${
                activeTab === tab.id
                  ? "bg-white text-black shadow-lg"
                  : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5"
              }`}
            >
              <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? "text-black" : "text-slate-400"}`} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="max-w-5xl mx-auto">
          
          <AnimatePresence mode="wait">
            {activeTab === "website" && (
              <motion.div
                key="website-demo"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="glass-card rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#050505] p-2"
              >
                {/* Browser Mockup */}
                <div className="bg-[#0a0a0a] rounded-xl overflow-hidden border border-white/5">
                  <div className="h-10 border-b border-white/10 bg-white/5 flex items-center px-4 gap-4">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                    </div>
                    <div className="flex-1 max-w-md mx-auto h-6 bg-[#050505] rounded-md border border-white/10 flex items-center justify-center">
                      <span className="text-[10px] text-slate-500 font-mono tracking-widest">yourbusiness.com</span>
                    </div>
                  </div>
                  
                  <div className="relative h-[450px] w-full bg-[#050505] overflow-hidden flex flex-col">
                    {/* Simulated Website UI */}
                    <div className="h-16 flex items-center justify-between px-8 border-b border-white/5">
                       <div className="w-24 h-6 bg-white/10 rounded-sm"></div>
                       <div className="flex gap-6 hidden md:flex">
                          <div className="w-16 h-2 bg-white/10 rounded-full"></div>
                          <div className="w-16 h-2 bg-white/10 rounded-full"></div>
                          <div className="w-16 h-2 bg-white/10 rounded-full"></div>
                       </div>
                       <div className="w-24 h-8 bg-white text-black rounded-full text-[10px] flex items-center justify-center font-bold">Contact Us</div>
                    </div>
                    
                    <div className="flex-1 flex items-center justify-between px-8 md:px-16">
                      <div className="w-full md:w-1/2 space-y-6">
                        <div className="space-y-3">
                          <div className="w-full h-8 md:h-12 bg-white/20 rounded-md"></div>
                          <div className="w-4/5 h-8 md:h-12 bg-white/20 rounded-md"></div>
                        </div>
                        <div className="space-y-2 pt-4">
                          <div className="w-full h-3 bg-white/10 rounded-full"></div>
                          <div className="w-full h-3 bg-white/10 rounded-full"></div>
                          <div className="w-2/3 h-3 bg-white/10 rounded-full"></div>
                        </div>
                        <div className="pt-6 flex gap-4">
                          <div className="w-32 h-12 bg-white rounded-full"></div>
                          <div className="w-32 h-12 bg-white/5 border border-white/10 rounded-full"></div>
                        </div>
                      </div>
                      
                      <div className="hidden md:block w-1/2 relative h-full">
                         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-slate-400/10 rounded-full blur-3xl"></div>
                         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-64 bg-white/5 border border-white/10 rounded-2xl transform rotate-6"></div>
                         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-64 bg-[#0a0a0a] border border-white/20 rounded-2xl shadow-2xl"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "app" && (
              <motion.div
                key="app-demo"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex items-center justify-center py-10"
              >
                {/* Mobile Phone Mockup */}
                <div className="relative w-[300px] h-[600px] bg-[#050505] rounded-[3rem] border-8 border-white/10 shadow-2xl overflow-hidden flex flex-col p-4">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-white/10 rounded-b-3xl"></div>
                  
                  {/* App Content */}
                  <div className="pt-10 flex-1 flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 bg-white/20 rounded-full"></div>
                      <div className="w-8 h-8 bg-white/10 rounded-xl"></div>
                    </div>
                    
                    <div>
                      <div className="w-3/4 h-8 bg-white/20 rounded-lg mb-2"></div>
                      <div className="w-1/2 h-4 bg-white/10 rounded-md"></div>
                    </div>
                    
                    <div className="w-full h-40 bg-white/10 rounded-3xl mt-4"></div>
                    
                    <div className="flex gap-4 overflow-x-hidden">
                      <div className="w-32 h-32 bg-white/10 rounded-2xl shrink-0"></div>
                      <div className="w-32 h-32 bg-white/10 rounded-2xl shrink-0"></div>
                    </div>
                  </div>
                  
                  {/* Bottom Navigation */}
                  <div className="h-16 bg-white/5 rounded-3xl border border-white/10 flex items-center justify-around px-4">
                    <div className="w-6 h-6 bg-white/20 rounded-full"></div>
                    <div className="w-6 h-6 bg-white/10 rounded-full"></div>
                    <div className="w-6 h-6 bg-white/10 rounded-full"></div>
                    <div className="w-6 h-6 bg-white/10 rounded-full"></div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "whatsapp" && (
              <motion.div
                key="whatsapp-demo"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                {/* Chat Interface */}
                <div className="lg:col-span-7 glass-card rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#050505] h-[450px] flex flex-col relative">
                  
                  {/* WhatsApp style header */}
                  <div className="px-6 py-4 bg-[#075E54] flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center relative shrink-0">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white">Business Assistant</h3>
                      <div className="text-xs text-white/70">typing...</div>
                    </div>
                  </div>
                  
                  {/* Chat Body */}
                  <div className="p-6 space-y-6 overflow-y-auto flex-1 bg-[#ECE5DD] bg-opacity-[0.03]">
                    <AnimatePresence mode="popLayout">
                      {botDemo.messages.slice(0, demoStep).map((msg, idx) => (
                        <motion.div 
                          key={idx}
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          className={`flex items-start gap-2 ${msg.type === "ai" ? "" : "flex-row-reverse"}`}
                        >
                          <div className={`text-sm px-4 py-2.5 max-w-[85%] shadow-sm ${
                            msg.type === "ai" 
                              ? "bg-white text-slate-800 rounded-2xl rounded-tl-none" 
                              : "bg-[#DCF8C6] text-slate-800 rounded-2xl rounded-tr-none"
                          }`}>
                            {msg.text}
                          </div>
                        </motion.div>
                      ))}
                      
                      {demoStep < botDemo.messages.length && (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-center gap-4 text-slate-500 text-xs font-medium"
                        >
                          <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none shadow-sm flex gap-1">
                            <span className="animate-pulse inline-block w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
                            <span className="animate-pulse inline-block w-1.5 h-1.5 bg-slate-400 rounded-full" style={{ animationDelay: "0.2s" }}></span>
                            <span className="animate-pulse inline-block w-1.5 h-1.5 bg-slate-400 rounded-full" style={{ animationDelay: "0.4s" }}></span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Action Log */}
                <div className="lg:col-span-5 h-full flex flex-col justify-center pl-0 lg:pl-8 mt-8 lg:mt-0">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-400 mb-6 uppercase tracking-wider">
                    <Activity className="w-4 h-4" />
                    System Actions
                  </div>
                  
                  <div className="space-y-6 relative before:absolute before:inset-y-0 before:left-[11px] before:w-px before:bg-white/10">
                    <AnimatePresence>
                      {botDemo.actions.map((action, idx) => {
                        if (demoStep <= idx) return null;
                        
                        return (
                          <motion.div 
                            key={idx}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-4 relative z-10"
                          >
                            <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 border-4 border-[#0a0a0a] bg-green-500 text-[#0a0a0a]">
                              <CheckCircle2 className="w-4 h-4" />
                            </div>
                            <div className="text-sm font-medium text-slate-300">
                              {action}
                            </div>
                          </motion.div>
                        )
                      })}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
        </div>
      </div>
    </section>
  );
}
