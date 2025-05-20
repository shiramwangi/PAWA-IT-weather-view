
import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import TemperatureToggle from "../components/TemperatureToggle";
import LocationDate from "../components/LocationDate";
import WindStatus from "../components/WindStatus";
import ForecastList from "../components/ForecastList";
import { WeatherData, TemperatureUnit, ForecastData } from "../types/weather";
import { getWeatherByCity } from "../services/weatherService";

const Index: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [unit, setUnit] = useState<TemperatureUnit>("celsius");

  const handleSearch = async (city: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await getWeatherByCity(city);
      setWeatherData(data.current);
      setForecastData(data.forecast);
    } catch (err) {
      console.error("Error fetching weather data:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch weather data");
      setWeatherData(null);
      setForecastData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleUnitToggle = (newUnit: TemperatureUnit) => {
    setUnit(newUnit);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-blue-800 mb-2">Weather Forecast</h1>
          <p className="text-gray-600">Get real-time weather information for any city</p>
        </header>

        <SearchBar onSearch={handleSearch} />

        {weatherData && (
          <TemperatureToggle unit={unit} onToggle={handleUnitToggle} />
        )}

        <div className="mt-10">
          {loading ? (
            <div className="flex justify-center">
              <LoadingSpinner />
            </div>
          ) : error ? (
            <div className="flex justify-center">
              <ErrorMessage message={error} />
            </div>
          ) : weatherData ? (
            <div className="max-w-4xl mx-auto">
              <LocationDate city={weatherData.city} date={weatherData.date} />
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <WeatherCard weatherData={weatherData} unit={unit} />
                <WindStatus speed={weatherData.windSpeed} degrees={weatherData.windDeg} />
              </div>
              
              {forecastData.length > 0 && (
                <ForecastList forecastData={forecastData} unit={unit} />
              )}
            </div>
          ) : (
            <div className="text-center text-gray-500 mt-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mx-auto opacity-50"
              >
                <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>
              </svg>
              <p className="mt-4">Search for a city to see the weather forecast</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
