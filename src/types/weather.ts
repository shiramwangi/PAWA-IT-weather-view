
export interface WeatherData {
  city: string;
  temperature: number;
  description: string;
  humidity: number;
  icon: string;
  date: string;
  windSpeed: number;
  windDeg: number;
}

export interface ForecastData {
  date: string;
  temperature: number;
  description: string;
  icon: string;
}

export interface WeatherError {
  message: string;
}

export type TemperatureUnit = "celsius" | "fahrenheit";
