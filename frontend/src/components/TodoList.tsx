import React, { useMemo } from "react";
import { Todo } from "../types/todo";
import { TodoItem } from "../components/TodoItem";

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number, completed: boolean) => Promise<void>;
  onUpdate: (id: number, title: string, description?: string) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  filter?: "all" | "active" | "completed";
}

/**
 * TodoList - Displays todos with optional filtering
 * Shows empty state when no todos match the filter
 */
export const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggle,
  onUpdate,
  onDelete,
  filter = "all",
}) => {
  // Filter todos based on completion status
  const filteredTodos = useMemo(() => {
    switch (filter) {
      case "active":
        return todos.filter((todo) => !todo.completed);
      case "completed":
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  // Calculate stats
  const stats = useMemo(
    () => ({
      total: todos.length,
      active: todos.filter((t) => !t.completed).length,
      completed: todos.filter((t) => t.completed).length,
    }),
    [todos],
  );

  if (todos.length === 0) {
    return (
      <div className="text-center py-16">
        <svg
          className="w-16 h-16 text-slate-300 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
          />
        </svg>
        <h3 className="text-lg font-medium text-slate-900">No todos yet</h3>
        <p className="text-slate-500 mt-2">
          Create your first todo to get started
        </p>
      </div>
    );
  }

  if (filteredTodos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500">
          No{" "}
          {filter === "active"
            ? "active"
            : filter === "completed"
              ? "completed"
              : ""}{" "}
          todos
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Stats bar */}
      <div className="flex gap-4 px-4 py-3 rounded-lg bg-slate-50 border border-slate-200">
        <div className="flex-1">
          <p className="text-xs text-slate-500 uppercase tracking-wide">
            Total
          </p>
          <p className="text-2xl font-semibold text-slate-900">{stats.total}</p>
        </div>
        <div className="flex-1">
          <p className="text-xs text-slate-500 uppercase tracking-wide">
            Active
          </p>
          <p className="text-2xl font-semibold text-slate-900">
            {stats.active}
          </p>
        </div>
        <div className="flex-1">
          <p className="text-xs text-slate-500 uppercase tracking-wide">Done</p>
          <p className="text-2xl font-semibold text-slate-900">
            {stats.completed}
          </p>
        </div>
      </div>

      {/* Todo items */}
      <div className="space-y-2">
        {filteredTodos.map((todo, index) => (
          <div
            key={todo.id}
            style={{
              animation: `slideUp 0.3s ease-out`,
              animationDelay: `${index * 50}ms`,
              animationFillMode: "both",
            }}
          >
            <TodoItem
              todo={todo}
              onToggle={onToggle}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="text-center pt-4 border-t border-slate-100">
        <p className="text-xs text-slate-400">
          {stats.completed} of {stats.total} completed
        </p>
      </div>
    </div>
  );
};
