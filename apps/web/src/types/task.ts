// apps/web/src/types/task.ts

export type Task = {
    id: string;             // Unique identifier for the task
    title: string;          // Short description of the task
    deadline: string;      // ISO date string representing the task deadline
    effort: number;         //1-5 scale representing the effort required
    impact: number;       // 1-5 importance/value
    createAt: string;    //ISO timestamp
};

export type NewTaskInput = Omit<Task, 'id' | 'createAt'>;