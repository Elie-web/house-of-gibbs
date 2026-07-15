import { useLayoutEffect, useRef, useState, type ReactNode, type CSSProperties } from 'react'
import { motion, useInView, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { ArrowRight, Ear, PenLine, ShieldCheck, Check } from 'lucide-react'
import { PROCESS } from '../config'
import { processConsultation, processProjet, processDesign } from '../assets'
import { useBooking } from '../booking'
import SectionHeader from './SectionHeader'

const ease = [0.22, 1, 0.36, 1] as const
const spring = { type: 'spring', stiffness: 220, damping: 19 } as const

/**
 * « Le déroulé » - un tatouage est un seul trait continu, du premier croquis
 * à la dernière ligne. Ce fil conducteur est rendu littéral : une fine ligne
 * émeraude s'encre au scroll par-dessus un tracé-repère « stencil », et relie
 * trois temps. Chaque temps porte une vraie photo de la maison, recadrée net,
 * révélée par un voile, avec deux petits pop-ups qui flottent - assez de vie
 * pour un studio de tatouage, sans le désordre des cadres penchés d'avant.
 */

type Step = (typeof PROCESS)[number]
type Chip = { icon?: ReactNode; label: string; pos: CSSProperties; solid?: boolean; delay?: number }
type Media = { img: string; alt: string; accent: string; soft: string; chips: Chip[] }

const MEDIA: Record<string, Media> = {
  consultation: {
    img: processConsultation,
    alt: "En consultation chez House of Gibbs, à l'écoute de votre projet",
    accent: '#16745A',
    soft: 'rgba(22,116,90,0.12)',
    chips: [
      { icon: <Ear size={13} strokeWidth={1.9} />, label: 'On vous écoute', pos: { left: '-16px', bottom: '26px' } },
      { label: 'Sans engagement', solid: true, pos: { right: '-12px', top: '22px' }, delay: 0.6 },
    ],
  },
  projet: {
    img: processDesign,
    alt: 'Croquis de tatouage dessinés à la main : chaque projet part d’un dessin sur mesure',
    accent: '#11998E',
    soft: 'rgba(17,153,142,0.14)',
    chips: [
      { icon: <PenLine size={13} strokeWidth={1.9} />, label: 'Dessin unique', pos: { right: '-16px', top: '26px' } },
      { icon: <Check size={13} strokeWidth={2.6} />, label: 'Validé avec vous', pos: { left: '-14px', bottom: '26px' }, delay: 0.5 },
    ],
  },
  seance: {
    img: processProjet,
    alt: 'Séance de tatouage au calme, hygiène stricte, une personne à la fois',
    accent: '#0E5340',
    soft: 'rgba(14,83,64,0.14)',
    chips: [
      { icon: <ShieldCheck size={13} strokeWidth={1.9} />, label: 'Hygiène stricte', pos: { right: '-16px', top: '24px' } },
      { label: 'Une personne à la fois', solid: true, pos: { left: '-12px', bottom: '24px' }, delay: 0.6 },
    ],
  },
}

/* ── Pop-up flottant : entre par un « pop », puis respire en boucle ───── */
function Popup({ chip, accent, soft, reduce }: { chip: Chip; accent: string; soft: string; reduce: boolean }) {
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, scale: 0.7, y: 8 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ ...spring, delay: 0.25 + (chip.delay ?? 0) }}
      style={chip.pos}
      className="absolute z-20"
    >
      <motion.div
        animate={reduce ? undefined : { y: [0, -5, 0] }}
        transition={reduce ? undefined : { duration: 3.8 + (chip.delay ?? 0), repeat: Infinity, ease: 'easeInOut' }}
      >
        {chip.solid ? (
          <span
            className="block rounded-full font-mono font-700 uppercase text-canvas whitespace-nowrap"
            style={{ background: accent, padding: '6px 12px', fontSize: '0.55rem', letterSpacing: '0.12em', border: '3px solid #F7F8F5' }}
          >
            {chip.label}
          </span>
        ) : (
          <span
            className="flex items-center gap-2 rounded-full bg-white border border-line shadow-luxe whitespace-nowrap"
            style={{ padding: '6px 12px 6px 6px' }}
          >
            <span
              className="w-[24px] h-[24px] rounded-full flex items-center justify-center shrink-0"
              style={{ background: soft, color: accent }}
            >
              {chip.icon}
            </span>
            <span className="font-sans text-[0.72rem] font-600 text-ink">{chip.label}</span>
          </span>
        )}
      </motion.div>
    </motion.div>
  )
}

