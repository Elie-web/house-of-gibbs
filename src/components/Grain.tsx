// Texture globale : halos ambiants (derrière le contenu) + grain fin (au-dessus).
// Le grain est placé au-dessus du contenu mais sous la navbar (z-50) et les
// modales (z-100), et reste pointer-events-none. Donne matière + lumière vivante
// à un fond clair, sans jamais l'alourdir.
export default function Grain() {
  return (
    <>
      {/* Halos ambiants verts — z-0, visibles à travers les sections transparentes */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            'radial-gradient(55% 45% at 82% -5%, rgba(22,116,90,0.10), transparent 70%), radial-gradient(50% 45% at 0% 60%, rgba(17,153,142,0.07), transparent 70%), radial-gradient(60% 50% at 100% 105%, rgba(14,83,64,0.06), transparent 70%)',
        }}
      />
      {/* Grain fin (SVG feTurbulence) — au-dessus du contenu, mélange multiply */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[45] opacity-[0.04] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: '200px 200px',
        }}
      />
    </>
  )
}
