
import React from "react";
import { ForecastData, TemperatureUnit } from "../types/weather";
import { convertTemperature } from "../services/weatherService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ForecastListProps {
  forecastData: ForecastData[];
  unit: TemperatureUnit;
}

const ForecastList: React.FC<ForecastListProps> = ({ forecastData, unit }) => {
  // Function to capitalize the first letter of each word in description
  const formatDescription = (description: string) => {
    return description
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Get the correct temperature unit symbol
  const tempUnitSymbol = unit === "celsius" ? "°C" : "°F";
  
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">3-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-4">
          {forecastData.map((day, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 flex flex-col items-center"
            >
              <p className="font-medium text-gray-800">{day.date}</p>
              <img 
                src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                alt={day.description}
                className="w-16 h-16 my-2"
              />
              <p className="font-bold text-xl">
                {convertTemperature(day.temperature, unit)}
                {tempUnitSymbol}
              </p>
              <p className="text-gray-600 text-sm text-center">
                {formatDescription(day.description)}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ForecastList;
