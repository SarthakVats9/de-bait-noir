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
      <div className="relative w-16 h-16 animate-float">
        <img 
          src={magnifier} 
          alt="Magnifying glass" 
          className="w-full h-full filter drop-shadow-lg group-hover:scale-110 transition-transform"
        />
        
        {/* Glowing effect on hover */}
        <div className="absolute inset-0 bg-accent/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Hidden clue revealed on hover */}
      {isRevealed && (
        <div className="absolute bottom-20 left-0 bg-card border-2 border-accent p-4 rounded-lg shadow-2xl shadow-accent/30 w-64 animate-reveal">
          <p className="font-typewriter text-sm text-accent mb-2">
            🔍 SECRET CLUE DISCOVERED!
          </p>
          <p className="font-serif text-xs text-muted-foreground">
            "Among the suspects, one walks among us. Find the imposter in your arguments."
          </p>
          <div className="mt-2 text-xs font-typewriter text-primary">
            EVIDENCE #M-01
          </div>
        </div>
      )}
    </div>
  );
};
