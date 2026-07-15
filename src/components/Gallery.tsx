import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { X, ChevronLeft, ChevronRight, Play, ImageIcon, ArrowUpRight } from 'lucide-react'
import { ARTISTS, type GalleryItem, type Artist } from '../config'
import { InstagramIcon } from './icons'

const ease = [0.22, 1, 0.36, 1] as const

type Tile = GalleryItem & { uid: string; artistName: string; accent: string }

function tilesFor(a: Artist): Tile[] {
  return a.gallery.map((g, gi) => ({ ...g, uid: `${a.id}-${gi}`, artistName: a.name, accent: a.accent }))
}

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
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 backdrop-blur-xl p-4"
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

        {photos.length > 1 && (
          <>
            <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 bg-canvas/10 backdrop-blur-sm rounded-full flex items-center justify-center text-canvas hover:bg-green transition-colors" aria-label="Précédent">
              <ChevronLeft size={20} />
            </button>
            <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 bg-canvas/10 backdrop-blur-sm rounded-full flex items-center justify-center text-canvas hover:bg-green transition-colors" aria-label="Suivant">
              <ChevronRight size={20} />
            </button>
          </>
        )}
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
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 backdrop-blur-xl p-4"
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

/**
 * Les galeries — une par artiste, à la suite, sur fond vert sombre façon
 * mur de galerie d'art : les pièces (et leur couleur) ressortent. Toutes les
 * vignettes sont visibles d'emblée en petit ; un clic agrandit celle qu'on veut.
 */
function ArtistGallery({ artist, onOpenPhoto, onOpenVideo }: {
  artist: Artist
  onOpenPhoto: (photos: Tile[], index: number) => void
  onOpenVideo: (tile: Tile) => void
}) {
  const tiles = tilesFor(artist)
  const photos = tiles.filter((t) => t.type === 'image' && t.src)

  return (
    <div id={`gal-${artist.id}`} className="scroll-mt-28">
      {/* En-tête de galerie — le nom sert de séparation structurelle entre les passages */}
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6 md:mb-8 pb-5 border-b border-green-bg-line">
        <div>
          <h3 className="font-display text-[clamp(1.9rem,5vw,3.2rem)] font-600 tracking-[-0.02em] leading-none text-canvas">
            {artist.name}
          </h3>
          <p className="font-sans text-sm font-500 text-green-3 mt-2.5">{artist.specialty}</p>
        </div>
        <a
          href={artist.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-widest text-ink-soft hover:text-green-3 transition-colors"
        >
          <InstagramIcon size={15} strokeWidth={2} />
          @{artist.handle}
        </a>
      </div>

      {/* Grille de vignettes */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 md:gap-3">
        {tiles.map((tile) => {
          const isVideo = tile.type === 'video'

          // Placeholder : média pas encore fourni
          if (!tile.src) {
            return (
              <div
                key={tile.uid}
                className="relative aspect-square overflow-hidden rounded-xl bg-white/[0.04] ring-1 ring-inset ring-white/10 flex flex-col items-center justify-center gap-1.5 text-ink-soft"
              >
                <ImageIcon size={20} strokeWidth={1.5} style={{ color: tile.accent }} />
                <span className="font-mono text-[9px] uppercase tracking-widest">
                  {isVideo ? 'Reel à venir' : 'Photo à venir'}
                </span>
              </div>
            )
          }

          const inner = (
            <>
              {isVideo && tile.video ? (
                <video
                  src={tile.video}
                  poster={tile.src}
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
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-xl pointer-events-none" />
              <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/25 transition-colors duration-300" />
              {isVideo && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="w-11 h-11 rounded-full bg-ink/55 backdrop-blur-sm flex items-center justify-center ring-1 ring-white/25 transition-transform duration-300 group-hover:scale-110">
                    <Play size={16} className="text-canvas translate-x-0.5" fill="currentColor" />
                  </span>
                </span>
              )}
            </>
          )

          return (
            <motion.button
              key={tile.uid}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{ duration: 0.4, ease }}
              onClick={() =>
                isVideo
                  ? tile.video
                    ? onOpenVideo(tile)
                    : window.open(tile.href, '_blank')
                  : onOpenPhoto(photos, photos.findIndex((p) => p.src === tile.src))
              }
              className="group relative aspect-square overflow-hidden rounded-xl bg-white/[0.04] cursor-pointer"
              aria-label={isVideo ? `Lire le reel : ${tile.alt}` : `Agrandir : ${tile.alt}`}
            >
              {inner}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

export default function Gallery() {
  const [lightbox, setLightbox] = useState<{ photos: Tile[]; index: number } | null>(null)
  const [videoTile, setVideoTile] = useState<Tile | null>(null)

  return (
    <section
      id="galeries"
      className="relative overflow-hidden bg-green-bg text-canvas py-16 sm:py-24 md:py-32 px-5 md:px-10"
    >
      {/* halo vert clair de profondeur (façon mur de galerie) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-1/4 left-1/2 -translate-x-1/2 w-[min(1000px,95vw)] aspect-square rounded-full opacity-60"
        style={{ background: 'radial-gradient(circle, rgba(107,184,154,0.20) 0%, transparent 65%)' }}
      />

      <div className="relative max-w-container mx-auto">
        <h2 className="font-display text-[clamp(2.4rem,6.5vw,4.6rem)] font-600 tracking-[-0.02em] leading-[0.98] text-canvas text-balance mb-14 md:mb-20">
          Les galeries.
        </h2>

        <div className="space-y-16 md:space-y-24">
          {ARTISTS.map((a) => (
            <ArtistGallery
              key={a.id}
              artist={a}
              onOpenPhoto={(photos, index) => setLightbox({ photos, index })}
              onOpenVideo={(tile) => setVideoTile(tile)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightbox && lightbox.index >= 0 && (
          <Lightbox photos={lightbox.photos} initial={lightbox.index} onClose={() => setLightbox(null)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {videoTile && <VideoLightbox tile={videoTile} onClose={() => setVideoTile(null)} />}
      </AnimatePresence>
    </section>
  )
}
