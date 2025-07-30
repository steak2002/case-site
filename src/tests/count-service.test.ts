import { describe, it, expect, vi, beforeEach } from "vitest";
import { CountService } from "@/domain/count/service";
import { CounterEntity } from "@/inter-env/count/types";

// Create a mock counter for testing
const mockCounter: CounterEntity = {
    id: "123",
    count: 5,
    created_at: "2023-01-01T00:00:00Z",
    updated_at: "2023-01-01T00:00:00Z"
};

// Create a mock repository implementation
const mockRepository = {
    getCount: vi.fn(),
    createCount: vi.fn(),
    updateCount: vi.fn()
};

// Mock the supabaseServer module
vi.mock("../domain/shared/supabaseServer", () => ({
    supabaseServer: {
        from: () => ({
            select: () => ({
                order: () => ({
                    limit: () => ({
                        single: () => ({ data: null, error: null })
                    })
                })
            }),
            insert: () => ({
                select: () => ({
                    single: () => ({ data: null, error: null })
                })
            }),
            update: () => ({
                eq: () => ({
                    select: () => ({
                        single: () => ({ data: null, error: null })
                    })
                })
            })
        })
    }
}));

// Mock the CountRepository module
vi.mock("../domain/count/repository", () => {
    return {
        CountRepository: {
            getInstance: () => mockRepository
        }
    };
});

describe("CountService", () => {
    let service: CountService;

    beforeEach(() => {
        vi.clearAllMocks();

        // Reset the singleton instance to ensure it uses our mocked repository
        // @ts-ignore - accessing private property
        CountService.instance = undefined;

        // Get a new service instance that will use our mock repository
        service = CountService.getInstance();
    });

    describe("getCount", () => {
        it("should return counter from repository", async () => {
            // Setup the mock to return our test counter
            mockRepository.getCount.mockResolvedValue(mockCounter);

            // Call the service method
            const result = await service.getCount();

            // Assert expectations
            expect(mockRepository.getCount).toHaveBeenCalledTimes(1);
            expect(result).toEqual(mockCounter);
        });
    });

    describe("incrementCount", () => {
        it("should increment counter by 1 by default", async () => {
            // Setup the mocks
            const updatedCounter = {
                ...mockCounter,
                count: 6,
                updated_at: "2023-01-02T00:00:00Z"
            };

            mockRepository.getCount.mockResolvedValue(mockCounter);
            mockRepository.updateCount.mockResolvedValue(updatedCounter);

            // Call the service method
            const result = await service.incrementCount();

            // Assert expectations
            expect(mockRepository.getCount).toHaveBeenCalledTimes(1);
            expect(mockRepository.updateCount).toHaveBeenCalledWith({ count: 6 });
            expect(result).toEqual(updatedCounter);
        });

        it("should throw error if counter not found", async () => {
            // Setup the mock to return null
            mockRepository.getCount.mockResolvedValue(null);

            // Assert that calling the method throws the expected error
            await expect(() => service.incrementCount()).rejects.toThrow("Failed to get or create counter");
        });
    });
});