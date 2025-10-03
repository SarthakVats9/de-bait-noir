import { Calendar, MapPin, Users2, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";

const details = [
  {
    icon: Users2,
    label: "Team Format",
    value: "2-3 Members per Team",
    description: "Assemble your detective squad",
  },
  {
    icon: Calendar,
    label: "Date & Time",
    value: "TBA",
    description: "Mark your calendars, detectives",
  },
  {
    icon: MapPin,
    label: "Venue",
    value: "NIT Durgapur",
    description: "The scene of the crime",
  },
  {
    icon: FileText,
    label: "Format",
    value: "Multiple Rounds",
    description: "Progressive elimination structure",
  },
];

const rules = [
  "Teams must register in advance with all member details",
  "Each team consists of 2-3 participants",
  "Standard debate format with mystery theme integration",
  "Judges' decisions are final (no appeals to a higher court)",
  "Professional conduct expected - save the drama for the debate",
  "Participants must be present 30 minutes before their round",
];

export const EventDetails = () => {
  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-reveal">
          <h2 className="font-typewriter text-5xl md:text-6xl mb-6 text-primary">
            Case Details
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-8" />
          <p className="font-serif text-xl text-muted-foreground">
            Everything you need to crack the case
          </p>
        </div>

        {/* Details grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {details.map((detail, index) => (
            <Card
              key={index}
              className="bg-card border-border p-6 hover:border-accent transition-all duration-300 hover:shadow-lg hover:shadow-accent/20 group"
            >
              <detail.icon className="w-10 h-10 text-accent mb-4 group-hover:scale-110 transition-transform" />
              <p className="font-typewriter text-sm text-muted-foreground mb-2">
                {detail.label}
              </p>
              <h3 className="font-serif text-xl font-bold text-spotlight mb-2">
                {detail.value}
              </h3>
              <p className="font-serif text-sm text-muted-foreground">
                {detail.description}
              </p>
            </Card>
          ))}
        </div>

        {/* Rules section styled as evidence board */}
        <Card className="bg-gradient-to-br from-secondary to-card border-primary/30 p-8 md:p-12 relative">
          {/* Decorative tape strips */}
          <div className="absolute top-0 left-1/4 w-16 h-8 bg-accent/20 transform -translate-y-1/2 rotate-12" />
          <div className="absolute top-0 right-1/4 w-16 h-8 bg-accent/20 transform -translate-y-1/2 -rotate-12" />

          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-typewriter text-3xl text-spotlight">
              Rules of Engagement
            </h3>
          </div>

          <ul className="space-y-4">
            {rules.map((rule, index) => (
              <li key={index} className="flex items-start gap-4 font-serif text-lg text-muted-foreground">
                <span className="w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center flex-shrink-0 font-typewriter text-sm mt-1">
                  {index + 1}
                </span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>

          {/* Evidence tag */}
          <div className="mt-8 inline-block bg-accent/10 border border-accent/30 px-4 py-2 font-typewriter text-accent text-sm">
            EVIDENCE #TD7-2025
          </div>
        </Card>
      </div>
    </section>
  );
};
