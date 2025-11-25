import type { Meta, StoryObj } from '@storybook/nextjs'

import MovieImage from './MovieImage'

const meta = {
  title: 'UI/MovieImage',
  component: MovieImage,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
      description: 'URL de la imagen'
    },
    alt: {
      control: 'text',
      description: 'Texto alternativo'
    },
    width: {
      control: 'number',
      description: 'Ancho de la imagen'
    },
    height: {
      control: 'number',
      description: 'Alto de la imagen'
    }
  }
} satisfies Meta<typeof MovieImage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    src: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
    alt: 'Oppenheimer',
    width: 300,
    height: 450
  }
}

export const WithError: Story = {
  args: {
    src: '/invalid-url.jpg',
    alt: 'Imagen no encontrada',
    width: 300,
    height: 450
  }
}

export const Landscape: Story = {
  args: {
    src: 'https://image.tmdb.org/t/p/w500/628Dep6AxEtDxjZoGP78TsOxYbK.jpg',
    alt: 'Movie Backdrop',
    width: 500,
    height: 280
  }
}
