'use client'

import Link from 'next/link'
import { useReveal } from '@/hooks/useReveal'
import { CheckIcon } from '@/components/ui/Icons'
import clsx from 'clsx'

interface Plan {
  name: string
  price: string
  tagline: string
  popular?: boolean
  features: Array<{ label: string; included: boolean }>
  cta: string
  href: string
}

const PLANS: Plan[] = [
  {
    name: 'Free',
    price: '0',
    tagline: 'Pour les petits serveurs',
    features: [
      { label: '3 serveurs', included: true },
      { label: 'Modules de base', included: true },
      { label: 'Logs 14 jours', included: true },
      { label: '5 règles perso', included: true },
      { label: 'Dashboard complet', included: false },
      { label: 'Support prioritaire', included: false },
    ],
    cta: 'Commencer gratuit',
    href: '#',
  },
  {
    name: 'Pro',
    price: '4.99',
    tagline: 'Communautés actives',
    popular: true,
    features: [
      { label: '10 serveurs', included: true },
      { label: 'Tous les modules', included: true },
      { label: 'Logs 40 jours', included: true },
      { label: 'Dashboard complet', included: true },
      { label: 'Support prioritaire', included: true },
      { label: 'White-label', included: false },
    ],
    cta: 'Choisir Pro',
    href: '#',
  },
  {
    name: 'Business',
    price: '14.99',
    tagline: 'Grandes communautés',
    features: [
      { label: '25 serveurs', included: true },
      { label: 'Tout le plan Pro', included: true },
      { label: 'Behaviour Graph', included: true },
      { label: 'File Scanner + API', included: true },
      { label: 'Logs 180 jours', included: true },
      { label: 'White-label', included: false },
    ],
    cta: 'Choisir Business',
    href: '#',
  },
  {
    name: 'Enterprise',
    price: '49.99',
    tagline: 'Organisations',
    features: [
      { label: '50 serveurs', included: true },
      { label: 'Self-host inclus', included: true },
      { label: 'White-label', included: true },
      { label: 'Logs 365 jours', included: true },
      { label: 'Support dédié', included: true },
      { label: 'SLA garanti', included: true },
    ],
    cta: 'Contacter',
    href: 'mailto:yaiito@proton.me',
  },
]

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <div
      className={clsx(
        'relative overflow-hidden rounded-2xl p-7 flex flex-col transition-transform duration-300 hover:-translate-y-1',
        plan.popular
          ? 'border border-bastion-red/35 bg-[#0c0e18]'
          : 'card'
      )}
    >
      {/* Accent line pour plan populaire */}
      {plan.popular && (
        <>
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-bastion-red to-transparent" />
          <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-radial-red pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(232,32,58,0.1), transparent 70%)' }}
          />
        </>
      )}

      {plan.popular && (
        <span className="inline-block self-start text-[9px] tracking-[1.5px] uppercase text-bastion-red bg-bastion-red/10 border border-bastion-red/20 rounded px-2.5 py-0.5 mb-4">
          Populaire
        </span>
      )}

      <p className={clsx(
        'font-syne font-bold text-[11px] tracking-[2px] uppercase mb-3',
        plan.popular ? 'text-bastion-red/70' : 'text-white/40'
      )}>
        {plan.name}
      </p>

      <div className="flex items-baseline gap-1 mb-1">
        {plan.price !== '0' && <span className="text-base text-white/40 font-light">€</span>}
        <span className="font-syne font-extrabold text-[40px] leading-none tracking-[-3px]">
          {plan.price}
        </span>
        <span className="text-[11px] text-white/25">€/mois</span>
      </div>

      <p className="text-[11px] text-white/25 mb-5 font-light">{plan.tagline}</p>

      <div className="h-px bg-white/[0.05] mb-5" />

      <ul className="flex flex-col gap-2 mb-6 flex-1">
        {plan.features.map((f, i) => (
          <li
            key={i}
            className={clsx(
              'flex items-start gap-2 text-[11px] font-light leading-snug',
              f.included ? 'text-white/40' : 'text-white/20 opacity-40'
            )}
          >
            <CheckIcon />
            {f.label}
          </li>
        ))}
      </ul>

      <Link
        href={plan.href}
        className={clsx(
          'block w-full text-center text-[12px] font-medium py-2.5 rounded-lg transition-all duration-200',
          plan.popular
            ? 'bg-bastion-red text-white hover:shadow-[0_8px_24px_rgba(232,32,58,0.4)]'
            : 'bg-white/[0.04] border border-white/[0.08] text-white/50 hover:bg-white/[0.07] hover:text-white'
        )}
      >
        {plan.cta}
      </Link>
    </div>
  )
}

export default function Pricing() {
  const ref = useReveal()

  return (
    <section id="pricing" className="relative z-10 py-28">
      <div className="container-site">
        <div ref={ref} className="reveal">
          <p className="section-label">Tarifs</p>
          <h2 className="section-title">
            Commence <span className="text-bastion-red">gratuit.</span>
            <br />Scale quand tu veux.
          </h2>
          <p className="text-white/35 text-sm mb-14 font-light">Aucune carte bancaire pour démarrer.</p>

          <div className="grid grid-cols-4 gap-3.5">
            {PLANS.map(plan => (
              <PlanCard key={plan.name} plan={plan} />
            ))}
          </div>

          <p className="text-center text-[11px] text-white/20 mt-7 font-light">
            Ces limites existent pour que le service reste rapide et fiable pour tout le monde.
          </p>
        </div>
      </div>
    </section>
  )
}
