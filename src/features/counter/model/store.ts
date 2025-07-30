import { create } from "zustand";
import { CounterEntity } from "@/inter-env/count/types";
import { GetCounterResponse, IncrementCounterResponse } from "@/inter-env/count/contract";


export interface CounterStoreState {
    counter: CounterEntity | null;
    loading: boolean;
    error: string | null;
}

export interface CounterStoreActions {
    initialize: () => Promise<void>;
    increment: () => Promise<void>;
}

export const useCounterStore = create<CounterStoreState & CounterStoreActions>((set, get) => ({
    counter: null,
    loading: false,
    error: null,

    initialize: async () => {
        set({ loading: true, error: null });
        try {
            const response = await fetch('/api/counter');
            const result = await response.json() as GetCounterResponse;

            if (response.ok && result.success) {
                set({ counter: result.data, loading: false });
            } else {
                throw new Error(result.error || 'Failed to fetch counter');
            }
        } catch (error) {
            set({ error: (error as Error).message, loading: false });
        }
    },

    increment: async () => {
        set({ loading: true, error: null });
        try {
            const response = await fetch('/api/counter', {
                method: 'POST',
            });



            const result = await response.json() as IncrementCounterResponse;

            if (response.ok && result.success) {
                set({ counter: result.data, loading: false });
            } else {
                throw new Error(result.error || 'Failed to increment counter');
            }
        } catch (error) {
            set({ error: (error as Error).message, loading: false });
        }
    }
}));