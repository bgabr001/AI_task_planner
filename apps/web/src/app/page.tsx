"use client";

import { useMemo, useState } from "react";
import TaskForm from "@/components/TaskForm";
import type { Task, NewTaskInput } from "@/types/task";
import { calculatePriority } from "@/lib/priority";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function addTask(input: NewTaskInput) {
    const newTask: Task = {
      ...input,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };

    setTasks((prev) => [...prev, newTask]);
  }

  const sortedTasks = useMemo(() => {
    return [...tasks].sort((a, b) => calculatePriority(b) - calculatePriority(a));
  }, [tasks]);

  return (
    <main className="mx-auto max-w-xl space-y-6 p-6">
      <h1 className="text-2xl font-bold">AI Task Planner</h1>

      <TaskForm onAddTask={addTask} />

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Tasks</h2>

        {sortedTasks.length === 0 ? (
          <p className="text-sm text-gray-600">
            No tasks yet. Add one above.
          </p>
        ) : (
          <ul className="space-y-2">
            {sortedTasks.map((task) => (
              <li key={task.id} className="rounded border p-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="font-medium">{task.title}</div>
                  <div className="text-sm text-gray-500">
                    Score: {calculatePriority(task).toFixed(1)}
                  </div>
                </div>

                <div className="mt-1 text-sm text-gray-600">
                  Deadline: {task.deadline} · Effort: {task.effort} · Impact:{" "}
                  {task.impact}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
