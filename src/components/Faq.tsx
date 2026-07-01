import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Plus } from 'lucide-react'
import { FAQ } from '../config'
import { useBooking } from '../booking'
import SectionHeader from './SectionHeader'

const ease = [0.22, 1, 0.36, 1] as const

export default function Faq() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-70px' })
  const [open, setOpen] = useState<number | null>(0)
  const { openBooking } = useBooking()

  return (
    <section id="faq" ref={ref} className="py-16 sm:py-24 md:py-32 px-5 md:px-10">
      <div className="max-w-3xl mx-auto">

        {/* En-tête centré */}
        <SectionHeader
          className="mb-8 md:mb-10"
          kicker="Les questions"
          title={<>Reste une question ? <span className="italic-display text-gradient-green-static">Sûrement celle-ci.</span></>}
          lead="Les réponses aux questions qu'on nous pose le plus, juste avant de se lancer."
        />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="text-center mb-12 md:mb-14"
        >
          <button
            onClick={() => openBooking()}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-ink text-canvas text-sm font-600 rounded-full transition-colors duration-300 hover:bg-green active:scale-[0.98]"
          >
            Parler de mon projet
          </button>
        </motion.div>

        {/* Accordéon - une carte par question */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.12, ease }}
          className="space-y-3 md:space-y-4"
        >
          {FAQ.map((item, i) => {
            const isOpen = open === i
            return (
              <div
                key={item.q}
                className={`rounded-2xl border transition-[border-color,background-color,box-shadow] duration-300 ${
                  isOpen
                    ? 'border-green/40 bg-white shadow-lg shadow-ink/5'
                    : 'border-line bg-white/60 hover:border-green/30 hover:bg-white'
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="group w-full flex items-center gap-4 px-5 md:px-7 py-5 md:py-6 text-left"
                >
                  <span className={`shrink-0 font-mono text-xs tabular pt-1 transition-colors duration-200 ${isOpen ? 'text-green' : 'text-muted'}`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className={`flex-1 font-display text-lg md:text-xl font-500 leading-snug transition-colors duration-200 ${isOpen ? 'text-green' : 'text-ink group-hover:text-green'}`}>
                    {item.q}
                  </span>
                  <span className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-[transform,background-color,border-color,color] duration-300 ${isOpen ? 'bg-green border-green text-canvas rotate-45' : 'border-line text-soft group-hover:border-green group-hover:text-green'}`}>
                    <Plus size={16} strokeWidth={2.25} aria-hidden="true" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease }}
                      className="overflow-hidden"
                    >
                      <p className="font-sans text-base text-ink/75 leading-relaxed pl-5 md:pl-[3.4rem] pr-5 md:pr-7 pb-6 text-pretty">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
