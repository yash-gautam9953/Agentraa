"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, ArrowRight, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function ROICalculator() {
  const [employees, setEmployees] = useState(5);
  const [hoursPerDay, setHoursPerDay] = useState(3);
  const [hourlyCost, setHourlyCost] = useState(300);

  // Constants
  const workingDaysPerMonth = 22;
  const automationEfficiency = 0.8; // Assume 80% time saved

  // Calculations
  const hoursPerMonth = employees * hoursPerDay * workingDaysPerMonth;
  const monthlyCost = hoursPerMonth * hourlyCost;
  
  const savedHoursPerMonth = hoursPerMonth * automationEfficiency;
  const monthlySavings = monthlyCost * automationEfficiency;
  const annualSavings = monthlySavings * 12;

  // Progress Bar Widths (max out at 100%)
  const beforeWidth = 100;
  const afterWidth = 100 - (automationEfficiency * 100);

  return (
    <section className="py-24 relative bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left: Copy */}
          <div className="lg:col-span-5">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-heading tracking-tight">
              How much time could automation <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-fuchsia-400">save your team?</span>
            </h2>
            <p className="text-lg text-slate-400 mb-8 leading-relaxed">
              Manual tasks don't just drain your team's energy—they drain your profits. Use this simple calculator to estimate the hidden cost of repetitive work.
            </p>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-slate-300">Team Size (Employees)</label>
                  <span className="text-sm font-bold text-indigo-400">{employees}</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="50" 
                  value={employees} 
                  onChange={(e) => setEmployees(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-slate-300">Hours spent on repetitive tasks (Per Employee/Day)</label>
                  <span className="text-sm font-bold text-indigo-400">{hoursPerDay}h</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="8" 
                  value={hoursPerDay} 
                  onChange={(e) => setHoursPerDay(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-slate-300">Estimated Hourly Cost (₹)</label>
                  <span className="text-sm font-bold text-indigo-400">₹{hourlyCost}</span>
                </div>
                <input 
                  type="range" 
                  min="100" 
                  max="2000" 
                  step="50"
                  value={hourlyCost} 
                  onChange={(e) => setHourlyCost(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Right: Results */}
          <div className="lg:col-span-7 lg:pl-12">
            <motion.div 
              className="glass-card rounded-3xl p-8 border border-white/10 shadow-2xl relative overflow-hidden bg-[#050505]/50 backdrop-blur-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {/* Background gradient */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px]" />

              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                  <Calculator className="w-5 h-5 text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Estimated ROI</h3>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-10">
                <div>
                  <div className="text-sm text-slate-400 mb-1">Hours wasted monthly</div>
                  <div className="text-3xl font-bold text-white">{hoursPerMonth.toLocaleString()} <span className="text-lg font-normal text-slate-500">hrs</span></div>
                </div>
                <div>
                  <div className="text-sm text-slate-400 mb-1">Estimated monthly cost</div>
                  <div className="text-3xl font-bold text-red-400">₹{monthlyCost.toLocaleString('en-IN')}</div>
                </div>
              </div>

              {/* Visual Comparison */}
              <div className="space-y-6 mb-10 p-6 rounded-2xl bg-white/5 border border-white/5">
                <div>
                  <div className="flex justify-between text-sm font-semibold mb-2 text-slate-300">
                    <span>BEFORE AI</span>
                    <span className="text-slate-400">{hoursPerMonth.toLocaleString()} hrs manual work</span>
                  </div>
                  <div className="h-4 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-red-500/80"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${beforeWidth}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm font-semibold mb-2">
                    <span className="text-indigo-400">AFTER AUTOMATION</span>
                    <span className="text-indigo-400">{(hoursPerMonth - savedHoursPerMonth).toLocaleString()} hrs manual work</span>
                  </div>
                  <div className="h-4 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-indigo-500"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${afterWidth}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <div className="text-sm text-slate-400 mb-1 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    Potential Annual Savings
                  </div>
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                    ₹{annualSavings.toLocaleString('en-IN')}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">*Based on 80% automation efficiency</div>
                </div>
                
                <Link
                  href="#contact"
                  className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium transition-all hover:glow-effect flex items-center justify-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505] focus-visible:ring-indigo-500"
                >
                  Claim These Savings
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
