import { WeatherServiceContract } from "@/shared/contracts/weather/contract";
import { ConditionEntity, LocationEntity, TemperatureEntity, WeatherDayEntity } from "@/shared/contracts/weather/types";
import { WeatherRepository } from "./repository";


export class WeatherService implements WeatherServiceContract {
    private static instance: WeatherService;
    private repository: WeatherRepository;
    constructor() {
        this.repository = WeatherRepository.getInstance();
    }


    public static getInstance(): WeatherService {
        if (!this.instance) {
            this.instance = new WeatherService();
        }
        return this.instance;
    }

    getTemperature(location: LocationEntity): Promise<TemperatureEntity> {
        return this.repository.scrapeCurrentTemperature(location);
    }

    getCondition(location: LocationEntity): Promise<ConditionEntity> {
        return this.repository.scrapeCurrentCondition(location);
    }
    getForecast(location: LocationEntity): Promise<WeatherDayEntity[]> {
        return this.repository.scrapeNextWeekWeather(location);
    }

}
