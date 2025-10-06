import { useState } from "react";
import magnifier from "@/assets/magnifier.png";

export const MagnifierEasterEgg = () => {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <div 
      className="fixed bottom-8 left-8 z-50 cursor-pointer group"
      onMouseEnter={() => setIsRevealed(true)}
      onMouseLeave={() => setIsRevealed(false)}
    >
      {/* Magnifying glass */}
      <div className="relative w-20 h-20 animate-float">
        <img 
          src={magnifier} 
          alt="Magnifying glass" 
          className="w-full h-full filter drop-shadow-2xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-500"
        />
        
        {/* Enhanced glowing effect on hover */}
        <div className="absolute inset-0 bg-gold/30 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse" />
        <div className="absolute inset-0 bg-gold/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
      </div>

      {/* Hidden clue revealed on hover */}
      {isRevealed && (
        <div className="absolute bottom-24 left-0 bg-noir-deep border-2 border-gold p-5 rounded-lg shadow-glow-gold w-72 animate-reveal backdrop-blur-sm">
          <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-gold" />
          <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-gold" />
          <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-gold" />
          <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-gold" />
          
          <p className="font-cinzel text-sm text-gold mb-3 tracking-wider animate-pulse">
            🔍 SECRET CLUE DISCOVERED!
          </p>
          <p className="font-serif text-sm text-silver/90 leading-relaxed">
            "Among the suspects, one walks among us. Find the imposter in your arguments."
          </p>
          <div className="mt-3 text-xs font-typewriter text-crimson tracking-widest border-t border-gold/30 pt-2">
            EVIDENCE #M-01
          </div>
        </div>
      )}
    </div>
  );
};
