import { cn } from "@/lib/utils";
import { Sun, Moon, Clock } from "lucide-react";
import type { RoutineStep } from "@/lib/api";

interface RoutineCardProps {
  title: string;
  type: "morning" | "night" | "general";
  steps: RoutineStep[];
  className?: string;
}

export function RoutineCard({ title, type, steps, className }: RoutineCardProps) {
  const Icon = type === "morning" ? Sun : type === "night" ? Moon : Clock;
  
  return (
    <div
      className={cn(
        "rounded-2xl p-5 shadow-card border animate-scale-in",
        type === "morning" && "gradient-morning border-amber-200/30",
        type === "night" && "gradient-night border-indigo-400/20",
        type === "general" && "bg-card border-border",
        className
      )}
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center",
            type === "morning" && "bg-amber-100",
            type === "night" && "bg-indigo-500/30",
            type === "general" && "bg-primary-light"
          )}
        >
          <Icon
            className={cn(
              "w-5 h-5",
              type === "morning" && "text-amber-600",
              type === "night" && "text-indigo-200",
              type === "general" && "text-primary"
            )}
          />
        </div>
        <h3
          className={cn(
            "font-display text-lg font-semibold",
            type === "night" ? "text-white" : "text-foreground"
          )}
        >
          {title}
        </h3>
      </div>

      <div className="space-y-3">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className={cn(
              "flex items-start gap-3 p-3 rounded-xl transition-all",
              type === "night"
                ? "bg-white/10 hover:bg-white/15"
                : "bg-white/60 hover:bg-white/80"
            )}
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <span
              className={cn(
                "flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold shrink-0",
                type === "morning" && "bg-amber-500 text-white",
                type === "night" && "bg-indigo-400 text-white",
                type === "general" && "bg-primary text-primary-foreground"
              )}
            >
              {idx + 1}
            </span>
            <div className="flex-1 min-w-0">
              <p
                className={cn(
                  "font-medium",
                  type === "night" ? "text-white" : "text-foreground"
                )}
              >
                {step.step || step.name}
              </p>
              {(step.duration || step.minutes) && (
                <p
                  className={cn(
                    "text-xs mt-0.5",
                    type === "night" ? "text-indigo-200" : "text-muted-foreground"
                  )}
                >
                  {step.duration || `${step.minutes} min`}
                </p>
              )}
              {(step.notes || step.explanation) && (
                <p
                  className={cn(
                    "text-sm mt-1",
                    type === "night" ? "text-indigo-100/80" : "text-muted-foreground"
                  )}
                >
                  {step.notes || step.explanation}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
