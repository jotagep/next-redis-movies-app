import type { Meta, StoryObj } from '@storybook/nextjs'

import Topbar from './index'

const meta = {
  title: 'Blocks/Topbar',
  component: Topbar,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      router: {
        pathname: '/'
      }
    }
  },
  tags: ['autodocs']
} satisfies Meta<typeof Topbar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  decorators: [
    (Story) => {
      // Asegurar que no hay scroll
      if (typeof window !== 'undefined') {
        window.scrollY = 0
      }
      return <Story />
    }
  ]
}

export const Scrolled: Story = {
  decorators: [
    (Story) => {
      // Simular scroll
      if (typeof window !== 'undefined') {
        window.scrollY = 200
      }
      return <Story />
    }
  ]
}
