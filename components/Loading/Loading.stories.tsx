import type { Meta, StoryObj } from '@storybook/nextjs'

import Loading from './Loading'

const meta = {
  title: 'Blocks/Loading',
  component: Loading,
  parameters: {
    layout: 'fullscreen'
  },
  tags: ['autodocs']
} satisfies Meta<typeof Loading>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
