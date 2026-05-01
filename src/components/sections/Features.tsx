'use client'

import { useEffect, useState } from 'react'
import { useReveal } from '@/hooks/useReveal'
import { ShieldIcon, BanIcon, MessageIcon, AlertIcon, ActivityIcon, UsersIcon, ArrowRightIcon } from '@/components/ui/Icons'
import type { ReactNode } from 'react'

interface Feature {
  tag: string
  name: string
  desc: string
  detail: string
  icon: ReactNode
}

const FEATURES: Feature[] = [
  {
    tag: 'Protection',
    name: 'Anti-Raid',
    desc: "Détecte l'afflux, active le lockdown automatiquement. Tu vois le résultat, pas le chaos.",
    detail: "Bastion surveille les jointures en temps réel avec une fenêtre glissante. Dès qu'un afflux anormal est détecté — 8 joins/10s (Low), 6/10s (Medium), 4/10s (High) — le bot déclenche automatiquement un lockdown de 15 minutes : slowmode activé à 10s, nouveaux messages bloqués. Un audit log WARN est émis immédiatement. Les seuils sont entièrement configurables via le dashboard.",
    icon: <ShieldIcon />,
  },
  {
    tag: 'Protection',
    name: 'Anti-Nuke',
    desc: "Suppressions massives stoppées net. L'acteur est sanctionné, l'historique reste intact.",
    detail: "Chaque action destructrice est comptabilisée par acteur dans une fenêtre de 20 secondes. Seuils par défaut : 3 suppressions de salon ou de rôle, 2 modifications du serveur, 4 modifications de webhook, 6 créations/modifications de salon ou rôle. Dès qu'un seuil est dépassé, un audit log WARN est émis et le risk engine prend le relai pour escalader la sanction. Tous les seuils sont configurables via /nuke set.",
    icon: <BanIcon />,
  },
  {
    tag: 'Détection',
    name: 'Anti-Spam',
    desc: 'Suppression auto, score de risque ajusté. Zéro intervention manuelle.',
    detail: "Bastion détecte les rafales de messages dans une fenêtre glissante par utilisateur. Seuils : 8 messages/8s (Low), 6/8s (Medium), 4/8s (High). À chaque détection : suppression du message, +12 points de risk score, audit log WARN. Si le score dépasse les paliers d'escalation, des sanctions progressives s'appliquent automatiquement — mute, kick, ban — sans intervention humaine.",
    icon: <MessageIcon />,
  },
  {
    tag: 'Détection',
    name: 'Anti-Phishing',
    desc: 'WHOIS, redirections, Google Safe Browsing. Détecté avant que quiconque clique.',
    detail: "Trois analyses en parallèle sur chaque lien posté (timeout global 5s) : vérification contre une blocklist statique (nitro, free, claim, gift, steam...), résolution des redirections HTTP jusqu'à 5 niveaux avec vérification de l'âge WHOIS du domaine (< 7 jours = +70 pts, < 30 jours = +40 pts), et consultation Google Safe Browsing v4 (MALWARE/SOCIAL_ENGINEERING = +80 pts, audit CRIT). Message supprimé avant que quiconque puisse cliquer.",
    icon: <AlertIcon />,
  },
  {
    tag: 'Analyse',
    name: 'Risk Scoring',
    desc: 'Score par utilisateur. Monte avec les infractions, diminue avec le temps.',
    detail: "Chaque membre a un score de risque calculé en temps réel, par serveur. Il monte à chaque infraction (spam +12, phishing +30 à +80, alt-account +40 à +100) et décroît naturellement de 0.5 pt/min avec un TTL de 60 min d'inactivité. Les sanctions s'appliquent automatiquement par palier : warn à 30, mute 5 min à 50, mute 30 min à 70, kick à 85, ban permanent à 100. Cooldown de 60 min entre deux actions sur le même utilisateur.",
    icon: <ActivityIcon />,
  },
  {
    tag: 'Support',
    name: 'Tickets',
    desc: 'Canaux dédiés, transcripts automatiques, limités par plan. Tout est archivé.',
    detail: "Les membres ouvrent un ticket via /ticket. Un canal privé dédié est créé, visible uniquement par le staff et l'utilisateur. À la fermeture, un transcript complet est archivé automatiquement. Limite de tickets simultanés par plan : 3 (Free), 10 (Pro), 25 (Business), 50 (Enterprise).",
    icon: <UsersIcon />,
  },
]

