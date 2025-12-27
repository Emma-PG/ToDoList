/**
 * Gemini AI Configuration
 * Configuración del cliente de Google Gemini AI
 * Este archivo se usa en el servidor (API Routes)
 */

import { GoogleGenerativeAI } from "@google/generative-ai";

// Modelo a utilizar
export const GEMINI_MODEL = "gemini-2.0-flash-exp";

/**
 * Obtener una instancia del modelo Gemini
 * La validación de la API key se hace en runtime
 */
export function getGeminiModel() {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        throw new Error(
            "GEMINI_API_KEY no está configurada en las variables de entorno"
        );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    return genAI.getGenerativeModel({ model: GEMINI_MODEL });
}
