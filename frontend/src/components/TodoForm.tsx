import React, { useState } from "react";
import { TodoCreateRequest } from "../types/todo";

interface TodoFormProps {
  onSubmit: (todo: TodoCreateRequest) => Promise<void>;
  isLoading?: boolean;
}

/**
 * TodoForm - Form component for creating new todos
 * Features:
 * - Title input (required)
 * - Optional description
 * - Submit/Cancel buttons
 * - Loading state handling
 */
export const TodoForm: React.FC<TodoFormProps> = ({
  onSubmit,
  isLoading = false,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim() || undefined,
        completed: false,
      });
      // Clear form on success
      setTitle("");
      setDescription("");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to create todo";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDisabled = isSubmitting || isLoading;

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-slate-700 mb-2"
        >
          New Todo
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
          disabled={isDisabled}
          className={`
            w-full px-4 py-3 rounded-lg border border-slate-200
            placeholder-slate-400 text-slate-900
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent
            disabled:opacity-50 disabled:cursor-not-allowed
            ${error ? "border-red-300 focus:ring-red-400" : ""}
          `}
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-slate-700 mb-2"
        >
          Description (optional)
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add more details..."
          disabled={isDisabled}
          rows={3}
          className={`
            w-full px-4 py-3 rounded-lg border border-slate-200
            placeholder-slate-400 text-slate-900
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent
            disabled:opacity-50 disabled:cursor-not-allowed
            resize-none
          `}
        />
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isDisabled}
        className={`
          w-full px-4 py-3 rounded-lg font-medium text-white
          transition-all duration-200
          flex items-center justify-center gap-2
          ${
            isDisabled
              ? "opacity-50 cursor-not-allowed bg-slate-400"
              : "bg-slate-700 hover:bg-slate-800 active:scale-95"
          }
        `}
      >
        {isSubmitting ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Creating...
          </>
        ) : (
          <>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add Todo
          </>
        )}
      </button>
    </form>
  );
};
