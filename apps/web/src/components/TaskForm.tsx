"use client";

import { useState } from "react";
import type { NewTaskInput } from "@/types/task";
import { validateNewTask } from "@/types/taskValidation";

type Props = {
  onAddTask: (task: NewTaskInput) => void;
};

export default function TaskForm({ onAddTask }: Props) {
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [effort, setEffort] = useState(3);
  const [impact, setImpact] = useState(3);
  const [errors, setErrors] = useState<string[]>([]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const newTask: NewTaskInput = {
      title,
      deadline,
      effort,
      impact,
    };

    const validationErrors = validateNewTask(newTask);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    onAddTask(newTask);

    // reset form
    setTitle("");
    setDeadline("");
    setEffort(3);
    setImpact(3);
    setErrors([]);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-lg border p-4 shadow-sm"
    >
      <h2 className="text-lg font-semibold">Add Task</h2>

      {errors.length > 0 && (
        <ul className="rounded bg-red-100 p-2 text-sm text-red-700">
          {errors.map((err) => (
            <li key={err}>• {err}</li>
          ))}
        </ul>
      )}

      <div>
        <label className="block text-sm font-medium">Title</label>
        <input
          className="w-full rounded border px-2 py-1"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Deadline</label>
        <input
          type="date"
          className="w-full rounded border px-2 py-1"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">
            Effort (1–5)
          </label>
          <input
            type="number"
            min={1}
            max={5}
            className="w-full rounded border px-2 py-1"
            value={effort}
            onChange={(e) => setEffort(Number(e.target.value))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Impact (1–5)
          </label>
          <input
            type="number"
            min={1}
            max={5}
            className="w-full rounded border px-2 py-1"
            value={impact}
            onChange={(e) => setImpact(Number(e.target.value))}
          />
        </div>
      </div>

      <button
        type="submit"
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Add Task
      </button>
    </form>
  );
}
