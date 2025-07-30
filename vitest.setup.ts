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


process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://dqznocjvmvhvsnozthfo.supabase.co';
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRxem5vY2p2bXZodnNub3p0aGZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM2MjU3NzcsImV4cCI6MjA2OTIwMTc3N30.eP76S1OFJDkaB482RQHqeQ9VWQ-U6PJgLz1_Nix7vVg';
