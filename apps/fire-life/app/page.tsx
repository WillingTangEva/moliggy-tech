import Hero from '@/app/components/Hero';
import Benefits from '@/app/components/Benefits';
import Features from '@/app/components/Features';
import Testimonials from '@/app/components/Testimonials';
import Pricing from '@/app/components/Pricing';
import CTA from '@/app/components/CTA';

export default function Home() {
  return (
    <main>
      <Hero />
      <Benefits />
      <Features />
      <Testimonials />
      <Pricing />
      <CTA />
    </main>
  );
}
