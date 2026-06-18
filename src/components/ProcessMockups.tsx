import { motion } from 'framer-motion'
import { MessageSquare, Calendar, PenLine, Mountain, Check, Droplet } from 'lucide-react'

/**
 * Mockups « en navigateur » par étape, 100% en markup. Vert maison dominant +
 * quelques touches de couleur (amber / rose / sky) pour la vie, comme sur le
 * site Elie. Chaque mockup doit se lire au premier coup d'œil.
 */

/* 01 — CONSULTATION : conversation + prise de RDV (références couleur, calendrier) */
const ConsultationMockup = () => (
  <div className="relative w-[270px] sm:w-[340px]">
    <div className="rounded-2xl bg-white border border-line shadow-luxe overflow-hidden -rotate-2">
      {/* En-tête */}
      <div className="flex items-center gap-2.5 px-4 py-3 bg-canvas-2/70 border-b border-line">
        <span className="w-7 h-7 rounded-full bg-gradient-to-br from-green-2 to-green-4 shrink-0" aria-hidden="true" />
        <span className="leading-tight min-w-0">
          <span className="block font-sans text-[11px] font-600 text-ink truncate">House of Gibbs</span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse-dot" aria-hidden="true" />
            <span className="font-mono text-[8px] uppercase tracking-wide text-muted">consultation</span>
          </span>
        </span>
        <span className="ml-auto px-2 py-0.5 rounded-full bg-green-tint text-green-2 font-mono text-[8px] font-700 uppercase tracking-wide shrink-0">Gratuite</span>
      </div>
      {/* Conversation */}
      <div className="p-4 space-y-2.5">
        {/* Client + références couleur */}
        <div className="max-w-[88%] rounded-2xl rounded-tl-sm bg-canvas-2 p-2.5">
          <p className="font-sans text-[10.5px] text-ink leading-snug">« Un avant-bras, fine line végétal »</p>
          <div className="flex gap-1.5 mt-2">
            <span className="w-9 h-9 rounded-md bg-gradient-to-br from-emerald-400 to-teal-600" aria-hidden="true" />
            <span className="w-9 h-9 rounded-md bg-gradient-to-br from-amber-300 to-rose-500" aria-hidden="true" />
            <span className="w-9 h-9 rounded-md bg-gradient-to-br from-sky-400 to-indigo-500" aria-hidden="true" />
          </div>
        </div>
        {/* Réponse studio */}
        <div className="ml-auto max-w-[82%] rounded-2xl rounded-br-sm bg-green p-2.5">
          <p className="font-sans text-[10.5px] text-white leading-snug">« Parfait. On cale un rendez-vous&nbsp;? »</p>
        </div>
        {/* Créneau proposé */}
        <div className="ml-auto flex items-center gap-1.5 rounded-full border border-line bg-white px-2.5 py-1 w-fit">
          <Calendar size={11} className="text-amber-500" aria-hidden="true" />
          <span className="font-mono text-[8.5px] uppercase tracking-wide text-soft">Mar. 14:00</span>
        </div>
      </div>
    </div>
    {/* Chip flottante */}
    <div className="absolute -bottom-5 -left-6 rotate-3 rounded-full bg-white border border-line shadow-xl pl-2 pr-3.5 py-2 flex items-center gap-2 transition-transform duration-300 ease-out group-hover:-translate-x-2.5 group-hover:translate-y-1 group-hover:-rotate-2">
      <span className="w-7 h-7 rounded-full bg-green-tint flex items-center justify-center">
        <MessageSquare className="w-3.5 h-3.5 text-green-2" aria-hidden="true" />
      </span>
      <span className="font-sans text-[11px] font-600 text-ink">À l'écoute</span>
    </div>
    {/* Badge notification (couleur) */}
    <div className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-amber-400 border-4 border-white shadow-lg flex items-center justify-center transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true">
      <span className="font-sans text-[10px] font-800 text-white">1</span>
    </div>
  </div>
)

