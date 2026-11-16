import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/10 pt-20 pb-10 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-5">
            <Link href="/" className="flex items-center gap-2 mb-6 group outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg w-fit" aria-label="Agentraa Home">
              <div className="relative w-10 h-10 flex items-center justify-center">
                 <div className="absolute inset-0 bg-indigo-500 rounded-lg opacity-20 blur-sm group-hover:opacity-40 transition-opacity"></div>
                 <Sparkles className="w-5 h-5 text-indigo-400 relative z-10" />
              </div>
              <span className="font-bold text-2xl tracking-tight text-white font-heading">Agentraa</span>
            </Link>
            <p className="text-slate-400 text-lg mb-8 max-w-sm leading-relaxed">
              Digital products and practical automation for businesses ready to grow.
            </p>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-white font-semibold mb-6">Solutions</h3>
            <ul className="space-y-4">
              <li><Link href="#solutions" className="text-slate-400 hover:text-white text-sm transition-colors outline-none focus-visible:text-white focus-visible:underline">Business websites</Link></li>
              <li><Link href="#solutions" className="text-slate-400 hover:text-white text-sm transition-colors outline-none focus-visible:text-white focus-visible:underline">Mobile applications</Link></li>
              <li><Link href="#solutions" className="text-slate-400 hover:text-white text-sm transition-colors outline-none focus-visible:text-white focus-visible:underline">WhatsApp automation</Link></li>
              <li><Link href="#solutions" className="text-slate-400 hover:text-white text-sm transition-colors outline-none focus-visible:text-white focus-visible:underline">AI-powered workflows</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-white font-semibold mb-6">Company</h3>
            <ul className="space-y-4">
              <li><Link href="#how-it-works" className="text-slate-400 hover:text-white text-sm transition-colors outline-none focus-visible:text-white focus-visible:underline">Our Process</Link></li>
              <li><Link href="#industries" className="text-slate-400 hover:text-white text-sm transition-colors outline-none focus-visible:text-white focus-visible:underline">Industries</Link></li>
              <li><Link href="#contact" className="text-slate-400 hover:text-white text-sm transition-colors outline-none focus-visible:text-white focus-visible:underline">Contact</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-white font-semibold mb-6">Ready to move forward?</h3>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              Tell us what your business needs. We’ll help you find a practical next step.
            </p>
            <Link 
              href="#contact" 
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-medium transition-all hover:glow-effect w-full outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
            >
              Talk to Agentraa
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Agentraa. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
