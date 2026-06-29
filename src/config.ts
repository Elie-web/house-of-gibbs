// ================================================================
// CONFIGURATION HOUSE OF GIBBS — Personnalisez uniquement ce fichier
// ----------------------------------------------------------------
// Collectif familial de tatoueurs : Mark (le père), Zazz (la mère),
// Indy (le fils). Studio privé en hauteur à Saint-Baldoph, vue Belledonne.
// ================================================================

import {
  heroLandscape,
  markSelfie,
  markMountainSleeve,
  markChestSamurai,
  markForearmPortrait,
  markBackRam,
  indyPortrait,
  indySpider,
  indyWomanWolf,
  indyRamSkull,
  indyAngel,
  indyTribalSleeve,
  indyDoberman,
} from './assets'

// --- Le studio / la maison ---------------------------------------
export const HOUSE = {
  name:       'House of Gibbs',
  shortName:  'Gibbs',
  tagline:    'Exceptional tattoos, timeless memories',
  intro:      'Un collectif familial de tatoueurs basé en Savoie. Trois mains, un seul studio.',

  city:       'Saint-Baldoph',
  department: 'Savoie',
  view:       'Studio privé en hauteur · vue sur la chaîne de Belledonne',

  phone:      '06 26 58 51 57',
  phoneRaw:   '0626585157',
  email:      'contact@houseofgibbs.fr', // ← e-mail qui reçoit les demandes de RDV

  address:    '190 Chemin de Moulevin',
  cityZip:    '73190 Saint-Baldoph',

  // Photo de fond du hero (plein écran, paysage). Remplaçable par une vraie photo du studio.
  heroImage:  heroLandscape,
  mapsUrl:    'https://maps.google.com/?q=190+Chemin+de+Moulevin+73190+Saint-Baldoph',
  mapEmbed:   'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2785.4!2d5.9882!3d45.5497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478b8f3a3b9e8f0b%3A0x1234!2s190+Chemin+de+Moulevin%2C+73190+Saint-Baldoph!5e0!3m2!1sfr!2sfr!4v1700000000000',

  instagram:  'https://www.instagram.com/',

  // --- Envoi du formulaire par e-mail (automatique) --------------
  // Laisser vide => repli sur l'ouverture du client mail (mailto).
  // Pour un envoi 100% automatique, créez un endpoint gratuit puis collez-le ici :
  //  • Web3Forms  : formEndpoint = 'https://api.web3forms.com/submit'  + formAccessKey = '<votre-clé>'
  //  • Formspree  : formEndpoint = 'https://formspree.io/f/<votre-id>' (laisser formAccessKey vide)
  // Les demandes arrivent alors directement sur HOUSE.email.
  formEndpoint:  '',
  formAccessKey: '',
} as const

// --- Les artistes -------------------------------------------------
// accent : couleur signature de l'artiste (cohérence "maison verte",
//          chacun sa nuance). Marc = graphite (clin d'œil à BlackScab).
// gallery : { type: 'image' | 'video', src, alt, video?, href? }
//           - 'image' : `src` = photo plein écran (ouvre la lightbox).
//           - 'video' : `src` = vignette (poster), `video` = fichier .mp4 local
//                       (lecture sur place), `href` = lien Instagram optionnel.
export type GalleryItem = {
  type: 'image' | 'video'
  src: string
  alt: string
  video?: string
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
  facebook?: string
  maps?: string
  gallery: GalleryItem[]
}

