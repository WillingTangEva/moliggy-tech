import Hero from './components/Hero';
import Benefits from './components/Benefits';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import CTA from './components/CTA';

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
