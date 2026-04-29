import Link from 'next/link'

const LINKS = [
  { href: 'https://github.com/Jonathan-p-z/Bastion', label: 'GitHub' },
  { href: 'https://dashboard-bastion.yaiito.fr', label: 'Dashboard' },
  { href: '/legal', label: 'Mentions légales' },
  { href: '/legal#cgu', label: 'CGU' },
  { href: '/legal#rgpd', label: 'RGPD' },
]

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.04] py-6">
      <div className="container-site flex items-center justify-between">
        <span className="font-syne font-extrabold text-sm">
          <span className="text-bastion-red">BAS</span>TION
        </span>

        <ul className="flex items-center gap-5">
          {LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="text-white/20 hover:text-white/55 text-[11px] transition-colors duration-200"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <span className="text-white/15 text-[11px]">© 2026 yaiito</span>
      </div>
    </footer>
  )
}
