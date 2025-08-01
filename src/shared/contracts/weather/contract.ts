// MyServiceContract

import { ApiResponse } from "@/shared/lib/apiResponse";
import { ConditionEntity, LocationEntity, TemperatureEntity, WeatherDayEntity } from "./types";

export interface WeatherServiceContract {
    getTemperature(location: LocationEntity): Promise<TemperatureEntity>;
    getCondition(location: LocationEntity): Promise<ConditionEntity>;
    getForecast(location: LocationEntity): Promise<WeatherDayEntity[]>;
}

// MyApiContract

export interface WeatherApiContract {
    getTemperature(location: LocationEntity): Promise<TemperatureEntity>;
    getCondition(location: LocationEntity): Promise<ConditionEntity>;
    getForecast(location: LocationEntity): Promise<WeatherDayEntity[]>;
}

// MyApiResponseTypes

export type GetTemperatureResponse = ApiResponse<TemperatureEntity>;
export type GetConditionResponse = ApiResponse<ConditionEntity>;
export type GetNextWeekWeatherResponse = ApiResponse<WeatherDayEntity[]>;