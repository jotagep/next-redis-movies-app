import type { Meta, StoryObj } from '@storybook/nextjs'

import ButtonLink from './ButtonLink'

const meta = {
  title: 'UI/ButtonLink',
  component: ButtonLink,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark'
    },
    nextjs: {
      router: {
        pathname: '/active-page'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    to: {
      control: 'text',
      description: 'La ruta a la que el botón enlaza'
    },
    children: {
      control: 'text',
      description: 'El contenido del botón'
    },
    className: {
      control: 'text',
      description: 'Clases CSS adicionales'
    }
  }
} satisfies Meta<typeof ButtonLink>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    to: '/',
    children: 'Home'
  }
}

export const Active: Story = {
  args: {
    to: '/active-page',
    children: 'Home'
  },
  parameters: {
    nextjs: {
      router: {
        pathname: '/active-page'
      }
    }
  }
}

export const Favorites: Story = {
  args: {
    to: '/favorites',
    children: 'Favoritos'
  }
}

export const WithCustomClass: Story = {
  args: {
    to: '/movies',
    children: 'Movies',
    className: 'text-yellow-500 text-lg'
  }
}
