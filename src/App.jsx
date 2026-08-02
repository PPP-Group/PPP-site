import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { WorkflowSpine } from './components/layout/WorkflowSpine';
import { CustomCursor } from './components/ui/CustomCursor';

import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Services } from './components/sections/Services';
import { Process } from './components/sections/Process';
import { Portfolio } from './components/sections/Portfolio';
import { AutomationDemo } from './components/sections/AutomationDemo';
import { Stack } from './components/sections/Stack';
import { Principles } from './components/sections/Principles';
import { FinalCta } from './components/sections/FinalCta';

import { useRevealObserver } from './hooks/useReveal';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { useScrollProgressVar } from './hooks/useMotionPrimitives';
import { useReducedMotion } from './hooks/useMediaQuery';

export default function App() {
  const reduced = useReducedMotion();

  useRevealObserver();
  useScrollProgressVar();
  useSmoothScroll(!reduced); // rolagem nativa para quem pediu menos movimento

  return (
    <>
      <CustomCursor />
      <Header />
      <WorkflowSpine />

      <main id="conteudo">
        <Hero />
        <About />
        <Services />
        <Process />
        <Portfolio />
        <AutomationDemo />
        <Stack />
        <Principles />
        <FinalCta />
      </main>

      <Footer />
    </>
  );
}
