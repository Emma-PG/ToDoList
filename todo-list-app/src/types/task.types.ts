/**
 * Task Types
 * Define las interfaces para tareas, categorías y el tablero de tareas
 */

export interface Task {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
    categoryId: string;
    createdAt: string;
    updatedAt: string;
}

export interface Category {
    id: string;
    name: string;
    color: string;
    order: number;
}

export interface TaskBoard {
    id: string;
    planId: string;
    categories: Category[];
    tasks: Task[];
    createdAt: string;
}
