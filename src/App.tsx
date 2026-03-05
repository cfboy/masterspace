import { Navbar } from '@/components/sections/navbar'
import { Hero } from '@/components/sections/hero'
import { Services } from '@/components/sections/services'
import { About } from '@/components/sections/about'
import { Portfolio } from '@/components/sections/portfolio'
import { Certifications } from '@/components/sections/certifications'
import { Testimonials } from '@/components/sections/testimonials'
import { Contact } from '@/components/sections/contact'
import { Footer } from '@/components/sections/footer'
import { ScrollToTop } from '@/components/ui/scroll-to-top'

function App() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Portfolio />
      <Certifications />
      <Testimonials />
      <Contact />
      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default App
