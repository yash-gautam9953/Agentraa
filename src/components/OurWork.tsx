import Link from "next/link";
import { ArrowRight } from "lucide-react";

const WORK_ITEMS = [
  {
    label: "Live Internal Platform",
    title: "Agentraa Web & Lead Intake System",
    summary:
      "Built the Agentraa web platform using Next.js, TypeScript, and a Notion CRM intake pipeline with server-side input validation and security headers.",
    focus: "Web Development & CRM Integration",
  },
  {
    label: "Solution Prototype",
    title: "Automated Inquiry & Appointment Workflow",
    summary:
      "A reusable workflow architecture for qualifying incoming customer messages, checking availability, and routing follow-ups into a business CRM.",
    focus: "AI & Business Automation",
  },
  {
    label: "Engineering Practice",
    title: "Web Application Security & Deployment Hardening",
    summary:
      "Standardized production hardening setup covering dependency auditing, strict request validation, bot honeypots, and HTTP security header policies.",
    focus: "Cloud, DevOps & Cybersecurity",
  },
];

export default function OurWork() {
  return (
    <section id="our-work" className="scroll-mt-20 bg-white py-16 sm:py-20 border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 sm:mb-12">
          <div className="max-w-2xl">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#2563EB] mb-2">
              Our Work
            </p>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#0B1220] mb-3">
              Capabilities &amp; Solution Builds
            </h2>
            <p className="text-base text-[#475569]">
              Examples of the systems and engineering foundations we build. Client case studies will be added as engagements are published.
            </p>
          </div>
          <Link
            href="#contact"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#2563EB] hover:text-blue-700 transition-colors shrink-0 outline-none focus-visible:underline"
          >
            Request a project walkthrough
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {WORK_ITEMS.map((item) => (
            <div
              key={item.title}
              className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-6 flex flex-col"
            >
              <span className="inline-flex w-fit items-center text-xs font-medium text-[#7C3AED] bg-violet-50 border border-violet-200 px-2.5 py-1 rounded-md mb-4">
                {item.label}
              </span>
              <h3 className="text-lg font-semibold text-[#0B1220] mb-2.5">
                {item.title}
              </h3>
              <p className="text-sm sm:text-base text-[#475569] leading-relaxed mb-5 flex-1">
                {item.summary}
              </p>
              <div className="pt-4 border-t border-[#E2E8F0] text-xs font-medium text-[#64748B]">
                {item.focus}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
