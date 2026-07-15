import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Phone, MapPin, Mail, ArrowUpRight, MessageCircleQuestion, CalendarCheck } from 'lucide-react'
import { HOUSE } from '../config'
import { InstagramIcon, FacebookIcon } from './icons'
import SectionHeader from './SectionHeader'

const ease = [0.22, 1, 0.36, 1] as const

// Canaux de contact directs (aucun formulaire, souhait de Mark)
const CHANNELS = [
  { key: 'instagram', label: 'Instagram', sub: 'Message direct', href: HOUSE.instagram, external: true, icon: <InstagramIcon size={18} strokeWidth={2} /> },
  { key: 'facebook',  label: 'Facebook',  sub: 'Message direct', href: HOUSE.facebook,  external: true, icon: <FacebookIcon size={18} strokeWidth={2} /> },
  { key: 'email',     label: 'E-mail',    sub: HOUSE.email,      href: `mailto:${HOUSE.email}`, icon: <Mail size={18} strokeWidth={1.9} /> },
  { key: 'phone',     label: 'Téléphone', sub: HOUSE.phone,      href: `tel:${HOUSE.phoneRaw}`, icon: <Phone size={17} strokeWidth={2} /> },
]

function ChannelRow({ c }: { c: (typeof CHANNELS)[number] }) {
  return (
    <a
      href={c.href}
      {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="group flex items-center gap-3.5 rounded-2xl border border-line bg-white px-4 py-3 transition-[border-color,box-shadow,transform] duration-200 hover:border-green hover:shadow-card active:scale-[0.99]"
    >
      <span className="w-10 h-10 rounded-xl bg-green-tint flex items-center justify-center text-green-2 shrink-0 transition-colors group-hover:bg-green group-hover:text-white">
        {c.icon}
      </span>
      <span className="flex-1 min-w-0">
        <span className="block font-sans text-[14.5px] font-600 text-ink leading-tight">{c.label}</span>
        <span className="block font-sans text-[13px] text-soft truncate">{c.sub}</span>
      </span>
      <ArrowUpRight size={16} className="text-muted shrink-0 transition-[color,transform] group-hover:text-green group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </a>
  )
}

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="studio" ref={ref} className="py-16 sm:py-24 md:py-32 px-5 md:px-10">
      <div className="max-w-container mx-auto">

        <SectionHeader
          className="mb-12 md:mb-16"
          title={<>Un projet, <span className="text-gradient-green-static">une question</span> ?</>}
        />

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">

          {/* Colonne intentions : prendre RDV / poser une question */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="space-y-6"
          >
            {/* Prise de rendez-vous */}
            <div className="rounded-3xl border border-line bg-canvas-2/50 p-6 md:p-7">
              <div className="flex items-center gap-2.5 mb-2">
                <CalendarCheck size={18} strokeWidth={1.9} className="text-green" aria-hidden="true" />
                <h3 className="font-display text-xl font-500 text-ink">Prendre rendez-vous</h3>
              </div>
              <p className="font-sans text-[14.5px] text-soft leading-relaxed mb-5 text-pretty">
                Choisissez le moyen qui vous arrange. On revient toujours vers vous
                en personne pour caler votre projet.
              </p>
              <div className="space-y-2.5">
                {CHANNELS.map((c) => <ChannelRow key={c.key} c={c} />)}
              </div>
            </div>

            {/* Poser une question sans engagement */}
            <div className="rounded-3xl border border-line bg-canvas-2/50 p-6 md:p-7">
              <div className="flex items-center gap-2.5 mb-2">
                <MessageCircleQuestion size={18} strokeWidth={1.9} className="text-green" aria-hidden="true" />
                <h3 className="font-display text-xl font-500 text-ink">Poser une question, sans engagement</h3>
              </div>
              <p className="font-sans text-[14.5px] text-soft leading-relaxed text-pretty">
                Vous hésitez encore ? Écrivez-nous simplement, sans rien engager.
                Un message par{' '}
                <a href={HOUSE.instagram} target="_blank" rel="noopener noreferrer" className="text-green font-600 border-b border-green/40 hover:border-green transition-colors">Instagram</a>
                {' '}ou par{' '}
                <a href={`mailto:${HOUSE.email}?subject=${encodeURIComponent('Une question · House of Gibbs')}`} className="text-green font-600 border-b border-green/40 hover:border-green transition-colors">e-mail</a>
                {' '}suffit, on prend le temps de vous répondre.
              </p>
            </div>
          </motion.div>

          {/* Colonne studio : où nous trouver */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.18, ease }}
            className="space-y-6"
          >
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-canvas-2 flex items-center justify-center border border-line shrink-0">
                <MapPin size={16} strokeWidth={1.75} className="text-green" />
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted mb-1">Le studio</p>
                <p className="font-display text-lg font-500 text-ink">{HOUSE.address}</p>
                <p className="font-sans text-sm text-soft">{HOUSE.cityZip}</p>
                <p className="font-sans text-sm text-soft mt-1.5 text-pretty">
                  Studio privé, sur rendez-vous uniquement. Pas de passage sans créneau convenu.
                </p>
                <a
                  href={HOUSE.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-green text-xs font-600 mt-2.5 border-b border-green/40 pb-0.5 hover:border-green transition-colors"
                >
                  Voir sur Google Maps
                  <ArrowUpRight size={12} />
                </a>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-line h-64 sm:h-72">
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
        </div>
      </div>
    </section>
  )
}
