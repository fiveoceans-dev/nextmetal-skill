import { Skeleton } from "@/components/ui/skeleton";
import { Monitor, Mouse, Clock, Camera, Shield } from "lucide-react";
import { useState, useEffect } from "react";

const DataSkeleton = () => (
  <section className="py-24 px-4 bg-card/50">
    <div className="container mx-auto max-w-5xl">
      <div className="text-center mb-16 space-y-4">
        <Skeleton className="h-10 w-48 mx-auto" />
        <Skeleton className="h-6 w-72 mx-auto" />
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-40 rounded-lg" />
        ))}
      </div>
    </div>
  </section>
);

export const DataSection = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <DataSkeleton />;

  const dataTypes = [
    {
      icon: Monitor,
      title: "Screen video",
      description: "Crisp captures of your gameplay",
    },
    {
      icon: Mouse,
      title: "Mouse + Keyboard inputs",
      description: "Every click and key, frame-aligned",
    },
    {
      icon: Clock,
      title: "Timing",
      description: "Timestamps to sync everything",
    },
    {
      icon: Camera,
      title: "WebCamera (optional)",
      description: "Only if you toggle it on",
    },
  ];

  return (
    <section id="data" className="py-24 px-4 bg-card/50 relative">
      {/* Decorative line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16 space-y-4 animate-fade-in-up">
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold">
            What We <span className="text-primary neon-text">Record</span>
          </h2>
          <p className="text-xl text-muted-foreground font-mono">
            Minimal capture. Maximum signal.
          </p>
        </div>

        {/* Data Types Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {dataTypes.map((item, index) => (
            <div
              key={item.title}
              className="cyber-card text-center animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
                <item.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-orbitron text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Control Message */}
        <div className="cyber-card flex flex-col sm:flex-row items-start sm:items-center gap-4 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <div className="w-12 h-12 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h4 className="font-orbitron font-semibold text-lg">You're in Control</h4>
            <p className="text-muted-foreground">
              No memory. No APIs. You control recording. You decide what to share.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
