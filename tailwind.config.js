/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // --- Canvas clair, à peine teinté vert : épuré, lumineux ---
        canvas:     '#F7F8F5',   // fond principal
        'canvas-2': '#EEF1EB',   // panneaux / survol
        line:       '#DEE3D8',   // filets / bordures
        // --- Encre (texte principal ; les blocs sombres passent en vert) ---
        ink:        '#15201B',   // texte principal
        'ink-2':    '#1C2A24',   // surface sombre élevée
        'ink-line': '#2C3B33',   // filets sur fond sombre
        soft:       '#4A5650',   // texte secondaire (sur clair)
        muted:      '#828D86',   // texte tertiaire
        'ink-soft': '#C3D0C7',   // texte secondaire sur fond vert sombre
        // --- Vert maison : éclairci + un cran plus militaire (à valider
        //     avec la sélection Castorama de Mark ; éviter le vert pomme) --
        green:      '#2E7457',   // accent principal (était #16745A, éclairci)
        'green-2':  '#1F5741',   // états foncés
        'green-3':  '#6BB89A',   // états clairs / texte sur fond vert
        'green-4':  '#3C8C79',   // teal frais (Indy)
        'green-tint':'#E1ECE5',  // fonds de badges / surfaces vertes claires
        // Fond des sections « chaudes » : vert militaire (olive/mat, chaud),
        // remplace le presque-noir. Texte blanc lisible dessus.
        'green-bg':  '#3D4C34',
        'green-bg-2':'#49583F',  // surfaces élevées sur fond vert militaire
        'green-bg-line':'#525F47', // filets sur fond vert militaire
      },
      boxShadow: {
        'green-glow': '0 30px 80px -38px rgba(46, 116, 87, 0.40)',
        'soft-lift':  '0 24px 60px -34px rgba(21, 32, 27, 0.28)',
        'card':       '0 1px 2px rgba(21,32,27,0.04), 0 12px 32px -22px rgba(21,32,27,0.20)',
        // Élévation « luxe » : liseré clair en haut + ombre verte profonde et douce
        'luxe':       'inset 0 1px 0 rgba(255,255,255,0.7), 0 2px 4px -2px rgba(14,83,64,0.10), 0 28px 60px -34px rgba(14,83,64,0.34)',
        'luxe-hover': 'inset 0 1px 0 rgba(255,255,255,0.8), 0 4px 8px -3px rgba(14,83,64,0.14), 0 40px 80px -38px rgba(14,83,64,0.42)',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'Georgia', 'sans-serif'],
        sans:    ['"Manrope"', 'system-ui', 'sans-serif'],
        mono:    ['"Space Mono"', 'ui-monospace', 'monospace'],
      },
      fontWeight: {
        '400': '400',
        '500': '500',
        '600': '600',
        '700': '700',
        '800': '800',
      },
      transitionDuration: {
        '400': '400ms',
      },
      letterSpacing: {
        widest:    '0.2em',
        ultrawide: '0.3em',
      },
      maxWidth: {
        container: '1240px',
      },
    },
  },
  plugins: [],
}
