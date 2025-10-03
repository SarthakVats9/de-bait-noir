import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { HowItWorks } from "@/components/HowItWorks";
import { EventDetails } from "@/components/EventDetails";
import { Registration } from "@/components/Registration";
import { Footer } from "@/components/Footer";
import { MagnifierEasterEgg } from "@/components/MagnifierEasterEgg";

const Index = () => {
  return (
    <div className="min-h-screen bg-noir">
      <Hero />
      <About />
      <HowItWorks />
      <EventDetails />
      <Registration />
      <Footer />
      <MagnifierEasterEgg />
    </div>
  );
};

export default Index;
