import { useState, useCallback, useEffect } from "react";
import { Todo, TodoCreateRequest } from "../types/todo";
import { todoApi } from "../services/api";

/**
 * Hook for managing todo state and operations
 * Handles loading, error states, and all CRUD operations
 */
export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch all todos from the backend
   */
  const fetchTodos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await todoApi.getAllTodos();
      setTodos(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch todos";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Create a new todo
   * Uses optimistic update: update UI immediately, handle error if request fails
   */
  const addTodo = useCallback(async (todo: TodoCreateRequest) => {
    try {
      const newTodo = await todoApi.createTodo(todo);
      // Add to the beginning of the list
      setTodos((prev) => [newTodo, ...prev]);
      setError(null);
      return newTodo;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to create todo";
      setError(message);
      throw err;
    }
  }, []);

  /**
   * Update an existing todo
   * Optimistically updates the UI
   */
  const updateTodo = useCallback(
    async (id: number, updates: Partial<TodoCreateRequest>) => {
      // Optimistic update
      const previousTodos = todos;
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? { ...todo, ...updates } : todo)),
      );

      try {
        const updated = await todoApi.updateTodo(id, updates);
        // Update with actual response
        setTodos((prev) =>
          prev.map((todo) => (todo.id === id ? updated : todo)),
        );
        setError(null);
        return updated;
      } catch (err) {
        // Revert optimistic update on error
        setTodos(previousTodos);
        const message =
          err instanceof Error ? err.message : "Failed to update todo";
        setError(message);
        throw err;
      }
    },
    [todos],
  );

  /**
   * Toggle todo completion status
   */
  const toggleTodo = useCallback(
    async (id: number, completed: boolean) => {
      return updateTodo(id, { completed: !completed });
    },
    [updateTodo],
  );

  /**
   * Delete a todo
   * Optimistically removes from UI
   */
  const deleteTodo = useCallback(
    async (id: number) => {
      const previousTodos = todos;
      // Optimistic delete
      setTodos((prev) => prev.filter((todo) => todo.id !== id));

      try {
        await todoApi.deleteTodo(id);
        setError(null);
      } catch (err) {
        // Revert on error
        setTodos(previousTodos);
        const message =
          err instanceof Error ? err.message : "Failed to delete todo";
        setError(message);
        throw err;
      }
    },
    [todos],
  );

  /**
   * Load todos on mount
   */
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return {
    todos,
    loading,
    error,
    addTodo,
    updateTodo,
    toggleTodo,
    deleteTodo,
    refetch: fetchTodos,
  };
};
