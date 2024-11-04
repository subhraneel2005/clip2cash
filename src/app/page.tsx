// All these pages will show on the website

import Navbar from "@/components/base-components/Navbar";
import EmailPage from "@/components/pages-components/Email-Page";
import HeroSection from "@/components/pages-components/HeroSection";
import PricingPage from "@/components/pages-components/Pricing-Page";
import Particles from "@/components/ui/particles";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full">
      <Navbar/>
      <HeroSection/>
      <PricingPage/>
      <EmailPage/>
      <Particles
        className="absolute inset-0"
        quantity={100}
        ease={80}
        color="#ffffff"
        refresh
      />
    </div>
  );
}