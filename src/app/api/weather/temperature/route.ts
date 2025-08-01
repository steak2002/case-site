import { NextRequest, NextResponse } from "next/server";
import { GetTemperatureResponse } from "@/shared/contracts/weather/contract";
import { LocationEntity } from "@/shared/contracts/weather/types";
import { serviceRegistry } from "@/domain/shared/serviceRegistry";

/*
    * Fetches the current temperature for a given city.
    * Example usage:
    * - Fetch current temperature for Copenhagen:
    *   GET /api/weather/temperature?city=Copenhagen
    * - Fetch current temperature for New York:
    *   GET /api/weather/temperature?city=New%20York
    * @returns {Promise<GetTemperatureResponse>}:
    *   - success: boolean;
    *   - data: TemperatureEntity;
    *   - error?: string;
*/
export async function GET(request: NextRequest): Promise<NextResponse<GetTemperatureResponse>> {
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