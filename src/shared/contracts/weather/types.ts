//MyEntityContract

export interface TemperatureEntity {
    celsiusValue: number;
}

export interface LocationEntity {
    cityName: "Odense" | "Copenhagen";
}

export interface ConditionEntity {
    condition: "Clear" | "Rain" | "Snow" | "Shower rain" | "Thunderstorm" | "Few clouds" | "Broken clouds" | "Scattered clouds" | "Mist";
}


export interface WeatherDayEntity {
    date: Date;
    dayOfWeek: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
    temperatureMin: TemperatureEntity;
    temperatureMax: TemperatureEntity;
    condition: ConditionEntity;
}
