# To-Do List App con IA

Aplicación de lista de tareas inteligente que utiliza Google Gemini AI para generar planes organizados automáticamente.

## 🚀 Stack Tecnológico

- **Framework**: Next.js 15 (App Router)
- **Lenguaje**: TypeScript
- **UI Components**: shadcn/ui
- **IA**: Google Gemini AI
- **Persistencia**: localStorage
- **Package Manager**: Bun

## 📁 Estructura del Proyecto

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Layout principal
│   ├── page.tsx                  # Página principal
│   ├── globals.css               # Estilos globales
│   └── api/                      # API Routes
│       └── generate-tasks/
│           └── route.ts          # Endpoint para generar tareas con Gemini
│
├── components/                   # Componentes de la aplicación
│   ├── ui/                       # Componentes shadcn/ui (auto-generados)
│   ├── plan/                     # Componentes del módulo de planes
│   │   ├── plan-input.tsx        # Input para escribir el plan
│   │   └── plan-form.tsx         # Formulario completo del plan
│   ├── tasks/                    # Componentes del módulo de tareas
│   │   ├── task-list.tsx         # Lista de tareas
│   │   ├── task-item.tsx         # Item individual de tarea
│   │   ├── task-category.tsx     # Agrupación por categoría
│   │   └── task-board.tsx        # Vista completa del tablero
│   └── layout/                   # Componentes de layout
│       ├── header.tsx            # Header de la app
│       └── container.tsx         # Contenedor principal
│
├── lib/                          # Utilidades y configuraciones
│   ├── utils.ts                  # Utilidades generales (cn, etc.)
│   └── gemini.ts                 # Configuración del cliente Gemini
│
├── services/                     # Servicios de la aplicación
│   ├── storage.service.ts        # Servicio de localStorage
│   └── ai.service.ts             # Servicio de integración con Gemini
│
├── types/                        # Definiciones de tipos TypeScript
│   ├── task.types.ts             # Tipos para tareas
│   ├── plan.types.ts             # Tipos para planes
│   └── api.types.ts              # Tipos para respuestas de API
│
└── hooks/                        # Custom React Hooks
    ├── use-tasks.ts              # Hook para manejo de tareas
    ├── use-storage.ts            # Hook para localStorage
    └── use-generate-plan.ts      # Hook para generar plan con IA
```

## ⚙️ Configuración

### 1. Instalar dependencias

```bash
bun install
```

### 2. Configurar variables de entorno

Copia el archivo `env.example` a `.env.local`:

```bash
cp env.example .env.local
```

Edita `.env.local` y agrega tu API key de Gemini:

```env
GEMINI_API_KEY=tu_api_key_aqui
```

Obtén tu API key en: https://aistudio.google.com/app/apikey

### 3. Ejecutar en desarrollo

```bash
bun run dev
```

La aplicación estará disponible en `http://localhost:3000`

## 🏗️ Estado Actual: Arquitectura Base

Este proyecto actualmente tiene la **arquitectura base** configurada:

✅ **Completado**:
- Proyecto Next.js 15 inicializado con TypeScript
- shadcn/ui configurado
- Estructura de carpetas creada
- Tipos TypeScript definidos
- Servicios base creados (Storage, AI)
- API Route para Gemini configurado
- Componentes placeholder creados
- Hooks placeholder creados

⏳ **Pendiente** (Fases posteriores):
- Implementación de componentes UI
- Implementación de hooks
- Integración completa con shadcn/ui components
- Estilos y diseño visual
- Funcionalidades de usuario

## 📝 Tipos Principales

### Task
```typescript
interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
}
```

### Category
```typescript
interface Category {
  id: string;
  name: string;
  color: string;
  order: number;
}
```

### TaskBoard
```typescript
interface TaskBoard {
  id: string;
  planId: string;
  categories: Category[];
  tasks: Task[];
  createdAt: string;
}
```

## 🔌 API Routes

### POST `/api/generate-tasks`

Genera tareas organizadas por categorías a partir de un plan de texto.

**Request**:
```json
{
  "planText": "Quiero organizar una fiesta de cumpleaños..."
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "categories": [...],
    "tasks": [...]
  }
}
```

## 🎯 Próximos Pasos

1. Instalar componentes shadcn/ui necesarios
2. Implementar componentes de UI
3. Implementar hooks personalizados
4. Agregar estilos y diseño
5. Implementar funcionalidades de usuario

## 📚 Recursos

- [Next.js 15 Documentation](https://nextjs.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Google Gemini AI](https://ai.google.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.
