import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans', display: 'swap' })

export const metadata: Metadata = {
  title: 'Wesley Deep Biswas - Photographer / Hobbyist',
  description: 'A hobbyist photographer capturing birds, insects, and small everyday moments. No clients, just a camera and a habit of paying attention.',
  openGraph: {
    title: 'Wesley Deep Biswas',
    description: 'A hobbyist photographer capturing birds, insects, and small everyday moments. No clients, just a camera and a habit of paying attention.',
    url: 'https://wesley-deep.vercel.app',
    siteName: 'Wesley Deep Biswas',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f4f0e8',
  userScalable: true,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="bg-background">
      <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <meta name="apple-mobile-web-app-title" content="Wesley Deep Biswas" />
      <link rel="manifest" href="/site.webmanifest" />
      <body className={`${dmSans.variable} antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
