// API configuration - update this URL to your backend
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export interface RecommendRequest {
  age: number;
  location?: string;
  skin_type: string;
  concerns: string[];
  use_llm?: boolean;
}

export interface RoutineStep {
  step?: string;
  name?: string;
  duration?: string;
  when?: string;
  minutes?: number;
  notes?: string;
  explanation?: string;
}

export interface Product {
  id: string;
  name: string;
  product_url?: string;
  product_type: string;
  price: string;
  matched_keywords?: string[];
}

export interface RecommendResponse {
  summary: string;
  morning_routine?: RoutineStep[];
  night_routine?: RoutineStep[];
  routine?: RoutineStep[];
  recommended_products: Product[];
  llm?: {
    summary?: string;
    morning_routine?: RoutineStep[];
    night_routine?: RoutineStep[];
    key_ingredients?: string[];
    notes?: string;
  };
}

export interface WeatherRecommendResponse {
  location: string;
  weather_data: {
    temp?: number;
    humidity?: number;
    uvi?: number;
    pm2_5?: number;
    pm10?: number;
    us_aqi?: number;
  };
  advice: string[];
  routine: {
    summary: string;
    routine: RoutineStep[];
  };
  recommended_products: Product[];
  llm_advice?: {
    advice: string[];
    notes: string;
  };
}

export async function getRecommendation(data: RecommendRequest): Promise<RecommendResponse> {
  const response = await fetch(`${API_BASE_URL}/recommend`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}

export async function getWeatherRecommendation(data: RecommendRequest): Promise<WeatherRecommendResponse> {
  const response = await fetch(`${API_BASE_URL}/weather-recommend`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}
