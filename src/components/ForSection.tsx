import { Skeleton } from "@/components/ui/skeleton";
import { Gamepad2, FlaskConical, Building2, Trophy } from "lucide-react";
import { useState, useEffect } from "react";

const ForSkeleton = () => (
  <section className="py-24 px-4 bg-card/50">
    <div className="container mx-auto max-w-5xl">
      <div className="text-center mb-16">
        <Skeleton className="h-10 w-32 mx-auto" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-32 rounded-lg" />
        ))}
      </div>
    </div>
  </section>
);

export const ForSection = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <ForSkeleton />;

  const audiences = [
    { icon: Gamepad2, label: "Players", color: "primary" },
    { icon: FlaskConical, label: "AI Labs", color: "secondary" },
    { icon: Building2, label: "Game Studios", color: "accent" },
    { icon: Trophy, label: "Esports Orgs", color: "neon-cyan" },
  ];

  return (
    <section className="py-24 px-4 bg-card/50 relative">
      {/* Decorative line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent" />
      
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold">
            Built For
          </h2>
        </div>

        {/* Audience Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {audiences.map((item, index) => (
            <div
              key={item.label}
              className="cyber-card text-center group hover:scale-105 transition-transform duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-14 h-14 mx-auto mb-4 rounded-lg bg-${item.color}/10 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <item.icon className={`w-7 h-7 text-${item.color}`} />
              </div>
              <h3 className="font-orbitron font-semibold">{item.label}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
