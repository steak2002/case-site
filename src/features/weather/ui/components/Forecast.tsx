/* WeatherWeekList.tsx 

Displays a list of weather forecasts for the week.
as rows with each row containing:
- Weather condition icon
- Max and min temperature, e.g. 10º / -20º
- row background colors vary: light mode uses two shades of yellow, dark mode uses two shades of gray
*/


import React from "react";
import { Flex, Text, VStack, Box } from "@chakra-ui/react";
import { WeatherDayEntity } from "@/shared/contracts/weather/types";
import { ConditionIcon } from "./ConditionIcon";
import { Temperature } from "./Temperature";
import { useColorMode } from "@chakra-ui/react";

export interface ForecastProps {
    weatherDays: WeatherDayEntity[];
}

export const Forecast: React.FC<ForecastProps> = ({ weatherDays }) => {
    const { colorMode } = useColorMode();

    return (
        <VStack width={"100%"} spacing={0}>
            {weatherDays.map((day, index) => (
                <Flex
                    key={index}
                    width={"100%"}
                    alignItems="center"
                    justifyContent="space-between"
                    p={4}
                    bg={
                        colorMode === "light"
                            ? index % 2 === 0 ? "yellow.400" : "yellow.500"
                            : index % 2 === 0 ? "gray.700" : "gray.600"
                    }
                >
                    <Flex alignItems="center" gap={6}>
                        <Box boxSize={"40px"}>
                            <ConditionIcon condition={day.condition} />
                        </Box>
                        <Text fontWeight="bold">{day.dayOfWeek}</Text>
                    </Flex>
                    <Flex gap={4} alignItems="center">
                        <Temperature fontSize={"5xl"} temperature={{ celsiusValue: day.temperatureMax.celsiusValue }} />
                        <Text fontWeight={"medium"} fontSize={"4xl"}>/</Text>
                        <Temperature fontSize={"3xl"} temperature={{ celsiusValue: day.temperatureMin.celsiusValue }} />
                    </Flex>
                </Flex>
            ))}
        </VStack>
    );
};