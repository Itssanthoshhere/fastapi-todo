import axios, { AxiosInstance } from 'axios'
import { Todo, TodoCreateRequest } from '../types/todo'

/**
 * API Client - Centralized place for all backend communication
 * Makes it easy to change base URL, add auth, interceptors, etc.
 */
class TodoApiClient {
  private client: AxiosInstance

  constructor(baseURL: string = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000') {
    this.client = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    })

    // Add error interceptor for consistent error handling
    this.client.interceptors.response.use(
      response => response,
      error => {
        // Handle network errors, timeouts, etc.
        if (!error.response) {
          console.error('Network error:', error.message)
        }
        return Promise.reject(error)
      }
    )
  }

  /**
   * Fetch all todos with optional pagination
   */
  async getAllTodos(skip: number = 0, limit: number = 100): Promise<Todo[]> {
    try {
      const response = await this.client.get<Todo[]>('/todos', {
        params: { skip, limit },
      })
      return response.data
    } catch (error) {
      console.error('Failed to fetch todos:', error)
      throw error
    }
  }

  /**
   * Fetch a single todo by ID
   */
  async getTodoById(id: number): Promise<Todo> {
    try {
      const response = await this.client.get<Todo>(`/todos/${id}`)
      return response.data
    } catch (error) {
      console.error(`Failed to fetch todo ${id}:`, error)
      throw error
    }
  }

  /**
   * Create a new todo
   */
  async createTodo(todo: TodoCreateRequest): Promise<Todo> {
    try {
      const response = await this.client.post<Todo>('/todos', {
        title: todo.title,
        description: todo.description || null,
        completed: todo.completed || false,
      })
      return response.data
    } catch (error) {
      console.error('Failed to create todo:', error)
      throw error
    }
  }

  /**
   * Update an existing todo
   */
  async updateTodo(id: number, todo: Partial<TodoCreateRequest>): Promise<Todo> {
    try {
      const response = await this.client.put<Todo>(`/todos/${id}`, {
        title: todo.title,
        description: todo.description !== undefined ? todo.description : null,
        completed: todo.completed,
      })
      return response.data
    } catch (error) {
      console.error(`Failed to update todo ${id}:`, error)
      throw error
    }
  }

  /**
   * Delete a todo
   */
  async deleteTodo(id: number): Promise<void> {
    try {
      await this.client.delete(`/todos/${id}`)
    } catch (error) {
      console.error(`Failed to delete todo ${id}:`, error)
      throw error
    }
  }
}

// Export singleton instance
export const todoApi = new TodoApiClient()
