import { Users, Gavel, Target, Trophy } from "lucide-react";
import { useState, useEffect } from "react";

const steps = [
  {
    icon: Users,
    title: "Gather Your Team of Detectives",
    description: "Form your squad (2-3 brilliant minds) ready to crack the case.",
    color: "text-primary",
  },
  {
    icon: Gavel,
    title: "Enter the Courtroom of Chaos",
    description: "Battle through multiple debate rounds where every argument counts.",
    color: "text-accent",
  },
  {
    icon: Target,
    title: "Survive the Cross-Examination",
    description: "Face intense questioning from judges who are hunting for weaknesses.",
    color: "text-primary",
  },
  {
    icon: Trophy,
    title: "Prove Your Argument Alibi",
    description: "Win by constructing an unshakeable case that stands up to scrutiny.",
    color: "text-accent",
  },
];

export const HowItWorks = () => {
  const [clickSequence, setClickSequence] = useState<number[]>([]);
  const [unlocked, setUnlocked] = useState(false);

  const handleStepClick = (index: number) => {
    const newSequence = [...clickSequence, index + 1];
    setClickSequence(newSequence);

    // Check if sequence matches 1-2-3-4
    if (newSequence.length === 4) {
      if (newSequence.every((val, idx) => val === idx + 1)) {
        if (!unlocked) {
          setUnlocked(true);
          const toast = (window as any).toast;
          if (toast) {
            toast("🎖️ Sequential Thinker!", {
              description: "Evidence #5: 'Order matters in detective work' - You followed the steps perfectly!"
            });
          }
        }
      }
      setClickSequence([]);
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-noir to-secondary relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 border-2 border-primary rounded-full" />
        <div className="absolute bottom-20 right-10 w-96 h-96 border-2 border-accent rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 animate-reveal">
          <h2 className="font-typewriter text-5xl md:text-6xl mb-6 text-spotlight">
            The Investigation Process
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-8" />
          <p className="font-serif text-xl text-muted-foreground">
            Follow the clues to victory
          </p>
          <p className="font-serif text-xs text-accent/50 mt-4 hover:text-accent transition-colors">
            💡 Hint: Click the step numbers in order...
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary transform -translate-x-1/2" />

          <div className="space-y-16">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } animate-reveal`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <h3 className="font-typewriter text-2xl md:text-3xl mb-4 text-spotlight">
                    {step.title}
                  </h3>
                  <p className="font-serif text-lg text-muted-foreground">
                    {step.description}
                  </p>
                </div>

                {/* Icon */}
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-card border-4 border-primary flex items-center justify-center shadow-lg shadow-primary/30">
                    <step.icon className={`w-10 h-10 ${step.color}`} />
                  </div>
                  {/* Step number - Interactive */}
                  <button
                    onClick={() => handleStepClick(index)}
                    className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent text-noir font-typewriter text-sm flex items-center justify-center font-bold shadow-lg shadow-accent/50 hover:scale-125 hover:rotate-12 transition-all cursor-pointer"
                    title="Click in sequence"
                  >
                    {index + 1}
                  </button>
                </div>

                {/* Spacer */}
                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};