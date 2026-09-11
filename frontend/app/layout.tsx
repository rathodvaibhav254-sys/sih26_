import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'RailMind · Operations Decision Support',
  description: 'Railway traffic-control decision support platform with predictive delay intelligence, conflict detection, and what-if simulation for SIH 2026.',
  icons: { icon: '/icon.svg', apple: '/apple-icon.png' },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f5f4f0',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" style={{ background: '#f5f4f0' }}>
      <body className="antialiased">{children}</body>
    </html>
  )
}

