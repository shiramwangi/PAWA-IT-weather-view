
import React from "react";
import { Wind } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface WindStatusProps {
  speed: number;
  degrees: number;
}

const WindStatus: React.FC<WindStatusProps> = ({ speed, degrees }) => {
  // Convert wind direction degrees to compass direction
  const getWindDirection = (deg: number): string => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    return directions[Math.round(deg / 45) % 8];
  };

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Wind className="h-5 w-5 text-blue-500 mr-2" />
          Wind Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold">{speed} <span className="text-sm font-normal text-gray-500">m/s</span></p>
            <p className="text-gray-500">Wind Speed</p>
          </div>
          <div>
            <div className="rounded-full bg-blue-100 p-3 flex items-center justify-center w-12 h-12">
              <span className="text-blue-800 font-medium">{getWindDirection(degrees)}</span>
            </div>
            <p className="text-gray-500 text-center mt-1">Direction</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WindStatus;
