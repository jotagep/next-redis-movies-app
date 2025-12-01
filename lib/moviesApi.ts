import type { Cast, IResponse, IResponseCast, Movie, MovieDetailed } from '@/types/movies'

import { ApiError, NetworkError, ValidationError } from './error'

class MoviesService {
  private readonly apiKey: string
  private readonly baseUrl: string
  private readonly language: string

  constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_MOVIES_API_KEY || ''
    this.baseUrl = 'https://api.themoviedb.org/3'
    this.language = 'en-US'

    if (!this.apiKey) {
      throw new ValidationError('NEXT_PUBLIC_MOVIES_API_KEY is required', 'apiKey')
    }
  }

  private async fetch<T>(
    path: string,
    params: Record<string, string | number> = {},
    options?: RequestInit
  ): Promise<T> {
    try {
      const queryParams = new URLSearchParams({
        api_key: this.apiKey,
        language: this.language,
        ...Object.fromEntries(Object.entries(params).map(([key, value]) => [key, String(value)]))
      })

      const url = `${this.baseUrl}${path}?${queryParams.toString()}`
      const response = await fetch(url, options)

      if (!response.ok) {
        let errorData
        try {
          errorData = await response.json()
        } catch {
          errorData = null
        }
        throw new ApiError(response.status, response.statusText, errorData)
      }

      return await response.json()
    } catch (error) {
      if (error instanceof ApiError) {
        throw error
      }
      throw new NetworkError(`Failed to fetch ${path}`, error)
    }
  }

  getImage(url: string, size: 'original' | 'w500' = 'w500'): string {
    if (!url) {
      return '/no-image.svg'
    }
    return `https://image.tmdb.org/t/p/${size}${url}`
  }

  async getPopularMovies(page = 1): Promise<Movie[]> {
    const response = await this.fetch<IResponse>('/movie/popular', { page })
    return response.results
  }

  async getDetailMovie(id: number): Promise<MovieDetailed> {
    if (!id || id <= 0) {
      throw new ValidationError('Invalid movie ID', 'id')
    }
    return this.fetch<MovieDetailed>(`/movie/${id}`)
  }

  async getRelatedMovies(id: number): Promise<Movie[]> {
    if (!id || id <= 0) {
      throw new ValidationError('Invalid movie ID', 'id')
    }
    const response = await this.fetch<IResponse>(`/movie/${id}/recommendations`)
    return response.results
  }

  async getCastMovie(id: number): Promise<Cast[]> {
    if (!id || id <= 0) {
      throw new ValidationError('Invalid movie ID', 'id')
    }
    const response = await this.fetch<IResponseCast>(`/movie/${id}/credits`)
    return response.cast
  }

  async getSearchMovie(text: string): Promise<Movie[]> {
    if (!text || text.trim().length === 0) {
      throw new ValidationError('Search text cannot be empty', 'text')
    }
    const response = await this.fetch<IResponse>('/search/movie', {
      query: text
    })
    return response.results
  }
}

export const moviesApi = new MoviesService()
