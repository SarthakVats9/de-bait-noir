import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Shield, Mail, Lock } from "lucide-react";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if already logged in
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/admin");
      }
    };
    checkSession();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error("Authentication failed!", {
          description: error.message,
        });
      } else {
        toast.success("Access granted!", {
          description: "Redirecting to admin dashboard...",
        });
        navigate("/admin");
      }
    } catch (error) {
      toast.error("Unexpected error occurred");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-noir flex items-center justify-center px-4">
      <Card className="w-full max-w-md bg-secondary/50 border-primary/20 p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Shield className="w-16 h-16 text-primary" />
          </div>
          <h1 className="font-typewriter text-3xl text-primary mb-2">
            RESTRICTED ACCESS
          </h1>
          <p className="font-serif text-muted-foreground">
            DebSoc Admin Portal
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="font-typewriter text-sm text-accent mb-2 block">
              EMAIL ADDRESS
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@debsoc.com"
                className="pl-10 bg-noir/50 border-accent/30 text-spotlight font-serif"
              />
            </div>
          </div>

          <div>
            <label className="font-typewriter text-sm text-accent mb-2 block">
              PASSWORD
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="pl-10 bg-noir/50 border-accent/30 text-spotlight font-serif"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full font-typewriter text-lg py-6 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {loading ? "Verifying..." : "Access Dashboard"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/")}
            className="font-serif text-sm text-muted-foreground hover:text-accent transition-colors"
          >
            ← Back to main site
          </button>
        </div>
      </Card>
    </div>
  );
}
