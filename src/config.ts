// ================================================================
// CONFIGURATION HOUSE OF GIBBS — Personnalisez uniquement ce fichier
// ----------------------------------------------------------------
// Collectif familial de tatoueurs : Marc (le père), Isabelle (la mère),
// Indi (le fils). Studio privé en hauteur à Saint-Baldoph, vue Belledonne.
// ================================================================

import {
  poitrine,
  heroLandscape,
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
  facebook?: string
  maps?: string
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
    bio:       "Si vous voulez un réalisme noir & gris qui tient dans le temps (les détails, les dégradés, le trait), Marc est la bonne personne. Trente ans à ne faire que ça. Des pièces qui restent nettes, pas dans six mois, dans vingt ans.",
    portrait:  markSelfie,
    instagram: 'https://www.instagram.com/markblackscab/?hl=fr',
    facebook:  'https://www.facebook.com/p/Blackscab-Tattoos-Chambéry-73-100063680827033/?locale=fr_FR',
    maps:      'https://www.google.com/search?kgmid=/g/11k9s678z0&hl=fr-FR&q=Blackscab%20Tattoos',
    gallery: [
      { type: 'image', src: poitrine,   alt: 'Tatouage pleine poitrine, réalisme noir & gris' },
      { type: 'video', src: forearm,    alt: 'Reel · avant-bras en cours', href: 'https://www.instagram.com/markblackscab/' },
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
    bio:       "Avec Isabelle, vous repartez avec ce que vous imaginiez. Parfois mieux. Elle écoute avant de dessiner, et ça se voit dans le résultat. Fine line, compositions florales, couleurs douces : tout ce qui demande légèreté et précision, c'est son terrain.",
    portrait:  'https://images.unsplash.com/photo-1581824283135-0666cf353f35?w=800&q=85&fit=crop',
    instagram: 'https://www.instagram.com/',
    gallery: [
      { type: 'image', src: 'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=800&q=85&fit=crop', alt: 'Composition florale fine line' },
      { type: 'video', src: 'https://images.unsplash.com/photo-1590246814883-57c511e86a22?w=800&q=85&fit=crop', alt: 'Reel · fine line en cours', href: 'https://www.instagram.com/' },
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
    bio:       "Si vous cherchez quelque chose de graphique, de net, qui sort des sentiers battus. C'est Indi. Blackwork, formes contemporaines, compositions avec de la personnalité. Il ne copie pas : il dessine quelque chose qui n'existe qu'en un seul exemplaire.",
    portrait:  'https://images.unsplash.com/photo-1503443207922-dff7d543fd0e?w=800&q=85&fit=crop',
    instagram: 'https://www.instagram.com/',
    gallery: [
      { type: 'image', src: 'https://images.unsplash.com/photo-1565058379802-bbe93b2f703a?w=800&q=85&fit=crop', alt: 'Tatouage graphique blackwork' },
      { type: 'image', src: 'https://images.unsplash.com/photo-1542856391-010fb87dcfed?w=800&q=85&fit=crop', alt: 'Blackwork contemporain' },
      { type: 'video', src: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=800&q=85&fit=crop', alt: 'Reel · pièce graphique', href: 'https://www.instagram.com/' },
      { type: 'image', src: 'https://images.unsplash.com/photo-1604881988758-f76ad2f7aac1?w=800&q=85&fit=crop', alt: 'Formes contemporaines' },
      { type: 'image', src: 'https://images.unsplash.com/photo-1562673255-ef78d8abf540?w=800&q=85&fit=crop', alt: 'Tatouage bras graphique' },
      { type: 'image', src: 'https://images.unsplash.com/photo-1611601322175-ef8ec8c85f01?w=800&q=85&fit=crop', alt: 'Blackwork détail' },
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
    points:  ["On cerne exactement ce que vous voulez", "On identifie l'artiste qui correspond à votre style", 'Conseils pour un tatouage qui vieillit bien'],
  },
  {
    step:    '02',
    id:      'projet',
    title:   'Le projet',
    tagline: "Un dessin rien qu'à vous.",
    points:  ['Conçu pour votre corps, pas copié', 'Jamais un motif catalogue', "Vous validez avant qu'on commence"],
  },
  {
    step:    '03',
    id:      'seance',
    title:   'La séance',
    tagline: 'Votre séance, au calme.',
    points:  ['Un seul client à la fois, sans interruption', 'Précision et hygiène irréprochable', 'Vous repartez avec quelque chose qui vous ressemble'],
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
  { icon: 'clock',    title: '~30 ans de métier',                  sub: 'Des pièces qui tiennent dans le temps' },
  { icon: 'shield',   title: 'Hygiène stricte',                    sub: 'Chaque séance, sans compromis sur le soin' },
  { icon: 'mountain', title: 'Studio privé, sur RDV',              sub: "Votre projet est le seul du jour" },
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
    q: 'Comment choisir entre Marc, Isabelle et Indi ?',
    a: "Selon le style qui vous parle : réalisme noir & gris pour Marc, fine line et couleur douce pour Isabelle, graphique et blackwork pour Indi. Dans le doute, décrivez votre projet : on vous oriente vers la bonne main.",
  },
  {
    q: 'Comment entretenir un tatouage frais ?',
    a: "On vous remet des consignes de soin précises en fin de séance et on reste joignables pour la cicatrisation. Un tatouage bien entretenu garde son trait net pendant des décennies.",
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
