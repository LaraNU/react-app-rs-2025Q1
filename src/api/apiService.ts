const urlSearchParamsArts = new URLSearchParams({
  fields: 'id,title,image_id,artist_title,date_display,place_of_origin',
  page: `${1}`,
  limit: `${12}`,
});

export const getArtworks = async () => {
  const response = await fetch(
    `https://api.artic.edu/api/v1/artworks/search?q=Claude%20Monet&${urlSearchParamsArts}`
  );
  const artworks = await response.json();
  return artworks.data;
};
