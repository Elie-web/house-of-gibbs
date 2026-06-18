import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Check } from 'lucide-react'
import { PROCESS } from '../config'
import ProcessMockup from './ProcessMockups'
import SectionHeader from './SectionHeader'

const ease = [0.22, 1, 0.36, 1] as const

export default function Process() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="processus" ref={ref} className="py-16 sm:py-24 md:py-32 px-5 md:px-10">
      <div className="max-w-container mx-auto">

        <SectionHeader
          className="mb-14 md:mb-24"
          kicker="Le déroulé"
          title={<>Comment ça se passe, <span className="italic-display text-gradient-green-static">concrètement</span>.</>}
          lead="Une pièce vous parle ? Voici les trois étapes, sans précipitation."
        />

        {/* Étapes : texte à gauche, mockup à droite */}
        <div className="space-y-24 md:space-y-36">
          {PROCESS.map((step, i) => (
            <div
              key={step.step}
              className="grid md:grid-cols-2 gap-12 md:gap-20 items-center"
            >
              {/* Texte scannable — centré dans la colonne gauche */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.05, ease }}
                className="flex justify-center"
              >
                <div className="relative text-left max-w-sm w-full">
                  <span
                    aria-hidden="true"
                    className="absolute -top-20 md:-top-28 -left-6 md:-left-10 font-display font-400 tabular leading-none text-[7rem] md:text-[11rem] text-green/[0.05] select-none pointer-events-none -z-10"
                  >
                    {step.step}
                  </span>
                  <span className="block font-mono text-xs uppercase tracking-[0.25em] text-gradient-green-static mb-3">Étape {step.step}</span>
                  <h3 className="font-display text-4xl md:text-5xl font-500 text-ink mb-4 leading-[1.05] tracking-tight">{step.title}</h3>
                  <p className="font-display text-lg md:text-xl font-400 italic-display text-soft mb-8 text-balance">
                    {step.tagline}
                  </p>
                  <ul className="flex flex-col items-start gap-4">
                    {step.points.map((pt) => (
                      <li key={pt} className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full bg-green-tint flex items-center justify-center shrink-0">
                          <Check size={12} strokeWidth={2.75} className="text-green-2" aria-hidden="true" />
                        </span>
                        <span className="font-sans text-[15px] text-ink">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* Visuel (mockup) — toujours à droite */}
              <motion.div
                initial={{ opacity: 0, y: 36 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 + i * 0.05, ease }}
                className="flex justify-center"
              >
                <ProcessMockup id={step.id} />
              </motion.div>
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3, ease }}
          className="mt-20 md:mt-32 relative max-w-2xl mx-auto"
        >
          {/* Guillemets décoratifs */}
          <span
            aria-hidden="true"
            className="absolute -top-8 left-1/2 -translate-x-1/2 font-display text-[7rem] leading-none text-green-3/25 select-none pointer-events-none"
          >
            "
          </span>
          <blockquote className="relative z-10 text-center px-6 md:px-12 py-10 md:py-14 rounded-3xl bg-green-tint/50 border border-green/20">
            <p className="font-display text-2xl md:text-[2rem] font-400 text-ink leading-[1.2] text-balance">
              Votre projet reste le vôtre, du premier croquis à la dernière ligne.
              <span className="italic-display text-green block mt-2">On le dessine pour vous, avec vous.</span>
            </p>
          </blockquote>
        </motion.div>
      </div>
    </section>
  )
}
