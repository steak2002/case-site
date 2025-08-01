import { ColorModeToggle } from "@/app/layout";
import { Flex, Spinner, useColorMode } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { CurrentWeather } from "../components/CurrentWeather";
import ForecastTabBar from "../components/ForecastTabBar";
import { WeatherDescription } from "../components/WeatherDescription";
import { Forecast } from "../components/Forecast";
import { Location } from "../components/Location";
import { useWeatherStore } from "../../model/store";

export const WeatherView = () => {
    const { colorMode } = useColorMode();
    const [activeTab, setActiveTab] = useState<"today" | "next week">("today");

    const { isLoading, location, temperature, condition, forecast, setLocation, updateTemperature, updateCondition, updateForecast } = useWeatherStore();

    const updateWeather = async () => {
        try {
            await updateTemperature();
            await updateCondition();
            await updateForecast();

        } catch (error) {
            console.error("Failed to fetch temperature:", error);
        }
    };

    useEffect(() => {
        updateWeather();
    }, []);

    useEffect(() => {
        if (location) {
            updateWeather();
        }
    }, [location]);

    const handleTabClick = (tab: "today" | "next week") => {
        console.log("Tab clicked:", tab);
        setActiveTab(tab);
    };

    return (
        <Flex
            direction="column"
            align="center"
            height="100%"
            minH="100%"
            bg={colorMode === "light" ? "yellow.400" : "normal"}
        >
            <Flex width={"100%"} p="6">
                <Flex width={"100%"} justifyContent="center">
                    <Location onLocationChange={(cityName) => setLocation({ cityName })} />
                </Flex>
                <ColorModeToggle />
            </Flex>

            {activeTab === "today" ? (
                <Flex
                    flexDir={"column"}
                    width={"100%"}
                    alignItems="center"
                    justifyContent="space-between"
                    flex={1}

                >
                    <CurrentWeather
                        condition={{ condition: condition?.condition || "Clear" }}
                        temperature={{ celsiusValue: temperature?.celsiusValue || 0 }}
                    />

                    <Flex
                        flexDir="column"
                        width={"100%"}
                        p={"6"}
                        bg={colorMode === "light" ? "yellow.500" : "gray.900"}
                        flex={1}
                    >
                        <ForecastTabBar
                            activeTab={activeTab}
                            onTabClick={handleTabClick}
                        />
                        <WeatherDescription temperature={{ celsiusValue: temperature?.celsiusValue || 0 }} />
                    </Flex>
                </Flex>
            ) : (
                <Flex
                    width={"100%"}
                    flexDir="column"
                >
                    <ForecastTabBar
                        activeTab={activeTab}
                        onTabClick={handleTabClick}
                    />
                    <Forecast weatherDays={forecast || []} />
                </Flex>
            )}
        </Flex>
    );
}
