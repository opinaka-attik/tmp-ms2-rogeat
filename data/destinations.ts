export interface Destination {
  id: string
  slug: string
  title: string
  shortDescription: string
  longDescription: string
  image: string
  heroImage: string
  era: string
  duration: string
  experiences: string[]
  dangerLevel: number
  comfortLevel: number
  price: number
  featured: boolean
}

export const destinations: Destination[] = [
  {
    id: "paris-1889",
    slug: "paris-1889",
    title: "Paris 1889",
    shortDescription: "Vivez l'Exposition universelle et la naissance de la Tour Eiffel.",
    longDescription: "Plongez dans le Paris de la Belle Époque, à l'apogée de l'innovation et du romantisme français. Assistez à l'inauguration de la Tour Eiffel lors de l'Exposition universelle de 1889, déambulez sur les grands boulevards haussmanniens, et savourez la vie parisienne dans les cafés où se retrouvent artistes et intellectuels. Découvrez une ville en pleine effervescence culturelle et technologique.",
    image: "https://res.cloudinary.com/dy89xbag6/image/upload/Gemini_Generated_Image_u010gou010gou010_rko1ou.png",
    heroImage: "https://res.cloudinary.com/dy89xbag6/image/upload/Gemini_Generated_Image_u010gou010gou010_rko1ou.png",
    era: "1889",
    duration: "5-10 jours",
    experiences: [
      "Visite de l'Exposition universelle",
      "Montée inaugurale de la Tour Eiffel",
      "Soirée au Moulin Rouge",
      "Promenade sur les Champs-Élysées",
      "Dégustation gastronomique Belle Époque"
    ],
    dangerLevel: 15,
    comfortLevel: 85,
    price: 18000,
    featured: true
  },
  {
    id: "cretace",
    slug: "cretace",
    title: "Crétacé",
    shortDescription: "Explorez le monde des dinosaures il y a 66 millions d'années.",
    longDescription: "Aventurez-vous dans un monde oublié, où les dinosaures règnent en maîtres sur une Terre primitive et sauvage. Observez le majestueux T-Rex dans son habitat naturel, traversez des jungles luxuriantes peuplées de Tricératops, et survolez des vallées où planent les Ptéranodons. Une expédition unique pour les amateurs de sensations fortes et de découvertes scientifiques.",
    image: "https://res.cloudinary.com/dy89xbag6/image/upload/Gemini_Generated_Image_qfztlzqfztlzqfzt_khbchj.png",
    heroImage: "https://res.cloudinary.com/dy89xbag6/image/upload/Gemini_Generated_Image_qfztlzqfztlzqfzt_khbchj.png",
    era: "66 millions av. J.-C.",
    duration: "3-7 jours",
    experiences: [
      "Safari d'observation des dinosaures",
      "Expédition dans la jungle préhistorique",
      "Exploration des volcans actifs",
      "Plongée dans les océans primordiaux",
      "Observation d'une pluie de météorites (sécurité garantie)"
    ],
    dangerLevel: 90,
    comfortLevel: 40,
    price: 28000,
    featured: true
  },
  {
    id: "florence-1504",
    slug: "florence-1504",
    title: "Florence 1504",
    shortDescription: "Rencontrez Michel-Ange et vivez la Renaissance italienne.",
    longDescription: "Voyagez au cœur de la Renaissance italienne, dans la Florence des Médicis. Assistez au dévoilement du David de Michel-Ange, explorez les ateliers des plus grands artistes de l'Histoire, et participez aux banquets somptueux du Palazzo Vecchio. Imprégnez-vous de l'effervescence artistique et intellectuelle qui a façonné le monde moderne.",
    image: "https://res.cloudinary.com/dy89xbag6/image/upload/v1775990310/Gemini_Generated_Image_n1elfun1elfun1el_bqfzvh.png",
    heroImage: "https://res.cloudinary.com/dy89xbag6/image/upload/v1775990310/Gemini_Generated_Image_n1elfun1elfun1el_bqfzvh.png",
    era: "1504",
    duration: "5-12 jours",
    experiences: [
      "Visite de l'atelier de Michel-Ange",
      "Banquet au Palazzo Médicis",
      "Cours de peinture Renaissance",
      "Dégustation de cuisine toscane authentique",
      "Visite guidée des chefs-d'œuvre en création"
    ],
    dangerLevel: 20,
    comfortLevel: 75,
    price: 22000,
    featured: true
  }
]

export function getDestinationBySlug(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug)
}

export function getDestinationById(id: string): Destination | undefined {
  return destinations.find((d) => d.id === id)
}

export default destinations
