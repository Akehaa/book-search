import { Header } from '@/components/Header'
import '@/styles/globals.css'
import { DefaultSeo } from 'next-seo'
import type { AppProps } from 'next/app'
import { Analytics } from '@vercel/analytics/react'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo
        openGraph={{
          type: 'website',
          locale: 'en',
          url: 'https://www.url.ie/',
          siteName: 'BookSearch',
        }}
      />
      <Header />
      <Component {...pageProps} />
      <Analytics />
    </>
  )
}
