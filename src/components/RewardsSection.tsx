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
      <section id="badges" className="py-40 relative overflow-hidden border-b border-border">
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
    <section id="badges" className="py-40 relative overflow-hidden border-b border-border">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24 animate-fade-in-up">
            <h2 className="text-6xl md:text-7xl font-bold mb-8 tracking-tighter">Token Allocation</h2>
            <p className="text-2xl text-muted-foreground">
              Prove your rank and claim your share
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <Card className="minimal-card p-12 text-center animate-fade-in-up">
              <div className="mb-10">
                <div className="text-7xl font-bold mb-3">5K</div>
                <div className="text-base text-muted-foreground tracking-wider uppercase">$POKER</div>
              </div>
              <h3 className="text-2xl font-semibold mb-3">Diamond+</h3>
              <p className="text-base text-muted-foreground">Top tier rewards for elite players</p>
            </Card>

            <Card className="minimal-card p-12 text-center animate-fade-in-up border-2 border-foreground" style={{ animationDelay: '0.1s' }}>
              <div className="mb-10">
                <div className="text-7xl font-bold mb-3">2.5K</div>
                <div className="text-base text-muted-foreground tracking-wider uppercase">$POKER</div>
              </div>
              <h3 className="text-2xl font-semibold mb-3">Platinum</h3>
              <p className="text-base text-muted-foreground">Solid rewards for dedicated players</p>
            </Card>

            <Card className="minimal-card p-12 text-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="mb-10">
                <div className="text-7xl font-bold mb-3">1K</div>
                <div className="text-base text-muted-foreground tracking-wider uppercase">$POKER</div>
              </div>
              <h3 className="text-2xl font-semibold mb-3">Gold & Below</h3>
              <p className="text-base text-muted-foreground">Entry rewards for all verified players</p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
