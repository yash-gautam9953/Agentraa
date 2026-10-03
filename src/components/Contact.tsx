"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle2, Building, AlertCircle, Bot, Mail, ShieldCheck, Info } from "lucide-react";

export default function Contact() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    businessName: "",
    businessType: "",
    teamSize: "",
    challenge: "",
    automation: [] as string[],
    budget: "",
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const nextStep = () => {
    if (step < 4) setStep(prev => prev + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, automation: formData.automation.length > 0 ? formData.automation.join(" + ") : "Not Specified" }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit");
      }

      setIsSubmitted(true);
    } catch (error: any) {
      console.error("Error submitting form:", error);
      alert(error.message || "Failed to submit form. Please check if Notion API is configured.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-6 text-indigo-400">
              <Building className="w-5 h-5" />
              <h3 className="text-xl font-bold text-white">About Your Business</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Business Name *</label>
                <input required type="text" name="businessName" value={formData.businessName} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" placeholder="E.g. Acme Corp" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Industry / Business Type *</label>
                <input required type="text" name="businessType" value={formData.businessType} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" placeholder="E.g. Real Estate Agency" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">How large is your team? *</label>
                <select required name="teamSize" value={formData.teamSize} onChange={handleChange} className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-4 text-slate-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all">
                  <option value="">Select team size</option>
                  <option value="Just me">Just me</option>
                  <option value="2-5">2–5</option>
                  <option value="6-10">6–10</option>
                  <option value="11-25">11–25</option>
                  <option value="25+">25+</option>
                </select>
              </div>
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-6 text-fuchsia-400">
              <AlertCircle className="w-5 h-5" />
              <h3 className="text-xl font-bold text-white">Your Challenge</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">What is the biggest bottleneck in your business right now? *</label>
                <textarea required name="challenge" value={formData.challenge} onChange={handleChange} rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 transition-all resize-none" placeholder="E.g. We need a professional website to get leads, and a WhatsApp bot to answer them instantly."></textarea>
              </div>
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-6 text-cyan-400">
              <Bot className="w-5 h-5" />
              <h3 className="text-xl font-bold text-white">Project Details</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">What do you want us to build? (Select multiple) *</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {["Business Website", "Mobile App", "WhatsApp Autobot", "Custom AI Agent"].map((option) => (
                    <label key={option} className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${formData.automation.includes(option) ? 'bg-cyan-500/10 border-cyan-500' : 'bg-slate-900 border-white/10 hover:border-white/20'}`}>
                      <input 
                        type="checkbox" 
                        className="w-5 h-5 rounded border-white/20 text-cyan-500 focus:ring-cyan-500 bg-slate-800"
                        checked={formData.automation.includes(option)}
                        onChange={(e) => {
                          const newSelections = e.target.checked 
                            ? [...formData.automation, option]
                            : formData.automation.filter(item => item !== option);
                          setFormData(prev => ({ ...prev, automation: newSelections }));
                        }}
                      />
                      <span className="text-slate-200">{option}</span>
                    </label>
                  ))}
                </div>
                <input type="text" className="opacity-0 absolute w-0 h-0" required value={formData.automation.length > 0 ? "valid" : ""} onChange={() => {}} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Budget Range (Optional)</label>
                <select name="budget" value={formData.budget} onChange={handleChange} className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-4 text-slate-300 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all">
                  <option value="">Select a range</option>
                  <option value="Just exploring">Just exploring</option>
                  <option value="Under ₹25000">Under ₹25,000</option>
                  <option value="₹25000 - ₹50000">₹25,000 – ₹50,000</option>
                  <option value="₹50000 - ₹100000">₹50,000 – ₹1,00,000</option>
                  <option value="₹100000+">₹1,00,000+</option>
                  <option value="Not sure">Not sure</option>
                </select>
              </div>
            </div>
          </motion.div>
        );
      case 4:
        return (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-6 text-indigo-400">
              <Mail className="w-5 h-5" />
              <h3 className="text-xl font-bold text-white">Contact Details</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Your Name *</label>
                <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Work Email *</label>
                <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Phone / WhatsApp Number *</label>
                <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" placeholder="+91 90000 00000" />
                <p className="text-xs text-slate-500 mt-2 flex items-start gap-1">
                  <Info className="w-3.5 h-3.5 shrink-0" />
                  We may use WhatsApp to follow up about your enquiry.
                </p>
              </div>
            </div>

            <div className="mt-8 p-6 rounded-2xl bg-white/5 border border-white/5">
              <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">What happens next?</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-slate-400">
                  <span className="text-indigo-400 font-bold">1.</span> We review your requirements
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-400">
                  <span className="text-indigo-400 font-bold">2.</span> We identify the best technical approach
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-400">
                  <span className="text-indigo-400 font-bold">3.</span> We discuss the best approach
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-400">
                  <span className="text-indigo-400 font-bold">4.</span> You decide whether to move forward
                </li>
              </ul>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="contact" className="py-24 relative bg-[#050505]">
      {/* Background glow */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight font-heading">
            Tell Us About Your Business
          </h2>
          <p className="text-lg text-slate-400">
            We'll identify where AI automation could create the biggest opportunity.
          </p>
        </div>

        <div className="glass-card rounded-3xl p-6 md:p-10 lg:p-12 border border-white/10 shadow-2xl relative bg-[#0a0a0a]/80 backdrop-blur-xl">
          
          {isSubmitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 className="w-12 h-12 text-green-400" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">Request Received</h3>
              <p className="text-slate-400 max-w-md mx-auto text-lg mb-8">
                Thank you for reaching out! Our automation experts are reviewing your business details and will contact you within 24 hours.
              </p>
              <div className="inline-flex items-center gap-2 text-sm text-slate-500 bg-white/5 px-4 py-2 rounded-full border border-white/5">
                <ShieldCheck className="w-4 h-4 text-green-400" />
                Your data is secure and confidential.
              </div>
            </motion.div>
          ) : (
            <>
              {/* Progress Indicator */}
              <div className="mb-12">
                <div className="flex justify-between mb-2">
                  <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">Step {step} of 4</div>
                  <div className="text-xs font-medium text-indigo-400 uppercase tracking-wider">
                    {step === 1 && "Business"}
                    {step === 2 && "Challenge"}
                    {step === 3 && "Automation"}
                    {step === 4 && "Contact"}
                  </div>
                </div>
                <div className="flex gap-2 h-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className={`flex-1 rounded-full transition-all duration-500 ${
                      i <= step ? "bg-indigo-500 shadow-[0_0_10px_rgba(79,70,229,0.5)]" : "bg-white/10"
                    }`} />
                  ))}
                </div>
              </div>

              {/* Form */}
              <form onSubmit={step === 4 ? handleSubmit : (e) => { e.preventDefault(); nextStep(); }}>
                
                <AnimatePresence mode="wait">
                  {renderStepContent()}
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mt-12 pt-8 border-t border-white/10">
                  {step > 1 ? (
                    <button 
                      type="button" 
                      onClick={prevStep}
                      className="flex items-center gap-2 px-6 py-3 rounded-full text-slate-400 hover:text-white hover:bg-white/5 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </button>
                  ) : (
                    <div></div> // Empty div for spacing
                  )}
                  
                  {step < 4 ? (
                    <button 
                      type="submit"
                      className="group flex items-center gap-2 px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-medium transition-all hover:shadow-[0_0_20px_rgba(79,70,229,0.4)] outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505] focus-visible:ring-indigo-500"
                    >
                      Next Step
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  ) : (
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="group flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-bold transition-all hover:shadow-[0_0_20px_rgba(79,70,229,0.4)] disabled:opacity-70 disabled:cursor-not-allowed outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505] focus-visible:ring-indigo-500"
                    >
                      {isSubmitting ? "Sending..." : "Get Project Proposal"}
                      {!isSubmitting && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                    </button>
                  )}
                </div>

              </form>
            </>
          )}

        </div>
      </div>
    </section>
  );
}
