/**
 * Task Types
 * Define las interfaces para tareas, categorías y el tablero de tareas
 */

export type GeminiResponse = {
  roadmap_title: string;
  estimated_time: string;
  phases: Array<Phase>;
};

type Phase = {
  phase_name: string;
  learning_objectives: Array<string>;
  tasks: Array<Task>;
};

type Task = {
  id: number;
  title: string;
  resource_type_suggestion: string;
};

