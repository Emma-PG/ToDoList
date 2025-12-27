/**
 * API Types
 * Define las interfaces para las peticiones y respuestas de la API
 */

import { Category, Task } from "./task.types";

export interface GenerateTasksRequest {
    planText: string;
}

export interface GenerateTasksResponse {
    success: boolean;
    data?: {
        categories: Category[];
        tasks: Task[];
    };
    error?: string;
}
