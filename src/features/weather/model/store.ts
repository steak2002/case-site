import { create } from "zustand";
import { ConditionEntity, LocationEntity, TemperatureEntity, WeatherDayEntity } from "@/shared/contracts/weather/types";
import { GetConditionResponse, GetTemperatureResponse } from "@/shared/contracts/weather/contract";

interface WeatherStoreState {
    isLoading: boolean;
    location: LocationEntity | null;
    temperature: TemperatureEntity | null;
    condition: ConditionEntity | null;
    forecast: WeatherDayEntity[] | null;
}

interface WeatherStoreActions {
    setIsLoading: (isLoading: boolean) => void;
    setLocation: (location: LocationEntity) => void;
    updateTemperature: () => Promise<void>;
    updateCondition: () => Promise<void>;
    updateForecast: () => Promise<void>;
}

export const useWeatherStore = create<WeatherStoreState & WeatherStoreActions>((set, get) => ({
    isLoading: false,
    location: { cityName: "Odense" },
    temperature: null,
    condition: null,
    forecast: null,
    setIsLoading: (isLoading): void => {
        console.log("[STORE] Setting loading state to:", isLoading);
        set({ isLoading });
    },
    setLocation: (location): void => {
        console.log("[STORE] Setting location to:", location);
        set({ location });
    },

    updateTemperature: async () => {
        console.log("[STORE] Fetching temperature for location:", get().location);
        set({ isLoading: true });

        const state = get();
        if (!state.location) {
            throw new Error("No location selected");
        }

        const response = await fetch(`/api/weather/temperature?city=${state.location.cityName}`);
        const data = await response.json() as GetTemperatureResponse;

        if (!data.success || !data.payload) {
            throw new Error(data.error || "Failed to fetch temperature");
        }
        console.log("[STORE] Temperature fetched successfully:", data.payload);
        set({ temperature: data.payload });
    },
    updateCondition: async () => {
        console.log("[STORE] Fetching condition for location:", get().location);
        set({ isLoading: true });

        const state = get();
        if (!state.location) {
            throw new Error("No location selected");
        }

        const response = await fetch(`/api/weather/condition?city=${state.location.cityName}`);
        const data = await response.json() as GetConditionResponse;

        if (!data.success || !data.payload) {
            throw new Error(data.error || "Failed to fetch condition");
        }
        console.log("[STORE] Condition fetched successfully:", data.payload);
        set({ condition: data.payload });
    },
    updateForecast: async () => {
        console.log("[STORE] Fetching forecast for location:", get().location);
        set({ isLoading: true });

        const state = get();
        if (!state.location) {
            throw new Error("No location selected");
        }

        const response = await fetch(`/api/weather/forecast?city=${state.location.cityName}`);
        const data = await response.json();

        if (!data.success || !data.payload) {
            throw new Error(data.error || "Failed to fetch forecast");
        }
        console.log("[STORE] Forecast fetched successfully:", data.payload);
        set({ forecast: data.payload });
    },
}));
