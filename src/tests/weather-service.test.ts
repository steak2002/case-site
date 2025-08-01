import { describe, it, expect } from "vitest";
import { WeatherService } from "@/domain/weather/service";
import { LocationEntity } from "@/shared/contracts/weather/types";


describe('WeatherService', () => {
    // Your tests go here
    describe('getCurrentTemperature', () => {
        it('should return the current weather for the location', () => {

            const weatherService = WeatherService.getInstance();
            const location: LocationEntity = { cityName: "Odense" }; // Example location
            return weatherService.getTemperature(location).then((temperature) => {
                expect(temperature).toBeDefined();
                expect(temperature.celsiusValue).toBeTypeOf('number');
            });

        });
    });
});
