import { Clock, RefreshCw, Workflow, ShieldAlert, Laptop } from "lucide-react";

const PROBLEMS = [
  {
    title: "Manual & Repetitive Work",
    description:
      "Your team spends hours copying data, answering the same customer questions, or chasing follow-ups by hand.",
    icon: Clock,
  },
  {
    title: "Outdated Business Systems",
    description:
      "Old websites, slow spreadsheets, or disconnected software make it harder to serve customers and scale.",
    icon: RefreshCw,
  },
  {
    title: "Inefficient Business Operations",
    description:
      "Leads slip through the cracks and day-to-day workflows take too many steps across different tools.",
    icon: Workflow,
  },
  {
    title: "Security & Infrastructure Challenges",
    description:
      "Unreliable hosting, missing backups, or weak application security expose your business to downtime and risk.",
    icon: ShieldAlert,
  },
  {
    title: "Digital Product Development",
    description:
      "You have a clear business need for a web platform, customer portal, or mobile app, but lack an engineering team to build it.",
    icon: Laptop,
  },
];

export default function WhatWeSolve() {
  return (
    <section id="what-we-solve" className="bg-[#F8FAFC] py-16 sm:py-20 border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10 sm:mb-12">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#2563EB] mb-2">
            What We Solve
          </p>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#0B1220] mb-3">
            Common Business Challenges We Fix
          </h2>
          <p className="text-base text-[#475569]">
            Technology should make running your business easier. We focus on solving practical bottlenecks that slow teams down.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {PROBLEMS.map((problem) => {
            const Icon = problem.icon;
            return (
              <div
                key={problem.title}
                className="bg-white border border-[#E2E8F0] rounded-xl p-6 flex flex-col"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 text-[#2563EB] flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-[#0B1220] mb-2">
                  {problem.title}
                </h3>
                <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
                  {problem.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
