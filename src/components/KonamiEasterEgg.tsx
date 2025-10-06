import { useEffect, useState } from "react";

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export const KonamiEasterEgg = () => {
  const [keys, setKeys] = useState<string[]>([]);
  const [activated, setActivated] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newKeys = [...keys, e.key].slice(-KONAMI_CODE.length);
      setKeys(newKeys);

      if (newKeys.join(",") === KONAMI_CODE.join(",") && !activated) {
        setActivated(true);
        const toast = (window as any).toast;
        if (toast) {
          toast("🎮 KONAMI CODE ACTIVATED!", {
            description: "Evidence #7: 'Classic detectives know classic codes' - You're a legend!"
          });
        }
        
        // Visual celebration
        document.body.style.animation = "none";
        setTimeout(() => {
          document.body.style.animation = "pulse 0.5s ease-in-out 3";
        }, 10);

        // Reset after celebration
        setTimeout(() => {
          setActivated(false);
          setKeys([]);
        }, 5000);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [keys, activated]);

  return null;
};