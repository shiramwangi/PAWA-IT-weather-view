
import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { TemperatureUnit } from "../types/weather";
import { ThermometerSun, ThermometerSnowflake } from "lucide-react";

interface TemperatureToggleProps {
  unit: TemperatureUnit;
  onToggle: (unit: TemperatureUnit) => void;
}

const TemperatureToggle: React.FC<TemperatureToggleProps> = ({ 
  unit, 
  onToggle 
}) => {
  return (
    <div className="flex justify-center mb-4">
      <ToggleGroup type="single" value={unit} onValueChange={(value) => {
        if (value) onToggle(value as TemperatureUnit);
      }}>
        <ToggleGroupItem value="celsius" aria-label="Toggle Celsius">
          <ThermometerSun className="mr-1" />
          °C
        </ToggleGroupItem>
        <ToggleGroupItem value="fahrenheit" aria-label="Toggle Fahrenheit">
          <ThermometerSnowflake className="mr-1" />
          °F
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default TemperatureToggle;
