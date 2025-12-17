import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({ subsets: ['latin'], weight: ['300','400','500','600','700'] })

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
      <body className={poppins.className}>{children}</body>
    </html>
  )
}
