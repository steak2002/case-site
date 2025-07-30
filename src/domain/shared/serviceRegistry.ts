import { CountService } from '@/domain/count';
import { IdeaService } from '../idea';

export const serviceRegistry = {
    countService: CountService.getInstance(),
    ideaService: IdeaService.getInstance()
};