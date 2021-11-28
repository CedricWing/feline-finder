export enum CatBreedSortAttribute {
  name = 'name',
  weight = 'weight_metric',
  lifespan = 'lifeSpan_metric',
}

export type CatBreedQuery = {
  page: number;
  pageSize: number;
  search?: string;
  sortBy?: string;
};

export type CatBreed = {
  adaptability: number;
  affection_level: number;
  alt_names: string;
  child_friendly: number;
  country_code: string;
  country_codes: string;
  description: string;
  dog_friendly: number;
  energy_level: number;
  experimental: number;
  grooming: number;
  hairless: number;
  health_issues: number;
  hypoallergenic: number;
  id: string;
  image: { id: string; width: number; height: number; url: string };
  indoor: number;
  intelligence: number;
  life_span: string;
  name: string;
  natural: number;
  origin: string;
  rare: number;
  reference_image_id: string;
  rex: number;
  shedding_level: number;
  short_legs: number;
  social_needs: number;
  stranger_friendly: number;
  suppressed_tail: number;
  temperament: string;
  vocalisation: number;
  weight: { imperial: string; metric: string };
  wikipedia_url: string;
  weight_metric?: number;
  lifespan_metric?: number;
};
export enum BreedDescription {
  origin = 'Origin',
  temperament = 'Temperament',
  description = 'Description',
  life_span = 'Life Span (years)',
}
export enum BreedRatings {
  indoor = 'Indoor',
  lap = 'Lap',
  adaptability = 'Adaptability',
  affection_level = 'Affection level',
  child_friendly = 'Child Friendly',
  dog_friendly = 'Dog Friendly',
  energy_level = 'Energy Level',
  grooming = 'Grooming',
  health_issues = 'Health Issues',
  intelligence = 'Intelligence',
  shedding_level = 'Shedding Level',
  social_needs = 'Social Needs',
  stranger_friendly = 'Stranger Friendly',
  vocalisation = 'Vocalisation',
  experimental = 'Experimental',
  hairless = 'Hairless',
  natural = 'Natural',
  rare = 'Rare',
  rex = 'Rex',
  suppressed_tail = 'Suppressed Tail',
  short_legs = 'Short Legs',
  hypoallergenic = 'Hypoallergenic',
}
export enum BreedLinks {
  vetstreet_url = 'Vet Street',
  wikipedia_url = 'Wikipedia',
  vcahospitals_url = 'V Cat Hospitals',
}
