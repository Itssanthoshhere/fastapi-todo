import { useState } from "react";
import { useTodos } from "./src/hooks/useTodos";
import { TodoForm } from "./src/components/TodoForm";
import { TodoList } from "./src/components/TodoList";
import { TodoCreateRequest } from "./src/types/todo";
import "./App.css";

type FilterType = "all" | "active" | "completed";

/**
 * Main App Component
 * Orchestrates the todo application:
 * - Manages global state via useTodos hook
 * - Renders form for creating todos
 * - Displays todo list with filtering
 * - Handles all CRUD operations
 */
function App() {
  const [filter, setFilter] = useState<FilterType>("all");
  const {
    todos,
    loading,
    error: appError,
    addTodo,
    updateTodo,
    toggleTodo,
    deleteTodo,
  } = useTodos();

  const handleAddTodo = async (todo: TodoCreateRequest) => {
    await addTodo(todo);
  };

  const handleUpdateTodo = async (
    id: number,
    title: string,
    description?: string,
  ) => {
    await updateTodo(id, { title, description });
  };

  const handleToggleTodo = async (id: number, completed: boolean) => {
    await toggleTodo(id, completed);
  };

  const handleDeleteTodo = async (id: number) => {
    await deleteTodo(id);
  };

  const activeCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-slate-900">Todos</h1>
          </div>
          <p className="text-slate-500">
            Stay productive with a clean, minimal task manager
          </p>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form - larger on desktop */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="sticky top-8 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <TodoForm onSubmit={handleAddTodo} isLoading={loading} />
            </div>
          </div>

          {/* List - takes more space */}
          <div className="lg:col-span-2 order-1 lg:order-2 space-y-4">
            {/* Filter buttons */}
            <div className="flex gap-2">
              {(["all", "active", "completed"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`
                    px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200
                    ${
                      filter === f
                        ? "bg-slate-900 text-white shadow-md"
                        : "bg-white text-slate-700 border border-slate-200 hover:border-slate-300"
                    }
                  `}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                  {f === "active" && activeCount > 0 && (
                    <span className="ml-2 text-xs font-semibold">
                      {activeCount}
                    </span>
                  )}
                  {f === "completed" && completedCount > 0 && (
                    <span className="ml-2 text-xs font-semibold">
                      {completedCount}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Loading state */}
            {loading && todos.length === 0 && (
              <div className="flex justify-center py-16">
                <div className="space-y-4 text-center">
                  <div className="w-12 h-12 border-3 border-slate-200 border-t-slate-900 rounded-full animate-spin mx-auto" />
                  <p className="text-slate-500">Loading todos...</p>
                </div>
              </div>
            )}

            {/* Error state */}
            {appError && (
              <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                <div className="flex gap-3">
                  <svg
                    className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <h3 className="font-medium text-red-900">
                      Something went wrong
                    </h3>
                    <p className="text-sm text-red-700 mt-1">{appError}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Todo list */}
            {!loading && todos.length > 0 && (
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <TodoList
                  todos={todos}
                  filter={filter}
                  onToggle={handleToggleTodo}
                  onUpdate={handleUpdateTodo}
                  onDelete={handleDeleteTodo}
                />
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-slate-400">
          <p>
            Built with{" "}
            <span className="text-slate-600 font-medium">
              React + TypeScript
            </span>{" "}
            &mdash;{" "}
            <a
              href="https://github.com/Itssanthoshhere"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-slate-700 transition-colors"
            >
              GitHub
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
