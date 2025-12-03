import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { Droplets, Sun, Sparkles, Leaf, CloudSun } from "lucide-react";

interface SkinProfileFormProps {
  onSubmit: (data: {
    age: number;
    skin_type: string;
    concerns: string[];
    use_llm: boolean;
    useWeather: boolean;
  }) => void;
  isLoading?: boolean;
}

const SKIN_TYPES = [
  { id: "oily", label: "Oily", icon: Droplets, description: "Shiny, enlarged pores" },
  { id: "dry", label: "Dry", icon: Sun, description: "Tight, flaky skin" },
  { id: "combination", label: "Combo", icon: Sparkles, description: "Mixed zones" },
  { id: "sensitive", label: "Sensitive", icon: Leaf, description: "Reactive, easily irritated" },
  { id: "normal", label: "Normal", icon: CloudSun, description: "Balanced, few issues" },
];

const CONCERNS = [
  { id: "acne", label: "Acne", emoji: "🔴" },
  { id: "aging", label: "Anti-aging", emoji: "✨" },
  { id: "hyperpigmentation", label: "Dark spots", emoji: "🌑" },
  { id: "dryness", label: "Dryness", emoji: "🏜️" },
  { id: "pores", label: "Large pores", emoji: "⚪" },
  { id: "sensitivity", label: "Sensitivity", emoji: "🌸" },
  { id: "dullness", label: "Dullness", emoji: "😴" },
  { id: "redness", label: "Redness", emoji: "🔥" },
];

export function SkinProfileForm({ onSubmit, isLoading }: SkinProfileFormProps) {
  const [age, setAge] = useState(25);
  const [skinType, setSkinType] = useState("");
  const [concerns, setConcerns] = useState<string[]>([]);
  const [useLlm, setUseLlm] = useState(true);
  const [useWeather, setUseWeather] = useState(false);

  const toggleConcern = (id: string) => {
    setConcerns((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!skinType) return;
    onSubmit({ age, skin_type: skinType, concerns, use_llm: useLlm, useWeather });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Age Section */}
      <div className="space-y-4 animate-fade-in">
        <label className="block text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Your Age
        </label>
        <div className="flex items-center gap-6">
          <Slider
            value={[age]}
            onValueChange={([v]) => setAge(v)}
            min={13}
            max={80}
            step={1}
            className="flex-1"
          />
          <span className="text-3xl font-display font-semibold text-primary min-w-[3ch]">
            {age}
          </span>
        </div>
      </div>

      {/* Skin Type Section */}
      <div className="space-y-4 animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <label className="block text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Skin Type
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {SKIN_TYPES.map((type) => {
            const Icon = type.icon;
            const isSelected = skinType === type.id;
            return (
              <button
                key={type.id}
                type="button"
                onClick={() => setSkinType(type.id)}
                className={cn(
                  "flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all duration-300",
                  isSelected
                    ? "border-primary bg-primary-light shadow-card"
                    : "border-border bg-card hover:border-primary/30 hover:bg-muted/50"
                )}
              >
                <Icon
                  className={cn(
                    "w-6 h-6 transition-colors",
                    isSelected ? "text-primary" : "text-muted-foreground"
                  )}
                />
                <span
                  className={cn(
                    "font-medium",
                    isSelected ? "text-primary" : "text-foreground"
                  )}
                >
                  {type.label}
                </span>
                <span className="text-xs text-muted-foreground text-center">
                  {type.description}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Concerns Section */}
      <div className="space-y-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
        <label className="block text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Skin Concerns <span className="normal-case opacity-70">(select all that apply)</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {CONCERNS.map((concern) => {
            const isSelected = concerns.includes(concern.id);
            return (
              <button
                key={concern.id}
                type="button"
                onClick={() => toggleConcern(concern.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300",
                  isSelected
                    ? "border-primary bg-primary text-primary-foreground shadow-soft"
                    : "border-border bg-card hover:border-primary/30 text-foreground"
                )}
              >
                <span>{concern.emoji}</span>
                <span className="text-sm font-medium">{concern.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Options */}
      <div className="space-y-3 animate-fade-in" style={{ animationDelay: "0.3s" }}>
        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={useWeather}
            onChange={(e) => setUseWeather(e.target.checked)}
            className="w-5 h-5 rounded border-border text-primary focus:ring-primary/30"
          />
          <span className="text-sm group-hover:text-primary transition-colors">
            🌤️ Include weather-based recommendations (uses your location)
          </span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={useLlm}
            onChange={(e) => setUseLlm(e.target.checked)}
            className="w-5 h-5 rounded border-border text-primary focus:ring-primary/30"
          />
          <span className="text-sm group-hover:text-primary transition-colors">
            ✨ Use AI for personalized advice
          </span>
        </label>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="hero"
        className="w-full"
        disabled={!skinType || isLoading}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            Analyzing...
          </span>
        ) : (
          "Get My Routine"
        )}
      </Button>
    </form>
  );
}