/* ── Photo d'étape : recadrée net, révélée par un voile, accent en bas ── */
function StepPhoto({ media }: { media: Media }) {
  const reduce = useReducedMotion()
  return (
    <div className="relative w-full max-w-[330px]">
      {/* halo de couleur diffus derrière, pour la profondeur */}
      <div
        aria-hidden
        className="absolute -inset-4 -z-10 rounded-[30px]"
        style={{ background: media.soft, filter: 'blur(6px)' }}
      />

      <div className="group relative overflow-hidden rounded-[20px] border border-line bg-canvas-2 shadow-luxe transition-transform duration-500 ease-out hover:-translate-y-1.5">
        <div className="overflow-hidden" style={{ aspectRatio: '4 / 5' }}>
          {/* calque de zoom au survol (transform CSS, libre du transform Framer) */}
          <div className="w-full h-full transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]">
            <motion.img
              src={media.img}
              alt={media.alt}
              loading="lazy"
              decoding="async"
              initial={reduce ? false : { clipPath: 'inset(100% 0 0 0)' }}
              whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
              viewport={{ once: true, margin: '-12%' }}
              transition={{ duration: 1.1, ease }}
              className="w-full h-full object-cover block"
            />
          </div>
        </div>
        {/* voile bas léger + liseré d'accent */}
        <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/12 to-transparent pointer-events-none" />
        <span aria-hidden className="absolute inset-x-0 bottom-0 h-1" style={{ background: media.accent }} />
      </div>

      {media.chips.map((chip, i) => (
        <Popup key={i} chip={chip} accent={media.accent} soft={media.soft} reduce={!!reduce} />
      ))}
    </div>
  )
}

