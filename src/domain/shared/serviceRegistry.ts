import { WeatherService } from "../weather"


export const serviceRegistry = {
    weatherService: WeatherService.getInstance()
};