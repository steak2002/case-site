import { IdeaEntity } from "@/shared/contracts/idea/types";
import { create } from "zustand";

export interface IdeaStoreState {
    ideas: IdeaEntity[];
    loading: boolean;
    error: string | null;
}

export interface IdeaStoreActions {
    fetchIdeas: () => Promise<void>;
    createIdea: (idea: Omit<IdeaEntity, 'id' | 'created_at'>) => Promise<void>;
    removeIdea: (id: string) => Promise<void>;
}

//this works
//export const useCounterStore = create<CounterStoreState & CounterStoreActions>((set, get) => ({

//this does not work
export const useIdeaStore = create<IdeaStoreState & IdeaStoreActions>((set, get) => ({
    ideas: [],
    loading: false,
    error: null,

    fetchIdeas: async () => {
        set({ loading: true, error: null });
        try {
            const response = await fetch('/api/idea');
            const result = await response.json();

            if (response.ok && result.success) {
                set({ ideas: result.data, loading: false });
            } else {
                throw new Error(result.error || 'Failed to fetch ideas');
            }
        } catch (error) {
            set({ error: (error as Error).message, loading: false });
        }


    },
    createIdea: async (idea: Omit<IdeaEntity, 'id' | 'created_at'>) => {
        set({ loading: true, error: null });
        try {
            const response = await fetch('/api/idea', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(idea)
            });
            const result = await response.json();

            if (response.ok && result.success) {
                set(state => ({
                    ideas: [result.data, ...state.ideas],
                    loading: false
                }));
            } else {
                throw new Error(result.error || 'Failed to create idea');
            }
        } catch (error) {
            set({ error: (error as Error).message, loading: false });
        }
    },
    removeIdea: async (id: string) => {
        set({ loading: true, error: null });
        try {
            const response = await fetch(`/api/idea/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                set(state => ({
                    ideas: state.ideas.filter(idea => idea.id !== id),
                    loading: false
                }));
            } else {
                const result = await response.json();
                throw new Error(result.error || 'Failed to delete idea');
            }
        } catch (error) {
            set({ error: (error as Error).message, loading: false });
        }
    }
}));


