import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";

export const RewardsSection = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <section id="rewards" className="py-32 relative overflow-hidden border-b border-border">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-24">
              <Skeleton className="h-20 w-[500px] mx-auto mb-8" />
              <Skeleton className="h-8 w-96 mx-auto" />
            </div>
            <div className="grid md:grid-cols-3 gap-10">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="minimal-card p-12">
                  <div className="mb-10">
                    <Skeleton className="h-24 w-32 mx-auto mb-3" />
                    <Skeleton className="h-6 w-24 mx-auto" />
                  </div>
                  <Skeleton className="h-8 w-40 mx-auto mb-3" />
                  <Skeleton className="h-6 w-full" />
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="rewards" className="py-32 relative overflow-hidden border-b border-border">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <p className="text-sm uppercase tracking-[0.35em] font-mono text-muted-foreground mb-4">Rewards · For Players</p>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tighter">Earn $METAL for verified gameplay.</h2>
            <p className="text-xl text-muted-foreground">
              Get paid to play. Climb tiers for better splits and merch.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="minimal-card p-10 text-left animate-fade-in-up border-2 border-foreground/10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-mono uppercase tracking-[0.2em] text-muted-foreground">Tier</span>
                <div className="px-3 py-1 rounded-full bg-amber-200/40 text-amber-900 text-xs font-semibold">Gold</div>
              </div>
              <h3 className="text-3xl font-semibold mb-3">Base $METAL rate + swag.</h3>
              <p className="text-base text-muted-foreground">
                Verified sessions earn immediate $METAL plus drops from the merch vault.
              </p>
            </Card>

            <Card className="minimal-card p-10 text-left animate-fade-in-up border-2 border-primary/30" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-mono uppercase tracking-[0.2em] text-muted-foreground">Tier</span>
                <div className="px-3 py-1 rounded-full bg-primary/15 text-primary text-xs font-semibold">Platinum</div>
              </div>
              <h3 className="text-3xl font-semibold mb-3">2× $METAL rate + Swag+.</h3>
              <p className="text-base text-muted-foreground">
                Priority missions, double rewards, bespoke drops straight from the studio.
              </p>
            </Card>
          </div>

          <div className="text-center mt-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <button className="px-8 py-4 text-lg font-semibold rounded-full border border-foreground/20 hover:border-primary hover:text-primary transition-all duration-200 shadow-[0_0_0_1px_hsl(var(--border))]">
              Join as a Player
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
