import { IdeaEntity } from "@/shared/contracts/idea/types";
import { supabaseServer } from "../shared/supabaseServer";
import { CreateIdeaParams } from "@/shared/contracts/idea/contracts";

export class IdeaRepository {
    private readonly tableName = 'ideas';
    private readonly imageBucketName = 'idea-images';
    private static instance: IdeaRepository;

    private constructor() { }

    public static getInstance(): IdeaRepository {
        if (!IdeaRepository.instance) {
            IdeaRepository.instance = new IdeaRepository();
        }
        return IdeaRepository.instance;
    }

    async getIdeas(): Promise<IdeaEntity[]> {
        const { data, error } = await supabaseServer
            .from(this.tableName)
            .select('*')
            .order('created_at', { ascending: true });

        if (error || !data) {
            throw new Error(`Failed to fetch ideas: ${error?.message}`);
        }

        return data as IdeaEntity[];
    }

    async createIdea(idea: CreateIdeaParams): Promise<IdeaEntity> {

        let imageUrl: string | null = null;
        if (idea.image) {
            // upload image and get the public URL
            const fileName = `${Date.now()}_${idea.image.name}`;
            const { data: imageData, error: uploadError } = await supabaseServer.storage
                .from(this.imageBucketName)
                .upload(fileName, idea.image);

            if (uploadError) {
                throw new Error(`Failed to upload image: ${uploadError.message}`);
            }

            imageUrl = imageData?.path ?? null;
        }

        const { data, error } = await supabaseServer
            .from(this.tableName)
            .insert([{
                title: idea.title,
                description: idea.description,
                image_url: imageUrl,
            }])
            .select()
            .single();

        if (error || !data) {
            throw new Error(`Failed to insert idea: ${error?.message}`);
        }

        return data as IdeaEntity;
    }

    async removeIdea(id: string): Promise<void> {
        const { error } = await supabaseServer
            .from(this.tableName)
            .delete()
            .eq('id', id);

        if (error) {
            throw new Error(`Failed to delete idea: ${error.message}`);
        }
    }
}