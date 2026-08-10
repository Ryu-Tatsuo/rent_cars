// Real Moroccan Car Dealership Seed Data & Helpers
// Currency formatted strictly in Moroccan Dirhams (DH / د.م.) using ASCII Western digits.

export type FuelType = "Gasoline" | "Diesel" | "Electric" | "Hybrid";
export type Transmission = "Automatic" | "Manual";
export type Condition = "New" | "Used" | "Certified Pre-Owned"; // Mapped to WW Neu, WW Maroc, Dédouanée

export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number; // In Moroccan Dirhams (DH)
  mileage: number; // In kilometers (km)
  fuelType: FuelType;
  transmission: Transmission;
  color: string;
  image: string;
  description: string;
  features: string[];
  condition: Condition; // "New" (WW Neu), "Used" (WW Maroc), "Certified Pre-Owned" (Dédouanée)
  originTag: "WW Maroc" | "Dédouanée" | "WW Neuve";
  vignettePaid: boolean;
  firstOwner: boolean;
}

export interface FilterState {
  search: string;
  make: string;
  minYear: string;
  maxYear: string;
  minPrice: string;
  maxPrice: string;
  fuelType: string;
  condition: string;
  transmission: string;
}

export type Page =
  | { name: "home" }
  | { name: "inventory" }
  | { name: "car"; id: string }
  | { name: "about" }
  | { name: "contact"; subject?: string };

// ── Moroccan Contact Constants ────────────────────────────────────────────────
export const WA_PHONE_NUMBER = "212661000000"; // Morocco (+212)
export const DEALER_PHONE_DISPLAY = "06 61 00 00 00";
export const DEALER_CITY = "Casablanca";
export const DEALER_ADDRESS = "Angle Bd Zerktouni & Rue Jules Cesare, Oasis, Casablanca";

export function getWhatsAppUrl(text: string): string {
  return `https://wa.me/${WA_PHONE_NUMBER}?text=${encodeURIComponent(text)}`;
}

