import type { Task } from "@/types/task";

/**
 * Calculates a priority score for a task.
 * Higher score = higher priority.
 */
export function calculatePriority(task: Task): number {
  const now = new Date();
  const deadline = new Date(task.deadline);

  const daysUntilDeadline =
    (deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);

  // Urgency increases as deadline approaches
  const urgencyScore =
    daysUntilDeadline <= 0
      ? 10
      : Math.max(0, 10 - daysUntilDeadline);

  // Lower effort = higher priority
  const effortScore = 6 - task.effort;

  // Higher impact = higher priority
  const impactScore = task.impact * 2;

  return urgencyScore + effortScore + impactScore;
}