export const ARTISTS: Artist[] = [
  {
    id:        'marc',
    name:      'Mark',
    handle:    'BlackScab',
    role:      'Le père',
    specialty: 'Réalisme · noir & gris · couleur',
    accent:    '#2B312E', // graphite
    bio:       "Le réalisme est son langage : la finesse des détails, la profondeur des dégradés, la justesse du trait. Près de trente ans à n'explorer que cela, du noir & gris à la grande pièce couleur. Mark dessine des tatouages pensés pour durer — de ceux qui gardent toute leur netteté au fil des années et vieillissent avec vous.",
    portrait:  markSelfie,
    instagram: 'https://www.instagram.com/markblackscab/?hl=fr',
    facebook:  'https://www.facebook.com/p/Blackscab-Tattoos-Chambéry-73-100063680827033/?locale=fr_FR',
    maps:      'https://www.google.com/search?kgmid=/g/11k9s678z0&hl=fr-FR&q=Blackscab%20Tattoos',
    gallery: [
      { type: 'video', src: '/videos/mark-tiger.webp',        video: '/videos/mark-tiger.mp4',        alt: 'Reel · grande pièce de dos, tigre réaliste', href: 'https://www.instagram.com/markblackscab/' },
      { type: 'image', src: markMountainSleeve,  alt: 'Manchette réaliste : forêt et montagnes au coucher du soleil' },
      { type: 'image', src: markChestSamurai,    alt: 'Pièce pleine poitrine, composition couleur et graphique' },
      { type: 'video', src: '/videos/mark-color-sleeve.webp', video: '/videos/mark-color-sleeve.mp4', alt: 'Reel · manchette couleur, portrait et plumes', href: 'https://www.instagram.com/markblackscab/' },
      { type: 'image', src: markBackRam,         alt: 'Grande pièce de dos, bélier et flammes en couleur' },
      { type: 'image', src: markForearmPortrait, alt: 'Avant-bras réaliste, portrait et motif géométrique' },
    ],
  },
  {
    id:        'isabelle',
    name:      'Zazz',
    handle:    'Zazz',
    role:      'La mère',
    specialty: 'Fine line · floral · couleur douce',
    accent:    '#16745A', // émeraude (couleur maison)
    bio:       "Zazz écoute longuement avant de dessiner — et cela se ressent dans chaque trait. Vous repartez avec ce que vous aviez imaginé, parfois plus juste encore. Fine line, compositions florales, couleurs douces : tout ce qui demande délicatesse et précision est son domaine.",
    portrait:  '', // placeholder — photos à venir
    instagram: 'https://www.instagram.com/',
    gallery: [
      { type: 'image', src: '', alt: 'Composition florale fine line' },
      { type: 'image', src: '', alt: 'Tatouage couleur douce' },
      { type: 'image', src: '', alt: 'Détail floral délicat' },
      { type: 'image', src: '', alt: 'Fine line botanique' },
    ],
  },
  {
    id:        'indi',
    name:      'Indy',
    handle:    'in_dtatts',
    role:      'Le fils',
    specialty: 'Réalisme · blackwork · graphique',
    accent:    '#11998E', // vert-teal frais
    bio:       "Indy est l'œil graphique de la maison : un blackwork affirmé, un réalisme net et des compositions qui ont du caractère. Il ne reproduit jamais un motif — il imagine une pièce qui n'existera qu'en un seul exemplaire, sur votre peau.",
    portrait:  indyPortrait,
    instagram: 'https://www.instagram.com/in_dtatts/',
    gallery: [
      { type: 'image', src: indySpider,       alt: 'Araignée hyper-réaliste en relief sur le bras' },
      { type: 'video', src: '/videos/indy-blackwork.webp', video: '/videos/indy-blackwork.mp4', alt: 'Reel · manchette blackwork en cours', href: 'https://www.instagram.com/in_dtatts/' },
      { type: 'image', src: indyWomanWolf,    alt: 'Manchette couleur, visage et loup, réalisme graphique' },
      { type: 'image', src: indyDoberman,     alt: 'Portrait de dobermann réaliste sur le mollet' },
      { type: 'image', src: indyAngel,        alt: "Avant-bras réaliste, ange et statue, noir & gris" },
      { type: 'video', src: '/videos/indy-icarus.webp',    video: '/videos/indy-icarus.mp4',    alt: "Reel · la chute d'Icare, manchette réaliste", href: 'https://www.instagram.com/in_dtatts/' },
      { type: 'image', src: indyTribalSleeve, alt: 'Manchette tribal / blackwork contemporain' },
      { type: 'image', src: indyRamSkull,     alt: 'Crâne de bélier et couronne, blackwork' },
    ],
  },
]

