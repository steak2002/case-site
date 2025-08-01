import { ConditionEntity } from "@/shared/contracts/weather/types";
import { Image, useColorMode, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

export interface ConditionIconProps {
    condition: ConditionEntity
}

export const ConditionIcon: React.FC<ConditionIconProps> = ({ condition }) => {
    const { colorMode } = useColorMode();
    const [iconPath, setIconPath] = useState(`/weather-icons/${colorMode}/Clear.svg`);

    // Update icon path when color mode changes
    useEffect(() => {
        setIconPath(`/weather-icons/${colorMode}/${condition.condition}.svg`);
    }, [colorMode, condition]); // Watch both colorMode and condition changes

    return (

        <Image
            src={iconPath}
            width="100%"
            height="auto"
            objectFit="contain"
            alt="Weather icon"
        />

    );
};