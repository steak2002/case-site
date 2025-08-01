"use client";

import { Button } from "@chakra-ui/react";
import React, { useState } from "react";


export interface LocationProps {
    onLocationChange: (cityName: "Copenhagen" | "Odense") => void;
}

export const Location: React.FC<LocationProps> = ({ onLocationChange }) => {
    const [locationName, setLocationName] = useState<"Copenhagen" | "Odense">("Odense");

    const handleLocationClick = () => {
        const newLocation = locationName === "Copenhagen" ? "Odense" : "Copenhagen";
        setLocationName(newLocation);
        onLocationChange?.(newLocation); // Call the callback if provided
    };

    return (
        <Button
            onClick={handleLocationClick}
            variant={"ghost"}
        >
            {locationName}
        </Button>
    );
};
