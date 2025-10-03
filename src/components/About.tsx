import { Scale, Users, Award } from "lucide-react";
import { Card } from "@/components/ui/card";

export const About = () => {
  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16 animate-reveal">
          <h2 className="font-typewriter text-5xl md:text-6xl mb-6 text-primary">
            The Crime Scene
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-8" />
          <p className="font-serif text-xl md:text-2xl text-parchment italic max-w-3xl mx-auto leading-relaxed">
            "Take DeBait 7.0 isn't just another debate. It's a crime scene, and every team is a suspect. 
            Argue your way out before the jury convicts you!"
          </p>
        </div>

        {/* Info cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-card border-border p-8 hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
            <Scale className="w-12 h-12 text-primary mb-4" />
            <h3 className="font-typewriter text-2xl mb-3 text-spotlight">7th Edition</h3>
            <p className="font-serif text-muted-foreground">
              A legacy event that has been running for 7 years, bringing together the sharpest minds in debate.
            </p>
          </Card>

          <Card className="bg-card border-border p-8 hover:border-accent transition-all duration-300 hover:shadow-lg hover:shadow-accent/20">
            <Users className="w-12 h-12 text-accent mb-4" />
            <h3 className="font-typewriter text-2xl mb-3 text-spotlight">The Debating Society</h3>
            <p className="font-serif text-muted-foreground">
              Organized by NIT Durgapur's premier debating society, known for hosting intellectually stimulating events.
            </p>
          </Card>

          <Card className="bg-card border-border p-8 hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
            <Award className="w-12 h-12 text-primary mb-4" />
            <h3 className="font-typewriter text-2xl mb-3 text-spotlight">Mystery Twist</h3>
            <p className="font-serif text-muted-foreground">
              Not your typical debate. Each round unfolds like a detective case where logic meets theater.
            </p>
          </Card>
        </div>

        {/* Quote */}
        <div className="relative">
          <Card className="bg-gradient-to-br from-secondary to-card border-accent/30 p-12 text-center">
            <p className="font-serif text-2xl md:text-3xl text-parchment italic mb-4">
              "The game is afoot!"
            </p>
            <p className="font-typewriter text-sm text-accent">
              — Every detective, probably
            </p>
          </Card>
          
          {/* Decorative corner pins */}
          <div className="absolute -top-2 -left-2 w-4 h-4 bg-accent rounded-full shadow-lg shadow-accent/50" />
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full shadow-lg shadow-primary/50" />
          <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-primary rounded-full shadow-lg shadow-primary/50" />
          <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-accent rounded-full shadow-lg shadow-accent/50" />
        </div>
      </div>
    </section>
  );
};
