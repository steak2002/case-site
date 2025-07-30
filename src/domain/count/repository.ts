import { supabaseServer } from "@/domain/shared/supabaseServer";
import { CounterEntity } from "@/inter-env/count/types";
import { CounterData } from "./types";

export class CountRepository {
    private readonly tableName = 'count';

    // Private constructor for singleton pattern
    private static instance: CountRepository;

    // Private constructor to prevent direct construction calls
    private constructor() { }

    // Public method to get the instance
    public static getInstance(): CountRepository {
        if (!CountRepository.instance) {
            CountRepository.instance = new CountRepository();
        }

        return CountRepository.instance;
    }

    async getCount(): Promise<CounterEntity | null> {
        const { data, error } = await supabaseServer
            .from(this.tableName)
            .select('*')
            .order('created_at', { ascending: true })
            .limit(1)
            .single();

        if (error || !data) {
            return null;
        }

        return data as CounterEntity;
    }

    async createCount(data: CounterData): Promise<CounterEntity> {
        const { data: counter, error } = await supabaseServer
            .from(this.tableName)
            .insert([{
                count: data.count || 0
            }])
            .select()
            .single();

        if (error || !counter) {
            throw new Error(`Failed to create counter: ${error?.message}`);
        }

        return counter as CounterEntity;
    }

    async updateCount(data: Partial<CounterData>): Promise<CounterEntity> {
        // Get the first counter
        const counter = await this.getCount();

        if (!counter) {
            throw new Error("No counter found to update");
        }

        // Update using its ID
        const { data: updated, error } = await supabaseServer
            .from(this.tableName)
            .update(data)
            .eq('id', counter.id)
            .select()
            .single();

        if (error || !updated) {
            throw new Error(`Failed to update counter: ${error?.message}`);
        }

        return updated as CounterEntity;
    }
}