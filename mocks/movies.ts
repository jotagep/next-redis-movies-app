import { Movie, MovieDetailed, MovieInfo } from '@/types/movies'

export const mockMovie: Movie = {
  id: 123,
  title: 'Test Movie',
  backdrop_path: '/test-backdrop.jpg',
  poster_path: '/test-poster.jpg',
  vote_average: 8.5,
  overview: 'Test movie overview',
  original_name: 'Test Movie'
}

export const mockMovieDetailed: MovieDetailed = {
  id: 872585,
  title: 'Oppenheimer',
  overview: 'La historia del físico teórico J. Robert Oppenheimer y su papel en el desarrollo de la bomba atómica.',
  poster_path: '/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
  backdrop_path: '/628Dep6AxEtDxjZoGP78TsOxYbK.jpg',
  vote_average: 7.1,
  release_date: '2023-07-19',
  genres: [
    {
      id: 18,
      name: 'Drama'
    },
    {
      id: 36,
      name: 'History'
    }
  ],
  original_name: 'Oppenheimer',
  tagline: 'The World Will Never Be The Same',
  runtime: '180',
  budget: 100000000,
  revenue: 2000000000
}

export const mockMoviesList: Movie[] = [
  mockMovieDetailed,
  {
    id: 346698,
    title: 'Barbie',
    overview: 'Barbie vive en Barbieland, donde todo es ideal y lleno de música y color.',
    poster_path: '/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg',
    backdrop_path: '/nHf61UzkfFno5X1ofIhugCPus2R.jpg',
    vote_average: 7.2,
    original_name: 'Barbie'
  },
  {
    id: 667538,
    title: 'Transformers: Rise of the Beasts',
    overview: 'Los Autobots y los Maximals se unen para salvar el mundo.',
    poster_path: '/2vFuG6bWGyQUzYS9d69E5l85nIz.jpg',
    backdrop_path: '/bz66a19bR6BKsbY8gSZCM4etJiK.jpg',
    vote_average: 7.5,
    original_name: 'Transformers: Rise of the Beasts'
  },
  {
    id: 298618,
    title: 'The Flash',
    overview: 'Barry Allen usa sus superpoderes para viajar en el tiempo.',
    poster_path: '/rktDFPbfHfUbArZ6OOOKsXcv0Bm.jpg',
    backdrop_path: '/yF1eOkaYvwiORauRCPWznV9xVvi.jpg',
    vote_average: 6.9,
    original_name: 'The Flash'
  },
  {
    id: 569094,
    title: 'Spider-Man: Across the Spider-Verse',
    overview: 'Miles Morales regresa para la próxima aventura del Spider-Verse.',
    poster_path: '/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg',
    backdrop_path: '/xJHokMbljvjADYdit5fK5VQsXEG.jpg',
    vote_average: 8.4,
    original_name: 'Spider-Man: Across the Spider-Verse'
  },
  {
    id: 447365,
    title: 'Guardians of the Galaxy Vol. 3',
    overview: 'Peter Quill y su equipo deben proteger a uno de los suyos.',
    poster_path: '/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg',
    backdrop_path: '/5YZbUmjbMa3ClvSW1Wj3D6XGolb.jpg',
    vote_average: 8.0,
    original_name: 'Guardians of the Galaxy Vol. 3'
  },
  {
    id: 502356,
    title: 'The Super Mario Bros. Movie',
    overview: 'Mario y Luigi viajan por el Reino Champiñón para salvar a la princesa Peach.',
    poster_path: '/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg',
    backdrop_path: '/9n2tJBplPbgR2ca05hS5CKXwP2c.jpg',
    vote_average: 7.7,
    original_name: 'The Super Mario Bros. Movie'
  },
  {
    id: 603692,
    title: 'John Wick: Chapter 4',
    overview: 'John Wick descubre un camino para derrotar a la Alta Mesa.',
    poster_path: '/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg',
    backdrop_path: '/h8gHn0OzB9m0WA8nsrT5JGKlfz.jpg',
    vote_average: 7.8,
    original_name: 'John Wick: Chapter 4'
  }
]

export const mockMovieInfo: MovieInfo = {
  ...mockMovieDetailed,
  cast: [
    { name: 'Cillian Murphy', character: 'J. Robert Oppenheimer' },
    { name: 'Emily Blunt', character: 'Kitty Oppenheimer' },
    { name: 'Matt Damon', character: 'Leslie Groves' },
    { name: 'Robert Downey Jr.', character: 'Lewis Strauss' },
    { name: 'Florence Pugh', character: 'Jean Tatlock' },
    { name: 'Josh Hartnett', character: 'Ernest Lawrence' }
  ],
  related_movies: mockMoviesList.slice(1, 5)
}
