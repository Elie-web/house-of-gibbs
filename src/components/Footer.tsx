import { ArrowUpRight } from 'lucide-react'
import { HOUSE, ARTISTS } from '../config'
import { InstagramIcon } from './icons'

const NAV_LINKS = [
  { label: 'Le collectif', href: '#collectif' },
  { label: 'Les artistes', href: '#artistes' },
  { label: 'Galerie',      href: '#galerie' },
  { label: 'Instagram',    href: '#instagram' },
  { label: 'Le studio',    href: '#studio' },
]

export default function Footer() {
  return (
    <footer className="bg-ink text-canvas px-5 md:px-10 pt-16 pb-28 lg:pb-10">
      <div className="max-w-container mx-auto">

        <div className="grid md:grid-cols-[1.4fr_1fr_1fr] gap-12 mb-14">

          {/* Identité */}
          <div>
            <p className="font-display text-2xl font-500 mb-1">{HOUSE.name}</p>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted mb-5">
              {HOUSE.city} · {HOUSE.department}
            </p>
            <p className="font-sans text-sm text-ink-soft leading-relaxed max-w-xs mb-6">
              Collectif familial de tatoueurs. Studio privé en hauteur, vue sur Belledonne.
              Sur rendez-vous uniquement.
            </p>
            <p className="font-display text-base italic-display text-green-3">« {HOUSE.tagline} »</p>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted mb-5">Navigation</p>
            <nav className="flex flex-col gap-2.5">
              {NAV_LINKS.map((link) => (
                <a key={link.href} href={link.href} className="font-sans text-sm text-ink-soft hover:text-green-3 transition-colors w-fit">
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Artistes + contact */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted mb-5">Les artistes</p>
            <div className="flex flex-col gap-2.5 mb-6">
              {ARTISTS.map((a) => (
                <a
                  key={a.id}
                  href={a.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ '--accent': a.accent } as React.CSSProperties}
                  className="group inline-flex items-center gap-2 font-sans text-sm text-ink-soft hover:text-canvas transition-colors w-fit"
                >
                  <InstagramIcon size={14} className="text-[var(--accent)]" />
                  {a.name} · @{a.handle}
                </a>
              ))}
            </div>
            <a href={`tel:${HOUSE.phoneRaw}`} className="font-sans text-sm text-ink-soft hover:text-green-3 transition-colors block">
              {HOUSE.phone}
            </a>
            <a
              href={HOUSE.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-green-3 text-xs font-600 mt-2 hover:gap-2.5 transition-all"
            >
              Voir sur Maps
              <ArrowUpRight size={11} />
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-ink-line flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-sans text-xs text-muted">© 2026 {HOUSE.name}. Tous droits réservés.</p>
          <p className="font-mono text-[10px] uppercase tracking-wide text-muted">Marc · Isabelle · Indi — {HOUSE.city}</p>
        </div>
      </div>
    </footer>
  )
}
