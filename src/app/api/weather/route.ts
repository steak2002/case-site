import { WeatherService } from "@/domain/weather/service";
import { GetTemperatureResponse } from "@/shared/contracts/weather/contract";
import { LocationEntity, TemperatureEntity } from "@/shared/contracts/weather/types";
import { NextRequest, NextResponse } from "next/server";


// GET api/weather
async function GET(request: NextRequest,): Promise<NextResponse<GetTemperatureResponse>> {
    const location: LocationEntity = { cityName: request.nextUrl.searchParams.get("location") || "" } as LocationEntity;
    if (!location.cityName) {
        // return NextResponse.json({
        //     success: false,
        //     data: null,
        //     error: "Location is required"
        // }, { status: 400 });

        //TBD: Handle error response
    }

    const weatherService = WeatherService.getInstance();
    const temperature = await weatherService.getTemperature({ cityName: location.cityName });

    return NextResponse.json({
        success: true,
        data: temperature,
        error: undefined
    }, { status: 200 });
}