import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#E2E8F0] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 pb-8 border-b border-[#E2E8F0]">
          <div className="max-w-md">
            <Link
              href="/"
              className="inline-flex items-center mb-3 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
              aria-label="Agentraa Home"
            >
              <Image
                src="/Agentraa Agency Orbital Logo.png"
                alt="Agentraa Agency"
                width={1536}
                height={1024}
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-[#475569] leading-relaxed">
              Your Technology Solutions Partner — helping businesses solve real-world challenges with reliable software, automation, cloud, and security.
            </p>
          </div>

          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2" aria-label="Footer navigation">
            <Link
              href="#solutions"
              className="py-1.5 text-sm font-medium text-[#475569] hover:text-[#2563EB] transition-colors outline-none focus-visible:text-[#2563EB] focus-visible:underline"
            >
              Solutions
            </Link>
            <Link
              href="#how-it-works"
              className="py-1.5 text-sm font-medium text-[#475569] hover:text-[#2563EB] transition-colors outline-none focus-visible:text-[#2563EB] focus-visible:underline"
            >
              How We Work
            </Link>
            <Link
              href="#our-work"
              className="py-1.5 text-sm font-medium text-[#475569] hover:text-[#2563EB] transition-colors outline-none focus-visible:text-[#2563EB] focus-visible:underline"
            >
              Our Work
            </Link>
            <Link
              href="#contact"
              className="py-1.5 text-sm font-medium text-[#475569] hover:text-[#2563EB] transition-colors outline-none focus-visible:text-[#2563EB] focus-visible:underline"
            >
              Contact
            </Link>
          </nav>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-[#64748B]">
          <p>© {new Date().getFullYear()} Agentraa. All rights reserved.</p>
          <p>www.agentraa.me</p>
        </div>
      </div>
    </footer>
  );
}
