// ================================================================
// CONFIGURATION HOUSE OF GIBBS — Personnalisez uniquement ce fichier
// ----------------------------------------------------------------
// Collectif familial de tatoueurs : Marc (le père), Isabelle (la mère),
// Indi (le fils). Studio privé en hauteur à Saint-Baldoph, vue Belledonne.
// ================================================================

import {
  poitrine,
  brasGauche,
  avantBras2,
  forearm,
  triceps,
  epaule,
  markSelfie,
} from './assets'

// --- Le studio / la maison ---------------------------------------
export const HOUSE = {
  name:       'House of Gibbs',
  shortName:  'Gibbs',
  tagline:    'Exceptional tattoos, timeless memories',
  intro:      'Un collectif familial de tatoueurs. Trois mains, un seul studio.',

  city:       'Saint-Baldoph',
  department: 'Savoie',
  view:       'Studio privé en hauteur · vue sur la chaîne de Belledonne',

  phone:      '06 26 58 51 57',
  phoneRaw:   '0626585157',
  email:      'contact@houseofgibbs.fr', // ← e-mail qui reçoit les demandes de RDV

  address:    '190 Chemin de Moulevin',
  cityZip:    '73190 Saint-Baldoph',

  // Photo de fond du hero (plein écran). Remplaçable par une vraie photo du studio.
  heroImage:  poitrine,
  mapsUrl:    'https://maps.google.com/?q=190+Chemin+de+Moulevin+73190+Saint-Baldoph',
  mapEmbed:   'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2785.4!2d5.9882!3d45.5497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478b8f3a3b9e8f0b%3A0x1234!2s190+Chemin+de+Moulevin%2C+73190+Saint-Baldoph!5e0!3m2!1sfr!2sfr!4v1700000000000',

  instagram:  'https://www.instagram.com/',
} as const

// --- Les artistes -------------------------------------------------
// accent : couleur signature de l'artiste (cohérence "maison verte",
//          chacun sa nuance). Marc = graphite (clin d'œil à BlackScab).
// gallery : { type: 'image' | 'video', src, alt, href? }
//           - 'video' = reel Instagram : `src` = vignette, `href` = lien du reel.
export type GalleryItem = {
  type: 'image' | 'video'
  src: string
  alt: string
  href?: string
}

export type Artist = {
  id: string
  name: string
  handle: string
  role: string
  specialty: string
  accent: string
  bio: string
  portrait: string
  instagram: string
  gallery: GalleryItem[]
}

