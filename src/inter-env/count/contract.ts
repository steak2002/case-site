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
    /**
     * Get the current counter
     * @returns The current counter entity or null if not found
     */
    getCount(): Promise<CounterEntity | null>;

    /**
     * Increment the counter by the specified amount
     * @param incrementBy Amount to increment (defaults to 1)
     * @returns The updated counter entity
     */
    incrementCount(incrementBy?: number): Promise<CounterEntity>;
}

/**
 * Counter API Contract
 * Defines the HTTP API interface for counter operations
 */
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
