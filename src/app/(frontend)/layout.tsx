import type { Metadata } from 'next'

import React from 'react'

import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

import './global.css'
import { getServerSideURL } from '@/utilities/getURL'

export default async function RootLayout({ children }: { children: React.ReactNode }) {


  return (
    <html lang="en" suppressHydrationWarning>
    <head>
      <link href="/favicon.ico" rel="icon" sizes="32x32" />
      <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      <title>My Payload Site</title>
    </head>
    <body>
      <Header />
      {children}
      <Footer />
    </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@meliostudio',
  },
}
