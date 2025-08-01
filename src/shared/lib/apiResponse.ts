export interface ApiResponse<T> {
    success: boolean;
    payload?: T;
    error?: string;
}