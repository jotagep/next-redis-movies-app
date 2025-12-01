import type { Meta, StoryObj } from '@storybook/nextjs'
import { action } from 'storybook/actions'

import { mockMoviesList } from '@/mocks/movies'

import FavoriteBox from './FavoriteBox'

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
          [mockMoviesList[1].id]: mockMoviesList[1]
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
    movie: mockMoviesList[0],
    className: {
      description: 'Clases CSS adicionales'
    }
  }
}

export default meta

export const NotFavorite: Story = {
  args: {
    movie: mockMoviesList[0],
    className: 'w-12 h-12'
  }
}

export const IsFavorite: Story = {
  args: {
    movie: mockMoviesList[1],
    className: 'w-12 h-12'
  }
}
