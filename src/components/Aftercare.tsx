import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Droplets, Sparkles, Sun, Hand, ArrowRight } from 'lucide-react'
import { useBooking } from '../booking'
import SectionHeader from './SectionHeader'

const ease = [0.22, 1, 0.36, 1] as const

/**
 * « Le soin » - l'aftercare prouve l'expertise et rassure : un tatouage bien
 * accompagné garde la netteté de son trait pendant des décennies. Présenté en
 * liste éditoriale (pas en grille de cartes) pour rester sobre.
 */
const CARE = [
  { icon: Droplets, title: 'Gardez-le propre', text: "Lavez en douceur à l'eau tiède et au savon neutre, puis séchez en tamponnant, sans frotter." },
  { icon: Sparkles,  title: 'Hydratez en finesse', text: "Une fine couche de soin, plusieurs fois par jour. On nourrit la peau sans jamais l'étouffer." },
  { icon: Sun,       title: 'Soleil et eau, plus tard', text: "Pas de soleil direct, de piscine, de sauna ni de bain prolongé le temps que la peau cicatrise." },
  { icon: Hand,      title: 'Laissez la peau travailler', text: "On ne gratte pas, on n'arrache pas les croûtes. Elles tombent seules, et le trait reste net." },
]

export default function Aftercare() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { openBooking } = useBooking()

  return (
    <section id="soin" ref={ref} className="py-16 sm:py-24 md:py-32 px-5 md:px-10">
      <div className="max-w-container mx-auto">
        <SectionHeader
          kicker="Après la séance"
          title={<>Une fois la séance finie, <span className="italic-display text-gradient-green-static">le soin prend le relais</span>.</>}
          lead="Bien accompagné, un trait garde sa netteté des années durant. L'essentiel tient en quelques gestes. Le reste, on vous l'explique de vive voix."
        />

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-5xl mx-auto">
          {/* Intro + réassurance + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="flex flex-col"
          >
            <p className="font-sans text-[19px] md:text-[22px] text-ink leading-snug text-pretty font-500 mb-5">
              Un beau tatouage se soigne aussi les jours d'après.
            </p>
            <p className="font-sans text-[16px] md:text-[17px] text-ink/70 leading-relaxed text-pretty mb-8">
              En fin de séance, on vous remet des consignes claires, pensées pour votre pièce et pour votre peau. Ensuite, on ne vous lâche pas : tout au long de la cicatrisation, la moindre question, vous nous écrivez.
            </p>
            <button
              onClick={() => openBooking()}
              className="group self-start inline-flex items-center gap-2 text-ink font-600 text-[15px] border-b-2 border-green pb-1 transition-[gap] duration-200 hover:gap-3.5 active:scale-[0.98]"
            >
              Une question sur la cicatrisation ?
              <ArrowRight size={16} strokeWidth={2.25} aria-hidden className="text-green transition-transform group-hover:translate-x-0.5" />
            </button>
          </motion.div>

          {/* Gestes essentiels - liste séparée par hairlines */}
          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.22, ease }}
            className="rounded-2xl bg-white border border-line shadow-luxe divide-y divide-line"
          >
            {CARE.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-4 items-start p-5 md:p-6">
                <span className="w-10 h-10 rounded-xl bg-green-tint flex items-center justify-center shrink-0">
                  <Icon size={18} strokeWidth={1.8} className="text-green-2" aria-hidden />
                </span>
                <div>
                  <p className="font-display text-lg font-500 text-ink leading-snug">{title}</p>
                  <p className="font-sans text-[14.5px] text-soft leading-relaxed mt-1 text-pretty">{text}</p>
                </div>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  )
}
