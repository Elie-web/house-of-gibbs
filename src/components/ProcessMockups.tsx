import { motion } from 'framer-motion'
import { Ear, PenLine, ShieldCheck, Check } from 'lucide-react'
import type { ReactNode } from 'react'
import { processConsultation, processProjet, processSeance } from '../assets'

/**
 * Visuel par étape du déroulé : une vraie photo de la maison dans un cadre
 * légèrement incliné, un halo de couleur décalé derrière pour la profondeur,
 * un liseré d'accent en bas et une « chip » flottante qui casse le cadre.
 * Une nuance de vert par étape. Le titre est déjà à côté (voir Process.tsx).
 */

const spring = { type: 'spring', stiffness: 240, damping: 18 } as const

type Accent = { tint: string; soft: string }

// chip flottante : variants pilotés par le hover du parent (group)
const chipVariants = (rest: Record<string, number>, hover: Record<string, number>) => ({
  rest: { x: 0, y: 0, rotate: 0, ...rest },
  hover: { ...rest, ...hover },
})

/* ── cadre photo incliné + halo de couleur ───────────────────────────── */
function Frame({
  img,
  alt,
  rotate,
  accent,
  children,
}: {
  img: string
  alt: string
  rotate: number
  accent: Accent
  children?: ReactNode
}) {
  return (
    <div className="relative" style={{ width: 'min(360px, 84vw)' }}>
      {/* halo décalé pour la profondeur */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-[18px]"
        style={{
          transform: `translate(12px, 14px) rotate(${rotate + 3}deg)`,
          background: accent.soft,
          border: `1px solid ${accent.tint}22`,
        }}
      />

      <div
        className="relative rounded-[18px] overflow-hidden border border-line bg-white shadow-luxe"
        style={{ transform: `rotate(${rotate}deg)` }}
      >
        <div className="overflow-hidden" style={{ aspectRatio: '4 / 5' }}>
          <img
            src={img}
            alt={alt}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover block"
          />
        </div>
        {/* liseré couleur en bas */}
        <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1" style={{ background: accent.tint }} />
      </div>

      {children}
    </div>
  )
}

/* ── chip pilule icône + texte ───────────────────────────────────────── */
function PillChip({
  accent,
  icon,
  label,
  pos,
  rest,
  hover,
}: {
  accent: Accent
  icon: ReactNode
  label: string
  pos: React.CSSProperties
  rest: Record<string, number>
  hover: Record<string, number>
}) {
  return (
    <motion.div
      variants={chipVariants(rest, hover)}
      transition={spring}
      className="absolute flex items-center gap-2 rounded-full bg-white border border-line shadow-luxe"
      style={{ ...pos, padding: '7px 14px 7px 8px' }}
    >
      <span
        className="w-[26px] h-[26px] rounded-full shrink-0 flex items-center justify-center"
        style={{ background: accent.soft, color: accent.tint }}
      >
        {icon}
      </span>
      <span className="font-sans text-[0.72rem] font-600 text-ink whitespace-nowrap">{label}</span>
    </motion.div>
  )
}

/* ── nuances de vert par étape ───────────────────────────────────────── */
const GREEN: Accent = { tint: '#16745A', soft: 'rgba(22,116,90,0.13)' }
const TEAL: Accent = { tint: '#11998E', soft: 'rgba(17,153,142,0.15)' }
const DEEP: Accent = { tint: '#0E5340', soft: 'rgba(14,83,64,0.16)' }

function Consultation() {
  return (
    <Frame
      rotate={-2}
      accent={GREEN}
      img={processConsultation}
      alt="Un tatoueur de House of Gibbs en consultation, à l'écoute du projet"
    >
      <PillChip
        accent={GREEN}
        icon={<Ear size={13} strokeWidth={1.8} />}
        label="On vous écoute"
        pos={{ bottom: '-18px', left: '-22px' }}
        rest={{ rotate: -3 }}
        hover={{ x: -10, y: 5, rotate: -6 }}
      />
      {/* pastille « sans engagement » */}
      <motion.div
        variants={chipVariants({ rotate: 4 }, { x: 6, y: -6, rotate: 8 })}
        transition={spring}
        className="absolute font-mono font-700 uppercase text-canvas"
        style={{
          top: '-12px',
          right: '-14px',
          padding: '6px 13px',
          borderRadius: '9999px',
          background: GREEN.tint,
          border: '4px solid #F7F8F5',
          fontSize: '0.52rem',
          letterSpacing: '0.12em',
        }}
      >
        Sans engagement
      </motion.div>
    </Frame>
  )
}

function Projet() {
  return (
    <Frame
      rotate={1.5}
      accent={TEAL}
      img={processProjet}
      alt="Un dessin sur mesure prend forme sur la peau, chez House of Gibbs"
    >
      <PillChip
        accent={TEAL}
        icon={<PenLine size={13} strokeWidth={1.8} />}
        label="Dessin unique"
        pos={{ top: '-16px', right: '-20px' }}
        rest={{ rotate: 5 }}
        hover={{ x: 10, y: -6, rotate: 11 }}
      />
      {/* chip « validé avec vous » */}
      <motion.div
        variants={chipVariants({ rotate: -5 }, { x: -8, y: 6, rotate: -10 })}
        transition={spring}
        className="absolute flex items-center gap-[7px] rounded-full bg-white border border-line shadow-luxe"
        style={{ bottom: '-16px', left: '-18px', padding: '6px 13px 6px 6px' }}
      >
        <span className="w-5 h-5 rounded-full flex items-center justify-center text-white" style={{ background: TEAL.tint }}>
          <Check size={12} strokeWidth={2.75} />
        </span>
        <span className="font-sans text-[0.7rem] font-600 text-ink whitespace-nowrap">Validé avec vous</span>
      </motion.div>
    </Frame>
  )
}

function Seance() {
  return (
    <Frame
      rotate={-1.5}
      accent={DEEP}
      img={processSeance}
      alt="Séance de tatouage au calme, hygiène stricte — House of Gibbs"
    >
      <PillChip
        accent={DEEP}
        icon={<ShieldCheck size={13} strokeWidth={1.8} />}
        label="Hygiène stricte"
        pos={{ top: '-16px', right: '-20px' }}
        rest={{ rotate: 5 }}
        hover={{ x: 10, y: -6, rotate: 11 }}
      />
      {/* pastille « un seul rendez-vous à la fois » */}
      <motion.div
        variants={chipVariants({ rotate: -4 }, { x: -8, y: 6, rotate: -10 })}
        transition={spring}
        className="absolute font-mono font-700 uppercase text-canvas"
        style={{
          bottom: '-16px',
          left: '-18px',
          padding: '6px 13px',
          borderRadius: '9999px',
          background: DEEP.tint,
          border: '4px solid #F7F8F5',
          fontSize: '0.52rem',
          letterSpacing: '0.12em',
        }}
      >
        Une personne à la fois
      </motion.div>
    </Frame>
  )
}

const MOCKUPS: Record<string, () => ReactNode> = {
  consultation: Consultation,
  projet: Projet,
  seance: Seance,
}

export default function ProcessMockup({ id }: { id: string }) {
  const Mockup = MOCKUPS[id]
  if (!Mockup) return null
  return (
    <motion.div
      initial="rest"
      animate="rest"
      whileHover="hover"
      variants={{ rest: { y: 0, scale: 1 }, hover: { y: -8, scale: 1.02 } }}
      transition={spring}
      style={{ cursor: 'default' }}
    >
      <Mockup />
    </motion.div>
  )
}