/* 02 — LE PROJET : planche de dessin sur mesure + nuancier d'encres */
const ProjetMockup = () => (
  <div className="relative w-[270px] sm:w-[340px] rotate-1">
    <div className="rounded-2xl bg-white border border-line shadow-luxe p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="px-2.5 py-1 rounded-full bg-green-tint text-green-2 font-mono text-[8px] font-700 uppercase tracking-widest">Sur mesure</span>
        <span className="font-mono text-[8px] uppercase tracking-wide text-muted">esquisse · 1/1</span>
      </div>
      {/* Cadre quadrillé + motif fine-line (vert + accent ambre) */}
      <div
        className="relative rounded-xl border border-dashed border-line p-4 h-36 flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage:
            'linear-gradient(rgba(21,32,27,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(21,32,27,0.04) 1px, transparent 1px)',
          backgroundSize: '16px 16px',
        }}
      >
        <svg viewBox="0 0 120 120" className="w-28 h-28" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <g className="text-green-2" stroke="currentColor">
            <path d="M60 110 C 60 80, 58 55, 60 28" />
            <path d="M60 86 C 44 82, 36 70, 36 58 C 50 60, 60 72, 60 86 Z" />
            <path d="M60 72 C 76 68, 84 56, 84 44 C 70 46, 60 58, 60 72 Z" />
            <path d="M60 58 C 46 54, 40 44, 40 34 C 52 36, 60 46, 60 58 Z" />
          </g>
          {/* fleur sommet — accent ambre */}
          <g className="text-amber-500" stroke="currentColor">
            <circle cx="60" cy="22" r="7" />
            <path d="M60 15 V9 M60 29 V35 M53 22 H47 M67 22 H73" />
          </g>
        </svg>
      </div>
      {/* Nuancier d'encres (couleur) */}
      <div className="flex items-center gap-2 mt-3.5">
        <span className="font-mono text-[8px] uppercase tracking-wide text-muted mr-1">Encres</span>
        {['bg-ink', 'bg-green-2', 'bg-rose-500', 'bg-amber-400', 'bg-sky-500'].map((c) => (
          <span key={c} className={`w-4 h-4 rounded-full ring-2 ring-white shadow-sm ${c}`} aria-hidden="true" />
        ))}
      </div>
    </div>
    {/* Chip crayon */}
    <div className="absolute -top-5 -right-5 rotate-6 rounded-2xl bg-white border border-line shadow-xl px-3 py-2 flex items-center gap-2 transition-transform duration-300 ease-out group-hover:translate-x-2.5 group-hover:-translate-y-1.5 group-hover:rotate-[12deg]">
      <span className="w-7 h-7 rounded-lg bg-ink flex items-center justify-center">
        <PenLine className="w-3.5 h-3.5 text-canvas" aria-hidden="true" />
      </span>
      <span className="font-sans text-[11px] font-600 text-ink">Dessin unique</span>
    </div>
    {/* Pastille d'encre flottante (couleur) */}
    <div className="absolute -bottom-4 left-8 -rotate-6 w-10 h-10 rounded-xl bg-gradient-to-br from-amber-300 to-rose-500 border-4 border-white shadow-xl transition-transform duration-300 ease-out group-hover:-translate-y-1.5 group-hover:-translate-x-1" aria-hidden="true" />
  </div>
)

