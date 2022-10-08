import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { lang } from '../../assets/constants/lang';

interface LandingState {
  locale: string;
  lang: any;
}

const initialState: LandingState = {
  locale: '',
  lang: lang.en
};

export const landingSlice = createSlice({
  name: 'landing',
  initialState,
  reducers: {
    resetlanding: () => initialState,
    setLandingLocale: (state, action: PayloadAction<string>) => {
      state.locale = action.payload;
    },
    setLandingLang: (state, action: PayloadAction<any>) => {
      state.lang = action.payload;
    }
  },
  extraReducers: {}
});

export const { setLandingLocale, setLandingLang } = landingSlice.actions;

export default landingSlice.reducer;
