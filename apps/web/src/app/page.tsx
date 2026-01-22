"use client";

import { useState } from "react";
import TaskForm from "@/components/TaskForm";
import type { Task, NewTaskInput } from "@/types/task";

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

  return (
    <main className="mx-auto max-w-xl space-y-6 p-6">
      <h1 className="text-2xl font-bold">AI Task Planner</h1>

      <TaskForm onAddTask={addTask} />

      <div>
        <h2 className="text-lg font-semibold">Tasks</h2>
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li key={task.id} className="rounded border p-2">
              <div className="font-medium">{task.title}</div>
              <div className="text-sm text-gray-600">
                Deadline: {task.deadline} · Effort: {task.effort} · Impact:{" "}
                {task.impact}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
