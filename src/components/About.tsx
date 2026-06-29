import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Mountain, ArrowRight, MapPin, Clock, Phone } from 'lucide-react'
import { useBooking } from '../booking'
import { HOUSE } from '../config'
import SectionHeader from './SectionHeader'

const ease = [0.22, 1, 0.36, 1] as const

function HouseVisual() {
  return (
    <div className="relative rounded-3xl overflow-hidden shadow-luxe ring-1 ring-ink/5 bg-white">
      <div className="relative aspect-[16/9] overflow-hidden" style={{ background: 'linear-gradient(to bottom, #EEF4EF, #DCEAE3)' }}>
        <span className="absolute top-7 right-12 w-14 h-14 rounded-full bg-white/70 blur-[3px]" aria-hidden="true" />
        <svg viewBox="0 0 400 225" preserveAspectRatio="none" className="absolute inset-0 w-full h-full" aria-hidden="true">
          <path d="M0 225 L0 135 L80 85 L150 125 L230 68 L300 112 L360 80 L400 105 L400 225 Z" fill="#4FA288" fillOpacity="0.45" />
          <path d="M0 225 L0 165 L70 128 L150 158 L230 105 L300 150 L370 116 L400 136 L400 225 Z" fill="#0E5340" fillOpacity="0.9" />
        </svg>
      </div>
      <div className="flex items-center justify-center gap-3 px-5 py-4 border-t border-line">
        <span className="w-10 h-10 rounded-xl bg-green-tint flex items-center justify-center shrink-0">
          <Mountain size={18} strokeWidth={1.75} className="text-green-2" aria-hidden="true" />
        </span>
        <div className="text-left">
          <p className="font-sans text-sm font-600 text-ink leading-tight">Studio privé en hauteur</p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-soft mt-0.5">Saint-Baldoph · vue Belledonne</p>
        </div>
      </div>
    </div>
  )
}

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { openBooking } = useBooking()

  return (
    <section id="collectif" ref={ref} className="py-16 sm:py-24 md:py-32 px-5 md:px-10">
      <div className="max-w-container mx-auto">

        <SectionHeader
          kicker="Le studio"
          title={<>Un endroit où votre projet <span className="italic-display text-gradient-green-static">prend toute la place</span>.</>}
          lead="Pas de passage, pas de bruit. Quand vous montez ici, le studio est à vous."
        />

        {/* Prose + détails pratiques */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 max-w-5xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="flex flex-col justify-center"
          >
            <p className="font-sans text-[19px] md:text-[21px] text-ink leading-snug text-pretty font-500 mb-5">
              Sur rendez-vous uniquement. Ici, c'est votre projet qui compte.
            </p>
            <p className="font-sans text-[16px] md:text-[17px] text-ink/70 leading-relaxed text-pretty mb-8">
              Pas de file d'attente, pas d'artiste pressé. Mark, Zazz et Indy prennent le temps : comprendre votre idée, la développer, créer une pièce unique qui raconte votre histoire. Un travail de qualité dans un cadre calme et accueillant — la vue sur Belledonne, elle, vient en prime.
            </p>
            <button
              onClick={() => openBooking()}
              className="group self-start inline-flex items-center gap-2 text-ink font-600 text-[15px] border-b-2 border-green pb-1 transition-[gap] duration-200 hover:gap-3.5 active:scale-[0.98]"
            >
              Prendre rendez-vous
              <ArrowRight size={16} strokeWidth={2.25} aria-hidden="true" className="text-green transition-transform group-hover:translate-x-0.5" />
            </button>
          </motion.div>

          {/* Détails pratiques */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="rounded-2xl bg-white border border-line shadow-luxe divide-y divide-line"
          >
            <div className="flex gap-4 items-start p-6">
              <Mountain size={18} strokeWidth={1.75} className="text-green shrink-0 mt-0.5" />
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-soft mb-1">Le studio</p>
                <p className="font-sans text-[15px] text-ink font-500">Studio privé en hauteur</p>
                <p className="font-sans text-[13px] text-soft mt-0.5">Vue sur la chaîne de Belledonne</p>
              </div>
            </div>
            <div className="flex gap-4 items-start p-6">
              <MapPin size={18} strokeWidth={1.75} className="text-green shrink-0 mt-0.5" />
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-soft mb-1">Adresse</p>
                <p className="font-sans text-[15px] text-ink font-500">{HOUSE.address}</p>
                <p className="font-sans text-[13px] text-soft mt-0.5">{HOUSE.cityZip}</p>
              </div>
            </div>
            <div className="flex gap-4 items-start p-6">
              <Clock size={18} strokeWidth={1.75} className="text-green shrink-0 mt-0.5" />
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-soft mb-1">Accès</p>
                <p className="font-sans text-[15px] text-ink font-500">Sur rendez-vous uniquement.</p>
                <p className="font-sans text-[13px] text-soft mt-0.5">Pas de passage. On vous reçoit au calme.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start p-6">
              <Phone size={18} strokeWidth={1.75} className="text-green shrink-0 mt-0.5" />
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-soft mb-1">Téléphone</p>
                <a href={`tel:${HOUSE.phoneRaw}`} className="font-display text-lg font-500 text-ink hover:text-green transition-colors">
                  {HOUSE.phone}
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Visuel studio */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.35, ease }}
          className="max-w-3xl mx-auto mt-12 md:mt-16"
        >
          <HouseVisual />
        </motion.div>
      </div>
    </section>
  )
}