/* ── Un temps du déroulé : numéro qui s'encre + texte + photo ─────────── */
function ProcessStep({ step, index }: { step: Step; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-45% 0px -45% 0px' })
  const reduce = useReducedMotion()
  const active = inView || reduce
  const flip = index % 2 === 1
  const media = MEDIA[step.id]

  return (
    <li className="grid grid-cols-[56px_1fr] md:grid-cols-[120px_1fr] gap-x-5 md:gap-x-12">
      {/* Numéro - nœud du trait, se colore quand la ligne le rejoint */}
      <span
        ref={ref}
        data-node
        className="relative z-10 flex items-center justify-center self-start bg-canvas py-2 font-display font-400 tabular leading-none text-[2rem] md:text-[3.2rem] select-none"
      >
        <span aria-hidden className="text-green/[0.14]">{step.step}</span>
        <motion.span
          aria-hidden
          initial={false}
          animate={{ opacity: active ? 1 : 0 }}
          transition={{ duration: 0.6, ease }}
          className="absolute inset-0 flex items-center justify-center text-gradient-green-static"
        >
          {step.step}
        </motion.span>
        <span className="sr-only">Étape {step.step}.</span>
      </span>

      {/* Texte + photo, alternant de côté d'un temps à l'autre */}
      <div className="self-start grid md:grid-cols-2 items-center gap-9 md:gap-12 pt-1 md:pt-2">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={{ duration: 0.7, delay: 0.05, ease }}
          className={flip ? 'md:order-2' : 'md:order-1'}
        >
          <h3 className="font-display text-[2.1rem] md:text-[2.75rem] font-500 text-ink leading-[1.02] tracking-tight">
            {step.title}
          </h3>
          <p className="font-display text-lg md:text-xl font-400 text-soft mt-2 text-balance">
            {step.tagline}
          </p>
          <ul className="mt-6 flex flex-col gap-3">
            {step.points.map((pt) => (
              <li key={pt} className="flex gap-3.5">
                <span aria-hidden className="relative top-[0.62em] h-px w-4 shrink-0 bg-green/55" />
                <span className="font-sans text-[14.5px] md:text-[15px] leading-relaxed text-soft">{pt}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <div className={`flex justify-center md:justify-start ${flip ? 'md:order-1 md:justify-end' : 'md:order-2'}`}>
          {media && <StepPhoto media={media} />}
        </div>
      </div>
    </li>
  )
}

export default function Process() {
  const reduce = useReducedMotion()

  // Le trait : mesuré entre le premier nœud et le nœud final pour s'aligner
  // pile sur les numéros, quelle que soit la hauteur du contenu.
  const listRef = useRef<HTMLOListElement>(null)
  const [rail, setRail] = useState({ top: 0, height: 0 })

  useLayoutEffect(() => {
    const list = listRef.current
    if (!list) return
    const compute = () => {
      const nodes = list.querySelectorAll<HTMLElement>('[data-node]')
      if (nodes.length < 2) return
      const base = list.getBoundingClientRect().top
      const first = nodes[0].getBoundingClientRect()
      const last = nodes[nodes.length - 1].getBoundingClientRect()
      const top = first.top + first.height / 2 - base
      const bottom = last.top + last.height / 2 - base
      setRail({ top, height: Math.max(0, bottom - top) })
    }
    compute()
    const ro = new ResizeObserver(compute)
    ro.observe(list)
    if (document.fonts?.ready) document.fonts.ready.then(compute)
    window.addEventListener('resize', compute)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', compute)
    }
  }, [])

  // Encrage piloté par le scroll : le trait se remplit en traversant l'écran.
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start 72%', 'end 55%'],
  })
  const drawn = useTransform(scrollYProgress, [0, 1], [0, 1])
  const dotY = useTransform(scrollYProgress, [0, 1], [0, rail.height])
  const dotOpacity = useTransform(scrollYProgress, [0, 0.02, 0.98, 1], [0, 1, 1, 0])

  const { openBooking } = useBooking()

  return (
    <section id="processus" className="py-16 sm:py-24 md:py-32 px-5 md:px-10">
      <div className="max-w-container mx-auto">
        <SectionHeader
          className="mb-14 md:mb-20"
          title={<>De l'idée à <span className="text-gradient-green-static">votre peau</span>.</>}
        />

        <div className="relative max-w-[1040px] mx-auto">
          {/* Le trait (repère + encrage + pointe qui avance) */}
          <div
            aria-hidden
            className="absolute left-[28px] md:left-[60px] z-0 w-[1.5px] -translate-x-1/2"
            style={{ top: rail.top, height: rail.height }}
          >
            <span className="absolute inset-0 rounded-full bg-line" />
            <motion.span
              style={{ scaleY: reduce ? 1 : drawn }}
              className="absolute inset-0 origin-top rounded-full bg-gradient-to-b from-green-2 via-green to-green-4"
            />
            {!reduce && (
              <motion.span
                style={{ y: dotY, opacity: dotOpacity }}
                className="absolute left-1/2 top-0 h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-green shadow-[0_0_0_5px_rgba(22,116,90,0.15)]"
              />
            )}
          </div>

          <ol ref={listRef} className="relative space-y-16 md:space-y-28">
            {PROCESS.map((step, i) => (
              <ProcessStep key={step.step} step={step} index={i} />
            ))}

            {/* Nœud final : la dernière ligne. Le trait s'y achève. */}
            <li className="grid grid-cols-[56px_1fr] md:grid-cols-[120px_1fr] gap-x-5 md:gap-x-12">
              <span
                data-node
                className="relative z-10 flex items-center justify-center self-start bg-canvas py-3"
              >
                <span className="block h-3 w-3 rounded-full bg-green shadow-[0_0_0_5px_rgba(22,116,90,0.12)]" />
              </span>
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30% 0px -30% 0px' }}
                transition={{ duration: 0.7, ease }}
                className="self-start pt-1 md:pt-2"
              >
                <p className="font-display text-xl md:text-[1.65rem] font-400 text-ink leading-[1.3] text-balance max-w-md">
                  Votre projet reste le vôtre, du premier croquis à la dernière ligne.
                </p>
                <button
                  onClick={() => openBooking()}
                  className="group mt-6 inline-flex items-center gap-2 border-b-2 border-green pb-1 font-sans text-[15px] font-600 text-ink transition-[gap] duration-200 hover:gap-3.5 active:scale-[0.98]"
                >
                  Commencer par une consultation
                  <ArrowRight size={16} aria-hidden className="text-green transition-transform group-hover:translate-x-0.5" />
                </button>
              </motion.div>
            </li>
          </ol>
        </div>
      </div>
    </section>
  )
}
