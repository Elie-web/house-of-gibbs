import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Phone, MapPin, Mountain, ArrowUpRight, Mail } from 'lucide-react'
import { HOUSE } from '../config'
import SectionHeader from './SectionHeader'
import ContactForm from './ContactForm'

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const ease = [0.22, 1, 0.36, 1] as const

  return (
    <section id="studio" ref={ref} className="py-16 sm:py-24 md:py-32 px-5 md:px-10">
      <div className="max-w-container mx-auto">

        <SectionHeader
          className="mb-12 md:mb-16"
          kicker="Contact"
          title={<>Vous avez une idée ? <span className="italic-display text-gradient-green-static">On est là.</span></>}
          lead="Même floue. Même si vous n'êtes pas sûr du style ou de l'emplacement. C'est souvent comme ça que ça commence. Dites-nous ce que vous avez en tête, on vous répond en personne."
        />

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
                <p className="font-sans text-[15px] text-soft leading-relaxed text-pretty">
                  {HOUSE.view}. Sur rendez-vous uniquement, pas de passage. On vous reçoit
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
                  <p className="font-mono text-[10px] uppercase tracking-widest text-soft mb-1">Téléphone</p>
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
                  <p className="font-mono text-[10px] uppercase tracking-widest text-soft mb-1">E-mail</p>
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

          {/* Formulaire de contact (envoi par e-mail) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.18, ease }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