function FeatureModal({ feature, onClose }: { feature: Feature | null; onClose: () => void }) {
  const [displayed, setDisplayed] = useState<Feature | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (feature) {
      setDisplayed(feature)
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true))
      })
      return () => cancelAnimationFrame(raf)
    } else {
      setVisible(false)
      const t = setTimeout(() => setDisplayed(null), 200)
      return () => clearTimeout(t)
    }
  }, [feature])

  useEffect(() => {
    if (!feature) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [feature, onClose])

  if (!displayed) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm transition-opacity duration-200"
      style={{ background: 'rgba(0,0,0,0.75)', opacity: visible ? 1 : 0 }}
      onClick={onClose}
    >
      <div
        className="relative max-w-lg w-full mx-4 p-8 rounded-2xl transition-all duration-200"
        style={{
          background: '#080b12',
          border: '1px solid rgba(232,32,58,0.2)',
          boxShadow: '0 0 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(232,32,58,0.08)',
          transform: visible ? 'scale(1)' : 'scale(0.95)',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-lg text-white/30 hover:text-white/70 hover:bg-white/[0.06] transition-colors duration-150"
          aria-label="Fermer"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {/* Icon + Tag row */}
        <div className="flex items-center gap-3 mb-5">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-bastion-red flex-shrink-0"
            style={{
              background: 'rgba(232,32,58,0.12)',
              border: '1px solid rgba(232,32,58,0.3)',
              boxShadow: '0 0 16px rgba(232,32,58,0.15)',
            }}
          >
            {displayed.icon}
          </div>
          <span className="inline-block text-[9px] tracking-[1.5px] uppercase text-bastion-red bg-bastion-red/[0.07] border border-bastion-red/15 rounded px-2 py-0.5">
            {displayed.tag}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-syne font-bold text-xl tracking-tight mb-4">
          {displayed.name}
        </h3>

        {/* Detail */}
        <p className="text-[13px] leading-relaxed font-light" style={{ color: 'rgba(255,255,255,0.5)' }}>
          {displayed.detail}
        </p>

        {/* Footer */}
        <div className="mt-7 pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <button
            onClick={onClose}
            className="text-[11px] font-medium text-white/40 hover:text-white/70 transition-colors duration-150"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  )
}

function FeatureCard({ feature, active, onEnter, onLeave, onOpen }: {
  feature: Feature
  active: boolean
  onEnter: () => void
  onLeave: () => void
  onOpen: () => void
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
      <button
        onClick={onOpen}
        className="mt-4 flex items-center gap-1.5 relative z-10 transition-all duration-300 text-bastion-red cursor-pointer bg-transparent border-0 p-0"
        style={{
          opacity: active ? 1 : 0,
          transform: active ? 'translateY(0)' : 'translateY(4px)',
        }}
        tabIndex={active ? 0 : -1}
      >
        <span className="text-[11px] font-medium">En savoir plus</span>
        <ArrowRightIcon />
      </button>
    </div>
  )
}

export default function Features() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [selected, setSelected] = useState<Feature | null>(null)
  const ref = useReveal()

  useEffect(() => {
    if (paused) return
    const iv = setInterval(() => setActive(i => (i + 1) % FEATURES.length), 2000)
    return () => clearInterval(iv)
  }, [paused])

  return (
    <section id="features" className="relative z-10 py-28">
      <FeatureModal feature={selected} onClose={() => setSelected(null)} />

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
                onOpen={() => setSelected(f)}
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
