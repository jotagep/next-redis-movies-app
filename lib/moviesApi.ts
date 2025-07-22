import type {
  Cast,
  IResponse,
  IResponseCast,
  Movie,
  MovieDetailed
} from '@/types/movies'

const API_KEY = process.env.NEXT_PUBLIC_MOVIES_API_KEY
const url = 'https://api.themoviedb.org/3'
const language = 'en-US'

export async function fetchData<T>(query: string): Promise<T> {
  const response = await fetch(query)
  const data = await response.json()
  return data
}

export const getImage = (url: string, size: 'original' | 'w500' = 'w500') => {
  return `https://image.tmdb.org/t/p/${size}${url}`
}

export const getPopularMovies = async (page = 1): Promise<Movie[]> => {
  const query = `${url}/movie/popular?api_key=${API_KEY}&language=${language}&page=${page}`

  const response = await fetchData<IResponse>(query)
  return response.results
}

export const getDetailMovie = async (id: number): Promise<MovieDetailed> => {
  const query = `${url}/movie/${id}?api_key=${API_KEY}&language=${language}`
  const response = await fetchData<MovieDetailed>(query)

  return response
}

export const getRelatedMovies = async (id: number): Promise<Movie[]> => {
  const query = `${url}/movie/${id}/recommendations?api_key=${API_KEY}&language=${language}`
  const response = await fetchData<IResponse>(query)

  return response.results
}

export const getCastMovie = async (id: number): Promise<Cast[]> => {
  const query = `${url}/movie/${id}/credits?api_key=${API_KEY}&language=${language}`
  const response = await fetchData<IResponseCast>(query)

  return response.cast
}

export const getSearchMovie = async (text: string): Promise<Movie[]> => {
  const query = `${url}/search/movie?api_key=${API_KEY}&language=${language}&query=${text}`
  const response = await fetchData<IResponse>(query)

  return response.results
}
