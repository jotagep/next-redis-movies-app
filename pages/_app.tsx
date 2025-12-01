import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'
import { Bebas_Neue, Roboto } from 'next/font/google'
import Head from 'next/head'

import Topbar from '@/components/Topbar'

import SearchBar from '@/features/SearchMovies/SearchBar'
import SearchList from '@/features/SearchMovies/SearchList'

import store from '@/store/store'

import StorybookTab from '../components/StorybookTab/StorybookTab'

import '@/styles/globals.scss'

const roboto = Roboto({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-roboto',
  weight: ['400', '700']
})
const bebasNeue = Bebas_Neue({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-bebas-neue',
  weight: '400'
})

const className = `bg-darkgray min-h-screen font-sans ${roboto.variable} ${bebasNeue.variable}`

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={className}>
      <Head>
        <title>Verflix</title>
        <meta name="description" content="Verflix" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Provider store={store}>
        <Topbar>
          <SearchBar />
        </Topbar>
        <SearchList />
        <Component {...pageProps} />
        <StorybookTab />
      </Provider>
    </main>
  )
}
