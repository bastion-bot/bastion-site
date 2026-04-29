'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import clsx from 'clsx'

const NAV_LINKS = [
  { href: '#features', label: 'Fonctionnalités' },
  { href: '#pricing', label: 'Tarifs' },
  { href: 'https://github.com/Jonathan-p-z/Bastion', label: 'GitHub' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={clsx(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled
        ? 'bg-bastion-bg/95 backdrop-blur-md border-b border-white/[0.04]'
        : 'bg-gradient-to-b from-bastion-bg/95 to-transparent'
    )}>
      <div className="container-site flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2.5 font-syne font-extrabold text-lg tracking-tight">
          <Image
            src="/logo.png"
            alt="Bastion"
            width={26}
            height={26}
            className="object-contain drop-shadow-[0_0_8px_rgba(232,32,58,0.4)]"
          />
          <span>
            <span className="text-bastion-red">BAS</span>TION
          </span>
        </Link>

        <ul className="flex items-center gap-7">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="text-white/50 hover:text-white text-[11px] tracking-widest uppercase transition-colors duration-200"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            href="https://dashboard-bastion.yaiito.fr"
            className="text-white/55 hover:text-white border border-white/15 hover:border-white/30 rounded-md px-4 py-1.5 text-[11px] transition-all duration-200"
          >
            Dashboard
          </Link>
          <Link
            href="#"
            className="btn-red text-[11px] px-4 py-1.5"
          >
            + Ajouter à Discord
          </Link>
        </div>
      </div>
    </nav>
  )
}
