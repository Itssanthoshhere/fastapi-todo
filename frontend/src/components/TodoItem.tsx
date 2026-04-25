import React, { useState } from "react";
import { Todo } from "../types/todo";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number, completed: boolean) => Promise<void>;
  onUpdate: (id: number, title: string, description?: string) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

/**
 * TodoItem - Individual todo card component
 * Displays todo with ability to:
 * - Toggle completion status
 * - Edit title/description
 * - Delete todo
 */
export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onUpdate,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(
    todo.description || "",
  );
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggle = async () => {
    try {
      await onToggle(todo.id, todo.completed);
    } catch {
      // Error is handled by parent
    }
  };

  const handleSave = async () => {
    if (!editTitle.trim()) {
      return;
    }
    try {
      await onUpdate(
        todo.id,
        editTitle.trim(),
        editDescription.trim() || undefined,
      );
      setIsEditing(false);
    } catch {
      // Error is handled by parent
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(todo.id);
    } catch {
      setIsDeleting(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description || "");
    setIsEditing(false);
  };

  if (isDeleting) {
    return <div className="animate-fade-out h-20 opacity-50" />;
  }

  return (
    <div
      className={`
        group relative animate-slide-up
        rounded-lg border border-slate-200
        bg-white p-4
        transition-all duration-200
        hover:shadow-md hover:border-slate-300
        ${todo.completed ? "bg-slate-50" : ""}
      `}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <button
          onClick={handleToggle}
          className={`
            mt-1 flex-shrink-0 w-5 h-5 rounded
            border-2 transition-all duration-200
            ${
              todo.completed
                ? "bg-slate-700 border-slate-700 hover:bg-slate-800"
                : "border-slate-300 hover:border-slate-400"
            }
            flex items-center justify-center cursor-pointer
          `}
          aria-label={
            todo.completed ? "Mark as incomplete" : "Mark as complete"
          }
        >
          {todo.completed && (
            <svg
              className="w-3 h-3 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="space-y-2">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full px-2 py-1 text-sm font-medium rounded border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400"
                placeholder="Todo title"
                autoFocus
              />
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="w-full px-2 py-1 text-sm rounded border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 resize-none"
                placeholder="Add a description..."
                rows={2}
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="px-3 py-1 text-xs font-medium bg-slate-700 text-white rounded hover:bg-slate-800 transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="px-3 py-1 text-xs font-medium bg-slate-100 text-slate-700 rounded hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <h3
                className={`
                  font-medium text-slate-900 break-words
                  ${todo.completed ? "line-through text-slate-500" : ""}
                `}
              >
                {todo.title}
              </h3>
              {todo.description && (
                <p
                  className={`
                  text-sm mt-1 break-words
                  ${
                    todo.completed
                      ? "line-through text-slate-400"
                      : "text-slate-500"
                  }
                `}
                >
                  {todo.description}
                </p>
              )}
            </>
          )}
        </div>

        {/* Actions */}
        {!isEditing && (
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => setIsEditing(true)}
              className="p-1.5 rounded hover:bg-slate-100 transition-colors text-slate-500 hover:text-slate-700"
              aria-label="Edit todo"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
            <button
              onClick={handleDelete}
              className="p-1.5 rounded hover:bg-red-50 transition-colors text-slate-500 hover:text-red-600"
              aria-label="Delete todo"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
