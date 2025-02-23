export const getImageUrl = (id: string, size: string): string => {
  const IMAGE_BASE_URL = 'https://www.artic.edu/iiif/2/';
  return `${IMAGE_BASE_URL}${id}/full/${size},/0/default.jpg`;
};