export const ARTISTS: Artist[] = [
  {
    id:        'marc',
    name:      'Marc',
    handle:    'BlackScab',
    role:      'Le père',
    specialty: 'Réalisme · noir & gris',
    accent:    '#2B312E', // graphite
    bio:       "Près de trente ans à ne faire que ça. Marc maîtrise le réalisme et le noir & gris — des pièces pensées pour vieillir sans se brouiller, traverser les décennies sans perdre le trait.",
    portrait:  markSelfie,
    instagram: 'https://www.instagram.com/markblackscab/',
    gallery: [
      { type: 'image', src: poitrine,   alt: 'Tatouage pleine poitrine, réalisme noir & gris' },
      { type: 'video', src: forearm,    alt: 'Reel — avant-bras en cours', href: 'https://www.instagram.com/markblackscab/' },
      { type: 'image', src: brasGauche, alt: 'Tatouage bras gauche, noir & gris' },
      { type: 'image', src: avantBras2, alt: 'Avant-bras, détail réaliste' },
      { type: 'image', src: triceps,    alt: 'Tatouage triceps' },
      { type: 'image', src: epaule,     alt: 'Tatouage épaule' },
    ],
  },
  {
    id:        'isabelle',
    name:      'Isabelle',
    handle:    'Zaztaz',
    role:      'La mère',
    specialty: 'Fine line · floral · couleur douce',
    accent:    '#16745A', // émeraude (couleur maison)
    bio:       "Le trait fin, les compositions végétales, la couleur maniée avec retenue. Isabelle dessine des pièces délicates et lumineuses, au plus près de la peau et de l'histoire qu'on lui confie.",
    portrait:  'https://images.unsplash.com/photo-1581824283135-0666cf353f35?w=800&q=85&fit=crop',
    instagram: 'https://www.instagram.com/',
    gallery: [
      { type: 'image', src: 'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=800&q=85&fit=crop', alt: 'Composition florale fine line' },
      { type: 'video', src: 'https://images.unsplash.com/photo-1590246814883-57c511e86a22?w=800&q=85&fit=crop', alt: 'Reel — fine line en cours', href: 'https://www.instagram.com/' },
      { type: 'image', src: 'https://images.unsplash.com/photo-1562962230-16e4623d36e6?w=800&q=85&fit=crop', alt: 'Tatouage couleur douce' },
      { type: 'image', src: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=800&q=85&fit=crop', alt: 'Détail floral délicat' },
      { type: 'image', src: 'https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?w=800&q=85&fit=crop', alt: 'Fine line botanique' },
      { type: 'image', src: 'https://images.unsplash.com/photo-1543059509-99c66e1f2b5b?w=800&q=85&fit=crop', alt: 'Tatouage avant-bras couleur' },
    ],
  },
  {
    id:        'indi',
    name:      'Indi',
    handle:    'IndiTaz',
    role:      'Le fils',
    specialty: 'Graphique · blackwork · contemporain',
    accent:    '#11998E', // vert-teal frais
    bio:       "La nouvelle génération de la maison. Indi travaille le graphique, le blackwork et les formes contemporaines — des pièces nettes, franches, taillées pour aujourd'hui.",
    portrait:  'https://images.unsplash.com/photo-1503443207922-dff7d543fd0e?w=800&q=85&fit=crop',
    instagram: 'https://www.instagram.com/',
    gallery: [
      { type: 'image', src: 'https://images.unsplash.com/photo-1565058379802-bbe93b2f703a?w=800&q=85&fit=crop', alt: 'Tatouage graphique blackwork' },
      { type: 'image', src: 'https://images.unsplash.com/photo-1542856391-010fb87dcfed?w=800&q=85&fit=crop', alt: 'Blackwork contemporain' },
      { type: 'video', src: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=800&q=85&fit=crop', alt: 'Reel — pièce graphique', href: 'https://www.instagram.com/' },
      { type: 'image', src: 'https://images.unsplash.com/photo-1604881988758-f76ad2f7aac1?w=800&q=85&fit=crop', alt: 'Formes contemporaines' },
      { type: 'image', src: 'https://images.unsplash.com/photo-1562673255-ef78d8abf540?w=800&q=85&fit=crop', alt: 'Tatouage bras graphique' },
      { type: 'image', src: 'https://images.unsplash.com/photo-1611601322175-ef8ec8c85f01?w=800&q=85&fit=crop', alt: 'Blackwork détail' },
    ],
  },
]

// --- Le déroulé (3 étapes) ---------------------------------------
export const PROCESS = [
  {
    step:  '01',
    title: 'La consultation',
    desc:  "Vous choisissez l'artiste, exposez votre idée — référence, emplacement, signification. On écoute, on conseille, on oriente vers ce qui vieillira bien.",
  },
  {
    step:  '02',
    title: 'Le projet',
    desc:  "Un dessin sur mesure, jamais générique. Pensé pour votre morphologie, pour la lumière du studio, pour durer des décennies.",
  },
  {
    step:  '03',
    title: 'La séance',
    desc:  "Studio privé en hauteur, calme, vue sur Belledonne. On travaille dans la précision. Vous repartez avec une pièce qui vous ressemble.",
  },
]

// --- Avis clients ------------------------------------------------
export const REVIEWS = [
  {
    name: 'Dylan L.',
    date: 'Janvier 2025',
    rating: 5,
    text: "Mon tattoo date d'il y a 7 ans et il vieillit incroyablement bien. Un vrai travail d'artiste, accueil au top. Merci à toute la maison.",
    highlight: true,
  },
  {
    name: 'Nicolas K.',
    date: 'Novembre 2024',
    rating: 5,
    text: "Des artistes à l'écoute, de vrais conseils. Le studio est lumineux, calme, et la vue est dingue. Réalisation exceptionnelle.",
    highlight: false,
  },
  {
    name: 'Jeremy F.',
    date: 'Juillet 2023',
    rating: 5,
    text: "De vrais professionnels. Propreté irréprochable, ambiance familiale. On se sent en confiance du premier au dernier trait.",
    highlight: false,
  },
]
