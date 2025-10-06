import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export const InspectorMode = () => {
  const [inspectorMode, setInspectorMode] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Shift + D to toggle inspector mode
      if (e.shiftKey && e.key === "D") {
        e.preventDefault();
        setInspectorMode(prev => !prev);
        
        const toast = (window as any).toast;
        if (toast && !inspectorMode) {
          toast("👁️ Inspector Mode Activated!", {
            description: "Evidence #9: All hidden elements are now revealed. Press Shift+D again to exit."
          });
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [inspectorMode]);

  if (!inspectorMode) {
    return (
      <div className="fixed bottom-4 left-4 z-40 bg-noir/50 border border-accent/20 px-3 py-2 rounded font-typewriter text-xs text-accent/50 hover:text-accent hover:border-accent transition-all">
        💡 Press Shift+D for Inspector Mode
      </div>
    );
  }

  return (
    <>
      {/* Overlay dimming */}
      <div className="fixed inset-0 bg-noir/70 z-40 pointer-events-none" />
      
      {/* Inspector mode indicator */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-accent text-noir px-6 py-3 rounded-lg font-typewriter font-bold shadow-lg shadow-accent/50 flex items-center gap-3 animate-pulse">
        <Eye className="w-5 h-5" />
        INSPECTOR MODE ACTIVE
        <Eye className="w-5 h-5" />
      </div>

      {/* Highlight all easter egg elements */}
      <style>{`
        .inspector-mode-active button[title*="Click"],
        .inspector-mode-active button[title*="Decorative"],
        .inspector-mode-active button[aria-label="Decorative pin"],
        .inspector-mode-active [title*="Double-click"],
        .inspector-mode-active [title*="Strange"] {
          outline: 3px solid hsl(var(--accent)) !important;
          outline-offset: 4px;
          animation: pulse 2s ease-in-out infinite;
          position: relative;
          z-index: 41 !important;
        }
      `}</style>
      
      <div className="inspector-mode-active fixed inset-0 pointer-events-none z-41">
        {/* This div applies the inspector mode styling globally */}
      </div>

      {/* Exit button */}
      <button
        onClick={() => setInspectorMode(false)}
        className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-noir border border-accent px-4 py-2 rounded font-typewriter text-sm text-accent hover:bg-accent hover:text-noir transition-all flex items-center gap-2"
      >
        <EyeOff className="w-4 h-4" />
        Exit Inspector Mode
      </button>

      {/* Easter egg locations guide */}
      <div className="fixed top-40 right-4 z-50 bg-noir/95 border border-accent/50 p-4 rounded max-w-xs font-serif text-sm text-accent">
        <h4 className="font-typewriter font-bold mb-2">🔍 Hidden Elements:</h4>
        <ul className="space-y-1 text-xs">
          <li>• Magnifying glass (bottom-left)</li>
          <li>• Morse code light (top-right)</li>
          <li>• Corner pins (About section)</li>
          <li>• Step badges (How It Works)</li>
          <li>• Evidence tag (Event Details)</li>
          <li>• Detail cards (double-click)</li>
          <li>• Classified doc (footer)</li>
          <li>• Konami code (keyboard)</li>
          <li>• Scroll progress (this mode)</li>
          <li>• Time-based message (hero)</li>
        </ul>
      </div>
    </>
  );
};