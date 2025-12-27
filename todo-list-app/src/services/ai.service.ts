/**
 * AI Service
 * Servicio para integración con Google Gemini AI
 * Este archivo define la estructura del servicio pero no implementa la lógica
 * ya que la integración con Gemini se hará en el API route
 */

import { Category, Task } from "@/types/task.types";

export interface AIGeneratedPlan {
    categories: Category[];
    tasks: Task[];
}

/**
 * Clase de servicio para interactuar con la API de generación de tareas
 */
export class AIService {
    /**
     * Generar tareas a partir de un plan de texto usando la API
     */
    static async generateTasksFromPlan(
        planText: string
    ): Promise<AIGeneratedPlan> {
        const response = await fetch("/api/generate-tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ planText }),
        });

        if (!response.ok) {
            throw new Error("Error al generar tareas con IA");
        }

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.error || "Error desconocido");
        }

        return data.data;
    }
}
