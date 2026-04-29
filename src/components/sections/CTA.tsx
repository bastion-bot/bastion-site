'use client'

import Link from 'next/link'
import { useReveal } from '@/hooks/useReveal'
import { DiscordIcon } from '@/components/ui/Icons'

const TRUST_ITEMS = [
  {
    label: 'Aucune carte requise',
    icon: (
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    ),
  },
  {
    label: 'Setup en 2 minutes',
    icon: <polyline points="20 6 9 17 4 12" />,
  },
  {
    label: 'Actif 24h/24',
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </>
    ),
  },
]

export default function CTA() {
  const ref = useReveal()

  return (
    <section className="relative z-10 py-28 overflow-hidden border-t border-white/[0.04]">
      {/* Glow ambiant */}
      <div
        className="absolute top-1/2 left-1/2 w-[600px] h-72 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(232,32,58,0.09) 0%, transparent 70%)',
          animation: 'ctaPulse 5s ease-in-out infinite',
        }}
      />

      {/* Grille masquée */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(232,32,58,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(232,32,58,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 65% 65% at 50% 50%, black 25%, transparent 100%)',
        }}
      />

      <div className="container-site relative z-10">
        <div ref={ref} className="reveal text-center max-w-lg mx-auto">
          <div className="flex items-center justify-center gap-3 text-[10px] text-white/25 tracking-[2px] uppercase mb-6">
            <span className="block w-7 h-px bg-white/12" />
            Prêt à protéger ton serveur
            <span className="block w-7 h-px bg-white/12" />
          </div>

          <h2 className="font-syne font-extrabold text-5xl lg:text-[58px] tracking-[-3px] leading-none mb-5">
            Ton serveur mérite mieux
            <span className="block text-bastion-red">qu&apos;un raid à 3h du matin.</span>
          </h2>

          <p className="text-white/33 text-sm leading-relaxed mb-11 font-light">
            Ajoute Bastion. Gratuit. Aucune carte bancaire.<br />
            Configure en moins de 2 minutes.
          </p>

          <div className="flex items-center justify-center gap-3 mb-10">
            <Link href="#" className="btn-red">
              <DiscordIcon />
              Ajouter à Discord — gratuit
            </Link>
            <Link
              href="https://github.com/Jonathan-p-z/Bastion"
              className="btn-ghost"
            >
              Voir sur GitHub →
            </Link>
          </div>

          <div className="flex items-center justify-center gap-7">
            {TRUST_ITEMS.map(({ label, icon }) => (
              <div key={label} className="flex items-center gap-2 text-[11px] text-white/22">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(232,32,58,0.5)"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  {icon}
                </svg>
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
