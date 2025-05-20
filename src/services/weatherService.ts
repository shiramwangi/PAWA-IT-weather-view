
import { WeatherData } from "../types/weather";

export async function getWeatherByCity(city: string): Promise<WeatherData> {
  try {
    const response = await fetch(`http://localhost:8000/api/weather?city=${encodeURIComponent(city)}`);
    
    if (!response.ok) {
      throw new Error("City not found or server error");
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Failed to fetch weather data");
  }
}
