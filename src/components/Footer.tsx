import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'
import { HOUSE, ARTISTS } from '../config'
import { InstagramIcon } from './icons'
import { logoMark } from '../assets'

const ease = [0.22, 1, 0.36, 1] as const

const NAV_LINKS = [
  { label: 'Les artistes', href: '#artistes' },
  { label: 'Les galeries', href: '#galeries' },
  { label: 'Instagram',    href: '#instagram' },
  { label: 'Contact',      href: '#studio' },
]

/* ── Modale mentions légales ──────────────────────────────────────────── */
function LegalModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[120] flex items-center justify-center bg-ink/80 backdrop-blur-md p-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ duration: 0.32, ease }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Mentions légales"
        className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl bg-canvas text-ink border border-line shadow-luxe p-7 md:p-9"
      >
        <button
          onClick={onClose}
          aria-label="Fermer"
          className="absolute top-4 right-4 w-9 h-9 rounded-full border border-line flex items-center justify-center text-soft hover:text-ink hover:bg-canvas-2 transition-colors"
        >
          <X size={16} />
        </button>

        <p className="font-mono text-[10px] uppercase tracking-widest text-green mb-2">Informations légales</p>
        <h2 className="font-display text-2xl font-500 text-ink mb-6">Mentions légales</h2>

        <div className="space-y-6 font-sans text-[14px] text-ink/75 leading-relaxed">
          <section>
            <h3 className="font-600 text-ink mb-1.5">Éditeur du site</h3>
            <p>
              {HOUSE.name}, [forme juridique à compléter], SIRET [à compléter].<br />
              {HOUSE.address}, {HOUSE.cityZip}.<br />
              Téléphone : {HOUSE.phone} · E-mail : {HOUSE.email}<br />
              Directeur de la publication : [à compléter].
            </p>
          </section>
          <section>
            <h3 className="font-600 text-ink mb-1.5">Hébergement</h3>
            <p>Site hébergé par [hébergeur à compléter], [adresse de l'hébergeur].</p>
          </section>
          <section>
            <h3 className="font-600 text-ink mb-1.5">Propriété intellectuelle</h3>
            <p>
              L'ensemble des contenus de ce site (photographies, textes, logo, identité visuelle) est la
              propriété de {HOUSE.name}. Toute reproduction, même partielle, est interdite sans autorisation
              écrite préalable.
            </p>
          </section>
          <section>
            <h3 className="font-600 text-ink mb-1.5">Données personnelles</h3>
            <p>
              Les informations transmises via le formulaire de contact servent uniquement à répondre à votre
              demande. Elles ne sont ni revendues ni cédées. Conformément au RGPD, vous disposez d'un droit
              d'accès, de rectification et de suppression de vos données en écrivant à {HOUSE.email}.
            </p>
          </section>
        </div>

        <p className="mt-7 pt-5 border-t border-line font-sans text-[12px] text-muted">
          Modèle à finaliser avec les informations administratives de la maison avant la mise en ligne.
        </p>
      </motion.div>
    </motion.div>
  )
}

export default function Footer() {
  const [legalOpen, setLegalOpen] = useState(false)

  return (
    <footer className="bg-green-bg text-canvas px-5 md:px-10 pt-16 pb-28 lg:pb-10">
      <div className="max-w-container mx-auto">

        <div className="grid md:grid-cols-[1.4fr_1fr_1fr] gap-12 mb-14">

          {/* Identité */}
          <div>
            <img src={logoMark} alt="House of Gibbs" className="h-12 w-auto mb-4 invert" />
            <p className="font-display text-2xl font-500 mb-1">{HOUSE.name}</p>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted mb-5">
              {HOUSE.city} · {HOUSE.department}
            </p>
            <p className="font-sans text-sm text-ink-soft leading-relaxed max-w-xs mb-6">
              Collectif familial de tatoueurs. Studio privé en hauteur, sur rendez-vous uniquement.
            </p>
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
              className="group inline-flex items-center gap-1.5 text-green-3 text-xs font-600 mt-2 hover:gap-2.5 transition-[gap]"
            >
              Voir sur Maps
              <ArrowUpRight size={11} />
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-green-bg-line flex flex-col md:flex-row items-center justify-between gap-3 text-center">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <p className="font-sans text-xs text-muted">© 2026 {HOUSE.name}. Tous droits réservés.</p>
            <button
              onClick={() => setLegalOpen(true)}
              className="font-sans text-xs text-muted hover:text-green-3 underline underline-offset-2 decoration-ink-line hover:decoration-green-3 transition-colors"
            >
              Mentions légales
            </button>
          </div>
          <p className="font-sans text-xs text-muted">
            Site web réalisé par{' '}
            <a
              href="https://elieageron.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-600 text-ink-soft hover:text-green-3 underline underline-offset-2 decoration-ink-line hover:decoration-green-3 transition-colors"
            >
              Elie Ageron
            </a>
          </p>
        </div>
      </div>

      <AnimatePresence>
        {legalOpen && <LegalModal onClose={() => setLegalOpen(false)} />}
      </AnimatePresence>
    </footer>
  )
}
