import { getDictionary, TranslationKey } from "./translations";

// Define type for the localization dictionary with index signature
type Dictionary = {
  [key: string]: string;
};

export type Service = {
  id: string;
  "price-en": number;
  "price-he": number;
  "price-it": number;
  duration: number;
  nameKey: string; // Note: keep as string, as keys are dynamic
  descKey: string;
  imageUrl?: string;
  name?: string;
  description?: string;
};

export interface Master {
  id: string;
  nameKey: string;
  specializationKey: string;
  infoKey: string;
  services: string[];
  image: string;
  hint: string;
  name?: string;
  specialization?: string;
  info?: string;
}

// Define your images for masters keyed by id for consistency
const masterImages: Record<string, string> = {
  "aviva-mar": "/images/masters/aviva-mar.webp",
  "sharon-katz": "/images/masters/sharon-katz.webp",
  "mark-franklin": "/images/masters/mark-franklin.webp",
  "maria-garcia": "/images/masters/maria-garcia.webp",
};

// List of services
const rawServices: Service[] = [
  {
    id: "hairdressing",
    "price-en": 65,
    "price-he": 217,
    "price-it": 325,
    duration: 60,
    nameKey: "service_hairdressing_name",
    descKey: "service_hairdressing_desc",
    imageUrl: "/images/service-images/hairdressing.webp",
  },
  {
    id: "laser_hair_removal",
    "price-en": 110,
    "price-he": 368,
    "price-it": 550,
    duration: 75,
    nameKey: "service_laser_hair_removal_name",
    descKey: "service_laser_hair_removal_desc",
    imageUrl: "/images/service-images/laser-hair-removal.webp",
  },
  {
    id: "manicure",
    "price-en": 40,
    "price-he": 134,
    "price-it": 200,
    duration: 45,
    nameKey: "service_manicure_name",
    descKey: "service_manicure_desc",
    imageUrl: "/images/service-images/manicure.webp",
  },
  {
    id: "facial",
    "price-en": 75,
    "price-he": 251,
    "price-it": 375,
    duration: 60,
    nameKey: "service_facial_name",
    descKey: "service_facial_desc",
    imageUrl: "/images/service-images/facial.webp",
  },
  {
    id: "makeup",
    "price-en": 90,
    "price-he": 301,
    "price-it": 450,
    duration: 60,
    nameKey: "service_makeup_name",
    descKey: "service_makeup_desc",
    imageUrl: "/images/service-images/makeup.webp",
  },
  {
    id: "brow_shaping",
    "price-en": 45,
    "price-he": 150,
    "price-it": 225,
    duration: 40,
    nameKey: "service_brow_shaping_name",
    descKey: "service_brow_shaping_desc",
    imageUrl: "/images/service-images/brow-shaping.webp",
  },
  {
    id: "hair_coloring",
    "price-en": 95,
    "price-he": 317,
    "price-it": 475,
    duration: 90,
    nameKey: "service_hair_coloring_name",
    descKey: "service_hair_coloring_desc",
  },
  {
    id: "hot_stone_massage",
    "price-en": 100,
    "price-he": 334,
    "price-it": 500,
    duration: 60,
    nameKey: "service_hot_stone_massage_name",
    descKey: "service_hot_stone_massage_desc",
  },
  {
    id: "body_wrap",
    "price-en": 80,
    "price-he": 267,
    "price-it": 400,
    duration: 70,
    nameKey: "service_body_wrap_name",
    descKey: "service_body_wrap_desc",
  },
  {
    id: "aromatherapy",
    "price-en": 85,
    "price-he": 284,
    "price-it": 425,
    duration: 60,
    nameKey: "service_aromatherapy_name",
    descKey: "service_aromatherapy_desc",
  },
];

export const rawMasters: Master[] = [
  {
    id: "aviva-mar",
    nameKey: "master_aviva_name",
    specializationKey: "master_aviva_specialization",
    infoKey: "master_aviva_info",
    services: ["manicure", "facial", "makeup", "brow_shaping"],
    image: "/images/masters/aviva-mar.webp",
    hint: "Aviva Mar - Nails & Waxing",
  },
  {
    id: "sharon-katz",
    nameKey: "master_sharon_name",
    specializationKey: "master_sharon_specialization",
    infoKey: "master_sharon_info",
    services: [
      "hairdressing",
      "laser_hair_removal",
      "hair_coloring",
      "makeup",
      "facial",
      "manicure",
      "brow_shaping",
    ],
    image: "/images/masters/sharon-katz.webp",
    hint: "Sharon Katz - Cosmetology",
  },
  {
    id: "mark-franklin",
    nameKey: "master_mark_name",
    specializationKey: "master_mark_specialization",
    infoKey: "master_mark_info",
    services: ["hot_stone_massage", "body_wrap", "aromatherapy"],
    image: "/images/masters/mark-franklin.webp",
    hint: "Mark Franklin - Massage & Bodywork",
  },
  {
    id: "maria-garcia",
    nameKey: "master_maria_name",
    specializationKey: "master_maria_specialization",
    infoKey: "master_maria_info",
    services: [
      "laser_hair_removal",
      "makeup",
      "brow_shaping",
      "facial",
      "body_wrap",
      "manicure",
    ],
    image: "/images/masters/maria-garcia.webp",
    hint: "Maria Garcia - Esthetics & Lashes",
  },
];

export async function getLocalizedData(locale: string) {
  const dict = (await getDictionary(locale)) as Dictionary;
  const currencySymbol = dict["currency_symbol"] || "$";

  const services = rawServices.map((s) => ({
    ...s,
    name: s.nameKey ? dict[s.nameKey] || s.id : s.id,
    description: s.descKey ? dict[s.descKey] || "Description not available" : "Description not available",
  }));

  const masters = rawMasters.map((m) => ({
    ...m,
    name: dict[m.nameKey] || m.id,
    specialization: dict[m.specializationKey] || "Specialist",
    info: dict[m.infoKey] || "",
  }));

  return { services, masters, currencySymbol };
}
