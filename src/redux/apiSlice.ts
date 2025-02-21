import { APIResponse, APIResponseDetails } from '../types/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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

  return query;
};

export const artworksApi = createApi({
  reducerPath: 'artworksApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    searchArtworks: builder.query<
      APIResponse,
      { currPage: number; title?: string }
    >({
      query: ({ currPage, title }) => {
        const params = buildParams(currPage, title);

        return {
          url: PATH_SEARCH,
          params: { params: JSON.stringify(params) },
        };
      },
      transformErrorResponse: (error) => {
        if ('status' in error) {
          if (error.status >= '400' && error.status < '500') {
            return `Client error (${error.status}): Please check your request.`;
          } else if (error.status >= '500') {
            return `Server error (${error.status}): Please try again later.`;
          }
        }
        return `Unknown error: ${JSON.stringify(error)}`;
      },
      transformResponse: (response: {
        data: APIResponse['data'];
        pagination: APIResponse['pagination'];
      }) => ({
        data: response.data,
        pagination: response.pagination,
      }),
    }),
    searchArtworkDetails: builder.query<APIResponseDetails, number>({
      query: (id) => {
        const fields =
          'artist_display,medium_display,description,style_title,title,image_id,place_of_origin';

        return {
          url: `/artworks/${id}`,
          params: { fields },
        };
      },
    }),
  }),
});

export const { useSearchArtworksQuery, useSearchArtworkDetailsQuery } =
  artworksApi;
