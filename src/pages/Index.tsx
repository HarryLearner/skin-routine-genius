import { useState } from "react";
import { SkinProfileForm } from "@/components/SkinProfileForm";
import { ResultsView } from "@/components/ResultsView";
import { getRecommendation, getWeatherRecommendation } from "@/lib/api";
import type { RecommendResponse, WeatherRecommendResponse } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Leaf } from "lucide-react";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<RecommendResponse | WeatherRecommendResponse | null>(null);
  const [isWeatherResult, setIsWeatherResult] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (data: {
    age: number;
    skin_type: string;
    concerns: string[];
    use_llm: boolean;
    useWeather: boolean;
  }) => {
    setIsLoading(true);
    
    try {
      if (data.useWeather) {
        // Get user location
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            timeout: 10000,
            enableHighAccuracy: false,
          });
        });
        
        const location = `${position.coords.latitude},${position.coords.longitude}`;
        const response = await getWeatherRecommendation({
          age: data.age,
          skin_type: data.skin_type,
          concerns: data.concerns,
          use_llm: data.use_llm,
          location,
        });
        setResults(response);
        setIsWeatherResult(true);
      } else {
        const response = await getRecommendation({
          age: data.age,
          skin_type: data.skin_type,
          concerns: data.concerns,
          use_llm: data.use_llm,
        });
        setResults(response);
        setIsWeatherResult(false);
      }
    } catch (error) {
      console.error("Error fetching recommendation:", error);
      toast({
        title: "Error",
        description: error instanceof GeolocationPositionError 
          ? "Unable to get your location. Please enable location services or try without weather recommendations."
          : "Failed to get recommendations. Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setResults(null);
    setIsWeatherResult(false);
  };

  return (
    <div className="min-h-screen gradient-hero">
      <div className="container max-w-2xl py-8 px-4">
        {/* Header */}
        <header className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
            <Leaf className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-foreground mb-2">
            Glow Guide
          </h1>
          <p className="text-muted-foreground">
            Your personalized skincare routine, powered by science
          </p>
        </header>

        {/* Main Content */}
        <main className="bg-card/80 backdrop-blur-sm rounded-3xl shadow-elevated p-6 sm:p-8 border border-border/50">
          {results ? (
            <ResultsView
              data={results}
              isWeather={isWeatherResult}
              onBack={handleBack}
            />
          ) : (
            <SkinProfileForm onSubmit={handleSubmit} isLoading={isLoading} />
          )}
        </main>

        {/* Footer */}
        <footer className="text-center mt-8 text-sm text-muted-foreground">
          <p>Results are personalized based on your profile</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
