
import React from "react";
import { WeatherData, TemperatureUnit } from "../types/weather";
import { Thermometer } from "lucide-react";
import { convertTemperature } from "../services/weatherService";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface WeatherCardProps {
  weatherData: WeatherData;
  unit: TemperatureUnit;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData, unit }) => {
  const { temperature, description, humidity, icon } = weatherData;

  // Convert temperature if needed
  const displayTemp = convertTemperature(temperature, unit);

  // Capitalize the first letter of each word in description
  const formattedDescription = description
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Get the correct temperature unit symbol
  const tempUnitSymbol = unit === "celsius" ? "°C" : "°F";

  return (
    <Card className="overflow-hidden shadow-lg max-w-md w-full">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-400 p-6 text-white">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold">Today's Weather</h2>
          <div className="bg-white bg-opacity-30 rounded-full p-2">
            <img 
              src={`https://openweathermap.org/img/wn/${icon}@2x.png`} 
              alt={description} 
              className="w-14 h-14"
            />
          </div>
        </div>
        <p className="text-lg opacity-90">{formattedDescription}</p>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Thermometer className="h-6 w-6 text-red-500 mr-2" />
            <span className="text-gray-700">Temperature</span>
          </div>
          <span className="text-2xl font-bold">{displayTemp}{tempUnitSymbol}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500 mr-2">
              <path d="M12 2v6"></path>
              <path d="M12 22v-6"></path>
              <path d="M4.93 4.93l4.24 4.24"></path>
              <path d="M14.83 14.83l4.24 4.24"></path>
              <path d="M2 12h6"></path>
              <path d="M22 12h-6"></path>
              <path d="M4.93 19.07l4.24-4.24"></path>
              <path d="M14.83 9.17l4.24-4.24"></path>
            </svg>
            <span className="text-gray-700">Humidity</span>
          </div>
          <span className="text-xl font-semibold">{humidity}%</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