// ── Security & Sanitization Helpers ──────────────────────────────────────────
const ALLOWED_CHARS = /[^a-zA-Z0-9\u0600-\u06FF\u00C0-\u017E\s.,!?'"\-@()+]/g;

export function sanitize(value: string): string {
  return value.replace(ALLOWED_CHARS, "").slice(0, 500);
}

export function sanitizeName(value: string): string {
  return value.replace(/[^a-zA-Z\u0600-\u06FF\u00C0-\u017E\s'\-]/g, "").slice(0, 100);
}

export function sanitizeEmail(value: string): string {
  return value.replace(/[^a-zA-Z0-9@._\-+]/g, "").slice(0, 200);
}

export function sanitizePhone(value: string): string {
  return value.replace(/[^0-9()\-+\s]/g, "").slice(0, 20);
}

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ── Moroccan Price & Mileage Formatters (Western Digits 0-9) ─────────────────
export const fmt$ = (n: number) =>
  new Intl.NumberFormat("en-US").format(n) + " DH";

export const fmtMi = (n: number) =>
  new Intl.NumberFormat("en-US").format(n) + " km";

// ── Authentic Moroccan Inventory Seed Data ────────────────────────────────────
export const CARS: Car[] = [
  {
    id: "1",
    make: "Volkswagen",
    model: "Golf 8 R-Line 2.0 TDI",
    year: 2023,
    price: 345000,
    mileage: 28000,
    fuelType: "Diesel",
    transmission: "Automatic",
    color: "Gris Nardo",
    image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&h=600&fit=crop&auto=format",
    description: "Golf 8 R-Line d'origine WW Maroc en état showroom. Moteur 2.0 TDI 150ch très économique. Boîte DSG7, toit panoramique, Cockpit Digital Pro, jantes 18 pouces R-Line. Première main avec carnet d'entretien suivi chez le concessionnaire officiel à Casablanca. Vignette 2026 acquittée.",
    features: [
      "WW Maroc (1ère Main)",
      "Pack R-Line Extérieur & Intérieur",
      "Toit Panoramique Ouvrant",
      "Digital Cockpit Pro + Écran 10 pouces",
      "Phares IQ.Light Matrix LED",
      "Boîte DSG7 avec palettes au volant",
      "Carnet d'entretien VW Maroc à jour",
      "Vignette 2026 Payée (1 500 DH)",
    ],
    condition: "Used",
    originTag: "WW Maroc",
    vignettePaid: true,
    firstOwner: true,
  },
  {
    id: "2",
    make: "Renault",
    model: "Clio 5 Intens 1.5 dCi",
    year: 2024,
    price: 189000,
    mileage: 12500,
    fuelType: "Diesel",
    transmission: "Manual",
    color: "Bleu Celadon",
    image: "https://images.unsplash.com/photo-1619767886558-efdc259b4c49?w=800&h=600&fit=crop&auto=format",
    description: "Renault Clio 5 version Intens avec le réputé moteur 1.5 dCi (Mazout) consommant moins de 4L/100km. Origine WW Maroc sous garantie constructeur. Écran Easy Link 9.3 pouces avec Apple CarPlay sans fil, caméra de recul et jantes alu 17 pouces.",
    features: [
      "WW Maroc - Sous Garantie Constructeur",
      "Moteur 1.5 dCi 115ch Économique",
      "Écran Tactile 9.3 pouces + Navigation",
      "Apple CarPlay & Android Auto",
      "Caméra de recul + Radars 360°",
      "Climatisation Automatique",
      "Cartes mains libres (Accès & Démarrage)",
      "Vignette 2026 Offerte",
    ],
    condition: "New",
    originTag: "WW Neuve",
    vignettePaid: true,
    firstOwner: true,
  },
  {
    id: "3",
    make: "Dacia",
    model: "Duster Prestige 1.5 dCi 4x2",
    year: 2023,
    price: 198000,
    mileage: 34000,
    fuelType: "Diesel",
    transmission: "Manual",
    color: "Orange Atacama",
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&h=600&fit=crop&auto=format",
    description: "Le SUV incontournable au Maroc ! Dacia Duster finition Prestige d'origine WW Maroc. Faible consommation, garde au sol idéale pour les routes marocaines, carte grise et entretien régulier. Caméra Multi-views, détecteur d'angle mort et climatisation automatique.",
    features: [
      "WW Maroc (1ère Main)",
      "Moteur 1.5 dCi 110ch Robustesse Éprouvée",
      "Caméra Multi-Vues (Avant/Arrière/Côtés)",
      "Système Media Nav 8 pouces",
      "Barres de toit & Jantes 17 pouces Prestige",
      "Régulateur / Limiteur de Vitesse",
      "Contrôle Technique R.A.S",
      "Garantie 6 Mois Inclus",
    ],
    condition: "Used",
    originTag: "WW Maroc",
    vignettePaid: true,
    firstOwner: true,
  },
  {
    id: "4",
    make: "Mercedes-Benz",
    model: "Classe C 220d AMG Line",
    year: 2023,
    price: 520000,
    mileage: 22000,
    fuelType: "Diesel",
    transmission: "Automatic",
    color: "Noir Obsidienne",
    image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&h=600&fit=crop&auto=format",
    description: "Superbe Mercedes Classe C 220d AMG Line W206. Dédouanée en 2024 (Importée d'Allemagne avec dossier douane complet). Intérieur cuir Nappa marron, écran verticall MBUX 11.9 pouces, toit panoramique ouvrant, sonorisation Burmester 3D et jantes 19 pouces AMG.",
    features: [
      "Dédouanement Garanti (Dossier Douane Complet)",
      "Pack AMG Line Intérieur & Extérieur",
      "Moteur 2.0d Mild-Hybrid 200ch + 23ch EQ Boost",
      "Sonorisation Burmester 3D Surround",
      "Toit Panoramique Ouvrant",
      "Affichage Tête Haute (HUD)",
      "Éclairage d'Ambiance 64 Couleurs",
      "Vignette 2026 Acquittée",
    ],
    condition: "Certified Pre-Owned",
    originTag: "Dédouanée",
    vignettePaid: true,
    firstOwner: false,
  },
  {
    id: "5",
    make: "Hyundai",
    model: "Tucson Ultimate 1.6 CRDi 4x4",
    year: 2024,
    price: 365000,
    mileage: 15000,
    fuelType: "Diesel",
    transmission: "Automatic",
    color: "Gris Amazon",
    image: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=800&h=600&fit=crop&auto=format",
    description: "Hyundai Tucson 4ème génération, finition haut de gamme Ultimate d'origine WW Maroc. Moteur 1.6 CRDi 136ch avec boîte automatique 7DCT et transmission intégrale 4WD. Sièges en cuir ventilés et chauffants, toit panoramique, système son KRELL.",
    features: [
      "WW Maroc - Sous Garantie Constructeur (5 Ans)",
      "Transmission Intégrale HTRAC 4x4",
      "Sièges Cuir Électriques Chauffants & Ventilés",
      "Toit Panoramique Ouvrant",
      "Système Audio Premium KRELL",
      "Caméras 360° avec vision d'angle mort",
      "Hayon arrière électrique mains libres",
      "Vignette 2026 Payée",
    ],
    condition: "Certified Pre-Owned",
    originTag: "WW Maroc",
    vignettePaid: true,
    firstOwner: true,
  },
  {
    id: "6",
    make: "Peugeot",
    model: "208 GT Pack 1.5 BlueHDi",
    year: 2023,
    price: 215000,
    mileage: 26000,
    fuelType: "Diesel",
    transmission: "Automatic",
    color: "Jaune Faro",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c5d3f?w=800&h=600&fit=crop&auto=format",
    description: "Peugeot 208 GT Pack avec la boîte automatique EAT8 et le moteur diesel 1.5 BlueHDi 130ch. Origine WW Maroc. Cockpit 3D holographique, toit Black Diamond, phare Full LED Peugeot Full Technology et feux arrière 3 griffes. État irréprochable.",
    features: [
      "WW Maroc (1ère Main)",
      "Finition Haut de Gamme GT Pack",
      "Boîte Automatique EAT8 avec palettes",
      "Peugeot i-Cockpit 3D 10 pouces",
      "Projecteurs Full LED Peugeot Technology",
      "Sièges Alcantara / Tep GT",
      "Recharge Smartphone sans fil",
      "Garantie 12 Mois Offerte",
    ],
    condition: "Used",
    originTag: "WW Maroc",
    vignettePaid: true,
    firstOwner: true,
  },
  {
    id: "7",
    make: "BMW",
    model: "Série 3 320d M Sport",
    year: 2022,
    price: 430000,
    mileage: 48000,
    fuelType: "Diesel",
    transmission: "Automatic",
    color: "Blanc Alpin",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop&auto=format",
    description: "BMW 320d G20 M Sport 190ch d'origine WW Maroc avec suivi complet chez SMEIA Casablanca. Boîte sport Steptronic à 8 rapports, suspension M Sport, calandre noire M Performance, Harman Kardon, régulateur actif et feux Laser. Première main.",
    features: [
      "WW Maroc - Suivi Régulier SMEIA",
      "Pack M Sport d'origine",
      "Projecteurs BMW Laserlight",
      "Système de Son Harman Kardon",
      "Affichage Tête Haute & BMW Live Cockpit",
      "Sièges Sport Alcantara avec mémoire",
      "Jantes 19 pouces M Bicolores",
      "Vignette 2026 Payée (1 500 DH)",
    ],
    condition: "Used",
    originTag: "WW Maroc",
    vignettePaid: true,
    firstOwner: true,
  },
  {
    id: "8",
    make: "Peugeot",
    model: "3008 GT Line 2.0 BlueHDi",
    year: 2023,
    price: 310000,
    mileage: 39000,
    fuelType: "Diesel",
    transmission: "Automatic",
    color: "Gris Platinium",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a705d?w=800&h=600&fit=crop&auto=format",
    description: "Peugeot 3008 GT Line restylé avec le puissant moteur 2.0 BlueHDi 180ch et boîte automatique EAT8. Origine WW Maroc. Toit panoramique ouvrant avec éclairage d'ambiance, hayon mains libres, i-Cockpit et système Hi-Fi FOCAL®.",
    features: [
      "WW Maroc (1ère Main)",
      "Moteur 2.0 BlueHDi 180ch Puissant & Sobre",
      "Système Audio FOCAL® Premium",
      "Toit Panoramique Ouvrant",
      "Hayon Motorisé Mains Libres",
      "Grip Control avec 5 modes de conduite",
      "Sièges en Cuir Nappa Massants",
      "Vignette 2026 Payée",
    ],
    condition: "Used",
    originTag: "WW Maroc",
    vignettePaid: true,
    firstOwner: true,
  },
  {
    id: "9",
    make: "Range Rover",
    model: "Evoque R-Dynamic SE 2.0 D",
    year: 2023,
    price: 495000,
    mileage: 31000,
    fuelType: "Diesel",
    transmission: "Automatic",
    color: "Carpathian Grey",
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&h=600&fit=crop&auto=format",
    description: "Range Rover Evoque R-Dynamic SE d'origine WW Maroc (SMEIA). Style raffiné avec poignées de portes déployables, toit panoramique fixe, double écran Touch Pro Duo et système audio Meridian 380W. Carnet d'entretien complet à jour.",
    features: [
      "WW Maroc (Acheté chez SMEIA)",
      "Finition R-Dynamic SE Spécifique",
      "Système Audio Meridian 380W",
      "Toit Panoramique Fixe avec Store Électrique",
      "Double Écran Tactile Touch Pro Duo",
      "Rétroviseur intérieur ClearSight (Caméra)",
      "Jantes 20 pouces finition Gloss Black",
      "Vignette 2026 Payée (1 500 DH)",
    ],
    condition: "Certified Pre-Owned",
    originTag: "WW Maroc",
    vignettePaid: true,
    firstOwner: true,
  },
  {
    id: "10",
    make: "Audi",
    model: "A4 S Line 35 TDI",
    year: 2023,
    price: 385000,
    mileage: 33000,
    fuelType: "Diesel",
    transmission: "Automatic",
    color: "Gris Daytona",
    image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&h=600&fit=crop&auto=format",
    description: "Audi A4 S Line restylée d'origine WW Maroc (Centrale Automobile Chérifienne - CAC). Moteur 2.0 TDI Mild-Hybrid 163ch avec boîte S Tronic. Virtual Cockpit Plus, pack esthétique noir, sonorisation Bang & Olufsen 3D et phares Matrix LED.",
    features: [
      "WW Maroc - Suivi Concessionnaire CAC",
      "Pack Extérieur & Intérieur S Line",
      "Audi Virtual Cockpit Plus",
      "Projecteurs Matrix LED avec clignotants défilants",
      "Sonorisation Bang & Olufsen 3D",
      "Volant cuir méplat S Line avec palettes",
      "Garantie Constructeur jusqu'à Fin 2026",
      "Vignette 2026 Payée",
    ],
    condition: "Certified Pre-Owned",
    originTag: "WW Maroc",
    vignettePaid: true,
    firstOwner: true,
  },
  {
    id: "11",
    make: "Toyota",
    model: "RAV4 Dynamic 2.5 Hybride 4x2",
    year: 2024,
    price: 395000,
    mileage: 18000,
    fuelType: "Hybrid",
    transmission: "Automatic",
    color: "Gris Titane",
    image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&h=600&fit=crop&auto=format",
    description: "Toyota RAV4 Hybride 218ch WW Maroc sous garantie Toyota Maroc 5 ans. Zéro vignette à payer (Exonération véhicule hybride au Maroc) ! Consommation record en ville (4.5L/100km). Toyota Safety Sense, écran tactile avec CarPlay et coffre de 580 litres.",
    features: [
      "WW Maroc - Garantie Toyota 5 Ans / 100 000 km",
      "Exonération de Vignette au Maroc (0 DH / An)",
      "Motorisation Hybride 218ch Ultra Fiable",
      "Consommation Mixte 4.5L / 100km",
      "Toyota Safety Sense (Freinage urgence + Régulateur)",
      "Caméra de Recul + Climatisation Bi-Zone",
      "Jantes Aluminium 18 pouces",
      "Carte Grise Immédiate",
    ],
    condition: "New",
    originTag: "WW Neuve",
    vignettePaid: true,
    firstOwner: true,
  },
  {
    id: "12",
    make: "Tesla",
    model: "Model Y Long Range AWD",
    year: 2024,
    price: 490000,
    mileage: 8500,
    fuelType: "Electric",
    transmission: "Automatic",
    color: "Pearl White Multi-Coat",
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=600&fit=crop&auto=format",
    description: "Tesla Model Y Grande Autonomie Dual Motor AWD d'importation européenne dédouanée au Maroc en 2024. Autonomie de 533 km WLTP. Zéro vignette, accès réseau de recharge rapide à Casablanca et Rabat. État neuf avec seulement 8 500 km certifiés.",
    features: [
      "Dédouanement Complet Effectué (Maroc 2024)",
      "Autonomie 533 km WLTP - Dual Motor 4x4",
      "Exonération de Vignette au Maroc (0 DH)",
      "Pilote Automatique Amélioré",
      "Toit Panoramique Intégral en Verre",
      "Système Audio Premium 14 Haut-parleurs",
      "Jantes Induction 20 pouces",
      "Supercharge Compatible au Maroc",
    ],
    condition: "Certified Pre-Owned",
    originTag: "Dédouanée",
    vignettePaid: true,
    firstOwner: false,
  },
];

export const MAKES = [...new Set(CARS.map((c) => c.make))].sort();

export const EMPTY_FILTERS: FilterState = {
  search: "", make: "", minYear: "", maxYear: "",
  minPrice: "", maxPrice: "", fuelType: "", condition: "", transmission: "",
};

export function filterCars(cars: Car[], filters: FilterState): Car[] {
  return cars.filter((car) => {
    if (filters.search) {
      const q = filters.search.toLowerCase().replace(ALLOWED_CHARS, "");
      const hay = `${car.make} ${car.model} ${car.color} ${car.year} ${car.fuelType} ${car.condition} ${car.originTag}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    if (filters.make && car.make !== filters.make) return false;
    const minY = parseInt(filters.minYear); if (!isNaN(minY) && car.year < minY) return false;
    const maxY = parseInt(filters.maxYear); if (!isNaN(maxY) && car.year > maxY) return false;
    const minP = parseInt(filters.minPrice); if (!isNaN(minP) && car.price < minP) return false;
    const maxP = parseInt(filters.maxPrice); if (!isNaN(maxP) && car.price > maxP) return false;
    if (filters.fuelType && car.fuelType !== filters.fuelType) return false;
    if (filters.condition && car.condition !== filters.condition) return false;
    if (filters.transmission && car.transmission !== filters.transmission) return false;
    return true;
  });
}
