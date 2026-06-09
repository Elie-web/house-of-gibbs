import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Phone, MapPin, Mountain, ArrowRight, ArrowUpRight, Mail } from 'lucide-react'
import { HOUSE } from '../config'
import { useBooking } from '../booking'

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const { openBooking } = useBooking()
  const ease = [0.22, 1, 0.36, 1] as const

  return (
    <section id="studio" ref={ref} className="py-16 sm:py-24 md:py-32 px-5 md:px-10 bg-canvas">
      <div className="max-w-container mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
          className="mb-12 md:mb-16 max-w-2xl"
        >
          <p className="font-mono text-[11px] uppercase tracking-widest text-green mb-5">Le studio</p>
          <h2 className="font-display text-[clamp(2.2rem,5vw,3.8rem)] font-400 tracking-tight text-ink leading-[1.05]">
            En hauteur, au calme, <span className="italic-display text-gradient-green-static">face à Belledonne</span>.
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">

          {/* Infos + carte */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="space-y-7"
          >
            <div className="flex gap-4 p-5 bg-green-tint/60 rounded-2xl border border-line">
              <Mountain size={20} strokeWidth={1.75} className="text-green-2 shrink-0 mt-0.5" />
              <div>
                <p className="font-sans text-sm font-600 text-ink mb-1">Studio privé en hauteur</p>
                <p className="font-sans text-[13.5px] text-soft leading-relaxed">
                  {HOUSE.view}. Sur rendez-vous uniquement — pas de passage. On vous reçoit
                  dans le calme, à la lumière de la montagne.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-canvas-2 flex items-center justify-center border border-line shrink-0">
                  <Phone size={16} strokeWidth={1.75} className="text-green" />
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted mb-1">Téléphone</p>
                  <a href={`tel:${HOUSE.phoneRaw}`} className="font-display text-lg font-500 text-ink hover:text-green transition-colors">
                    {HOUSE.phone}
                  </a>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-canvas-2 flex items-center justify-center border border-line shrink-0">
                  <Mail size={16} strokeWidth={1.75} className="text-green" />
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted mb-1">E-mail</p>
                  <a href={`mailto:${HOUSE.email}`} className="font-sans text-sm font-600 text-ink hover:text-green transition-colors break-all">
                    {HOUSE.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-canvas-2 flex items-center justify-center border border-line shrink-0">
                <MapPin size={16} strokeWidth={1.75} className="text-green" />
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted mb-1">Adresse</p>
                <p className="font-display text-lg font-500 text-ink">{HOUSE.address}</p>
                <p className="font-sans text-sm text-soft">{HOUSE.cityZip}</p>
                <a
                  href={HOUSE.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-green text-xs font-600 mt-2 border-b border-green/40 pb-0.5 hover:border-green transition-colors"
                >
                  Voir sur Google Maps
                  <ArrowUpRight size={12} />
                </a>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-line h-56">
              <iframe
                src={HOUSE.mapEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localisation House of Gibbs"
              />
            </div>
          </motion.div>

          {/* Bloc CTA réservation */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.18, ease }}
            className="relative rounded-3xl bg-ink text-canvas p-8 md:p-10 flex flex-col justify-between overflow-hidden"
          >
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full blur-[90px] opacity-30" style={{ background: 'radial-gradient(circle, #16745A, transparent 70%)' }} />
            <div className="relative">
              <p className="font-mono text-[11px] uppercase tracking-widest text-green-3 mb-6">Prêt·e à vous lancer&nbsp;?</p>
              <h3 className="font-display text-[clamp(1.8rem,3.6vw,2.6rem)] font-400 leading-[1.1] mb-5">
                Votre projet commence par <span className="italic-display text-green-3">une demande</span>.
              </h3>
              <p className="font-sans text-[15px] text-ink-soft leading-relaxed max-w-sm mb-9">
                Choisissez votre artiste, décrivez votre idée et vos disponibilités.
                On vous répond en personne pour fixer la consultation — jamais un devis automatique.
              </p>
            </div>

            <div className="relative">
              <button
                onClick={() => openBooking()}
                className="group w-full inline-flex items-center justify-center gap-2 py-4 bg-canvas text-ink font-600 rounded-full text-sm transition-transform active:scale-[0.99] hover:bg-green hover:text-canvas"
              >
                Prendre rendez-vous
                <ArrowRight size={16} strokeWidth={2.25} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
              <p className="text-center font-sans text-[12px] text-ink-soft mt-4">
                Ou par téléphone :{' '}
                <a href={`tel:${HOUSE.phoneRaw}`} className="text-green-3 font-600 hover:text-canvas transition-colors">{HOUSE.phone}</a>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
