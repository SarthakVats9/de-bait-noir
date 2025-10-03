import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Stamp } from "lucide-react";
import { toast } from "sonner";

export const Registration = () => {
  const [formData, setFormData] = useState({
    teamName: "",
    leaderName: "",
    leaderEmail: "",
    leaderPhone: "",
    member2Name: "",
    member3Name: "",
    institution: "",
    experience: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Alibi submitted! We'll contact you soon, detective.", {
      description: "Check your email for confirmation details.",
    });
    // Reset form
    setFormData({
      teamName: "",
      leaderName: "",
      leaderEmail: "",
      leaderPhone: "",
      member2Name: "",
      member3Name: "",
      institution: "",
      experience: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="registration" className="py-20 px-4 bg-gradient-to-b from-secondary to-noir relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-5 text-9xl font-typewriter text-primary rotate-12">?</div>
        <div className="absolute bottom-10 right-5 text-9xl font-typewriter text-accent -rotate-12">!</div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-reveal">
          <h2 className="font-typewriter text-5xl md:text-6xl mb-6 text-primary">
            Submit Your Alibi
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-8" />
          <p className="font-serif text-xl text-muted-foreground">
            Register your team before the case goes cold
          </p>
        </div>

        {/* Registration form styled as typewriter paper */}
        <Card className="bg-parchment/5 border-2 border-parchment/20 p-8 md:p-12 relative backdrop-blur-sm">
          {/* Paper texture overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-parchment/5 to-transparent pointer-events-none" />

          {/* Typewriter header */}
          <div className="mb-8 pb-6 border-b-2 border-dashed border-accent/30">
            <div className="flex items-center gap-4">
              <Stamp className="w-8 h-8 text-primary" />
              <div>
                <h3 className="font-typewriter text-2xl text-spotlight">
                  CASE FILE: TEAM REGISTRATION
                </h3>
                <p className="font-serif text-sm text-muted-foreground">
                  All fields are considered evidence
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            {/* Team Details */}
            <div className="space-y-4">
              <div>
                <label className="font-typewriter text-sm text-accent mb-2 block">
                  TEAM NAME *
                </label>
                <Input
                  name="teamName"
                  value={formData.teamName}
                  onChange={handleChange}
                  required
                  placeholder="The Alibi Squad"
                  className="bg-noir/50 border-accent/30 text-spotlight font-serif"
                />
              </div>

              <div>
                <label className="font-typewriter text-sm text-accent mb-2 block">
                  INSTITUTION *
                </label>
                <Input
                  name="institution"
                  value={formData.institution}
                  onChange={handleChange}
                  required
                  placeholder="NIT Durgapur"
                  className="bg-noir/50 border-accent/30 text-spotlight font-serif"
                />
              </div>
            </div>

            {/* Team Leader */}
            <div className="pt-4 border-t border-dashed border-accent/20">
              <h4 className="font-typewriter text-lg text-primary mb-4">
                LEAD DETECTIVE
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="font-typewriter text-sm text-accent mb-2 block">
                    NAME *
                  </label>
                  <Input
                    name="leaderName"
                    value={formData.leaderName}
                    onChange={handleChange}
                    required
                    placeholder="Sherlock Holmes"
                    className="bg-noir/50 border-accent/30 text-spotlight font-serif"
                  />
                </div>
                <div>
                  <label className="font-typewriter text-sm text-accent mb-2 block">
                    EMAIL *
                  </label>
                  <Input
                    name="leaderEmail"
                    type="email"
                    value={formData.leaderEmail}
                    onChange={handleChange}
                    required
                    placeholder="detective@mystery.com"
                    className="bg-noir/50 border-accent/30 text-spotlight font-serif"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="font-typewriter text-sm text-accent mb-2 block">
                  PHONE *
                </label>
                <Input
                  name="leaderPhone"
                  type="tel"
                  value={formData.leaderPhone}
                  onChange={handleChange}
                  required
                  placeholder="+91 XXXXXXXXXX"
                  className="bg-noir/50 border-accent/30 text-spotlight font-serif"
                />
              </div>
            </div>

            {/* Team Members */}
            <div className="pt-4 border-t border-dashed border-accent/20">
              <h4 className="font-typewriter text-lg text-primary mb-4">
                ADDITIONAL DETECTIVES
              </h4>
              <div className="space-y-4">
                <div>
                  <label className="font-typewriter text-sm text-accent mb-2 block">
                    MEMBER 2 NAME *
                  </label>
                  <Input
                    name="member2Name"
                    value={formData.member2Name}
                    onChange={handleChange}
                    required
                    placeholder="Dr. Watson"
                    className="bg-noir/50 border-accent/30 text-spotlight font-serif"
                  />
                </div>
                <div>
                  <label className="font-typewriter text-sm text-accent mb-2 block">
                    MEMBER 3 NAME (Optional)
                  </label>
                  <Input
                    name="member3Name"
                    value={formData.member3Name}
                    onChange={handleChange}
                    placeholder="Inspector Lestrade"
                    className="bg-noir/50 border-accent/30 text-spotlight font-serif"
                  />
                </div>
              </div>
            </div>

            {/* Experience */}
            <div className="pt-4 border-t border-dashed border-accent/20">
              <label className="font-typewriter text-sm text-accent mb-2 block">
                PREVIOUS CASES (Prior Debate Experience)
              </label>
              <Textarea
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="Tell us about your team's debate history..."
                className="bg-noir/50 border-accent/30 text-spotlight font-serif min-h-32"
              />
            </div>

            {/* Submit button styled as wax seal */}
            <div className="pt-6 flex justify-center">
              <Button
                type="submit"
                size="lg"
                className="font-typewriter text-lg px-12 py-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-2xl shadow-primary/50 transition-all hover:scale-105 relative group"
              >
                <Stamp className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                Submit Alibi
              </Button>
            </div>
          </form>

          {/* Paper edges decoration */}
          <div className="absolute -top-1 left-0 right-0 h-2 bg-repeat-x opacity-30" 
            style={{ 
              backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 10px, hsl(var(--parchment)) 10px, hsl(var(--parchment)) 11px)'
            }} 
          />
        </Card>
      </div>
    </section>
  );
};
