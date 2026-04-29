import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Ticker from '@/components/sections/Ticker'
import Features from '@/components/sections/Features'
import Pricing from '@/components/sections/Pricing'
import CTA from '@/components/sections/CTA'
import Cursor from '@/components/ui/Cursor'
import Background from '@/components/ui/Background'
import Particles from '@/components/ui/Particles'

export default function Home() {
  return (
    <>
      <Cursor />
      <Background />
      <Particles />
      <div className="scan-line" />
      <div className="grid-bg" />
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <Features />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
