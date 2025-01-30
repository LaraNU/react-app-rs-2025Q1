const BASE_URL = 'https://api.artic.edu/api/v1';
const PATH_SEARCH = '/artworks/search';

type QueryPart =
  | { term: Record<string, string | number | boolean> }
  | { wildcard: { title: string } };

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

const buildParams = (title?: string) => {
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
    page: 1,
  };

  if (title) {
    query.query.bool.must.push({
      wildcard: { title: `*${title}*` },
    });
  }

  return encodeURIComponent(JSON.stringify(query));
};

export const fetchArtworks = async (title?: string) => {
  const params = buildParams(title);

  const response = await fetch(`${BASE_URL}${PATH_SEARCH}?params=${params}`);

  if (!response.ok) {
    let message = '';

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

  const result = await response.json();

  return result.data;
};

export const getImageUrl = (id: string, size: string) => {
  const IMAGE_BASE_URL = 'https://www.artic.edu/iiif/2/';
  return `${IMAGE_BASE_URL}${id}/full/${size},/0/default.jpg`;
};
