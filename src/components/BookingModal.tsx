import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { X, Check, ArrowRight, Phone } from 'lucide-react'
import { HOUSE, ARTISTS } from '../config'
import { useBooking } from '../booking'

const ease = [0.22, 1, 0.36, 1] as const

export default function BookingModal() {
  const { isOpen, artistId, closeBooking } = useBooking()
  const [artist, setArtist] = useState<string>(artistId ?? '')
  const [sent, setSent] = useState(false)

  // Synchronise l'artiste pré-sélectionné à chaque ouverture
  useEffect(() => {
    if (isOpen) {
      setArtist(artistId ?? '')
      setSent(false)
    }
  }, [isOpen, artistId])

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

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const artistObj = ARTISTS.find((a) => a.id === data.get('artist'))
    const artistLabel = artistObj ? `${artistObj.name} (${artistObj.handle})` : 'Indifférent'

    // --- Envoi par e-mail ---
    // Démo sans backend : ouvre le client mail pré-rempli vers HOUSE.email.
    // Pour un envoi 100% automatique, branchez ici un service (EmailJS,
    // Formspree, Resend…) à la place du mailto ci-dessous.
    const subject = `Demande de RDV · ${data.get('prenom')} · ${artistLabel}`
    const body = [
      `Prénom    : ${data.get('prenom')}`,
      `Téléphone : ${data.get('tel')}`,
      `E-mail    : ${data.get('email') || 'Non communiqué'}`,
      `Artiste   : ${artistLabel}`,
      `Dispos    : ${data.get('dispos') || 'Non précisées'}`,
      '',
      'Projet :',
      `${data.get('projet')}`,
    ].join('\n')

    window.location.href = `mailto:${HOUSE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-ink/40 backdrop-blur-sm p-0 sm:p-4"
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
            className="relative w-full sm:max-w-lg max-h-[92vh] overflow-y-auto overscroll-contain no-scrollbar bg-canvas rounded-t-3xl sm:rounded-3xl border border-line shadow-soft-lift"
          >
            {/* En-tête */}
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 px-6 sm:px-8 pt-7 pb-5 bg-canvas/95 backdrop-blur-md border-b border-line">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-green mb-2">
                  Sur rendez-vous · {HOUSE.city}
                </p>
                <h2 className="font-display text-2xl sm:text-[1.7rem] font-500 text-ink leading-tight">
                  Prendre rendez-vous
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

            {sent ? (
              <div className="px-6 sm:px-8 py-12 text-center">
                <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-green-tint flex items-center justify-center">
                  <Check size={26} strokeWidth={2.5} className="text-green-2" />
                </div>
                <h3 className="font-display text-2xl font-500 text-ink mb-3">Dernière étape</h3>
                <p className="font-sans text-[15px] text-soft leading-relaxed max-w-sm mx-auto mb-8">
                  Votre messagerie s'est ouverte avec la demande pré-remplie. Vérifiez,
                  puis appuyez sur <span className="text-ink font-600">Envoyer</span>. On vous
                  répond rapidement pour fixer la consultation.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href={`tel:${HOUSE.phoneRaw}`}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-ink text-canvas text-sm font-600 rounded-full hover:bg-green transition-colors"
                  >
                    <Phone size={15} strokeWidth={2.5} />
                    Ou appeler {HOUSE.phone}
                  </a>
                  <button
                    onClick={closeBooking}
                    className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-600 text-ink rounded-full border border-line hover:bg-canvas-2 transition-colors"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="px-6 sm:px-8 py-7 space-y-5">
                {/* Choix de l'artiste */}
                <div className="space-y-2.5">
                  <label className="block font-mono text-[10px] tracking-widest uppercase text-muted">
                    Avec quel artiste&nbsp;?
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[{ id: '', name: 'Indifférent', handle: 'au choix', accent: '#828D86' }, ...ARTISTS].map((a) => {
                      const active = artist === a.id
                      return (
                        <button
                          type="button"
                          key={a.id || 'any'}
                          onClick={() => setArtist(a.id)}
                          style={{ '--accent': a.accent } as React.CSSProperties}
                          className={`rounded-xl border px-2.5 py-3 text-center transition-[background-color,border-color,box-shadow] duration-200 ${
                            active
                              ? 'border-[var(--accent)] ring-2 ring-[var(--accent)] bg-canvas-2'
                              : 'border-line bg-white hover:border-muted'
                          }`}
                        >
                          <span className="block w-2.5 h-2.5 mx-auto mb-2 rounded-full" style={{ background: 'var(--accent)' }} />
                          <span className="block font-sans text-[13px] font-600 text-ink leading-tight">{a.name}</span>
                          <span className="block font-mono text-[9px] uppercase tracking-wide text-muted mt-0.5">{a.handle}</span>
                        </button>
                      )
                    })}
                  </div>
                  <input type="hidden" name="artist" value={artist} />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="b-prenom" className="block font-mono text-[10px] tracking-widest uppercase text-muted">Prénom</label>
                    <input id="b-prenom" name="prenom" type="text" autoComplete="given-name" placeholder="Votre prénom" className="field" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="b-tel" className="block font-mono text-[10px] tracking-widest uppercase text-muted">Téléphone</label>
                    <input id="b-tel" name="tel" type="tel" autoComplete="tel" inputMode="tel" placeholder="06 00 00 00 00" className="field" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="b-email" className="block font-mono text-[10px] tracking-widest uppercase text-muted">E-mail (optionnel)</label>
                  <input id="b-email" name="email" type="email" autoComplete="email" spellCheck={false} placeholder="vous@email.com" className="field" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="b-dispos" className="block font-mono text-[10px] tracking-widest uppercase text-muted">Vos disponibilités</label>
                  <input id="b-dispos" name="dispos" type="text" placeholder="Ex. en semaine après 17h, week-ends…" className="field" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="b-projet" className="block font-mono text-[10px] tracking-widest uppercase text-muted">Votre projet</label>
                  <textarea id="b-projet" name="projet" rows={4} placeholder="Idée, emplacement, taille approximative, référence…" className="field" required />
                </div>

                <button
                  type="submit"
                  className="group w-full inline-flex items-center justify-center gap-2 py-4 bg-ink text-canvas font-600 rounded-full text-sm transition-colors hover:bg-green active:scale-[0.99]"
                >
                  Envoyer ma demande
                  <ArrowRight size={16} strokeWidth={2.25} className="group-hover:translate-x-0.5 transition-transform" />
                </button>

                <p className="text-center font-sans text-[11px] text-muted">
                  Ou directement par téléphone :{' '}
                  <a href={`tel:${HOUSE.phoneRaw}`} className="text-green font-600 hover:text-green-2 transition-colors">{HOUSE.phone}</a>
                </p>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
