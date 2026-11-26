import Link from "next/link";
import { ArrowRight, Code2, Bot, Cloud, ShieldCheck, Layers } from "lucide-react";

const PILLARS = [
  {
    title: "Software Development",
    detail: "Custom websites, web platforms, and mobile apps",
    icon: Code2,
  },
  {
    title: "AI & Automation",
    detail: "Automated workflows and customer response tools",
    icon: Bot,
  },
  {
    title: "Cloud & DevOps",
    detail: "Reliable hosting, deployment, and system scaling",
    icon: Cloud,
  },
  {
    title: "Cybersecurity",
    detail: "Application hardening and data protection",
    icon: ShieldCheck,
  },
  {
    title: "IT Consulting & Integration",
    detail: "Connecting your tools and guiding tech decisions",
    icon: Layers,
  },
];

export default function Hero() {
  return (
    <section className="bg-white py-14 sm:py-20 lg:py-24 border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left: Core Positioning */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] text-xs sm:text-sm font-medium text-[#0B1220] mb-6">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#06B6D4] to-[#7C3AED]" aria-hidden="true" />
              Your Technology Solutions Partner
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-[#0B1220] leading-[1.1] mb-5">
              We Solve Business Problems with Technology.
            </h1>

            <p className="text-base sm:text-lg text-[#475569] leading-relaxed max-w-2xl mb-8">
              From software development and AI automation to cloud infrastructure and cybersecurity, we help businesses solve challenges with the right technology.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href="#contact"
                className="inline-flex min-h-12 items-center justify-center gap-2 px-6 py-3 text-sm sm:text-base font-semibold text-white bg-[#2563EB] hover:bg-blue-700 rounded-lg transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2563EB]"
              >
                Discuss Your Project
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="#solutions"
                className="inline-flex min-h-12 items-center justify-center gap-2 px-6 py-3 text-sm sm:text-base font-semibold text-[#0B1220] bg-[#F8FAFC] hover:bg-slate-100 border border-[#E2E8F0] rounded-lg transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2563EB]"
              >
                Explore Our Solutions
              </Link>
            </div>
          </div>

          {/* Right: Clean Capabilities Summary Card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] p-6 sm:p-7">
              <div className="h-1 w-16 rounded-full bg-gradient-to-r from-[#2563EB] via-[#06B6D4] to-[#7C3AED] mb-5" />
              <h2 className="text-base font-semibold text-[#0B1220] mb-4">
                How We Help Businesses Grow
              </h2>
              <ul className="space-y-3.5">
                {PILLARS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li
                      key={item.title}
                      className="flex items-start gap-3.5 rounded-xl bg-white border border-[#E2E8F0] p-3.5"
                    >
                      <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-[#0B1220]">
                          {item.title}
                        </div>
                        <div className="text-xs sm:text-sm text-[#475569]">
                          {item.detail}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
