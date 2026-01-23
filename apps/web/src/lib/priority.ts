// apps/web/src/lib/priority.ts

import type { Task } from "@/types/task";
import { normalizeTask } from "@/lib/normalization";

/**
 * Normalize impact (1–5) to 0..1.
 * Higher impact = higher priority.
 */
function normalizeImpact(impact: number): number {
  const safe = Number.isFinite(impact) ? impact : 3;
  const clamped = Math.max(1, Math.min(safe, 5));
  return (clamped - 1) / 4;
}

/**
 * Calculates a priority score for a task.
 * Higher score = higher priority.
 * Uses normalized urgency, effort, deadline, and impact.
 */
export function calculatePriority(task: Task): number {
  const normalized = normalizeTask(task);
  const impact = normalizeImpact(task.impact);

  // Weights (explicit and tunable)
  const W_DEADLINE = 0.35;
  const W_IMPACT = 0.30;
  const W_URGENCY = 0.20;
  const W_EFFORT = 0.15;

  return (
    W_DEADLINE * normalized.deadline +
    W_IMPACT * impact +
    W_URGENCY * normalized.urgency +
    W_EFFORT * normalized.effort
  );
}
