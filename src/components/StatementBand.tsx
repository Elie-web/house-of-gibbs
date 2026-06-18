// Bande « devise » défilante — signature éditoriale entre le hero et le collectif.
// Grand serif lent, alternance encre / italique vert, hairlines en haut/bas.
const UNIT = [
  { text: 'Exceptional tattoos', italic: false },
  { text: 'timeless memories', italic: true },
]

export default function StatementBand() {
  // On répète assez pour couvrir deux largeurs (boucle sans couture).
  const items = Array.from({ length: 6 }, () => UNIT).flat()

  return (
    <section
      aria-label="Exceptional tattoos, timeless memories"
      className="relative border-y border-line bg-canvas-2/40 py-7 md:py-9 overflow-hidden pause-hover"
    >
      <div className="flex w-max animate-marquee-slow whitespace-nowrap will-change-transform">
        {items.map((u, i) => (
          <span key={i} className="flex items-center">
            <span
              className={`font-display font-400 text-[clamp(1.6rem,4.2vw,3.1rem)] tracking-tight leading-none ${
                u.italic ? 'italic-display text-gradient-green-static' : 'text-ink/90'
              }`}
            >
              {u.text}
            </span>
            <span className="mx-7 md:mx-10 inline-block h-1.5 w-1.5 rounded-full bg-green/70 align-middle" />
          </span>
        ))}
      </div>
    </section>
  )
}
