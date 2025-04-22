import Hero from './components/Hero'
import Benefits from './components/Benefits'
import HowItWorks from './components/HowItWorks'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import CTA from './components/CTA'

export default function Home() {
  return (
    <div className="fade-in">
      <Hero />
      <Benefits />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <CTA />
    </div>
  )
} 