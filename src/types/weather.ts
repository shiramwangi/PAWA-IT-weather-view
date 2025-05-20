
export interface WeatherData {
  city: string;
  temperature: number;
  description: string;
  humidity: number;
  icon: string;
}

export interface WeatherError {
  message: string;
}

export type TemperatureUnit = "celsius" | "fahrenheit";
