import { APIResponse, APIResponseDetails } from '../types/types';

const BASE_URL = 'https://api.artic.edu/api/v1';
const PATH_SEARCH = '/artworks/search';

type QueryPart =
  | { term: Record<string, string | number | boolean> }
  | { wildcard: { title: string } }
  | { bool: { should?: QueryPart[] } }
  | { match: { title: string } };

interface QueryParams {
  query: {
    bool: {
      must: QueryPart[];
    };
  };
  fields: string;
  limit: number;
  page: number;
}

const buildParams = (currPage: number, title?: string) => {
  const query: QueryParams = {
    query: {
      bool: {
        must: [
          { term: { is_public_domain: true } },
          {
            term: { artist_id: 35809 },
          },
        ],
      },
    },
    fields: `id,title,image_id,artist_title,date_display,place_of_origin`,
    limit: 12,
    page: currPage,
  };

  if (title) {
    query.query.bool.must.push({
      bool: {
        should: [
          { wildcard: { title: `*${title}*` } },
          { match: { title: title } },
        ],
      },
    });
  }

  return encodeURIComponent(JSON.stringify(query));
};

export const fetchArtworks = async (
  currPage: number,
  title?: string
): Promise<APIResponse> => {
  const params = buildParams(currPage, title);

  const response = await fetch(`${BASE_URL}${PATH_SEARCH}?params=${params}`);

  if (!response.ok) {
    let message: string = '';

    if (response.status >= 400 && response.status < 500) {
      message = `Client error (${response.status} ${response.statusText}): Please check your request.`;
    } else if (response.status >= 500) {
      message = `Server error (${response.status} ${response.statusText}): Please try again later.`;
    } else {
      message = `${response.status} ${response.statusText}`;
    }

    console.error(message);
    throw new Error(message);
  }

  const result: APIResponse = await response.json();

  return { data: result.data, pagination: result.pagination };
};

export const getImageUrl = (id: string, size: string): string => {
  const IMAGE_BASE_URL = 'https://www.artic.edu/iiif/2/';
  return `${IMAGE_BASE_URL}${id}/full/${size},/0/default.jpg`;
};

export const fetchArtworkDetails = async (id: number) => {
  const fields =
    'artist_display,medium_display,short_description,style_title,title,image_id,place_of_origin';
  const response = await fetch(`${BASE_URL}/artworks/${id}?fields${fields}`);
  const result: APIResponseDetails = await response.json();

  return result.data;
};
