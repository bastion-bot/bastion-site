import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Bastion — Sécurité Discord avancée',
  description: 'Pendant que tu dors, Bastion veille. Détection, blocage et notification en temps réel.',
  openGraph: {
    title: 'Bastion — Sécurité Discord avancée',
    description: 'Ton serveur dort. Les raiders, non.',
    url: 'https://bastion.yaiito.fr',
    siteName: 'Bastion',
    locale: 'fr_FR',
    type: 'website',
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="shortcut icon" href="/logo.png" type="image/png" />
      </head>
      <body>{children}</body>
    </html>
  )
}
