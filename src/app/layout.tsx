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
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