// --- Le déroulé (3 étapes) ---------------------------------------
// id : sert à associer le mockup visuel (voir ProcessMockups.tsx)
// tagline : phrase courte, lisible en un coup d'œil
// points : 3 repères scannables
export const PROCESS = [
  {
    step:    '01',
    id:      'consultation',
    title:   'La consultation',
    tagline: 'Votre idée, bien comprise.',
    points:  ["On écoute votre idée jusqu'à la cerner précisément", "On vous oriente vers la main faite pour votre style", 'Nos conseils pour une pièce qui traverse les années'],
  },
  {
    step:    '02',
    id:      'projet',
    title:   'Le projet',
    tagline: "Un dessin rien qu'à vous.",
    points:  ['Un dessin pensé pour votre corps, jamais décalqué', 'Jamais un motif sorti d’un catalogue', "Rien ne commence avant votre accord"],
  },
  {
    step:    '03',
    id:      'seance',
    title:   'La séance',
    tagline: 'Votre séance, au calme.',
    points:  ['Une seule personne à la fois, sans la moindre interruption', 'Une précision de chaque instant, une hygiène irréprochable', 'Vous repartez avec une pièce qui vous ressemble vraiment'],
  },
]

// --- Preuve sociale & réassurance --------------------------------
// ⚠️ Chiffres à ajuster avec les vraies données Google de la maison.
export const SOCIAL = {
  rating:      '5,0',
  reviewCount: 27,            // ← nombre d'avis réel à renseigner
  reviewsUrl:  'https://www.google.com/search?kgmid=/g/11k9s678z0&hl=fr-FR&q=Blackscab%20Tattoos',
}

// Repères de confiance affichés haut sur le site (bande de réassurance)
export const REASSURANCE = [
  { icon: 'star',     title: `${SOCIAL.rating} sur Google`,        sub: `${SOCIAL.reviewCount} avis vérifiés` },
  { icon: 'clock',    title: '~30 ans de métier',                  sub: 'Des pièces qui traversent les années' },
  { icon: 'shield',   title: 'Hygiène stricte',                    sub: 'À chaque séance, un soin sans compromis' },
  { icon: 'mountain', title: 'Studio privé, sur RDV',              sub: "Votre projet, le seul de la journée" },
] as const

// --- Questions fréquentes ----------------------------------------
export const FAQ = [
  {
    q: 'Comment se passe la première prise de contact ?',
    a: "Par le formulaire de rendez-vous ou par téléphone. On revient toujours vers vous en personne pour échanger sur votre idée et fixer une consultation.",
  },
  {
    q: 'Combien coûte un tatouage ?',
    a: "Le prix dépend de la taille, de l'emplacement et du niveau de détail. On vous donne une estimation claire après la consultation, jamais un tarif au mètre carré.",
  },
  {
    q: 'Faut-il verser un acompte ?',
    a: "Oui. Un acompte confirme votre créneau et lance le travail de dessin. Il est ensuite déduit du prix de la séance.",
  },
  {
    q: 'Tatouez-vous les mineurs ?',
    a: "Non, la maison tatoue uniquement les personnes majeures. Une pièce d'identité vous sera demandée le jour de la séance.",
  },
  {
    q: 'Comment choisir entre Mark, Zazz et Indy ?',
    a: "Selon le style qui vous parle : réalisme et couleur pour Mark, fine line et couleur douce pour Zazz, blackwork et graphique pour Indy. Dans le doute, décrivez votre projet : on vous oriente vers la bonne main.",
  },
  {
    q: 'Comment entretenir un tatouage frais ?',
    a: "On vous remet des consignes de soin précises en fin de séance et on reste joignables tout au long de la cicatrisation. Bien accompagnée, votre pièce conserve la netteté de son trait pendant des décennies.",
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
