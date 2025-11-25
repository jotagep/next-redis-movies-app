import type { Preview } from '@storybook/nextjs'
import { Provider } from 'react-redux'
import store from '../store/store'
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
    }
  },
  initialGlobals: {
    backgrounds: { value: 'dark' }
  },
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    )
  ]
}

export default preview
