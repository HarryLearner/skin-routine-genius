import { Button } from "@/components/ui/button";
import { RoutineCard } from "@/components/RoutineCard";
import { ProductCard } from "@/components/ProductCard";
import { WeatherInfo } from "@/components/WeatherInfo";
import { ArrowLeft, Sparkles } from "lucide-react";
import type { RecommendResponse, WeatherRecommendResponse, RoutineStep } from "@/lib/api";

interface ResultsViewProps {
  data: RecommendResponse | WeatherRecommendResponse | null;
  isWeather: boolean;
  onBack: () => void;
}

export function ResultsView({ data, isWeather, onBack }: ResultsViewProps) {
  if (!data) return null;

  const weatherData = isWeather ? (data as WeatherRecommendResponse) : null;
  const regularData = !isWeather ? (data as RecommendResponse) : null;

  // Get routines - handle both formats
  let morningSteps: RoutineStep[] = [];
  let nightSteps: RoutineStep[] = [];
  let summary = "";

  if (regularData) {
    // Check for LLM data first
    if (regularData.llm?.morning_routine) {
      morningSteps = regularData.llm.morning_routine;
      nightSteps = regularData.llm.night_routine || [];
      summary = regularData.llm.summary || regularData.summary;
    } else if (regularData.morning_routine) {
      morningSteps = regularData.morning_routine;
      nightSteps = regularData.night_routine || [];
      summary = regularData.summary;
    } else if (regularData.routine) {
      // Local routine format
      const routine = regularData.routine as unknown as { summary: string; routine: RoutineStep[] };
      summary = routine.summary || regularData.summary;
      const steps = routine.routine || [];
      morningSteps = steps.filter(s => s.when?.includes("morning") || s.when === "both");
      nightSteps = steps.filter(s => s.when?.includes("night") || s.when === "both");
    }
  }

  if (weatherData) {
    summary = weatherData.routine?.summary || "";
    const steps = weatherData.routine?.routine || [];
    morningSteps = steps.filter(s => s.when?.includes("morning") || s.when === "both");
    nightSteps = steps.filter(s => s.when?.includes("night") || s.when === "both");
  }

  const products = regularData?.recommended_products || weatherData?.recommended_products || [];
  const llmNotes = regularData?.llm?.notes;
  const keyIngredients = regularData?.llm?.key_ingredients;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h2 className="font-display text-2xl font-semibold text-foreground">
            Your Personalized Routine
          </h2>
          {summary && (
            <p className="text-muted-foreground mt-1">{summary}</p>
          )}
        </div>
      </div>

      {/* Weather Info */}
      {weatherData && (
        <WeatherInfo
          data={weatherData.weather_data}
          advice={weatherData.advice}
        />
      )}

      {/* Key Ingredients */}
      {keyIngredients && keyIngredients.length > 0 && (
        <div className="p-4 rounded-xl bg-primary-light border border-primary/20">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <h4 className="font-medium text-primary">Key Ingredients for You</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {keyIngredients.map((ing) => (
              <span
                key={ing}
                className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary font-medium"
              >
                {ing}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Routines */}
      <div className="grid md:grid-cols-2 gap-4">
        {morningSteps.length > 0 && (
          <RoutineCard
            title="Morning Routine"
            type="morning"
            steps={morningSteps}
          />
        )}
        {nightSteps.length > 0 && (
          <RoutineCard
            title="Night Routine"
            type="night"
            steps={nightSteps}
          />
        )}
      </div>

      {/* LLM Notes */}
      {llmNotes && (
        <div className="p-4 rounded-xl bg-muted border border-border">
          <h4 className="font-medium text-foreground mb-2">💡 Additional Tips</h4>
          <p className="text-sm text-muted-foreground">{llmNotes}</p>
        </div>
      )}

      {/* Products */}
      {products.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-display text-xl font-semibold text-foreground">
            Recommended Products
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.slice(0, 6).map((product, idx) => (
              <ProductCard
                key={product.id || idx}
                product={product}
                className="animate-slide-up"
                style={{ animationDelay: `${idx * 0.05}s` } as React.CSSProperties}
              />
            ))}
          </div>
        </div>
      )}

      {/* Back Button */}
      <div className="pt-4">
        <Button variant="outline" onClick={onBack} className="w-full sm:w-auto">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Start Over
        </Button>
      </div>
    </div>
  );
}
