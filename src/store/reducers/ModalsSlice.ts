import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalsState {
  isAddStudentModal: boolean;
}

const initialState: ModalsState = {
  isAddStudentModal: false
};

export const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    setIsAddStudentModal: (state, action: PayloadAction<boolean>) => {
      state.isAddStudentModal = action.payload;
    }
  }
});

export const { setIsAddStudentModal } = modalsSlice.actions;

export default modalsSlice.reducer;
