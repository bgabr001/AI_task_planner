// apps/web/src/types/taskValidation.ts

import type  {NewTaskInput} from './task';

export function validateNewTask(input: NewTaskInput): string[] {
    const errors: string[] = [];
    if (!input.title.trim ()) errors.push('Title is required.');
    if (!input.deadline) errors.push('Deadline is required.');
    
    if (!Number.isFinite(input.effort) || input.effort < 1 || input.effort > 5) {
        errors.push('Effort must be a number between 1 and 5.');
    }

    if(!Number.isFinite(input.impact) || input.impact < 1 || input.impact > 5) {
        errors.push('Impact must be a number between 1 and 5.');
    }

    return errors;
}