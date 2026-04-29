const ITEMS = [
  'Anti-Raid', 'Anti-Nuke', 'Anti-Spam', 'Anti-Phishing',
  'Risk Scoring', 'Audit Logs', 'Système de Tickets',
  'Lockdown Automatique', 'Dashboard Web', '3 Langues',
]

function TickerItem({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-3 text-[10px] text-white/30 tracking-[1.5px] uppercase">
      <span className="w-1 h-1 rounded-full bg-bastion-red shrink-0" />
      {label}
    </span>
  )
}

export default function Ticker() {
  const doubled = [...ITEMS, ...ITEMS]

  return (
    <div className="relative z-10 border-y border-bastion-red/10 bg-bastion-red/[0.04] py-2.5 overflow-hidden">
      <div
        className="flex gap-14 whitespace-nowrap"
        style={{ width: 'max-content', animation: 'ticker 22s linear infinite' }}
      >
        {doubled.map((item, i) => (
          <TickerItem key={i} label={item} />
        ))}
      </div>
    </div>
  )
}
