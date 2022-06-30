import {
  createDiscipline,
  deleteDiscipline,
  fetchDisciplines,
  updateDiscipline
} from './DisciplineActions';
import { IDiscipline } from './../../models/IDiscipline';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StudentState {
  data: IDiscipline[];
  isLoading: boolean;
  error: string;
}

const initialState: StudentState = {
  data: [],
  isLoading: false,
  error: ''
};

export const disciplineSlice = createSlice({
  name: 'discipline',
  initialState,
  reducers: {
    resetDiscipline: () => initialState
  },
  extraReducers: {
    [createDiscipline.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoading = false;
    },
    [createDiscipline.fulfilled.type]: (
      state,
      action: PayloadAction<IDiscipline>
    ) => {
      state.isLoading = false;
      state.error = '';
      state.data = [action.payload, ...state.data];
    },
    [createDiscipline.pending.type]: (state) => {
      state.isLoading = true;
      state.error = '';
    },

    [fetchDisciplines.fulfilled.type]: (
      state,
      action: PayloadAction<IDiscipline[]>
    ) => {
      state.isLoading = false;
      state.error = '';
      state.data = action.payload;
    },
    [fetchDisciplines.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchDisciplines.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      return { ...initialState, error: action.payload };
    },

    [updateDiscipline.fulfilled.type]: (
      state,
      action: PayloadAction<IDiscipline>
    ) => {
      state.isLoading = false;
      state.error = '';
      state.data = state.data.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    [updateDiscipline.pending.type]: (state) => {
      state.isLoading = true;
    },
    [updateDiscipline.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoading = false;
    },

    [deleteDiscipline.fulfilled.type]: (
      state,
      action: PayloadAction<{ id: number }>
    ) => {
      state.isLoading = false;
      state.error = '';
      state.data = state.data.filter((item) => item.id !== action.payload.id);
    },
    [deleteDiscipline.pending.type]: (state) => {
      state.isLoading = true;
    },
    [deleteDiscipline.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoading = false;
    }
  }
});

export const { resetDiscipline } = disciplineSlice.actions;

export default disciplineSlice.reducer;
