import { CountService } from '@/domain/count';

export const serviceRegistry = {
    countService: CountService.getInstance(),
};