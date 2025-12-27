/**
 * Storage Service
 * Servicio para manejar la persistencia de datos en localStorage
 */

import { Plan } from "@/types/plan.types";
import { TaskBoard } from "@/types/task.types";

const STORAGE_KEYS = {
    PLANS: "todo-app-plans",
    BOARDS: "todo-app-boards",
} as const;

export class StorageService {
    /**
     * Guardar un plan en localStorage
     */
    static savePlan(plan: Plan): void {
        const plans = this.getPlans();
        const existingIndex = plans.findIndex((p) => p.id === plan.id);

        if (existingIndex >= 0) {
            plans[existingIndex] = plan;
        } else {
            plans.push(plan);
        }

        localStorage.setItem(STORAGE_KEYS.PLANS, JSON.stringify(plans));
    }

    /**
     * Obtener todos los planes
     */
    static getPlans(): Plan[] {
        if (typeof window === "undefined") return [];

        const data = localStorage.getItem(STORAGE_KEYS.PLANS);
        return data ? JSON.parse(data) : [];
    }

    /**
     * Obtener un plan por ID
     */
    static getPlanById(id: string): Plan | null {
        const plans = this.getPlans();
        return plans.find((p) => p.id === id) || null;
    }

    /**
     * Eliminar un plan
     */
    static deletePlan(id: string): void {
        const plans = this.getPlans().filter((p) => p.id !== id);
        localStorage.setItem(STORAGE_KEYS.PLANS, JSON.stringify(plans));
    }

    /**
     * Guardar un tablero de tareas
     */
    static saveBoard(board: TaskBoard): void {
        const boards = this.getBoards();
        const existingIndex = boards.findIndex((b) => b.id === board.id);

        if (existingIndex >= 0) {
            boards[existingIndex] = board;
        } else {
            boards.push(board);
        }

        localStorage.setItem(STORAGE_KEYS.BOARDS, JSON.stringify(boards));
    }

    /**
     * Obtener todos los tableros
     */
    static getBoards(): TaskBoard[] {
        if (typeof window === "undefined") return [];

        const data = localStorage.getItem(STORAGE_KEYS.BOARDS);
        return data ? JSON.parse(data) : [];
    }

    /**
     * Obtener un tablero por ID
     */
    static getBoardById(id: string): TaskBoard | null {
        const boards = this.getBoards();
        return boards.find((b) => b.id === id) || null;
    }

    /**
     * Obtener un tablero por ID de plan
     */
    static getBoardByPlanId(planId: string): TaskBoard | null {
        const boards = this.getBoards();
        return boards.find((b) => b.planId === planId) || null;
    }

    /**
     * Eliminar un tablero
     */
    static deleteBoard(id: string): void {
        const boards = this.getBoards().filter((b) => b.id !== id);
        localStorage.setItem(STORAGE_KEYS.BOARDS, JSON.stringify(boards));
    }

    /**
     * Limpiar todo el almacenamiento
     */
    static clearAll(): void {
        localStorage.removeItem(STORAGE_KEYS.PLANS);
        localStorage.removeItem(STORAGE_KEYS.BOARDS);
    }
}
