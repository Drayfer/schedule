import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LandingState {
  locale: string;
}

const initialState: LandingState = {
  locale: ''
};

export const landingSlice = createSlice({
  name: 'landing',
  initialState,
  reducers: {
    resetlanding: () => initialState,
    setLandingLocale: (state, action: PayloadAction<string>) => {
      state.locale = action.payload;
    }
  },
  extraReducers: {}
});

export const { setLandingLocale } = landingSlice.actions;

export default landingSlice.reducer;
