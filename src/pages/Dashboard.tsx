import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, LogOut, CheckCircle2, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { LinkAccountWorkflow } from "@/components/LinkAccountWorkflow";
import { WalletConnect } from "@/components/WalletConnect";

interface LinkedAccount {
  id: string;
  summoner_name: string;
  region: string;
  rank_tier: string | null;
  rank_division: string | null;
  verified: boolean;
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [linkedAccounts, setLinkedAccounts] = useState<LinkedAccount[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (!session) {
          navigate("/auth");
        } else {
          fetchLinkedAccounts(session.user.id);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);

      if (!session) {
        navigate("/auth");
      } else {
        fetchLinkedAccounts(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchLinkedAccounts = async (userId: string) => {
    const { data, error } = await supabase
      .from("linked_accounts")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching linked accounts:", error);
      return;
    }

    setLinkedAccounts(data || []);
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logged out",
        description: "You've been successfully logged out.",
      });
      navigate("/");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold glow-text">monad.passport</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:inline">
              {user.email}
            </span>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="text-center animate-fade-in-up">
              <h1 className="text-4xl font-bold mb-4 glow-text">Dashboard</h1>
              <p className="text-muted-foreground text-lg">
                Connect your accounts and manage your gaming credentials
              </p>
            </div>

            {/* Two-column layout */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column - Link League Account */}
              <div className="space-y-6">
                <LinkAccountWorkflow userId={user.id} />
              </div>

              {/* Right Column - Connect Wallet */}
              <div className="space-y-6">
                <Card className="glass-card border-primary/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" />
                      Connect Wallet
                    </CardTitle>
                    <CardDescription>
                      Connect your Web3 wallet to store credentials on-chain
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <WalletConnect />
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Account Link Status */}
            {linkedAccounts.length > 0 && (
              <Card className="glass-card border-accent/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-accent" />
                    Account Link Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {linkedAccounts.map((account) => (
                      <div key={account.id} className="p-4 rounded-lg bg-muted/50 border border-border">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-semibold">{account.summoner_name}</p>
                            <p className="text-sm text-muted-foreground">
                              {account.region.toUpperCase()}
                            </p>
                          </div>
                          {account.verified && (
                            <CheckCircle2 className="h-5 w-5 text-primary" />
                          )}
                        </div>
                        {account.rank_tier && (
                          <div className="mt-2 flex items-center gap-2">
                            <span className="text-xs font-medium text-primary">
                              {account.rank_tier} {account.rank_division}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Player Data Section */}
            <Card className="glass-card border-primary/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Player Data Storage
                </CardTitle>
                <CardDescription>
                  Save your gaming credentials to Monad testnet (Coming Soon)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert className="bg-muted/50 border-accent/30">
                  <Info className="h-4 w-4 text-accent" />
                  <AlertDescription>
                    <strong>Blockchain Storage:</strong> Your verified rank and achievements will be stored as verifiable credentials on Monad blockchain
                  </AlertDescription>
                </Alert>

                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                    <span className="text-sm font-medium">Linked Accounts</span>
                    <span className="text-sm text-muted-foreground">{linkedAccounts.length}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                    <span className="text-sm font-medium">Verified Accounts</span>
                    <span className="text-sm text-muted-foreground">
                      {linkedAccounts.filter(a => a.verified).length}
                    </span>
                  </div>
                </div>

                <Button 
                  className="w-full" 
                  disabled={linkedAccounts.filter(a => a.verified).length === 0}
                  onClick={() => {
                    toast({
                      title: "Coming Soon",
                      description: "Smart contract integration will be available soon on Monad testnet",
                    });
                  }}
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Save to Blockchain
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
