import { IdeaEntity } from "./types";

export interface IdeaServiceContract {
    getIdeas: () => Promise<IdeaEntity[]>;
    createIdea: (idea: Omit<IdeaEntity, 'id' | 'created_at'>) => Promise<IdeaEntity>;
    removeIdea: (id: string) => Promise<void>;
}


export interface ApiResponse<T> {
    success: boolean;
    data: T;
    error?: string;
}

export interface CreateIdeaParams {
    title: string;
    description: string;
    image?: File | null;
}

export interface IdeaApiContract {
    getIdeas: () => Promise<IdeaEntity[]>;
    createIdea: (idea: CreateIdeaParams) => Promise<IdeaEntity>;
    removeIdea: (id: string) => Promise<void>;
}

export type GetIdeasResponse = ApiResponse<IdeaEntity[]>;
export type CreateIdeaResponse = ApiResponse<IdeaEntity>;
export type DeleteIdeaResponse = Omit<ApiResponse<any>, 'data'> & { data?: never };
