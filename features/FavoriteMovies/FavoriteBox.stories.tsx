import type { Meta, StoryObj } from '@storybook/nextjs'
import { action } from 'storybook/actions'

import type { Movie } from '@/types/movies'

import FavoriteBox from './FavoriteBox'

const mockMovie: Movie = {
  id: 1,
  title: 'Mock Movie',
  original_name: 'Mock Movie',
  vote_average: 8.5,
  overview: 'A mock movie for Storybook.',
  poster_path: '/mock.jpg',
  backdrop_path: '/mock-bg.jpg'
}

const mockMovie2: Movie = {
  id: 2,
  title: 'Mock Movie 2',
  original_name: 'Mock Movie 2',
  vote_average: 4.5,
  overview: 'A mock movie 2 for Storybook.',
  poster_path: '/mock.jpg',
  backdrop_path: '/mock-bg.jpg'
}

type Story = StoryObj<typeof FavoriteBox>

const meta: Meta<typeof FavoriteBox> = {
  title: 'Features/FavoriteMovies/FavoriteBox',
  component: FavoriteBox,
  parameters: {
    docs: {
      description: {
        component:
          'Componente que muestra un corazón para agregar/quitar películas de favoritos. **Abre la consola del navegador** para ver las acciones de Redux (toggleFavorite).'
      }
    },
    reduxState: {
      favoriteMovies: {
        movies: {
          [mockMovie2.id]: mockMovie2
        }
      }
    },
    middleware: [
      () => (next: any) => (actionObj: any) => {
        if (actionObj.type === 'favoriteMovies/toggleFavorite') {
          action('toggleFavorite')(actionObj.payload)
        }
        return next(actionObj)
      }
    ]
  },
  argTypes: {
    movie: mockMovie,
    className: {
      description: 'Clases CSS adicionales'
    }
  }
}

export default meta

export const NotFavorite: Story = {
  args: {
    movie: mockMovie,
    className: 'w-12 h-12'
  }
}

export const IsFavorite: Story = {
  args: {
    movie: mockMovie2,
    className: 'w-12 h-12'
  }
}
