import { createSlice } from '@reduxjs/toolkit';
import { artworksApi } from './apiSlice';

interface ArtworksState {
  loading: boolean;
  error: string | null;
}

const initialState: ArtworksState = {
  loading: false,
  error: null,
};

const artworksSlice = createSlice({
  name: 'artworks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        artworksApi.endpoints.searchArtworks.matchPending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        artworksApi.endpoints.searchArtworks.matchFulfilled,
        (state) => {
          state.loading = false;
        }
      )
      .addMatcher(
        artworksApi.endpoints.searchArtworks.matchRejected,
        (state, action) => {
          state.loading = false;
          state.error = action.error.message ?? 'Error';
        }
      );
  },
});

export default artworksSlice.reducer;
