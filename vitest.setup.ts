import "@testing-library/jest-dom";

import { vi } from 'vitest';

// Define any global mocks here
vi.mock('@/domain/shared/services', () => ({
    services: {
        countService: {
            getCount: vi.fn(),
            createCount: vi.fn(),
            incrementCount: vi.fn()
        }
    }
}));