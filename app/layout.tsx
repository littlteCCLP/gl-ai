import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Travel Assistant',
  description: '您的私人旅游助手',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body className={inter.className}>
        <div className="min-h-[100dvh] max-w-[375px] mx-auto bg-white relative">
          {children}
        </div>
      </body>
    </html>
  )
}

