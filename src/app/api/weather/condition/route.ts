//api/weather/condition

import { serviceRegistry } from "@/domain/shared/serviceRegistry";
import { GetConditionResponse } from "@/shared/contracts/weather/contract";
import { LocationEntity } from "@/shared/contracts/weather/types";
import { NextRequest, NextResponse } from "next/server";



/**
 * Fetches the current weather condition for a given city.
 * Example usage:
 * - Fetch current weather condition for Copenhagen:
 *   GET /api/weather/condition?city=Copenhagen
 * - Fetch current weather condition for New York:
 *   GET /api/weather/condition?city=New%20York
 * @returns {Promise<GetWeatherConditionResponse>}:
 *   - success: boolean;
 *   - data: ConditionEntity;
 *   - error?: string;
 */

export async function GET(request: NextRequest): Promise<NextResponse<GetConditionResponse>> {
    let response: GetConditionResponse;
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
        const condition = await serviceRegistry.weatherService.getCondition(location);
        response = {
            success: true,
            payload: condition,
        };
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        response = {
            success: false,
            error: "An error occurred while fetching the weather condition"
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
