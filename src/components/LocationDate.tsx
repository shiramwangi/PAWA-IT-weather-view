
import React from "react";
import { MapPin, Calendar } from "lucide-react";

interface LocationDateProps {
  city: string;
  date: string;
}

const LocationDate: React.FC<LocationDateProps> = ({ city, date }) => {
  return (
    <div className="mb-6 text-center">
      <div className="flex items-center justify-center mb-2">
        <MapPin className="h-5 w-5 text-blue-500 mr-2" />
        <h2 className="text-2xl font-semibold">{city}</h2>
      </div>
      <div className="flex items-center justify-center text-gray-600">
        <Calendar className="h-4 w-4 mr-2" />
        <span>{date}</span>
      </div>
    </div>
  );
};

export default LocationDate;
