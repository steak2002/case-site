"use client";

import { TemperatureEntity } from "@/shared/contracts/weather/types";
import { ChakraProps, Flex, Text } from "@chakra-ui/react";
import React from "react";

export interface TemperatureProps {
    temperature: TemperatureEntity;
    fontSize?: ChakraProps["fontSize"];
}

export const Temperature: React.FC<TemperatureProps> = ({
    temperature = { celsiusValue: 23 },
    fontSize = "4xl"
}) => {
    // Calculate degree symbol size based on main fontSize
    const symbolSize = fontSize === "4xl" ? "xl" :
        fontSize === "3xl" ? "lg" :
            fontSize === "2xl" ? "md" :
                fontSize === "xl" ? "sm" : "xs";

    return (
        <Flex alignItems="flex-start">
            <Text fontSize={fontSize}>{temperature.celsiusValue}</Text>
            <Text fontSize={fontSize}>°</Text>
        </Flex>
    );
};
