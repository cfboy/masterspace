import { About } from '@/components/sections/about';
import { Certifications } from '@/components/sections/certifications';
import { Contact } from '@/components/sections/contact';
import { Footer } from '@/components/sections/footer';
import { Hero } from '@/components/sections/hero';
import { Navbar } from '@/components/sections/navbar';
import { Portfolio } from '@/components/sections/portfolio';
import { Services } from '@/components/sections/services';
import { Testimonials } from '@/components/sections/testimonials';
import { ScrollToTop } from '@/components/ui/scroll-to-top';

function App() {
  return (
    <div className="bg-background text-foreground min-h-screen transition-colors duration-300">
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
  );
}

export default App;
