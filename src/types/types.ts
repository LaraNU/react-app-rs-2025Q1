export type APIArtwork = {
  artist_title: string;
  date_display: string;
  id: number;
  image_id: string;
  place_of_origin: string;
  title: string;
};

type Pagination = {
  total: number;
  limit: number;
  offset: number;
  total_pages: number;
  current_page: number;
};

export type APIResponse = {
  data: APIArtwork[];
  pagination: Pagination;
};

export type Card = {
  artistTitle: string;
  dateDisplay: string;
  id: number;
  imageId: string;
  placeOfOrigin: string;
  title: string;
};

type APIArtworkDetails = {
  artist_display: string;
  description: string;
  medium_display: string;
  short_description: string;
  style_title: string;
  title: string;
  image_id: string;
  place_of_origin: string;
};

export type APIResponseDetails = {
  data: APIArtworkDetails;
};
