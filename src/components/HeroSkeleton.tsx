import { Skeleton } from "@/components/ui/skeleton";

export const HeroSkeleton = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <div className="space-y-8">
            <div className="space-y-6">
              <Skeleton className="h-32 w-full max-w-4xl mx-auto" />
              <Skeleton className="h-32 w-full max-w-3xl mx-auto" />
            </div>
            <Skeleton className="h-20 w-full max-w-2xl mx-auto" />
          </div>
          <div className="flex justify-center">
            <Skeleton className="h-16 w-64" />
          </div>
        </div>
      </div>
    </section>
  );
};
