export interface KandilliResponse {
  status: boolean;
  httpStatus: number;
  serverloadms: number;
  desc: string;
  metadata: Metadata;
  result: Earthquake[];
}

export interface Metadata {
  date_starts: string;
  date_ends: string;
  total: number;
}

export interface Earthquake {
  _id: string;
  earthquake_id: string;
  provider: string;
  title: string;
  date: string;
  mag: number;
  depth: number;
  geojson: Geojson;
  location_properties: LocationProperties;
  rev: any;
  date_time: string;
  created_at: number;
  location_tz: string;
}

export interface Geojson {
  type: string;
  coordinates: number[];
}

export interface LocationProperties {
  closestCity: ClosestCity;
  epiCenter: EpiCenter;
  closestCities: ClosestCity2[];
  airports: Airport[];
}

export interface ClosestCity {
  name: string;
  cityCode: number;
  distance: number;
  population: number;
}

export interface EpiCenter {
  name: string;
  cityCode: number;
  population?: number;
}

export interface ClosestCity2 {
  name: string;
  cityCode: number;
  distance: number;
  population: number;
}

export interface Airport {
  distance: number;
  name: string;
  code: string;
  coordinates: Coordinates;
}

export interface Coordinates {
  type: string;
  coordinates: number[];
}
