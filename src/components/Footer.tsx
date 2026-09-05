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
              AI Agents That Work. Businesses That Scale. <br className="hidden lg:block"/>
              We build intelligent automation systems for ambitious small businesses.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all outline-none focus-visible:ring-2 focus-visible:ring-indigo-500" aria-label="LinkedIn">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all outline-none focus-visible:ring-2 focus-visible:ring-indigo-500" aria-label="Twitter">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
            </div>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-white font-semibold mb-6">Solutions</h3>
            <ul className="space-y-4">
              <li><Link href="#solutions" className="text-slate-400 hover:text-white text-sm transition-colors outline-none focus-visible:text-white focus-visible:underline">Customer Support AI</Link></li>
              <li><Link href="#solutions" className="text-slate-400 hover:text-white text-sm transition-colors outline-none focus-visible:text-white focus-visible:underline">Lead Qualification</Link></li>
              <li><Link href="#solutions" className="text-slate-400 hover:text-white text-sm transition-colors outline-none focus-visible:text-white focus-visible:underline">Booking & Scheduling</Link></li>
              <li><Link href="#solutions" className="text-slate-400 hover:text-white text-sm transition-colors outline-none focus-visible:text-white focus-visible:underline">Internal Workflows</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-white font-semibold mb-6">Company</h3>
            <ul className="space-y-4">
              <li><Link href="#how-it-works" className="text-slate-400 hover:text-white text-sm transition-colors outline-none focus-visible:text-white focus-visible:underline">Our Process</Link></li>
              <li><Link href="#industries" className="text-slate-400 hover:text-white text-sm transition-colors outline-none focus-visible:text-white focus-visible:underline">Industries</Link></li>
              <li><Link href="#" className="text-slate-400 hover:text-white text-sm transition-colors outline-none focus-visible:text-white focus-visible:underline">About Us</Link></li>
              <li><Link href="#contact" className="text-slate-400 hover:text-white text-sm transition-colors outline-none focus-visible:text-white focus-visible:underline">Contact</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-white font-semibold mb-6">Ready to automate?</h3>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              Find out how much time your business could save. Book a strategy session today.
            </p>
            <Link 
              href="#contact" 
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-medium transition-all hover:glow-effect w-full outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
            >
              Get Your AI Strategy 
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Agentraa. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-slate-500 hover:text-white text-sm transition-colors outline-none focus-visible:text-white focus-visible:underline">Privacy Policy</a>
            <a href="#" className="text-slate-500 hover:text-white text-sm transition-colors outline-none focus-visible:text-white focus-visible:underline">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
