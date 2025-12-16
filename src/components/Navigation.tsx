import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const Navigation = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
          <span className="text-2xl font-bold tracking-tighter">Airdrop</span>
        </div>

        <div className="hidden md:flex items-center gap-10">
          <a href="#rewards" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Rewards
          </a>
          <a href="#data" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Data
          </a>
          <a href="#datasets" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Datasets
          </a>
        </div>

        <Button onClick={() => navigate("/auth")} size="default">
          Get Started
        </Button>
      </div>
    </nav>
  );
};
