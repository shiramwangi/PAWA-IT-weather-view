
import { WeatherData } from "../types/weather";

const API_KEY = "4d8fb5b93d4af21d66a2948710284366"; // OpenWeatherMap free API key

export async function getWeatherByCity(city: string): Promise<WeatherData> {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error("City not found or server error");
    }
    
    const data = await response.json();
    
    // Transform the API response to match our WeatherData interface
    return {
      city: data.name,
      temperature: Math.round(data.main.temp * 10) / 10, // Round to 1 decimal place
      description: data.weather[0].description,
      humidity: data.main.humidity,
      icon: data.weather[0].icon
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Failed to fetch weather data");
  }
}
