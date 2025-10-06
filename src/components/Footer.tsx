import { Mail, Instagram, Facebook, Linkedin, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";

export const Footer = () => {
  return (
    <footer className="py-16 px-4 bg-noir border-t border-primary/20">
      <div className="max-w-6xl mx-auto">
        {/* Detective file card styling */}
        <Card className="bg-gradient-to-br from-secondary to-card border-accent/30 p-8 mb-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-primary" />
                <h3 className="font-typewriter text-xl text-spotlight">
                  CONTACT FILES
                </h3>
              </div>
              <div className="space-y-3 font-serif text-muted-foreground">
                <a 
                  href="mailto:debsoc@nitdgp.ac.in" 
                  className="flex items-center gap-2 hover:text-primary transition-colors group"
                >
                  <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  debsoc@nitdgp.ac.in
                </a>
              </div>
            </div>

            {/* Social Evidence Stamps */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-5 h-5 bg-primary/20 rounded-full" />
                <h3 className="font-typewriter text-xl text-spotlight">
                  EVIDENCE STAMPS
                </h3>
              </div>
              <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/debsocnitd/?hl=en" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-secondary hover:bg-primary/20 rounded-lg flex items-center justify-center transition-all hover:scale-110 group"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
              </a>
              <a 
                href="https://www.facebook.com/debatingsociety3103.nitd/" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-secondary hover:bg-primary/20 rounded-lg flex items-center justify-center transition-all hover:scale-110 group"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
              </a>
              <a 
                href="https://in.linkedin.com/company/debating-society-nit-durgapur" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-secondary hover:bg-primary/20 rounded-lg flex items-center justify-center transition-all hover:scale-110 group"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
              </a>
              </div>
            </div>

            {/* Case Number */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-5 h-5 bg-accent/20 rounded-full" />
                <h3 className="font-typewriter text-xl text-spotlight">
                  CASE STATUS
                </h3>
              </div>
              <div className="inline-block bg-accent/10 border border-accent/30 px-4 py-2 font-typewriter text-accent text-sm">
                CASE #TD7-2025
              </div>
              <p className="font-serif text-sm text-muted-foreground mt-3">
                Status: Active Investigation
              </p>
            </div>
          </div>
        </Card>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-border">
          <p className="font-serif text-muted-foreground text-center md:text-left">
            © 2025 The Debating Society, NIT Durgapur. All evidence preserved.
          </p>
          <p className="font-typewriter text-sm text-accent">
            "The truth is rarely pure and never simple."
          </p>
        </div>

        {/* Easter egg - Classified document */}
        <div className="mt-8 text-center">
          <button 
            onClick={() => {
              const toast = (window as any).toast;
              if (toast) {
                toast("🚫 ACCESS DENIED - Classified Evidence", {
                  description: "Security clearance required. Nice try, detective!"
                });
              }
            }}
            className="font-typewriter text-xs text-red-500/50 hover:text-red-500 transition-colors cursor-pointer border border-red-500/30 px-3 py-1 hover:border-red-500"
          >
            [CLASSIFIED DOCUMENT - DO NOT OPEN]
          </button>
        </div>
      </div>
    </footer>
  );
};
