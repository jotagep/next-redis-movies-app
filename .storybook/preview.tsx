import type { Preview } from '@storybook/nextjs'
import { Provider } from 'react-redux'
import { createMockStore } from './mockStore'

import '../styles/globals.scss'

const preview: Preview = {
  parameters: {
    backgrounds: {
      options: {
        dark: '#181818',
        light: '#ffffff'
      }
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    nextjs: {
      appDirectory: false,
      navigation: {
        pathname: '/'
      }
    },
    options: {
      storySort: {
        method: 'alphabetical',
        order: ['Introducción', 'UI', 'Features']
      }
    }
  },
  initialGlobals: {
    backgrounds: { value: 'dark' }
  },
  decorators: [
    (Story, context) => {
      const initialState = context.parameters.reduxState || {}
      const middleware = context.parameters.middleware || []

      const store = createMockStore(initialState, middleware)

      return (
        <Provider store={store}>
          <Story />
        </Provider>
      )
    }
  ],
  tags: ['autodocs']
}

export default preview
