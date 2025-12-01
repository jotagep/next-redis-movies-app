import type { Meta, StoryObj } from '@storybook/nextjs'

import SearchIcon from './SearchIcon'

const meta = {
  title: 'Features/SearchMovies/SearchIcon',
  component: SearchIcon,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '24px', height: '24px' }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof SearchIcon>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
