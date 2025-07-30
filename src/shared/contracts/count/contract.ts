import { CounterEntity } from "./types";

/**
 * Base response interface for all API responses
 */
export interface ApiResponse<T> {
    success: boolean;
    data: T;
    error?: string;
}

/**
 * Counter Service Contract
 * Defines the interface that any counter service must implement
 */
export interface CounterServiceContract {

    getCount(): Promise<CounterEntity | null>;
    incrementCount(incrementBy?: number): Promise<CounterEntity>;
}
export interface CounterApiContract {
    /**
     * GET /api/counter
     * Get the current counter
     */
    getCounter(): Promise<ApiResponse<CounterEntity>>;

    /**
     * POST /api/counter
     * Increment the counter
     */
    incrementCounter(): Promise<ApiResponse<CounterEntity>>;
}

// Type aliases for specific API responses
export type GetCounterResponse = ApiResponse<CounterEntity>;
export type IncrementCounterResponse = ApiResponse<CounterEntity>;
