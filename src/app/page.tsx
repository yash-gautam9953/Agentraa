import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import WhatWeBuild from "@/components/WhatWeBuild";
import HowItWorks from "@/components/HowItWorks";
import AutomationFinder from "@/components/AutomationFinder";
import Showcase from "@/components/Showcase";
import Industries from "@/components/Industries";
import WhyAgentraa from "@/components/WhyAgentraa";
import BeforeAfter from "@/components/BeforeAfter";
import CaseStudies from "@/components/CaseStudies";
import Pricing from "@/components/Pricing";
import CTA from "@/components/CTA";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <WhatWeBuild />
      <BeforeAfter />
      <HowItWorks />
      <AutomationFinder />
      <Showcase />
      <Industries />
      <WhyAgentraa />
      <CaseStudies />
      <Pricing />
      <CTA />
      <Contact />
    </>
  );
}
