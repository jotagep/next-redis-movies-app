import { MovieInfo } from '@/types/movies'

import { NetworkError, ValidationError } from './error'

class VerflixApi {
  private readonly apiUrl: string

  constructor() {
    this.apiUrl = process.env.NEXT_PUBLIC_API_URL || '/api'
  }

  async getMovieInfo(id: number): Promise<MovieInfo> {
    if (!id || id <= 0) {
      throw new ValidationError('Invalid movie ID', 'id')
    }

    try {
      const response = await fetch(`${this.apiUrl}/movie?id=${id}`)
      return await response.json()
    } catch (error) {
      throw new NetworkError('Failed to fetch movie info', error)
    }
  }
}

export const verflixApi = new VerflixApi()
