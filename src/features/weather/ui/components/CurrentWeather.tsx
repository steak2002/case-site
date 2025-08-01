//CurrentCondition.tsx
// Dislays weather condition icon and temperature
import React from "react";
import { ConditionIcon } from "./ConditionIcon";
import { Temperature } from "./Temperature";
import { Box, Flex } from "@chakra-ui/react";
import { TemperatureEntity, ConditionEntity } from "@/shared/contracts/weather/types";

export interface CurrentWeatherProps {
    condition: ConditionEntity;
    temperature: TemperatureEntity;
}
export const CurrentWeather: React.FC<CurrentWeatherProps> = ({ condition, temperature }) => {
    return (
        <Flex width={"100%"} alignItems="center" justifyContent="space-between" p={10}>
            <Box boxSize={"100px"}>
                <ConditionIcon condition={condition} />
            </Box>
            <Temperature temperature={temperature} />
        </Flex >
    );
};




