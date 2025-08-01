import { ConditionEntity, LocationEntity, TemperatureEntity, WeatherDayEntity } from "@/shared/contracts/weather/types";
import axios from "axios";
import * as cheerio from "cheerio";

export interface WeatherRepositoryContract {
    scrapeCurrentTemperature(location: LocationEntity): Promise<TemperatureEntity>;
    scrapeCurrentCondition(location: LocationEntity): Promise<ConditionEntity>;
    scrapeNextWeekWeather(location: LocationEntity): Promise<WeatherDayEntity[]>;
}

export class WeatherRepository implements WeatherRepositoryContract {

    private readonly baseUrl: string = "https://www.flotvejr.dk/";

    private static instance: WeatherRepository;

    private constructor() { }



    public static getInstance(): WeatherRepository {
        if (!this.instance) {
            this.instance = new WeatherRepository();
        }
        return this.instance;
    }

    async scrapeCurrentTemperature(location: LocationEntity): Promise<TemperatureEntity> {
        const url = `${this.baseUrl}${location.cityName.toLowerCase()}`;

        console.log("[REPOSITORY] Fetching temperature from URL:", url);

        //Fetch the HTML content of the page
        const response = await axios.get(url);
        const html = response.data;

        //Load the HTML into Cheerio
        const $ = cheerio.load(html);

        //Target the first forecast_max_temp element
        const temperatureElement = $(".forecast_max_temp").first();
        const temperatureText = temperatureElement.text().trim();

        console.log("[REPOSITORY] Temperature text found:", temperatureText);

        //remove the degree symbol and convert to number
        const temperatureValue = parseFloat(temperatureText.replace("°", "").replace(",", "."));

        console.log("[REPOSITORY] Parsed temperature value:", temperatureValue);

        return Promise.resolve({ celsiusValue: temperatureValue } as TemperatureEntity);
    }

    async scrapeCurrentCondition(location: LocationEntity): Promise<ConditionEntity> {
        try {
            const url = `${this.baseUrl}${location.cityName.toLowerCase()}`;
            console.log("[REPOSITORY] Fetching condition from URL:", url);

            // Fetch HTML and parse with Cheerio
            const response = await axios.get(url);
            const $ = cheerio.load(response.data);

            // Find weather condition image
            const imgElement = $(".forecast_day_symbol img").first();
            const imgSrc = imgElement.attr("src");

            if (!imgSrc) {
                throw new Error("Weather condition image not found");
            }

            // Extract condition code from image path (e.g. "01d.png" → "01")
            const conditionMatch = imgSrc.match(/\/(\d{2})[dn]\.png$/);
            if (!conditionMatch || !conditionMatch[1]) {
                throw new Error("Could not parse condition code from image");
            }

            const conditionNumber = parseInt(conditionMatch[1], 10);
            console.log(`[REPOSITORY] Found condition code: ${conditionNumber}`);

            // Map condition code to weather condition
            const condition = this.mapConditionCodeToEntity(conditionNumber);

            console.log(`[REPOSITORY] Mapped to condition: ${condition.condition}`);
            return condition;
        } catch (error) {
            console.error("[REPOSITORY] Error fetching condition:", error);
            // Fallback to a default condition
            return { condition: "Broken clouds" };
        }
    }

    /**
     * Maps numeric condition codes from flotvejr.dk to our condition entities
     */
    private mapConditionCodeToEntity(code: number): ConditionEntity {
        const conditionMap: Record<number, ConditionEntity["condition"]> = {
            1: "Clear",
            2: "Broken clouds",
            3: "Thunderstorm",
            4: "Few clouds",
            5: "Few clouds",
            6: "Broken clouds",
            7: "Scattered clouds",
            8: "Mist",
            9: "Shower rain",
            10: "Rain"
        };

        const condition = conditionMap[code];
        if (!condition) {
            console.warn(`[REPOSITORY] Unknown condition code: ${code}`);
            throw new Error("Unknown condition code");
        }

        return { condition } as ConditionEntity;
    }


    async scrapeNextWeekWeather(location: LocationEntity): Promise<WeatherDayEntity[]> {

        // return a random week of weather data
        const daysOfWeek: WeatherDayEntity[] = [];
        const conditions: ConditionEntity[] = [
            { condition: "Clear" },
            { condition: "Rain" },
            { condition: "Snow" },
            { condition: "Shower rain" },
            { condition: "Thunderstorm" },
            { condition: "Few clouds" },
            { condition: "Broken clouds" },
            { condition: "Scattered clouds" },
            { condition: "Mist" }
        ];
        for (let i = 0; i < 7; i++) {
            const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
            const randomTemperature = Math.floor(Math.random() * 61) - 30;
            daysOfWeek.push({
                date: new Date(Date.now() + i * 24 * 60 * 60 * 1000),
                temperatureMin: { celsiusValue: randomTemperature },
                temperatureMax: { celsiusValue: randomTemperature + 10 }, // Example logic for max temperature
                condition: randomCondition,
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"][i]
            } as WeatherDayEntity);
        }
        return Promise.resolve(daysOfWeek);
    }

    // Define methods for interacting with the weather data
    // For example, fetching current temperature, etc.
}