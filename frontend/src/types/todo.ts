/**
 * Core Todo type definition
 * Mirrors the FastAPI backend schema
 */
export interface Todo {
  id: number
  title: string
  description?: string | null
  completed: boolean
}

/**
 * Request payload for creating a new todo
 * Server returns full Todo with generated ID
 */
export interface TodoCreateRequest {
  title: string
  description?: string
  completed?: boolean
}

/**
 * API response wrapper (optional for future error handling)
 */
export interface ApiResponse<T> {
  data?: T
  error?: string
}
