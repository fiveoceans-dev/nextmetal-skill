import { Button } from "@/components/ui/button";
import { Download, Users, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { HeroSkeleton } from "@/components/HeroSkeleton";

export const HeroSection = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <HeroSkeleton />;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 grid-pattern scanlines">
      {/* Background effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="animate-fade-in-up">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-primary text-sm font-mono">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              NOW IN BETA
            </span>
          </div>

          {/* Headline */}
          <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <h1 className="font-orbitron text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight">
              AI that learns by
              <br />
              <span className="text-primary neon-text">playing games.</span>
            </h1>
          </div>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in-up font-mono" style={{ animationDelay: '0.2s' }}>
            Play games. Earn <span className="text-accent font-semibold">$METAL</span>. Help us train Future AI.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <Button size="lg" className="cyber-btn text-lg px-8 h-14 pulse-glow">
              <Download className="mr-2 h-5 w-5" />
              Install & Play
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 h-14 border-border hover:border-secondary hover:text-secondary"
            >
              <Users className="mr-2 h-5 w-5" />
              For Teams & AI Labs
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto pt-12 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="text-center">
              <div className="font-orbitron text-3xl md:text-4xl font-bold text-primary">10K+</div>
              <div className="text-sm text-muted-foreground mt-1">Players</div>
            </div>
            <div className="text-center">
              <div className="font-orbitron text-3xl md:text-4xl font-bold text-secondary">1M+</div>
              <div className="text-sm text-muted-foreground mt-1">Hours Captured</div>
            </div>
            <div className="text-center">
              <div className="font-orbitron text-3xl md:text-4xl font-bold text-accent">50+</div>
              <div className="text-sm text-muted-foreground mt-1">Games</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};
