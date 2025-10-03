import { Button } from "@/components/ui/button";
import crimeBoardBg from "@/assets/crime-board.jpg";
import { Skull } from "lucide-react";
export const Hero = () => {
  const scrollToRegistration = () => {
    const registration = document.getElementById("registration");
    registration?.scrollIntoView({
      behavior: "smooth"
    });
  };
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{
    backgroundImage: `url(${crimeBoardBg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }}>
      {/* Spotlight overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-noir/80 via-noir/60 to-noir/90 animate-spotlight" />
      
      {/* Fog effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-noir via-transparent to-transparent opacity-80" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="mb-6 flex justify-center">
          <Skull className="w-16 h-16 text-primary animate-float" />
        </div>
        
        <h1 className="font-typewriter text-6xl md:text-8xl font-bold mb-6 animate-glitch text-spotlight">
          Take DeBait 7.0
        </h1>
        
        <p className="font-serif text-2xl md:text-3xl mb-4 text-parchment italic">
          "When words can kill, arguments become the weapon."
        </p>
        
        <p className="font-serif text-lg md:text-xl mb-12 text-muted-foreground max-w-2xl mx-auto">The Debating Society, NIT Durgapur presents the 7th edition of its legendary murder mystery solving
 competition.</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" onClick={scrollToRegistration} className="font-typewriter text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/50 transition-all hover:scale-105">
            Register Your Team
          </Button>
          
          <Button size="lg" variant="outline" className="font-typewriter text-lg px-8 py-6 border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all hover:scale-105">
            View Case Files
          </Button>
        </div>

        {/* Easter egg hint */}
        <p className="font-serif text-sm text-muted-foreground mt-16 opacity-50 hover:opacity-100 transition-opacity">
          🔍 Psst... hover around to find hidden clues
        </p>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-noir to-transparent" />
    </section>;
};