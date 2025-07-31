import type { Metadata } from 'next'

import React from 'react'

import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

import './global.css'
import { getServerSideURL } from '@/utilities/getURL'
import { AdminBar } from '@/components/AdminBar'
import { draftMode } from 'next/headers'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <title>@nicolepoetry</title>
      </head>
      <body className="font-[Arial,Helvetica,sans-serif]">
      <AdminBar
        adminBarProps={{
          preview: isEnabled,
        }}
      />
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
  icons: [
    { rel: 'icon', url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    { rel: 'icon', url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    { rel: 'icon', url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
    { rel: 'icon', url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    { rel: 'apple-touch-icon', url: '/apple-touch-icon.png', sizes: '180x180' },
    { rel: 'shortcut icon', url: '/favicon.ico' },
  ],
  manifest: '/site.webmanifest',
}
