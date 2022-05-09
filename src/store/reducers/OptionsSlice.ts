import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  activeBoard: string;
  fullMenu: boolean;
}

const initialState: UserState = {
  activeBoard: 'schedule',
  fullMenu: true
};

export const optionsSlice = createSlice({
  name: 'options',
  initialState,
  reducers: {
    setActiveBoard: (state, action: PayloadAction<string>) => {
      state.activeBoard = action.payload;
    },
    setFullMenu: (state) => {
      state.fullMenu = !state.fullMenu;
    }
  }
});

export const { setActiveBoard, setFullMenu } = optionsSlice.actions;

export default optionsSlice.reducer;
