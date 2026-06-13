import type { Metadata } from 'next'
import { Epilogue } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'

const epilogue = Epilogue({
  subsets: ['latin'],
  variable: '--font-epilogue',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'tholai — Your skin, understood.',
  description: 'AI-powered skincare analysis and personalised routines.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={epilogue.variable}>
      <body>
        <ClerkProvider>
          {children}
        </ClerkProvider>
      </body>
    </html>
  )
}
