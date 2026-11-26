"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    businessName: "",
    challenge: "",
    website: "", // Honeypot field
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setErrorMessage(null);
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.name.trim() || !formData.email.trim() || !formData.challenge.trim()) {
      setErrorMessage("Please fill in your name, email, and business problem.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "Failed to send inquiry. Please check your details and try again."
        );
      }

      setIsSubmitted(true);
    } catch (error: unknown) {
      console.error("Error submitting form:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to send inquiry. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="scroll-mt-20 bg-[#F8FAFC] py-16 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#2563EB] mb-2">
            Contact
          </p>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#0B1220] mb-3">
            Have a Business Challenge? Let&apos;s Solve It.
          </h2>
          <p className="text-base text-[#475569]">
            Share a brief overview of what you need help with and we&apos;ll respond with practical next steps.
          </p>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 md:p-10 shadow-xs">
          {isSubmitted ? (
            <div className="text-center py-8 sm:py-10">
              <div className="w-14 h-14 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="w-7 h-7 text-[#2563EB]" />
              </div>
              <h3 className="text-2xl font-bold text-[#0B1220] mb-2">
                Inquiry Received
              </h3>
              <p className="text-base text-[#475569] max-w-md mx-auto">
                Thank you for reaching out. We are reviewing your message and will follow up by email soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Honeypot field for bot protection */}
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-sm font-medium text-[#0B1220] mb-1.5"
                  >
                    Name *
                  </label>
                  <input
                    id="contact-name"
                    required
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    maxLength={120}
                    placeholder="Your full name"
                    className="w-full min-h-12 bg-white border border-[#E2E8F0] rounded-lg px-4 py-3 text-[#0B1220] placeholder:text-[#64748B] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-sm font-medium text-[#0B1220] mb-1.5"
                  >
                    Email *
                  </label>
                  <input
                    id="contact-email"
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    maxLength={254}
                    placeholder="you@company.com"
                    className="w-full min-h-12 bg-white border border-[#E2E8F0] rounded-lg px-4 py-3 text-[#0B1220] placeholder:text-[#64748B] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-company"
                  className="block text-sm font-medium text-[#0B1220] mb-1.5"
                >
                  Company <span className="text-[#64748B] font-normal">(optional)</span>
                </label>
                <input
                  id="contact-company"
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  maxLength={150}
                  placeholder="Your company or organization"
                  className="w-full min-h-12 bg-white border border-[#E2E8F0] rounded-lg px-4 py-3 text-[#0B1220] placeholder:text-[#64748B] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-problem"
                  className="block text-sm font-medium text-[#0B1220] mb-1.5"
                >
                  Tell us about your business problem *
                </label>
                <textarea
                  id="contact-problem"
                  required
                  name="challenge"
                  value={formData.challenge}
                  onChange={handleChange}
                  rows={4}
                  maxLength={1500}
                  placeholder="Briefly describe the bottleneck, system, or project you need help with."
                  className="w-full bg-white border border-[#E2E8F0] rounded-lg px-4 py-3 text-[#0B1220] placeholder:text-[#64748B] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-colors resize-y"
                />
              </div>

              {errorMessage && (
                <div
                  role="alert"
                  className="flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto min-h-12 inline-flex items-center justify-center gap-2 px-7 py-3 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2563EB]"
              >
                {isSubmitting ? "Sending..." : "Send Inquiry"}
                {!isSubmitting && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
