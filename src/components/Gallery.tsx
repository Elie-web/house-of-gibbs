import { motion, AnimatePresence } from 'framer-motion'
import { useState, useMemo, useRef } from 'react'
import { X, ChevronLeft, ChevronRight, Plus, ImageIcon, ArrowUpRight } from 'lucide-react'
import { ARTISTS, type GalleryItem } from '../config'
import SectionHeader from './SectionHeader'

const ease = [0.22, 1, 0.36, 1] as const

type Tile = GalleryItem & { uid: string; artistId: string; artistName: string; handle: string; accent: string }

// Aplati toutes les galeries en y attachant l'artiste (pour le filtre + l'accent)
const ALL_TILES: Tile[] = ARTISTS.flatMap((a) =>
  a.gallery.map((g, gi) => ({ ...g, uid: `${a.id}-${gi}`, artistId: a.id, artistName: a.name, handle: a.handle, accent: a.accent })),
)

function Lightbox({ photos, initial, onClose }: { photos: Tile[]; initial: number; onClose: () => void }) {
  const [current, setCurrent] = useState(initial)
  const prev = () => setCurrent((i) => (i - 1 + photos.length) % photos.length)
  const next = () => setCurrent((i) => (i + 1) % photos.length)
  const photo = photos[current]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/90 backdrop-blur-xl p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ ease, duration: 0.32 }}
        className="relative max-w-3xl max-h-[90vh] w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <img src={photo.src} alt={photo.alt} className="w-full h-full object-contain rounded-xl max-h-[78vh]" />

        <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 bg-canvas/10 backdrop-blur-sm rounded-full flex items-center justify-center text-canvas hover:bg-green transition-colors" aria-label="Précédent">
          <ChevronLeft size={20} />
        </button>
        <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 bg-canvas/10 backdrop-blur-sm rounded-full flex items-center justify-center text-canvas hover:bg-green transition-colors" aria-label="Suivant">
          <ChevronRight size={20} />
        </button>
        <button onClick={onClose} className="absolute -top-3 -right-1 sm:-right-3 w-10 h-10 bg-canvas/10 backdrop-blur-sm rounded-full flex items-center justify-center text-canvas hover:bg-green transition-colors" aria-label="Fermer">
          <X size={17} />
        </button>

        <div className="flex items-center justify-between mt-4 gap-4">
          <p className="font-sans text-sm text-ink-soft">
            <span className="font-600 text-canvas">{photo.artistName}</span> · {photo.alt}
          </p>
          <p className="font-mono text-xs text-muted tabular shrink-0">
            {String(current + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

function VideoLightbox({ tile, onClose }: { tile: Tile; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/90 backdrop-blur-xl p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ ease, duration: 0.32 }}
        className="relative w-full max-w-[420px]"
        onClick={(e) => e.stopPropagation()}
      >
        <video
          src={tile.video}
          poster={tile.src}
          controls
          autoPlay
          loop
          playsInline
          className="w-full h-auto max-h-[80vh] rounded-xl bg-black"
        />
        <button onClick={onClose} className="absolute -top-3 -right-1 sm:-right-3 w-10 h-10 bg-canvas/10 backdrop-blur-sm rounded-full flex items-center justify-center text-canvas hover:bg-green transition-colors" aria-label="Fermer">
          <X size={17} />
        </button>
        <div className="flex items-center justify-between mt-4 gap-4">
          <p className="font-sans text-sm text-ink-soft">
            <span className="font-600 text-canvas">{tile.artistName}</span> · {tile.alt}
          </p>
          {tile.href && (
            <a
              href={tile.href}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-1 font-mono text-[11px] text-muted hover:text-green-3 transition-colors"
            >
              Instagram <ArrowUpRight size={12} />
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Gallery() {
  const [filter, setFilter] = useState<string>('all')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [videoTile, setVideoTile] = useState<Tile | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const tiles = useMemo(
    () => (filter === 'all' ? ALL_TILES : ALL_TILES.filter((t) => t.artistId === filter)),
    [filter],
  )
  // Lightbox ne navigue que sur les images réelles (pas les placeholders, pas les vidéos)
  const images = useMemo(() => tiles.filter((t) => t.type === 'image' && t.src), [tiles])

  const scrollBy = (dir: number) => {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: dir * el.clientWidth * 0.82, behavior: 'smooth' })
  }

  const TABS = [
    { id: 'all', name: 'Tous', accent: '#2B312E', count: ALL_TILES.length },
    ...ARTISTS.map((a) => ({
      id: a.id,
      name: a.name,
      accent: a.accent,
      count: a.gallery.length,
    })),
  ]

  return (
    <section id="galerie" className="py-16 sm:py-24 md:py-32 bg-canvas-2/50 border-y border-line overflow-hidden">
      <div className="max-w-container mx-auto px-5 md:px-10">
        <SectionHeader
          className="mb-10 md:mb-12"
          kicker="La galerie"
          title={<>Assez décrit. <span className="italic-display text-gradient-green-static">Regardez plutôt.</span></>}
          lead="Leur travail en vrai, pièce par pièce. Filtrez par artiste, agrandissez celles qui vous arrêtent."
        />

        {/* Filtres par artiste */}
        <div className="mb-8 md:mb-10">
          <p className="text-center font-mono text-[11px] uppercase tracking-[0.22em] text-muted mb-4">
            Voir le travail de
          </p>
          <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3">
            {TABS.map((t) => {
              const active = filter === t.id
              return (
                <button
                  key={t.id}
                  onClick={() => { setFilter(t.id); setLightboxIndex(null); scrollRef.current?.scrollTo({ left: 0, behavior: 'smooth' }) }}
                  aria-pressed={active}
                  className={`group relative flex items-center gap-2.5 pl-3.5 pr-2.5 py-2.5 rounded-full text-[15px] font-600 border transition-all duration-300 ${
                    active
                      ? 'bg-ink text-canvas border-ink shadow-lg shadow-ink/20 scale-[1.04]'
                      : 'bg-white text-ink border-line hover:border-ink/60 hover:-translate-y-0.5 hover:shadow-md hover:shadow-ink/5'
                  }`}
                >
                  <span
                    className={`w-2.5 h-2.5 rounded-full shrink-0 transition-transform duration-300 ${active ? 'scale-110' : 'group-hover:scale-110'}`}
                    style={{ background: t.accent, boxShadow: active ? `0 0 0 3px rgba(247,248,245,0.18)` : 'none' }}
                  />
                  {t.name}
                  <span
                    className={`min-w-[24px] text-center text-xs font-mono tabular px-1.5 py-0.5 rounded-full transition-colors ${
                      active ? 'bg-canvas/15 text-canvas' : 'bg-canvas-2 text-muted group-hover:bg-line/60'
                    }`}
                  >
                    {t.count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Carrousel horizontal */}
      <div className="relative max-w-container mx-auto">
        {/* Flèches (desktop) */}
        <button
          onClick={() => scrollBy(-1)}
          aria-label="Voir les pièces précédentes"
          className="hidden md:flex absolute left-3 lg:left-5 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white border border-line shadow-luxe items-center justify-center text-ink hover:bg-canvas hover:scale-105 transition-all"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => scrollBy(1)}
          aria-label="Voir les pièces suivantes"
          className="hidden md:flex absolute right-3 lg:right-5 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white border border-line shadow-luxe items-center justify-center text-ink hover:bg-canvas hover:scale-105 transition-all"
        >
          <ChevronRight size={20} />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-3 md:gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar px-5 md:px-12 lg:px-16 pb-3"
        >
          {tiles.map((tile) => {
            const isVideo = tile.type === 'video'
            const sizing = 'shrink-0 snap-start w-[64vw] sm:w-[300px] md:w-[340px] aspect-[3/4]'

            // Placeholder : photo pas encore fournie
            if (!tile.src) {
              return (
                <motion.div
                  key={tile.uid}
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-10%' }}
                  transition={{ duration: 0.4, ease }}
                  className={`relative overflow-hidden rounded-2xl bg-canvas-2 flex flex-col items-center justify-center gap-2 text-muted ${sizing}`}
                >
                  <div className="absolute inset-0 ring-1 ring-inset ring-ink/5 rounded-2xl pointer-events-none" />
                  <ImageIcon size={24} strokeWidth={1.5} style={{ color: tile.accent }} />
                  <span className="font-mono text-[10px] uppercase tracking-widest">
                    {isVideo ? 'Reel à venir' : 'Photo à venir'}
                  </span>
                </motion.div>
              )
            }

            const inner = (
              <>
                {isVideo && tile.video ? (
                  <video
                    src={tile.video}
                    poster={tile.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                  />
                ) : (
                  <img
                    src={tile.src}
                    alt={tile.alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                  />
                )}
                <div className="absolute inset-0 ring-1 ring-inset ring-ink/5 rounded-2xl pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/0 to-ink/0 opacity-70 group-hover:opacity-100 transition-opacity duration-400" />

                {/* Badge agrandir (photos uniquement - les reels tournent en boucle) */}
                {!isVideo && (
                  <span className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center bg-canvas/90 transition-transform duration-300 group-hover:scale-110">
                    <Plus size={17} strokeWidth={2.25} className="text-ink" />
                  </span>
                )}

                {/* Légende */}
                <span className="absolute left-4 right-4 bottom-4 flex items-center gap-2 text-left">
                  <span className="h-px w-5 shrink-0" style={{ background: tile.accent }} />
                  <span className="font-mono text-[10.5px] uppercase tracking-wide text-canvas leading-tight">
                    {isVideo ? 'Reel · ' : 'Par '}{tile.artistName}
                  </span>
                </span>
              </>
            )

            return isVideo ? (
              <motion.button
                key={tile.uid}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.4, ease }}
                onClick={() => (tile.video ? setVideoTile(tile) : window.open(tile.href, '_blank'))}
                className={`group relative overflow-hidden rounded-2xl bg-canvas-2 cursor-pointer ${sizing}`}
                aria-label={`Lire le reel : ${tile.alt}`}
              >
                {inner}
              </motion.button>
            ) : (
              <motion.button
                key={tile.uid}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.4, ease }}
                onClick={() => setLightboxIndex(images.findIndex((im) => im.src === tile.src))}
                className={`group relative overflow-hidden rounded-2xl bg-canvas-2 cursor-pointer ${sizing}`}
                aria-label={`Agrandir : ${tile.alt}`}
              >
                {inner}
              </motion.button>
            )
          })}
        </div>

        {/* Indice de défilement mobile */}
        <p className="md:hidden text-center font-mono text-[10px] uppercase tracking-widest text-muted mt-1">
          Faites glisser →
        </p>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && lightboxIndex >= 0 && (
          <Lightbox photos={images} initial={lightboxIndex} onClose={() => setLightboxIndex(null)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {videoTile && (
          <VideoLightbox tile={videoTile} onClose={() => setVideoTile(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
