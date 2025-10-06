import { Button } from "@/components/ui/button";
import crimeBoardBg from "@/assets/crime-board.jpg";
import debsocLogo from "@/assets/debsoc-logo.png";
import { Skull } from "lucide-react";
import { useState, useEffect } from "react";

export const Hero = () => {
  const [morseVisible, setMorseVisible] = useState(true);
  const [timeMessage, setTimeMessage] = useState("");

  // Morse code blinking effect
  useEffect(() => {
    const interval = setInterval(() => {
      setMorseVisible(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Time-based message
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 6) {
      setTimeMessage("🌙 Burning the midnight oil? A true detective never sleeps!");
    } else if (hour >= 6 && hour < 12) {
      setTimeMessage("🌅 Morning detective! Early bird catches the clues.");
    } else if (hour >= 12 && hour < 18) {
      setTimeMessage("☀️ Afternoon investigation in progress...");
    } else {
      setTimeMessage("🌆 Evening detective! Prime time for case solving.");
    }
  }, []);

  const scrollToRegistration = () => {
    const registration = document.getElementById("registration");
    registration?.scrollIntoView({
      behavior: "smooth"
    });
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden" 
      style={{
        backgroundImage: `url(${crimeBoardBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Spotlight overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-noir/80 via-noir/60 to-noir/90 animate-spotlight" />
      
      {/* Fog effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-noir via-transparent to-transparent opacity-80" />

      {/* Morse code easter egg - top right corner */}
      <div className="absolute top-8 right-8 z-20">
        <div 
          className={`w-3 h-3 rounded-full bg-red-500 transition-opacity duration-100 cursor-pointer ${morseVisible ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => {
            const toast = (window as any).toast;
            if (toast) {
              toast("📡 Morse Signal Detected!", {
                description: "Evidence #6: 'TD7' in morse code - The truth blinks in the darkness"
              });
            }
          }}
          title="Strange blinking light..."
        />
      </div>

      {/* Time-based message */}
      {timeMessage && (
        <div className="absolute top-8 left-8 z-20 bg-noir/80 border border-gold/30 px-4 py-2 rounded font-serif text-sm text-gold/80 max-w-xs">
          {timeMessage}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="mb-8 flex justify-center">
          <img 
            src={debsocLogo} 
            alt="Debating Society NIT Durgapur Logo" 
            className="w-24 h-24 md:w-32 md:h-32 object-contain brightness-0 invert opacity-90 animate-float"
          />
        </div>
        
        <h1 
          className="font-cinzel text-6xl md:text-9xl font-black mb-8 text-glow-gold tracking-wider" 
          style={{
            background: 'linear-gradient(135deg, hsl(45 100% 65%), hsl(45 100% 45%))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 20px hsl(45 100% 55% / 0.5))'
          }}
        >
          Take DeBait 7.0
        </h1>
        
        <p className="font-serif text-2xl md:text-3xl mb-6 text-silver italic tracking-wide">
          "When words can kill, arguments become the weapon."
        </p>
        
        <p className="font-serif text-lg md:text-xl mb-12 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          The Debating Society, NIT Durgapur presents the 7th edition of its legendary murder mystery solving competition.
        </p>

        <div className="flex justify-center">
          <Button 
            size="lg" 
            onClick={scrollToRegistration} 
            className="group relative font-cinzel text-xl px-12 py-8 bg-gradient-to-r from-gold to-gold-soft hover:from-gold-soft hover:to-gold text-noir font-bold transition-all duration-300 hover:scale-110 shadow-glow-gold overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-3">
              <Skull className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              Enter the Mystery
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
          </Button>
        </div>

        {/* Easter egg hint */}
        <p className="font-serif text-sm text-gold/50 mt-20 opacity-40 hover:opacity-100 transition-all duration-500 hover:text-gold animate-pulse">
          🔍 Psst... hover around to find hidden clues
        </p>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-noir to-transparent" />
    </section>
  );
};