'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useCountUp } from '@/hooks/useCountUp'
import { DiscordIcon } from '@/components/ui/Icons'

const ROTATING_WORDS = ['raiders', 'spammers', 'nukers', 'phishers', 'bots']

function RotatingWord() {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const iv = setInterval(() => {
      setVisible(false)
      setOffset(-10)
      setTimeout(() => {
        setIndex(i => (i + 1) % ROTATING_WORDS.length)
        setOffset(10)
        setTimeout(() => { setVisible(true); setOffset(0) }, 40)
      }, 250)
    }, 2500)
    return () => clearInterval(iv)
  }, [])

  return (
    <span
      className="text-bastion-red inline-block min-w-[220px] text-left"
      style={{
        opacity: visible ? 1 : 0,
        transform: `translateY(${offset}px)`,
        transition: 'opacity 0.22s ease, transform 0.22s ease',
      }}
    >
      {ROTATING_WORDS[index]}
    </span>
  )
}

function StatItem({ value, label, border = true }: { value: string; label: string; border?: boolean }) {
  return (
    <div className={`px-8 text-center ${border ? 'border-r border-white/[0.07]' : ''}`}>
      <div className="font-syne font-extrabold text-2xl tracking-tight">{value}</div>
      <div className="text-[10px] text-white/30 uppercase tracking-widest mt-1">{label}</div>
    </div>
  )
}

export default function Hero() {
  const serverCount = useCountUp(847, 900)

  return (
    <section className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6 pb-32 pt-24">
      {/* Badge actif */}
      <div
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-bastion-red/25 bg-bastion-red/8 text-bastion-red text-[10px] tracking-[1.5px] uppercase mb-9"
        style={{ animation: 'fadeUp 0.8s ease 0.2s both' }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-bastion-red" style={{ animation: 'blink 1.5s ease-in-out infinite' }} />
        Actif en temps réel · Anti-Raid · Anti-Nuke · Anti-Phishing
      </div>

      {/* Logo */}
      <div className="relative mb-8" style={{ animation: 'fadeUp 0.8s ease 0.3s both' }}>
        <div
          className="absolute top-1/2 left-1/2 w-40 h-40 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(232,32,58,0.18) 0%, transparent 70%)',
            animation: 'glowPulse 4s ease-in-out infinite',
          }}
        />
        <Image
          src="/logo.png"
          alt="Bastion"
          width={88}
          height={88}
          className="relative z-10 object-contain drop-shadow-[0_0_22px_rgba(232,32,58,0.5)]"
          style={{ animation: 'float 6s ease-in-out infinite' }}
          priority
        />
      </div>

      {/* Titre */}
      <h1
        className="font-syne font-extrabold text-6xl lg:text-[82px] tracking-[-3px] leading-none mb-1"
        style={{ animation: 'fadeUp 0.8s ease 0.4s both' }}
      >
        Ton serveur dort.
      </h1>

      <div
        className="font-syne font-extrabold text-6xl lg:text-[82px] tracking-[-3px] leading-none mb-7 flex items-center justify-center gap-3 flex-wrap"
        style={{ animation: 'fadeUp 0.8s ease 0.5s both' }}
      >
        <span>Les</span>
        <RotatingWord />
        <span>, non.</span>
      </div>

      {/* Sous-titre */}
      <p
        className="text-white/40 text-[15px] leading-relaxed max-w-md mb-11 font-light"
        style={{ animation: 'fadeUp 0.8s ease 0.6s both' }}
      >
        Pendant que tu dors, Bastion veille. Détection, blocage et notification — tout se passe sans toi.
      </p>

      {/* Boutons */}
      <div
        className="flex items-center gap-3 mb-14"
        style={{ animation: 'fadeUp 0.8s ease 0.7s both' }}
      >
        <Link href="#" className="btn-red">
          <DiscordIcon />
          Ajouter à Discord — gratuit
        </Link>
        <Link href="https://dashboard-bastion.yaiito.fr" className="btn-ghost">
          Dashboard →
        </Link>
      </div>

      {/* Stats */}
      <div
        className="flex items-stretch"
        style={{ animation: 'fadeUp 0.8s ease 0.85s both' }}
      >
        <StatItem value={String(serverCount)} label="Serveurs protégés" />
        <StatItem value="6" label="Modules actifs" />
        <StatItem value="3" label="Langues" />
        <StatItem
          value="100%"
          label="Temps réel"
          border={false}
        />
      </div>

      {/* Vague animée */}
      <div className="absolute bottom-0 left-0 right-0 h-24 overflow-hidden pointer-events-none">
        <svg
          className="absolute w-[200%] h-full"
          style={{ animation: 'wave 9s linear infinite' }}
          viewBox="0 0 1440 96"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0,48 C180,86 360,10 540,48 C720,86 900,10 1080,48 C1260,86 1440,10 1440,48 L1440,96 L0,96 Z" fill="rgba(232,32,58,0.12)" />
        </svg>
        <svg
          className="absolute w-[200%] h-full opacity-35"
          style={{ animation: 'wave 13s linear infinite reverse' }}
          viewBox="0 0 1440 96"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0,62 C240,22 480,88 720,58 C960,28 1200,78 1440,52 L1440,96 L0,96 Z" fill="rgba(232,32,58,0.07)" />
        </svg>
      </div>
    </section>
  )
}
