
import { WeatherData, TemperatureUnit, ForecastData } from "../types/weather";

const API_KEY = "4d8fb5b93d4af21d66a2948710284366"; // OpenWeatherMap free API key

export async function getWeatherByCity(city: string): Promise<{
  current: WeatherData;
  forecast: ForecastData[];
}> {
  try {
    // Get current weather
    const currentResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );
    
    if (!currentResponse.ok) {
      throw new Error("City not found or server error");
    }
    
    const currentData = await currentResponse.json();

    // Format date
    const currentDate = new Date();
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long', 
      day: 'numeric'
    }).format(currentDate);
    
    // Transform the current weather API response
    const current: WeatherData = {
      city: currentData.name,
      temperature: Math.round(currentData.main.temp * 10) / 10,
      description: currentData.weather[0].description,
      humidity: currentData.main.humidity,
      icon: currentData.weather[0].icon,
      date: formattedDate,
      windSpeed: currentData.wind.speed,
      windDeg: currentData.wind.deg
    };

    // Get forecast data
    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );
    
    if (!forecastResponse.ok) {
      throw new Error("Failed to fetch forecast data");
    }
    
    const forecastData = await forecastResponse.json();
    
    // Process and filter forecast data to get next 3 days
    const processedForecast: ForecastData[] = [];
    const today = new Date().setHours(0, 0, 0, 0);
    const uniqueDays = new Set<string>();
    
    forecastData.list.forEach((item: any) => {
      const forecastDate = new Date(item.dt * 1000);
      const day = forecastDate.toISOString().split('T')[0];
      
      // Only add if it's a new day and not today, and we have less than 3 days
      if (!uniqueDays.has(day) && forecastDate.setHours(0, 0, 0, 0) > today && uniqueDays.size < 3) {
        uniqueDays.add(day);
        
        const formattedForecastDate = new Intl.DateTimeFormat('en-US', {
          weekday: 'long',
          month: 'short', 
          day: 'numeric'
        }).format(forecastDate);
        
        processedForecast.push({
          date: formattedForecastDate,
          temperature: Math.round(item.main.temp * 10) / 10,
          description: item.weather[0].description,
          icon: item.weather[0].icon
        });
      }
    });

    return {
      current,
      forecast: processedForecast
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Failed to fetch weather data");
  }
}

export function convertTemperature(temp: number, to: TemperatureUnit): number {
  if (to === "fahrenheit") {
    // Convert Celsius to Fahrenheit: (C × 9/5) + 32
    return Math.round((temp * 9/5 + 32) * 10) / 10;
  }
  // Already in Celsius
  return temp;
}
