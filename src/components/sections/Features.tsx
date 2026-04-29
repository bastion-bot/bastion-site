'use client'

import { useEffect, useState } from 'react'
import { useReveal } from '@/hooks/useReveal'
import { ShieldIcon, BanIcon, MessageIcon, AlertIcon, ActivityIcon, UsersIcon, ArrowRightIcon } from '@/components/ui/Icons'
import type { ReactNode } from 'react'

interface Feature {
  tag: string
  name: string
  desc: string
  icon: ReactNode
}

const FEATURES: Feature[] = [
  {
    tag: 'Protection',
    name: 'Anti-Raid',
    desc: "Détecte l'afflux, active le lockdown automatiquement. Tu vois le résultat, pas le chaos.",
    icon: <ShieldIcon />,
  },
  {
    tag: 'Protection',
    name: 'Anti-Nuke',
    desc: "Suppressions massives stoppées net. L'acteur est sanctionné, l'historique reste intact.",
    icon: <BanIcon />,
  },
  {
    tag: 'Détection',
    name: 'Anti-Spam',
    desc: 'Suppression auto, score de risque ajusté. Zéro intervention manuelle.',
    icon: <MessageIcon />,
  },
  {
    tag: 'Détection',
    name: 'Anti-Phishing',
    desc: 'WHOIS, redirections, Google Safe Browsing. Détecté avant que quiconque clique.',
    icon: <AlertIcon />,
  },
  {
    tag: 'Analyse',
    name: 'Risk Scoring',
    desc: 'Score par utilisateur. Monte avec les infractions, diminue avec le temps.',
    icon: <ActivityIcon />,
  },
  {
    tag: 'Support',
    name: 'Tickets',
    desc: 'Canaux dédiés, transcripts automatiques, limités par plan. Tout est archivé.',
    icon: <UsersIcon />,
  },
]

function FeatureCard({ feature, active, onEnter, onLeave }: {
  feature: Feature
  active: boolean
  onEnter: () => void
  onLeave: () => void
}) {
  return (
    <div
      className="relative overflow-hidden p-8 transition-colors duration-300 cursor-default"
      style={{ background: active ? '#0c1019' : '#080b12' }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* Ligne top */}
      <div
        className="absolute top-0 left-0 right-0 h-px transition-all duration-300"
        style={{
          background: active
            ? 'linear-gradient(90deg, transparent, rgba(232,32,58,0.7), transparent)'
            : 'transparent',
        }}
      />

      {/* Glow coin */}
      <div
        className="absolute -bottom-14 -right-14 w-32 h-32 rounded-full transition-all duration-300"
        style={{
          background: 'radial-gradient(circle, rgba(232,32,58,0.07), transparent 70%)',
          opacity: active ? 1 : 0,
          transform: active ? 'scale(1.3)' : 'scale(1)',
        }}
      />

      {/* Icône */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 relative z-10 transition-all duration-300 text-bastion-red"
        style={{
          background: active ? 'rgba(232,32,58,0.14)' : 'rgba(232,32,58,0.08)',
          border: `1px solid ${active ? 'rgba(232,32,58,0.4)' : 'rgba(232,32,58,0.18)'}`,
          boxShadow: active ? '0 0 16px rgba(232,32,58,0.18)' : 'none',
        }}
      >
        {feature.icon}
      </div>

      {/* Tag */}
      <span className="inline-block text-[9px] tracking-[1.5px] uppercase text-bastion-red bg-bastion-red/[0.07] border border-bastion-red/15 rounded px-2 py-0.5 mb-3 relative z-10">
        {feature.tag}
      </span>

      {/* Nom */}
      <h3 className="font-syne font-bold text-lg tracking-tight mb-2 relative z-10">
        {feature.name}
      </h3>

      {/* Desc */}
      <p
        className="text-[12px] leading-relaxed relative z-10 transition-colors duration-300 font-light"
        style={{ color: active ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.36)' }}
      >
        {feature.desc}
      </p>

      {/* More link */}
      <div
        className="mt-4 flex items-center gap-1.5 relative z-10 transition-all duration-300 text-bastion-red"
        style={{
          opacity: active ? 1 : 0,
          transform: active ? 'translateY(0)' : 'translateY(4px)',
        }}
      >
        <span className="text-[11px] font-medium">En savoir plus</span>
        <ArrowRightIcon />
      </div>
    </div>
  )
}

export default function Features() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const ref = useReveal()

  useEffect(() => {
    if (paused) return
    const iv = setInterval(() => setActive(i => (i + 1) % FEATURES.length), 2000)
    return () => clearInterval(iv)
  }, [paused])

  return (
    <section id="features" className="relative z-10 py-28">
      <div className="container-site">
        <div ref={ref} className="reveal">
          <p className="section-label">Fonctionnalités</p>
          <h2 className="section-title">
            Tout ce dont vous avez{' '}
            <span className="text-bastion-red">besoin.</span>
          </h2>
          <p className="text-white/35 text-sm leading-relaxed max-w-sm mb-14 font-light">
            Une suite complète de modules de sécurité, configurables et extensibles.
          </p>

          {/* Grille features */}
          <div
            className="grid grid-cols-3 gap-px rounded-2xl overflow-hidden border border-white/[0.05]"
            style={{ background: 'rgba(255,255,255,0.05)' }}
          >
            {FEATURES.map((f, i) => (
              <FeatureCard
                key={f.name}
                feature={f}
                active={active === i}
                onEnter={() => { setPaused(true); setActive(i) }}
                onLeave={() => setPaused(false)}
              />
            ))}
          </div>

          {/* Highlight cards */}
          <div className="grid grid-cols-2 gap-5 mt-5">
            {[
              {
                num: '6',
                accent: false,
                suffix: '',
                title: 'Modules actifs en simultané',
                desc: 'Chaque module travaille indépendamment et en parallèle.',
                ghost: '06',
              },
              {
                num: '100',
                accent: true,
                suffix: '%',
                title: 'Temps réel, sans exception',
                desc: 'Détection, décision, action en quelques millisecondes.',
                ghost: 'RT',
              },
            ].map((card, i) => (
              <div
                key={i}
                className="card p-9 relative overflow-hidden hover:border-bastion-red/20 hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="font-syne font-extrabold text-[60px] leading-none tracking-[-4px] mb-1.5">
                  <span className="bg-gradient-to-br from-white to-white/30 bg-clip-text text-transparent">
                    {card.num}
                  </span>
                  {card.suffix && (
                    <span className="bg-gradient-to-br from-bastion-red to-red-400 bg-clip-text text-transparent">
                      {card.suffix}
                    </span>
                  )}
                </div>
                <h4 className="font-syne font-bold text-base mb-1.5">{card.title}</h4>
                <p className="text-white/33 text-xs leading-relaxed font-light">{card.desc}</p>
                <span className="absolute -bottom-4 -right-2 font-syne font-extrabold text-[80px] text-bastion-red/[0.04] tracking-[-4px] pointer-events-none select-none">
                  {card.ghost}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
