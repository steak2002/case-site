import { CreateIdeaParams, IdeaServiceContract } from "@/shared/contracts/idea/contracts";
import { IdeaEntity } from "@/shared/contracts/idea/types";
import { IdeaRepository } from "./repository";

export class IdeaService implements IdeaServiceContract {
    private static instance: IdeaService;
    private repository = IdeaRepository.getInstance();

    constructor() { }

    public static getInstance(): IdeaService {
        if (!IdeaService.instance) {
            IdeaService.instance = new IdeaService();
        }
        return IdeaService.instance;
    }

    async getIdeas(): Promise<IdeaEntity[]> {
        return await this.repository.getIdeas();
    }

    async createIdea(idea: CreateIdeaParams): Promise<IdeaEntity> {
        return await this.repository.createIdea(idea);
    }
    async removeIdea(id: string): Promise<void> {
        return await this.repository.removeIdea(id);
    }
} 