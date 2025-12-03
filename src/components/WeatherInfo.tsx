import { cn } from "@/lib/utils";
import { Thermometer, Droplets, Sun, Wind } from "lucide-react";

interface WeatherInfoProps {
  data: {
    temp?: number;
    humidity?: number;
    uvi?: number;
    us_aqi?: number;
  };
  advice: string[];
  className?: string;
}

export function WeatherInfo({ data, advice, className }: WeatherInfoProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {/* Weather Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {data.temp !== undefined && data.temp !== null && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-card border border-border">
            <Thermometer className="w-5 h-5 text-orange-500" />
            <div>
              <p className="text-xs text-muted-foreground">Temp</p>
              <p className="font-semibold">{data.temp}°C</p>
            </div>
          </div>
        )}
        {data.humidity !== undefined && data.humidity !== null && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-card border border-border">
            <Droplets className="w-5 h-5 text-blue-500" />
            <div>
              <p className="text-xs text-muted-foreground">Humidity</p>
              <p className="font-semibold">{data.humidity}%</p>
            </div>
          </div>
        )}
        {data.uvi !== undefined && data.uvi !== null && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-card border border-border">
            <Sun className="w-5 h-5 text-yellow-500" />
            <div>
              <p className="text-xs text-muted-foreground">UV Index</p>
              <p className="font-semibold">{data.uvi}</p>
            </div>
          </div>
        )}
        {data.us_aqi !== undefined && data.us_aqi !== null && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-card border border-border">
            <Wind className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-xs text-muted-foreground">Air Quality</p>
              <p className="font-semibold">{data.us_aqi}</p>
            </div>
          </div>
        )}
      </div>

      {/* Advice */}
      {advice && advice.length > 0 && (
        <div className="p-4 rounded-xl bg-accent/50 border border-accent-foreground/10">
          <h4 className="font-medium text-accent-foreground mb-2">Weather Tips</h4>
          <ul className="space-y-2">
            {advice.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-accent-foreground/80">
                <span className="text-primary">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
