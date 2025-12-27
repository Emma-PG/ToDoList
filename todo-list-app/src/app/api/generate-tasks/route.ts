/**
 * API Route: Generate Tasks
 * Endpoint para generar tareas a partir de un plan usando Gemini AI
 */

import { getGeminiModel } from "@/lib/gemini";
import { GenerateTasksRequest, GenerateTasksResponse } from "@/types/api.types";
import { Category, Task } from "@/types/task.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body: GenerateTasksRequest = await request.json();
        const { planText } = body;

        if (!planText || planText.trim().length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    error: "El texto del plan es requerido",
                } as GenerateTasksResponse,
                { status: 400 }
            );
        }

        // Obtener el modelo de Gemini
        const model = getGeminiModel();

        // Prompt para generar tareas organizadas por categorías
        const prompt = `
Eres un asistente experto en planificación y organización de tareas.

El usuario te ha proporcionado el siguiente plan:
"${planText}"

Tu tarea es analizar este plan y generar una lista de tareas organizadas por categorías que ayuden al usuario a lograr su objetivo.

Debes responder ÚNICAMENTE con un objeto JSON válido (sin markdown, sin bloques de código) con la siguiente estructura:
{
  "categories": [
    {
      "id": "cat-1",
      "name": "Nombre de la categoría",
      "color": "#HEX_COLOR",
      "order": 1
    }
  ],
  "tasks": [
    {
      "id": "task-1",
      "title": "Título de la tarea",
      "description": "Descripción opcional de la tarea",
      "completed": false,
      "categoryId": "cat-1",
      "createdAt": "${new Date().toISOString()}",
      "updatedAt": "${new Date().toISOString()}"
    }
  ]
}

Reglas:
1. Genera entre 3-6 categorías relevantes
2. Cada categoría debe tener un color único en formato hexadecimal
3. Genera entre 5-15 tareas en total, distribuidas entre las categorías
4. Las tareas deben ser específicas y accionables
5. Usa IDs únicos para categorías (cat-1, cat-2, etc.) y tareas (task-1, task-2, etc.)
6. El campo "completed" siempre debe ser false
7. NO incluyas markdown ni bloques de código, solo el JSON puro
`;

        // Generar contenido con Gemini
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();

        // Parsear la respuesta JSON
        let parsedData: { categories: Category[]; tasks: Task[] };

        try {
            // Limpiar el texto de posibles bloques de código markdown
            const cleanedText = text
                .replace(/```json\n?/g, "")
                .replace(/```\n?/g, "")
                .trim();

            parsedData = JSON.parse(cleanedText);
        } catch (parseError) {
            console.error("Error al parsear respuesta de Gemini:", text);
            return NextResponse.json(
                {
                    success: false,
                    error: "Error al procesar la respuesta de la IA",
                } as GenerateTasksResponse,
                { status: 500 }
            );
        }

        // Validar que la respuesta tenga la estructura correcta
        if (!parsedData.categories || !parsedData.tasks) {
            return NextResponse.json(
                {
                    success: false,
                    error: "La respuesta de la IA no tiene el formato esperado",
                } as GenerateTasksResponse,
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            data: parsedData,
        } as GenerateTasksResponse);
    } catch (error) {
        console.error("Error en /api/generate-tasks:", error);
        return NextResponse.json(
            {
                success: false,
                error: "Error interno del servidor",
            } as GenerateTasksResponse,
            { status: 500 }
        );
    }
}
