import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";

export const ProjectInfoSection = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1600);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <section className="py-40 relative overflow-hidden border-b border-border">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
            {[1, 2].map((i) => (
              <Card key={i} className="minimal-card p-16">
                <Skeleton className="h-12 w-48 mb-6" />
                <Skeleton className="h-6 w-full mb-3" />
                <Skeleton className="h-6 w-full mb-3" />
                <Skeleton className="h-6 w-3/4" />
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-40 relative overflow-hidden border-b border-border">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          <Card className="minimal-card p-16 animate-fade-in-up">
            <div className="space-y-6">
              <h3 className="text-4xl font-bold tracking-tight">Monad</h3>
              <p className="text-muted-foreground text-xl leading-relaxed">
                High-performance blockchain enabling fast, scalable gaming applications with low transaction costs.
              </p>
            </div>
          </Card>

          <Card className="minimal-card p-16 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="space-y-6">
              <h3 className="text-4xl font-bold tracking-tight">PokerNFT</h3>
              <p className="text-muted-foreground text-xl leading-relaxed">
                Permissionless onchain poker platform where players compete with transparency and provable fairness.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
