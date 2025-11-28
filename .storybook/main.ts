import type { StorybookConfig } from '@storybook/nextjs'

const config: StorybookConfig = {
  stories: ['./Welcome.mdx', '../components/**/*.stories.@(ts|tsx|mdx)', '../features/**/*.stories.@(ts|tsx|mdx)'],
  addons: ['@storybook/addon-a11y', '@storybook/addon-docs'],
  framework: {
    name: '@storybook/nextjs',
    options: {
      mdx: { mode: 'mdx3' }
    }
  },
  staticDirs: ['../public']
}

export default config
