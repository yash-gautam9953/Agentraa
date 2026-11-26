import { Globe, Bot, Cloud, Shield, Compass } from "lucide-react";

const SOLUTIONS = [
  {
    title: "Web & App Development",
    description:
      "Fast, mobile-friendly websites, custom web applications, and portals built around your business goals.",
    icon: Globe,
  },
  {
    title: "AI & Business Automation",
    description:
      "Practical automation for lead intake, customer replies, internal workflows, and repetitive admin tasks.",
    icon: Bot,
  },
  {
    title: "Cloud & DevOps",
    description:
      "Reliable cloud hosting, automated deployments, and infrastructure setups designed to stay fast and available.",
    icon: Cloud,
  },
  {
    title: "Cybersecurity",
    description:
      "Security reviews, API hardening, dependency remediation, and protective headers to keep business data safe.",
    icon: Shield,
  },
  {
    title: "IT Consulting & Integration",
    description:
      "Clear technical guidance and system integrations that connect your CRM, databases, and everyday tools.",
    icon: Compass,
  },
];

export default function OurSolutions() {
  return (
    <section id="solutions" className="scroll-mt-20 bg-white py-16 sm:py-20 border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10 sm:mb-12">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#2563EB] mb-2">
            Our Solutions
          </p>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#0B1220] mb-3">
            Technology Built Around Your Business
          </h2>
          <p className="text-base text-[#475569]">
            We select and build the right combination of software, automation, cloud, and security for what you actually need.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {SOLUTIONS.map((solution) => {
            const Icon = solution.icon;
            return (
              <div
                key={solution.title}
                className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-6"
              >
                <div className="w-10 h-10 rounded-lg bg-white border border-[#E2E8F0] text-[#2563EB] flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-[#0B1220] mb-2">
                  {solution.title}
                </h3>
                <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
                  {solution.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
