import Head from 'next/head'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { Roboto, Bebas_Neue } from 'next/font/google'

import Topbar from '@/components/Topbar'
import SearchList from '@/features/SearchMovies/SearchList'
import store from '@/store/store'
import '@/styles/globals.scss'

const roboto = Roboto({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-roboto',
  weight: ['400', '700'],
})
const bebasNeue = Bebas_Neue({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-bebas-neue',
  weight: '400',
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
        <Topbar />
        <SearchList />
        <Component {...pageProps} />
      </Provider>
    </main>
  )
}
