import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/lib/auth/context'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SREF Mining Co - Discover MidJourney Style References',
  description: 'Discover, collect, and manage MidJourney Style Reference (SREF) codes. Find the perfect style for your AI-generated artwork.',
  keywords: ['MidJourney', 'SREF', 'Style Reference', 'AI Art', 'Design'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
