import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { ARTISTS } from '../config'
import { InstagramIcon } from './icons'

// Un échantillon par artiste pour la bande défilante
const FEED = ARTISTS.flatMap((a) =>
  a.gallery.slice(0, 3).map((g) => ({ src: g.src, alt: g.alt, href: a.instagram, accent: a.accent, name: a.name })),
)

export default function Instagram() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const ease = [0.22, 1, 0.36, 1] as const

  return (
    <section id="instagram" ref={ref} className="py-16 sm:py-24 md:py-32 bg-canvas overflow-hidden">
      <div className="max-w-container mx-auto px-5 md:px-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
          className="mb-10"
        >
          <p className="font-mono text-[11px] uppercase tracking-widest text-green mb-5">Instagram</p>
          <h2 className="font-display text-[clamp(1.9rem,4.4vw,3rem)] font-400 tracking-tight text-ink leading-[1.05] mb-3">
            Les derniers travaux, <span className="italic-display text-gradient-green-static">en direct</span>.
          </h2>
          <p className="font-sans text-[15px] text-soft max-w-xl">
            Reels, stories et pièces fraîches. Suivez chaque artiste sur son compte.
          </p>

          {/* Liens profils par artiste */}
          <div className="flex flex-wrap gap-2.5 mt-7">
            {ARTISTS.map((a) => (
              <a
                key={a.id}
                href={a.instagram}
                target="_blank"
                rel="noopener noreferrer"
                style={{ '--accent': a.accent } as React.CSSProperties}
                className="group inline-flex items-center gap-2 pl-3 pr-4 py-2.5 rounded-full border border-line bg-white hover:border-[var(--accent)] transition-colors"
              >
                <span className="w-7 h-7 rounded-full flex items-center justify-center text-white" style={{ background: 'var(--accent)' }}>
                  <InstagramIcon size={14} strokeWidth={2.25} />
                </span>
                <span className="font-sans text-[13px] font-600 text-ink">@{a.handle}</span>
                <ArrowUpRight size={14} className="text-muted group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bande horizontale défilante */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.15, ease }}
        className="flex gap-3 overflow-x-auto px-5 md:px-10 pb-4 snap-x snap-mandatory no-scrollbar"
      >
        {FEED.map((post, i) => (
          <a
            key={`${post.src}-${i}`}
            href={post.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{ '--accent': post.accent } as React.CSSProperties}
            className="group relative shrink-0 snap-start w-[56vw] sm:w-[280px] aspect-square rounded-2xl overflow-hidden bg-canvas-2"
          >
            <img src={post.src} alt={post.alt} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
            <div className="absolute inset-0 ring-1 ring-inset ring-ink/5 rounded-2xl" />
            <div className="absolute inset-0 flex items-center justify-center bg-ink/0 group-hover:bg-ink/30 transition-colors duration-300">
              <InstagramIcon size={24} className="text-canvas opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="absolute left-3 bottom-3 font-mono text-[10px] uppercase tracking-wide text-canvas opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
              {post.name}
            </span>
          </a>
        ))}
      </motion.div>
    </section>
  )
}
