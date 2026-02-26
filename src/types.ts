// src/types.ts

export interface POI {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  category: string;
  rating?: number;
  rating_count?: number;
  website?: string;
  phone?: string;
  opening_hours?: string[];
  cuisine?: string;
  price_level?: number;
  menu_url?: string;
  address?: string;
  description?: string;
  email?: string;
  open_now?: boolean;
  wheelchair_accessible?: boolean;
  outdoor_seating?: boolean;
  takeaway?: boolean;
  delivery?: boolean;
  verified?: boolean;
  popularity?: number;
  source: string;
}

export type PaginatedPois = {
  data: POI[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
};
