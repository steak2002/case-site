//WeatherDescription.tsx
// Displays a weather description based on temperature
import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import { TemperatureEntity } from "@/shared/contracts/weather/types";
/*
    Temperature    | Message
    -------------- | -----------------------------------------------------------
    < 0 ºC         | Stay inside. It really really isn’t worth it today!
    0 - 10 ºC      | Put on a lot of layers and you might be okay… Might!
    10 - 20 ºC     | Shouldn’t you be outside and do stuff right now?
    + 20 ºC        | It’s gettin’ hot in here… Burn burn burn… and so on
*/

export interface WeatherDescriptionProps {
    temperature: TemperatureEntity;
}

export const WeatherDescription: React.FC<WeatherDescriptionProps> = ({ temperature }) => {
    let message = "";

    if (temperature.celsiusValue < 0) {
        message = "Stay inside. It really really isn’t worth it today!";
    } else if (temperature.celsiusValue >= 0 && temperature.celsiusValue < 10) {
        message = "Put on a lot of layers and you might be okay… Might!";
    } else if (temperature.celsiusValue >= 10 && temperature.celsiusValue < 20) {
        message = "Shouldn’t you be outside and do stuff right now?";
    } else {
        message = "It’s gettin’ hot in here… Burn burn burn… and so on";
    }

    return (
        <Text fontWeight={"bold"} fontSize="6xl">{message}</Text>
    );
};