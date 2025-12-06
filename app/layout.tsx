import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Collective Kenya - Join the AI Community',
  description: 'The AI Collective Kenya chapter - connecting pioneers on the frontier of AI. Join our community of founders, researchers, operators, and investors.',
  keywords: 'AI, Kenya, AI Collective, Artificial Intelligence, Community, Events, Nairobi',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
