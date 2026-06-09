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
        // --- Encre (texte + bloc sombre de clôture, vert-noir) ---
        ink:        '#15201B',   // texte principal, bloc sombre
        'ink-2':    '#1C2A24',   // surface sombre élevée
        'ink-line': '#2C3B33',   // filets sur fond sombre
        soft:       '#4A5650',   // texte secondaire (sur clair)
        muted:      '#828D86',   // texte tertiaire
        'ink-soft': '#B9C4BC',   // texte secondaire sur fond sombre
        // --- Vert maison : émeraude profond, froid, sans jaune -----
        green:      '#16745A',
        'green-2':  '#0E5340',   // états foncés
        'green-3':  '#4FA288',   // états clairs / sur fond sombre
        'green-4':  '#11998E',   // teal frais (Indi)
        'green-tint':'#DCEAE3',  // fonds de badges / surfaces vertes claires
      },
      boxShadow: {
        'green-glow': '0 30px 80px -38px rgba(22, 116, 90, 0.40)',
        'soft-lift':  '0 24px 60px -34px rgba(21, 32, 27, 0.28)',
        'card':       '0 1px 2px rgba(21,32,27,0.04), 0 12px 32px -22px rgba(21,32,27,0.20)',
      },
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'serif'],
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
