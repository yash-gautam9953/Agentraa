const STEPS = [
  {
    number: "01",
    title: "Understand Your Problem",
    description:
      "We listen to how your business runs today, pinpoint what is slowing you down, and agree on a clear, practical scope.",
  },
  {
    number: "02",
    title: "Build the Right Solution",
    description:
      "We design, engineer, and test the software, automation, or infrastructure required—keeping everything simple to use.",
  },
  {
    number: "03",
    title: "Deliver & Support",
    description:
      "We launch cleanly into production, walk your team through how it works, and provide ongoing support as your needs grow.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20 bg-[#F8FAFC] py-16 sm:py-20 border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10 sm:mb-12">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#2563EB] mb-2">
            How We Work
          </p>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#0B1220] mb-3">
            A Straightforward Three-Step Process
          </h2>
          <p className="text-base text-[#475569]">
            No complicated handoffs or technical guesswork—just clear steps from first conversation to launch.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="bg-white border border-[#E2E8F0] rounded-xl p-6 sm:p-7"
            >
              <span className="inline-block text-xs font-bold tracking-wider text-[#2563EB] bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-md mb-4">
                STEP {step.number}
              </span>
              <h3 className="text-lg sm:text-xl font-semibold text-[#0B1220] mb-2.5">
                {step.title}
              </h3>
              <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
