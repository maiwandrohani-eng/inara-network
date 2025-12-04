import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Providers from '@/components/Providers'
import TopMenuBar from '@/components/TopMenuBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'INARA Network - The International Network for Aid, Relief and Assistance',
  description: 'A coordination platform connecting humanitarian organizations worldwide to collaborate on relief and aid efforts',
  icons: {
    icon: '/images/inara-logo.png',
    apple: '/images/inara-logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <TopMenuBar />
            <main className="flex-1 w-full">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  )
}
