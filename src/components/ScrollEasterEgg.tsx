import { useEffect, useState } from "react";

export const ScrollEasterEgg = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [revealed25, setRevealed25] = useState(false);
  const [revealed50, setRevealed50] = useState(false);
  const [revealed75, setRevealed75] = useState(false);
  const [revealed100, setRevealed100] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      
      setScrollProgress(progress);

      const toast = (window as any).toast;
      
      if (progress >= 25 && progress < 30 && !revealed25) {
        setRevealed25(true);
        if (toast) {
          toast("📜 25% Investigated", {
            description: "Clue fragment found: 'The journey...' - Keep scrolling, detective!"
          });
        }
      }
      
      if (progress >= 50 && progress < 55 && !revealed50) {
        setRevealed50(true);
        if (toast) {
          toast("📜 50% Investigated", {
            description: "Clue fragment found: '...reveals itself...' - Halfway there!"
          });
        }
      }
      
      if (progress >= 75 && progress < 80 && !revealed75) {
        setRevealed75(true);
        if (toast) {
          toast("📜 75% Investigated", {
            description: "Clue fragment found: '...to those who...' - Almost complete!"
          });
        }
      }
      
      if (progress >= 99 && !revealed100) {
        setRevealed100(true);
        if (toast) {
          toast("🏆 100% Case File Reviewed!", {
            description: "Evidence #8: 'The journey reveals itself to those who search completely' - Full investigation complete!"
          });
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [revealed25, revealed50, revealed75, revealed100]);

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-noir/90 border border-gold/30 px-3 py-2 rounded font-typewriter text-xs text-gold">
      Investigation: {Math.round(scrollProgress)}%
    </div>
  );
};