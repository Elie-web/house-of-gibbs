import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useMemo } from 'react'
import { X, ChevronLeft, ChevronRight, Play, Plus } from 'lucide-react'
import { ARTISTS, type GalleryItem } from '../config'
import { InstagramIcon } from './icons'

const ease = [0.22, 1, 0.36, 1] as const

type Tile = GalleryItem & { artistId: string; artistName: string; handle: string; accent: string }

// Aplati toutes les galeries en y attachant l'artiste (pour le filtre + l'accent)
const ALL_TILES: Tile[] = ARTISTS.flatMap((a) =>
  a.gallery.map((g) => ({ ...g, artistId: a.id, artistName: a.name, handle: a.handle, accent: a.accent })),
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

export default function Gallery() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' })
  const [filter, setFilter] = useState<string>('all')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const tiles = useMemo(
    () => (filter === 'all' ? ALL_TILES : ALL_TILES.filter((t) => t.artistId === filter)),
    [filter],
  )
  // Lightbox ne navigue que sur les images (les vidéos ouvrent Instagram)
  const images = useMemo(() => tiles.filter((t) => t.type === 'image'), [tiles])

  const TABS = [{ id: 'all', name: 'Tous' }, ...ARTISTS.map((a) => ({ id: a.id, name: a.name }))]

  return (
    <section id="galerie" className="py-16 sm:py-24 md:py-32 px-5 md:px-10 bg-canvas-2/50 border-y border-line">
      <div className="max-w-container mx-auto">

        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 24 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
          className="mb-10 md:mb-12 max-w-2xl"
        >
          <p className="font-mono text-[11px] uppercase tracking-widest text-green mb-5">La galerie</p>
          <h2 className="font-display text-[clamp(2.2rem,5vw,3.6rem)] font-400 tracking-tight text-ink leading-[1.05] mb-4">
            Le travail <span className="italic-display text-gradient-green-static">parle</span> de lui-même.
          </h2>
          <p className="font-sans text-[15px] md:text-base text-soft leading-relaxed">
            Photos et reels Instagram, filtrés par artiste. Cliquez pour agrandir une pièce
            ou voir la vidéo.
          </p>
        </motion.div>

        {/* Filtres par artiste */}
        <div className="flex flex-wrap gap-2 mb-8">
          {TABS.map((t) => {
            const active = filter === t.id
            return (
              <button
                key={t.id}
                onClick={() => { setFilter(t.id); setLightboxIndex(null) }}
                className={`px-4 py-2 rounded-full text-sm font-600 border transition-colors ${
                  active
                    ? 'bg-ink text-canvas border-ink'
                    : 'bg-white text-soft border-line hover:border-ink hover:text-ink'
                }`}
              >
                {t.name}
              </button>
            )
          })}
        </div>

        {/* Grille */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 md:gap-3 md:auto-rows-[300px]">
          <AnimatePresence mode="popLayout">
            {tiles.map((tile, i) => {
              const isVideo = tile.type === 'video'
              const big = i % 5 === 0 // rythme éditorial
              const commonClass = `group relative overflow-hidden rounded-2xl bg-canvas-2 cursor-pointer aspect-square md:aspect-auto ${big ? 'md:row-span-2' : ''}`

              const inner = (
                <>
                  <img
                    src={tile.src}
                    alt={tile.alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-ink/5 rounded-2xl pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/0 to-ink/0 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                  {/* Badge type */}
                  <span
                    className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center text-white transition-all duration-300 group-hover:scale-110"
                    style={{ background: isVideo ? tile.accent : 'rgba(247,248,245,0.92)' }}
                  >
                    {isVideo
                      ? <Play size={15} strokeWidth={2.5} className="ml-0.5" />
                      : <Plus size={17} strokeWidth={2.25} className="text-ink" />}
                  </span>

                  {/* Légende */}
                  <span className="absolute left-4 right-4 bottom-4 flex items-center gap-2 text-left translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="h-px w-5 shrink-0" style={{ background: tile.accent }} />
                    <span className="font-mono text-[10.5px] uppercase tracking-wide text-canvas leading-tight">
                      {isVideo ? 'Reel · ' : ''}{tile.artistName}
                    </span>
                  </span>
                </>
              )

              return isVideo ? (
                <motion.a
                  key={tile.src}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4, ease }}
                  href={tile.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={commonClass}
                  aria-label={`Voir le reel : ${tile.alt}`}
                >
                  {inner}
                  <span className="absolute bottom-3 right-3 flex items-center gap-1 text-canvas opacity-0 group-hover:opacity-100 transition-opacity">
                    <InstagramIcon size={13} />
                  </span>
                </motion.a>
              ) : (
                <motion.button
                  key={tile.src}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4, ease }}
                  onClick={() => setLightboxIndex(images.findIndex((im) => im.src === tile.src))}
                  className={commonClass}
                  aria-label={`Agrandir : ${tile.alt}`}
                >
                  {inner}
                </motion.button>
              )
            })}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && lightboxIndex >= 0 && (
          <Lightbox photos={images} initial={lightboxIndex} onClose={() => setLightboxIndex(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
