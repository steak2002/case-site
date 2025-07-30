import { describe, it, expect, vi, beforeEach } from "vitest";
import { useCounterStore } from "../features/counter/model/store";
import { CounterEntity } from "@/shared/contracts/count/types";

// Mock global fetch
global.fetch = vi.fn();

describe("useCounterStore", () => {
    // Sample counter data for tests
    const mockCounterData: CounterEntity = {
        id: "test-id",
        count: 5,
        created_at: "2023-01-01T00:00:00Z",
        updated_at: "2023-01-01T00:00:00Z"
    };

    // Reset store and mocks before each test
    beforeEach(() => {
        vi.resetAllMocks();
        useCounterStore.setState({
            counter: null,
            loading: false,
            error: null
        });
    });

    it("should initialize and fetch counter", async () => {
        // Setup: mock successful API response
        (fetch as any).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ success: true, data: mockCounterData }) // Add success: true
        });

        // Act: call initialize
        await useCounterStore.getState().initialize();

        // Assert: check state and API call
        expect(fetch).toHaveBeenCalledWith('/api/counter');
        expect(useCounterStore.getState().counter).toEqual(mockCounterData);
        expect(useCounterStore.getState().loading).toBe(false);
        expect(useCounterStore.getState().error).toBe(null);
    });

    it("should handle initialization error", async () => {
        // Setup: mock API error
        (fetch as any).mockResolvedValueOnce({
            ok: false,
            json: async () => ({ success: false, error: "Failed to load counter" }) // Add success: false
        });

        // Act: call initialize
        await useCounterStore.getState().initialize();

        // Assert: check error state
        expect(useCounterStore.getState().error).toBe("Failed to load counter");
        expect(useCounterStore.getState().loading).toBe(false);
        expect(useCounterStore.getState().counter).toBe(null);
    });

    it("should increment counter", async () => {
        // Setup: set initial state with a counter
        const incrementedCounter = { ...mockCounterData, count: 6 };
        useCounterStore.setState({ counter: mockCounterData });

        // Mock successful increment API response
        (fetch as any).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ success: true, data: incrementedCounter }) // Add success: true
        });

        // Act: call increment
        await useCounterStore.getState().increment();

        // Assert: check state and API call
        expect(fetch).toHaveBeenCalledWith('/api/counter', { method: 'POST' });
        expect(useCounterStore.getState().counter).toEqual(incrementedCounter);
        expect(useCounterStore.getState().loading).toBe(false);
    });

    it("should handle increment error", async () => {
        // Setup: set initial state with a counter
        useCounterStore.setState({ counter: mockCounterData });

        // Mock API error
        (fetch as any).mockResolvedValueOnce({
            ok: false,
            json: async () => ({ success: false, error: "Failed to increment counter" }) // Add success: false
        });

        // Act: call increment
        await useCounterStore.getState().increment();

        // Assert: check error state
        expect(useCounterStore.getState().error).toBe("Failed to increment counter");
        expect(useCounterStore.getState().loading).toBe(false);
        // Counter should remain unchanged
        expect(useCounterStore.getState().counter).toEqual(mockCounterData);
    });
});