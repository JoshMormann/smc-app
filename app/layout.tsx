import type { Metadata } from 'next'
import { DM_Sans, DM_Mono } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/lib/auth/context'

// Load National Park from Google Fonts via CSS import
const dmSans = DM_Sans({ 
  subsets: ['latin'],
  variable: '--font-dm-sans'
})

const dmMono = DM_Mono({ 
  subsets: ['latin'],
  variable: '--font-dm-mono',
  weight: ['300', '400', '500']
})

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
    <html lang="en" className="h-full">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=National+Park&display=swap" rel="stylesheet" />
      </head>
      <body className={`${dmSans.variable} ${dmMono.variable} h-full`}>
        <AuthProvider>
          <div className="h-full">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
