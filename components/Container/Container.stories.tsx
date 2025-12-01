import type { Meta, StoryObj } from '@storybook/nextjs'

import Container from './Container'

const meta = {
  title: 'UI/Atoms/Container',
  component: Container,
  parameters: {
    layout: 'fullscreen'
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'El contenido del contenedor'
    },
    className: {
      control: 'text',
      description: 'Clases CSS adicionales'
    }
  }
} satisfies Meta<typeof Container>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Este es el contenido del contenedor'
  }
}

export const WithContent: Story = {
  args: {
    children: (
      <div>
        <h1 className="mb-4 text-2xl font-bold">Título</h1>
        <p>Este es un ejemplo de contenido dentro del contenedor.</p>
      </div>
    )
  }
}

export const WithCustomClass: Story = {
  args: {
    children: 'Contenedor con clase personalizada',
    className: 'bg-gray-800 text-white py-8'
  }
}
