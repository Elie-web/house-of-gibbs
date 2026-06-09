import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { PROCESS } from '../config'

export default function Process() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const ease = [0.22, 1, 0.36, 1] as const

  return (
    <section id="processus" ref={ref} className="py-16 sm:py-24 md:py-32 px-5 md:px-10 bg-canvas">
      <div className="max-w-container mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
          className="mb-14 md:mb-20 max-w-2xl"
        >
          <p className="font-mono text-[11px] uppercase tracking-widest text-green mb-5">Le déroulé</p>
          <h2 className="font-display text-[clamp(2.2rem,5vw,3.6rem)] font-400 tracking-tight text-ink leading-[1.05] mb-4">
            De votre idée à <span className="italic-display text-gradient-green-static">votre peau</span>.
          </h2>
          <p className="font-sans text-[15px] md:text-base text-soft leading-relaxed">
            Trois temps, sans précipitation. La maison reçoit sur rendez-vous pour que
            chaque projet soit pensé avant la première ligne.
          </p>
        </motion.div>

        {/* Étapes */}
        <div className="grid md:grid-cols-3 border-t border-line">
          {PROCESS.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.12, ease }}
              className={`py-9 md:py-12 md:px-8 first:md:pl-0 border-b border-line md:border-b-0 ${
                i !== 0 ? 'md:border-l md:border-line' : ''
              }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="font-display text-3xl font-500 tabular text-gradient-green-static">{step.step}</span>
                <span className="h-px flex-1 bg-line" />
              </div>
              <h3 className="font-display text-xl font-500 text-ink mb-3">{step.title}</h3>
              <p className="font-sans text-[14px] text-soft leading-relaxed max-w-xs text-pretty">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5, ease }}
          className="mt-14 md:mt-16 font-display text-xl md:text-2xl font-400 text-ink leading-snug max-w-2xl text-balance"
        >
          Rien d'imposé, pas de catalogue générique. Votre projet reste le vôtre,
          porté par une famille d'artistes.
        </motion.p>
      </div>
    </section>
  )
}
