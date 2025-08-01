'use client'

import { Location } from "@/features/weather/ui/components/Location";
import {
  VStack,
  Flex,
  useColorMode,
} from "@chakra-ui/react";
import { ColorModeToggle } from "./layout";
import { CurrentWeather } from "@/features/weather/ui/components/CurrentWeather";
import ForecastTabBar from "@/features/weather/ui/components/ForecastTabBar";
import { WeatherDescription } from "@/features/weather/ui/components/WeatherDescription";
import { useState } from "react";
import { Forecast } from "@/features/weather/ui/components/Forecast";
import { WeatherView } from "@/features/weather/ui/views/WeatherView";

export default function Home() {
  return <WeatherView />;
  // return (
}
