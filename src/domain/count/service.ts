import { CounterEntity } from "@/inter-env/count/types";
import { CounterData } from "./types";
import { CountRepository } from "./repository";
import { CounterServiceContract } from "@/inter-env";

export class CountService implements CounterServiceContract {
    private repository: CountRepository;

    // Private constructor for singleton pattern
    private static instance: CountService;

    // Private constructor to prevent direct construction calls
    private constructor() {
        this.repository = CountRepository.getInstance();
    }

    // Public method to get the instance
    public static getInstance(): CountService {
        if (!CountService.instance) {
            CountService.instance = new CountService();
        }

        return CountService.instance;
    }

    async getCount(): Promise<CounterEntity | null> {
        return this.repository.getCount();
    }

    async createCount(data: CounterData): Promise<CounterEntity> {
        return this.repository.createCount(data);
    }

    async incrementCount(incrementBy = 1): Promise<CounterEntity> {
        // Get the count, which will create one if needed
        const counter = await this.getCount();

        if (!counter) {
            throw new Error("Failed to get or create counter");
        }

        const newCount = counter.count + incrementBy;
        return this.repository.updateCount({ count: newCount });
    }
}