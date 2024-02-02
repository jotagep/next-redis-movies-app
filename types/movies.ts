export interface Movie {
  title: string
  original_name: string
  id: number
  vote_average: number
  overview: string
  poster_path: string
  backdrop_path: string
}

export interface MovieLight {
  title: string
  vote_average: number
  backdrop_path: string
}

export interface MovieDetailed extends Movie {
  release_date: string
  tagline: string
  runtime: string
  relase_date: string
  budget: number
  revenue: number
  genres: {
    id: number
    name: string
  }[]
}
export interface Cast {
  name: string
  character: string
}

export interface MovieInfo extends MovieDetailed {
  related_movies: Movie[]
  cast: Cast[]
}
export interface IResponse {
  total_pages: number
  results: Movie[]
  total_results: number
  page: number
}

export interface IResponseCast {
  id: number
  cast: Cast[]
}
