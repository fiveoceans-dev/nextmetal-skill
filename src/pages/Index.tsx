import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { RewardsSection } from "@/components/RewardsSection";
import { DataSection } from "@/components/DataSection";
import { DatasetsSection } from "@/components/DatasetsSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <RewardsSection />
      <DataSection />
      <DatasetsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
