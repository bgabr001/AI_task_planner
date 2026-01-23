// apps/web/src/lib/normalization.ts

import type { Task, Urgency } from "@/types/task";

/**
 * Urgency mapping (string -> 0..1).
 * Tweak these numbers later to tune priority behavior.
 */
const URGENCY_MAP: Record<Urgency, number> = {
  low: 0.25,
  medium: 0.5,
  high: 0.75,
  critical: 1.0,
};

/**
 * Effort is stored as 1–5 (5 = hardest).
 * We normalize to 0..1 and invert so:
 *   effort 1 -> 1.0 (easy / quick win)
 *   effort 3 -> 0.5
 *   effort 5 -> 0.0 (hard / time-consuming)
 */
export function normalizeEffort(effort: number): number {
  const safe = Number.isFinite(effort) ? effort : 5;
  const clamped = Math.max(1, Math.min(safe, 5)); // keep in 1..5
  return 1 - (clamped - 1) / 4; // map 1..5 -> 1..0
}

/**
 * Normalize urgency from the task's Urgency union to 0..1.
 */
export function normalizeUrgency(urgency: Urgency): number {
  return URGENCY_MAP[urgency];
}

/**
 * Deadline normalization:
 * Convert "days until due" into a 0..1 score.
 *   - overdue or due now -> 1.0
 *   - due soon -> close to 1.0
 *   - due far away -> close to 0.0
 *
 * MAX_DEADLINE_DAYS defines when deadline pressure bottoms out.
 */
const MAX_DEADLINE_DAYS = 14;

export function normalizeDeadline(deadlineIso: string): number {
  const due = new Date(deadlineIso);
  if (Number.isNaN(due.getTime())) return 0.0; // invalid date => no deadline pressure

  const now = new Date();
  const diffMs = due.getTime() - now.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  if (diffDays <= 0) return 1.0; // overdue / due now

  const clamped = Math.min(diffDays, MAX_DEADLINE_DAYS);
  return 1 - clamped / MAX_DEADLINE_DAYS;
}

/**
 * Normalized values used by scoring logic.
 */
export type NormalizedTask = {
  urgency: number;
  effort: number;
  deadline: number;
};

/**
 * Normalize the attributes needed for priority scoring.
 * Only requires urgency, effort, and deadline from the Task type.
 */
export function normalizeTask(
  task: Pick<Task, "urgency" | "effort" | "deadline">
): NormalizedTask {
  return {
    urgency: normalizeUrgency(task.urgency),
    effort: normalizeEffort(task.effort),
    deadline: normalizeDeadline(task.deadline),
  };
}