/* 03 — LA SÉANCE : séance en cours au studio (machine, progression) + vue */
const SeanceMockup = () => (
  <div className="relative w-[270px] sm:w-[340px] -rotate-1">
    <div className="rounded-2xl bg-white border border-line shadow-luxe overflow-hidden">
      {/* Fenêtre : ciel + Belledonne */}
      <div className="relative h-24 overflow-hidden" style={{ background: 'linear-gradient(to bottom, #EEF4EF, #DCEAE3)' }}>
        <span className="absolute top-4 right-8 w-10 h-10 rounded-full bg-white/70 blur-[2px]" aria-hidden="true" />
        <svg viewBox="0 0 340 96" preserveAspectRatio="none" className="absolute inset-0 w-full h-full" aria-hidden="true">
          <path d="M0 96 L0 60 L70 34 L130 56 L200 26 L260 52 L320 30 L340 46 L340 96 Z" fill="#4FA288" fillOpacity="0.5" />
          <path d="M0 96 L0 74 L60 52 L130 70 L200 44 L270 66 L330 46 L340 58 L340 96 Z" fill="#0E5340" fillOpacity="0.9" />
        </svg>
      </div>
      {/* Panneau « séance en cours » */}
      <div className="p-4">
        <div className="flex items-center gap-2.5 mb-3">
          {/* Machine à tatouer (svg maison) */}
          <span className="w-8 h-8 rounded-lg bg-ink flex items-center justify-center shrink-0">
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="#F7F8F5" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="13" y="3" width="7" height="5" rx="1.4" transform="rotate(45 16.5 5.5)" />
              <path d="M13.5 7.5 L6 15" />
              <path d="M6 15 l-2.5 5.5 5.5 -2.5" />
              <path d="M4.5 19.5 L2.5 21.5" />
            </svg>
          </span>
          <div className="min-w-0">
            <p className="font-sans text-[11px] font-600 text-ink leading-tight">Séance en cours</p>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse-dot" aria-hidden="true" />
              <span className="font-mono text-[8px] uppercase tracking-wide text-muted">studio · 14:00</span>
            </span>
          </div>
          <span className="ml-auto font-display text-sm font-600 text-green tabular shrink-0">60%</span>
        </div>
        {/* Progression */}
        <div className="h-2 rounded-full bg-canvas-2 overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-r from-green-2 via-green to-green-4" style={{ width: '60%' }} aria-hidden="true" />
        </div>
      </div>
    </div>
    {/* Chip vue Belledonne */}
    <div className="absolute -top-4 -right-5 rotate-6 rounded-full bg-white border border-line shadow-xl pl-2 pr-3.5 py-2 flex items-center gap-2 transition-transform duration-300 ease-out group-hover:translate-x-2.5 group-hover:-translate-y-1.5 group-hover:rotate-[12deg]">
      <span className="w-7 h-7 rounded-full bg-green-tint flex items-center justify-center">
        <Mountain className="w-3.5 h-3.5 text-green-2" aria-hidden="true" />
      </span>
      <span className="font-sans text-[11px] font-600 text-ink">Vue Belledonne</span>
    </div>
    {/* Chip hygiène (couleur sky) */}
    <div className="absolute -bottom-4 -left-6 -rotate-3 rounded-full bg-white border border-line shadow-xl pl-2 pr-3 py-1.5 flex items-center gap-1.5 transition-transform duration-300 ease-out group-hover:-translate-x-2 group-hover:translate-y-1">
      <span className="w-5 h-5 rounded-full bg-sky-500 flex items-center justify-center">
        <Droplet className="w-3 h-3 text-white" aria-hidden="true" />
      </span>
      <span className="font-sans text-[10px] font-600 text-ink">Stérile</span>
    </div>
    {/* Petit check vert flottant */}
    <div className="absolute top-1/2 -left-3 w-7 h-7 rounded-full bg-green border-4 border-white shadow-lg flex items-center justify-center transition-transform duration-300 ease-out group-hover:-translate-x-1.5" aria-hidden="true">
      <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} aria-hidden="true" />
    </div>
  </div>
)

const MOCKUPS: Record<string, () => React.ReactElement> = {
  consultation: ConsultationMockup,
  projet: ProjetMockup,
  seance: SeanceMockup,
}

export default function ProcessMockup({ id }: { id: string }) {
  const Mockup = MOCKUPS[id]
  if (!Mockup) return null
  return (
    <motion.div
      className="group cursor-default"
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 240, damping: 18 }}
    >
      <Mockup />
    </motion.div>
  )
}
