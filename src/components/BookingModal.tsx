import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import { X, Phone, Mail, ArrowUpRight, MessageCircleQuestion } from 'lucide-react'
import { HOUSE, ARTISTS } from '../config'
import { useBooking } from '../booking'
import { InstagramIcon, FacebookIcon } from './icons'

const ease = [0.22, 1, 0.36, 1] as const

type Channel = {
  key: string
  label: string
  sub: string
  href: string
  external?: boolean
  icon: React.ReactNode
}

/**
 * Prise de contact sans formulaire (souhait de Mark : pas de « fiche à remplir »
 * qui fait fuir). Deux intentions claires :
 *   1. Prendre rendez-vous : on choisit son canal (Instagram, Facebook, e-mail, tél.).
 *   2. Poser une question sans engagement : le même contact, cadré autrement.
 * Un artiste peut être pré-sélectionné (openBooking('marc')) : ses réseaux passent devant.
 */
export default function BookingModal() {
  const { isOpen, artistId, closeBooking } = useBooking()
  const artist = ARTISTS.find((a) => a.id === artistId) ?? null
  const withWhom = artist ? artist.name : null

  // Verrouille le scroll + ferme à Échap
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeBooking()
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [isOpen, closeBooking])

  const instagram = artist?.instagram || HOUSE.instagram
  const facebook = artist?.facebook
  const mailSubject = artist
    ? `Prise de rendez-vous avec ${artist.name} · House of Gibbs`
    : 'Prise de rendez-vous · House of Gibbs'

  const channels: Channel[] = [
    {
      key: 'instagram',
      label: 'Instagram',
      sub: artist ? `@${artist.handle}` : 'Message direct',
      href: instagram,
      external: true,
      icon: <InstagramIcon size={19} strokeWidth={2} />,
    },
    ...(facebook
      ? [{
          key: 'facebook',
          label: 'Facebook',
          sub: 'Messenger',
          href: facebook,
          external: true,
          icon: <FacebookIcon size={19} strokeWidth={2} />,
        } as Channel]
      : []),
    {
      key: 'email',
      label: 'E-mail',
      sub: HOUSE.email,
      href: `mailto:${HOUSE.email}?subject=${encodeURIComponent(mailSubject)}`,
      icon: <Mail size={19} strokeWidth={1.9} />,
    },
    {
      key: 'phone',
      label: 'Téléphone',
      sub: HOUSE.phone,
      href: `tel:${HOUSE.phoneRaw}`,
      icon: <Phone size={18} strokeWidth={2} />,
    },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-ink/45 backdrop-blur-sm p-0 sm:p-4"
          onClick={closeBooking}
          role="dialog"
          aria-modal="true"
          aria-label="Prendre rendez-vous"
        >
          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full sm:max-w-md max-h-[92vh] overflow-y-auto overscroll-contain no-scrollbar bg-canvas rounded-t-3xl sm:rounded-3xl border border-line shadow-soft-lift"
          >
            {/* En-tête */}
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 px-6 sm:px-8 pt-7 pb-5 bg-canvas/95 backdrop-blur-md border-b border-line">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-green mb-2">
                  Sur rendez-vous · {HOUSE.city}
                </p>
                <h2 className="font-display text-2xl sm:text-[1.7rem] font-500 text-ink leading-tight">
                  {withWhom ? `Réserver avec ${withWhom}` : 'Prendre rendez-vous'}
                </h2>
              </div>
              <button
                onClick={closeBooking}
                className="shrink-0 w-10 h-10 -mr-1 flex items-center justify-center rounded-full text-soft hover:text-ink hover:bg-canvas-2 transition-colors"
                aria-label="Fermer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="px-6 sm:px-8 py-7">
              <p className="font-sans text-[15px] text-soft leading-relaxed mb-6 text-pretty">
                Choisissez le moyen qui vous arrange, on vous répond en personne.
                {withWhom ? '' : " Pas de formulaire, pas d'engagement."}
              </p>

              {/* Canaux de contact directs */}
              <div className="space-y-2.5">
                {channels.map((c) => (
                  <a
                    key={c.key}
                    href={c.href}
                    {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="group flex items-center gap-4 rounded-2xl border border-line bg-white px-4 py-3.5 transition-[border-color,box-shadow,transform] duration-200 hover:border-green hover:shadow-card active:scale-[0.99]"
                  >
                    <span className="w-11 h-11 rounded-xl bg-green-tint flex items-center justify-center text-green-2 shrink-0 transition-colors group-hover:bg-green group-hover:text-white">
                      {c.icon}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block font-sans text-[15px] font-600 text-ink leading-tight">{c.label}</span>
                      <span className="block font-sans text-[13px] text-soft truncate">{c.sub}</span>
                    </span>
                    <ArrowUpRight size={17} className="text-muted shrink-0 transition-[color,transform] group-hover:text-green group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                ))}
              </div>

              {/* Poser une question sans engagement */}
              <div className="mt-6 pt-6 border-t border-line">
                <div className="flex gap-3.5">
                  <span className="w-9 h-9 rounded-full bg-canvas-2 border border-line flex items-center justify-center shrink-0">
                    <MessageCircleQuestion size={17} strokeWidth={1.9} className="text-green" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-sans text-[14.5px] font-600 text-ink leading-snug">
                      Juste une question ?
                    </p>
                    <p className="font-sans text-[13.5px] text-soft leading-relaxed mt-1 text-pretty">
                      Vous hésitez encore ? Écrivez-nous sans engagement, on est là
                      pour ça. Un simple message suffit, on prend le temps de vous répondre.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
