/**
 * Counter entity as stored in the database
 */
export interface CounterEntity {
    id: string;
    count: number;
    created_at: string;
    updated_at: string;
}