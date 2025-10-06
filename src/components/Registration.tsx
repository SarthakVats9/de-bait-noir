import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Stamp } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";


export const Registration = () => {
  const [formData, setFormData] = useState({
    team_name: "",
    member1_name: "",
    member1_roll: "",
    member1_email: "",
    member2_name: "",
    member2_roll: "",
    member2_email: "",
    member3_name: "",
    member3_roll: "",
    member3_email: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    // Check for required fields
    if (!formData.team_name || !formData.member1_name || !formData.member1_roll || !formData.member1_email) {
      toast.error("Case incomplete!", {
        description: "Team name and Member 1 details are required.",
      });
      return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.member1_email)) {
      toast.error("Invalid evidence!", {
        description: "Member 1 email format is invalid.",
      });
      return false;
    }

    if (formData.member2_email && !emailRegex.test(formData.member2_email)) {
      toast.error("Invalid evidence!", {
        description: "Member 2 email format is invalid.",
      });
      return false;
    }

    if (formData.member3_email && !emailRegex.test(formData.member3_email)) {
      toast.error("Invalid evidence!", {
        description: "Member 3 email format is invalid.",
      });
      return false;
    }

    // Check for duplicate roll numbers within the team
    const rolls = [
      formData.member1_roll,
      formData.member2_roll,
      formData.member3_roll,
    ].filter(Boolean);

    const uniqueRolls = new Set(rolls);
    if (rolls.length !== uniqueRolls.size) {
      toast.error("Duplicate identity detected!", {
        description: "Each team member must have a unique roll number.",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const { error } = await (supabase as any).from("registrations").insert([formData]);

      if (error) {
        if (error.message.includes("unique_roll_numbers_per_team")) {
          toast.error("Identity conflict!", {
            description: "One of these roll numbers is already registered.",
          });
        } else {
          toast.error("Case files locked!", {
            description: "Registration failed. Try again later.",
          });
        }
        console.error("Registration error:", error);
      } else {
        toast.success("Alibi submitted successfully! 🕵️", {
          description: "Your team has been registered for Take DeBait 7.0.",
        });
        
        // Reset form
        setFormData({
          team_name: "",
          member1_name: "",
          member1_roll: "",
          member1_email: "",
          member2_name: "",
          member2_roll: "",
          member2_email: "",
          member3_name: "",
          member3_roll: "",
          member3_email: "",
        });
      }
    } catch (error) {
      toast.error("Unexpected error!", {
        description: "Something went wrong. Please try again.",
      });
      console.error("Unexpected error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
                  name="team_name"
                  value={formData.team_name}
                  onChange={handleChange}
                  required
                  placeholder="The Alibi Squad"
                  className="bg-noir/50 border-accent/30 text-spotlight font-serif"
                />
              </div>
            </div>

            {/* Member 1 */}
            <div className="pt-4 border-t border-dashed border-accent/20">
              <h4 className="font-typewriter text-lg text-primary mb-4">
                MEMBER 1 (REQUIRED)
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="font-typewriter text-sm text-accent mb-2 block">
                    NAME *
                  </label>
                  <Input
                    name="member1_name"
                    value={formData.member1_name}
                    onChange={handleChange}
                    required
                    placeholder="Sherlock Holmes"
                    className="bg-noir/50 border-accent/30 text-spotlight font-serif"
                  />
                </div>
                <div>
                  <label className="font-typewriter text-sm text-accent mb-2 block">
                    ROLL NUMBER *
                  </label>
                  <Input
                    name="member1_roll"
                    value={formData.member1_roll}
                    onChange={handleChange}
                    required
                    placeholder="21CS1001"
                    className="bg-noir/50 border-accent/30 text-spotlight font-serif"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="font-typewriter text-sm text-accent mb-2 block">
                  EMAIL *
                </label>
                <Input
                  name="member1_email"
                  type="email"
                  value={formData.member1_email}
                  onChange={handleChange}
                  required
                  placeholder="detective@mystery.com"
                  className="bg-noir/50 border-accent/30 text-spotlight font-serif"
                />
              </div>
            </div>

            {/* Member 2 */}
            <div className="pt-4 border-t border-dashed border-accent/20">
              <h4 className="font-typewriter text-lg text-primary mb-4">
                MEMBER 2 (OPTIONAL)
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="font-typewriter text-sm text-accent mb-2 block">
                    NAME
                  </label>
                  <Input
                    name="member2_name"
                    value={formData.member2_name}
                    onChange={handleChange}
                    placeholder="Dr. Watson"
                    className="bg-noir/50 border-accent/30 text-spotlight font-serif"
                  />
                </div>
                <div>
                  <label className="font-typewriter text-sm text-accent mb-2 block">
                    ROLL NUMBER
                  </label>
                  <Input
                    name="member2_roll"
                    value={formData.member2_roll}
                    onChange={handleChange}
                    placeholder="21CS1002"
                    className="bg-noir/50 border-accent/30 text-spotlight font-serif"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="font-typewriter text-sm text-accent mb-2 block">
                  EMAIL
                </label>
                <Input
                  name="member2_email"
                  type="email"
                  value={formData.member2_email}
                  onChange={handleChange}
                  placeholder="watson@mystery.com"
                  className="bg-noir/50 border-accent/30 text-spotlight font-serif"
                />
              </div>
            </div>

            {/* Member 3 */}
            <div className="pt-4 border-t border-dashed border-accent/20">
              <h4 className="font-typewriter text-lg text-primary mb-4">
                MEMBER 3 (OPTIONAL)
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="font-typewriter text-sm text-accent mb-2 block">
                    NAME
                  </label>
                  <Input
                    name="member3_name"
                    value={formData.member3_name}
                    onChange={handleChange}
                    placeholder="Inspector Lestrade"
                    className="bg-noir/50 border-accent/30 text-spotlight font-serif"
                  />
                </div>
                <div>
                  <label className="font-typewriter text-sm text-accent mb-2 block">
                    ROLL NUMBER
                  </label>
                  <Input
                    name="member3_roll"
                    value={formData.member3_roll}
                    onChange={handleChange}
                    placeholder="21CS1003"
                    className="bg-noir/50 border-accent/30 text-spotlight font-serif"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="font-typewriter text-sm text-accent mb-2 block">
                  EMAIL
                </label>
                <Input
                  name="member3_email"
                  type="email"
                  value={formData.member3_email}
                  onChange={handleChange}
                  placeholder="lestrade@mystery.com"
                  className="bg-noir/50 border-accent/30 text-spotlight font-serif"
                />
              </div>
            </div>

            {/* Submit button styled as wax seal */}
            <div className="pt-6 flex justify-center">
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="font-typewriter text-lg px-12 py-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-2xl shadow-primary/50 transition-all hover:scale-105 relative group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Stamp className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                {isSubmitting ? "Filing Alibi..." : "Submit Alibi"}
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
