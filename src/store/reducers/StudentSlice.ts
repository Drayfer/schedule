import {
  fetchStudents,
  createStudent,
  deleteStudent,
  updateStudent
} from './StudentActions';
import { IStudent } from './../../models/IStudent';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StudentState {
  data: IStudent[];
  isLoading: boolean;
  error: string;
}

const initialState: StudentState = {
  data: [],
  isLoading: false,
  error: ''
};

export const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    resetStudent: () => initialState
  },
  extraReducers: {
    [fetchStudents.fulfilled.type]: (
      state,
      action: PayloadAction<IStudent[]>
    ) => {
      state.isLoading = false;
      state.error = '';
      state.data = action.payload;
    },
    [fetchStudents.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchStudents.rejected.type]: (state, action: PayloadAction<string>) => {
      return { ...initialState, error: action.payload };
    },
    [createStudent.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
    },
    [createStudent.fulfilled.type]: (
      state,
      action: PayloadAction<IStudent>
    ) => {
      state.isLoading = false;
      state.error = '';
      state.data = [action.payload, ...state.data];
    },
    [createStudent.pending.type]: (state) => {
      state.isLoading = true;
      state.error = '';
    },
    [deleteStudent.fulfilled.type]: (
      state,
      action: PayloadAction<{ id: number }>
    ) => {
      state.isLoading = false;
      state.data = state.data.filter(
        (student) => student.id !== action.payload.id
      );
    },

    [updateStudent.fulfilled.type]: (
      state,
      action: PayloadAction<IStudent>
    ) => {
      state.data = state.data.map((student) =>
        student.id === action.payload.id ? (student = action.payload) : student
      );
    }
  }
});

export const { resetStudent } = studentSlice.actions;

export default studentSlice.reducer;
