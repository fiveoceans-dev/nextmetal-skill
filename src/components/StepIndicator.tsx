import { CheckCircle2, Circle, Lock } from "lucide-react";

interface Step {
  number: number;
  title: string;
  description: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  completedSteps: number[];
  onStepClick: (stepNumber: number) => void;
}

export function StepIndicator({ steps, currentStep, completedSteps, onStepClick }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      {steps.map((step, index) => {
        const isCompleted = completedSteps.includes(step.number);
        const isCurrent = currentStep === step.number;
        const isLocked = step.number > currentStep && !isCompleted;

        const canClick = isCompleted || isCurrent;

        return (
          <div key={step.number} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <div
                onClick={() => canClick && onStepClick(step.number)}
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all text-xs ${
                  isCompleted
                    ? "bg-primary border-primary text-primary-foreground"
                    : isCurrent
                    ? "bg-background border-primary text-primary"
                    : "bg-muted border-muted-foreground/20 text-muted-foreground"
                } ${canClick ? "cursor-pointer hover:scale-110" : "cursor-not-allowed"}`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : isLocked ? (
                  <Lock className="h-3 w-3" />
                ) : (
                  <span className="font-bold">{step.number}</span>
                )}
              </div>
              <div className="mt-2 text-center">
                <p className={`font-medium text-xs ${isCurrent ? "text-primary" : "text-foreground"}`}>
                  {step.title}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{step.description}</p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`h-0.5 flex-1 mx-1 mt-[-32px] transition-all ${
                  completedSteps.includes(step.number) ? "bg-primary" : "bg-muted"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
