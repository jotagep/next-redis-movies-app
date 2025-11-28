import type { Meta, StoryObj } from '@storybook/nextjs'

import Spinner from './Spinner'

const meta = {
  title: 'UI/Atoms/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Small: Story = {
  args: {
    small: true
  }
}
