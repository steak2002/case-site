// src/app/api/weather/forecast/route.ts
import { NextRequest, NextResponse } from "next/server";
import { GetForecastResponse } from "@/shared/contracts/weather/contract";
import { LocationEntity } from "@/shared/contracts/weather/types";
import { serviceRegistry } from "@/domain/shared/serviceRegistry";

/**
 * Fetches the weather forecast for the next week for a given city.
 * Example usage:
 * - Fetch forecast for Copenhagen:
 *   GET /api/weather/forecast?city=Copenhagen
 * - Fetch forecast for New York:
 *   GET /api/weather/forecast?city=New%20York
 * @returns {Promise<GetForecastResponse>}:
 *   - success: boolean;
 *   - data: WeatherDayEntity[];
 *   - error?: string;
 */
export async function GET(request: NextRequest): Promise<NextResponse<GetForecastResponse>> {
    let response: GetForecastResponse;
    const cityName = request.nextUrl.searchParams.get("city");
    if (!cityName || cityName.trim() === "" || cityName !== "Odense" && cityName !== "Copenhagen") {
        response = {
            success: false,
            error: "Invalid or missing city parameter. Please provide a valid city name."
        };
        return NextResponse.json(response, { status: 400 });
    }
    const location: LocationEntity = { cityName };
    try {
        const forecast = await serviceRegistry.weatherService.getForecast(location);
        response = {
            success: true,
            payload: forecast,
        };
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        response = {
            success: false,
            error: "An error occurred while fetching the weather forecast"
        };
        return NextResponse.json(response, { status: 500 });
    }
}



/** use as standard:
 * 
 * export async function GET(request: NextRequest): Promise<NextResponse<GetTemperatureResponse>> {
     let response: GetTemperatureResponse;
 
     const cityName = request.nextUrl.searchParams.get("city");
 
     if (!cityName || cityName.trim() === "" || cityName !== "Odense" && cityName !== "Copenhagen") {
 
         response = {
             success: false,
             error: "Invalid or missing city parameter. Please provide a valid city name."
         };
         return NextResponse.json(response, { status: 400 });
     }
 
     const location: LocationEntity = { cityName };
 
     try {
         const temperature = await serviceRegistry.weatherService.getTemperature(location);
         response = {
             success: true,
             payload: temperature,
         };
         return NextResponse.json(response, { status: 200 });
     } catch (error) {
         response = {
             success: false,
             error: "An error occurred while fetching the temperature"
         };
         return NextResponse.json(response, { status: 500 });
     }
 }
 */
