export class ApiError extends Error {
  status: number
  statusText: string
  data?: any

  constructor(status: number, statusText: string, data?: any) {
    super(`API Error: ${status} ${statusText}`)
    this.name = 'ApiError'
    this.status = status
    this.statusText = statusText
    this.data = data
  }
}

export class NetworkError extends Error {
  constructor(
    message: string,
    public originalError?: unknown
  ) {
    super(message)
    this.name = 'NetworkError'
  }
}

export class ValidationError extends Error {
  constructor(
    message: string,
    public field?: string
  ) {
    super(message)
    this.name = 'ValidationError'
  }
}
