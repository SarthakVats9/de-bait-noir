import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { LogOut, Download, Shield } from "lucide-react";

interface Registration {
  id: string;
  team_name: string;
  member1_name: string;
  member1_roll: string;
  member1_email: string;
  member2_name: string | null;
  member2_roll: string | null;
  member2_email: string | null;
  member3_name: string | null;
  member3_roll: string | null;
  member3_email: string | null;
  created_at: string;
}

export default function Admin() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate("/auth");
      return;
    }

    setUser(session.user);
    fetchRegistrations();
  };

  const fetchRegistrations = async () => {
    try {
      const { data, error } = await (supabase as any)
        .from("registrations")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        toast.error("Access denied!", {
          description: "You don't have permission to view registrations.",
        });
        navigate("/");
      } else {
        setRegistrations(data || []);
      }
    } catch (error) {
      console.error("Error fetching registrations:", error);
      toast.error("Failed to load registrations");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const exportToCSV = () => {
    const headers = [
      "Team Name",
      "Member 1 Name", "Member 1 Roll", "Member 1 Email",
      "Member 2 Name", "Member 2 Roll", "Member 2 Email",
      "Member 3 Name", "Member 3 Roll", "Member 3 Email",
      "Registration Date"
    ];

    const rows = registrations.map(reg => [
      reg.team_name,
      reg.member1_name, reg.member1_roll, reg.member1_email,
      reg.member2_name || "", reg.member2_roll || "", reg.member2_email || "",
      reg.member3_name || "", reg.member3_roll || "", reg.member3_email || "",
      new Date(reg.created_at).toLocaleString()
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `take-debait-registrations-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast.success("Export complete!", {
      description: "Registration data downloaded as CSV.",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-noir flex items-center justify-center">
        <div className="font-typewriter text-2xl text-primary animate-pulse">
          Accessing case files...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-noir py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Shield className="w-8 h-8 text-primary" />
            <div>
              <h1 className="font-typewriter text-4xl text-primary">
                Admin Dashboard
              </h1>
              <p className="font-serif text-muted-foreground">
                Take DeBait 7.0 Registrations
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <Button
              onClick={exportToCSV}
              variant="outline"
              className="font-typewriter"
            >
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            <Button
              onClick={handleLogout}
              variant="destructive"
              className="font-typewriter"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-secondary/50 p-6 border-primary/20">
            <div className="font-typewriter text-sm text-accent mb-2">
              TOTAL TEAMS
            </div>
            <div className="font-serif text-4xl text-spotlight">
              {registrations.length}
            </div>
          </Card>
          <Card className="bg-secondary/50 p-6 border-primary/20">
            <div className="font-typewriter text-sm text-accent mb-2">
              TOTAL PARTICIPANTS
            </div>
            <div className="font-serif text-4xl text-spotlight">
              {registrations.reduce((sum, reg) => {
                let count = 1; // member1 always exists
                if (reg.member2_name) count++;
                if (reg.member3_name) count++;
                return sum + count;
              }, 0)}
            </div>
          </Card>
          <Card className="bg-secondary/50 p-6 border-primary/20">
            <div className="font-typewriter text-sm text-accent mb-2">
              LATEST REGISTRATION
            </div>
            <div className="font-serif text-lg text-spotlight">
              {registrations.length > 0 
                ? new Date(registrations[0].created_at).toLocaleDateString()
                : "No registrations"}
            </div>
          </Card>
        </div>

        {/* Registrations Table */}
        <Card className="bg-secondary/50 border-primary/20 p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-accent/30">
                  <th className="font-typewriter text-sm text-accent text-left p-4">
                    TEAM NAME
                  </th>
                  <th className="font-typewriter text-sm text-accent text-left p-4">
                    MEMBERS
                  </th>
                  <th className="font-typewriter text-sm text-accent text-left p-4">
                    CONTACT
                  </th>
                  <th className="font-typewriter text-sm text-accent text-left p-4">
                    DATE
                  </th>
                </tr>
              </thead>
              <tbody>
                {registrations.map((reg) => (
                  <tr key={reg.id} className="border-b border-accent/10 hover:bg-noir/30">
                    <td className="font-serif text-spotlight p-4">
                      {reg.team_name}
                    </td>
                    <td className="font-serif text-muted-foreground p-4">
                      <div className="space-y-1">
                        <div>{reg.member1_name} ({reg.member1_roll})</div>
                        {reg.member2_name && (
                          <div>{reg.member2_name} ({reg.member2_roll})</div>
                        )}
                        {reg.member3_name && (
                          <div>{reg.member3_name} ({reg.member3_roll})</div>
                        )}
                      </div>
                    </td>
                    <td className="font-serif text-muted-foreground p-4">
                      <div className="space-y-1">
                        <div className="text-sm">{reg.member1_email}</div>
                      </div>
                    </td>
                    <td className="font-serif text-muted-foreground p-4">
                      {new Date(reg.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {registrations.length === 0 && (
              <div className="text-center py-12">
                <p className="font-typewriter text-muted-foreground">
                  No registrations yet. The case files are empty.
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
