import { IDiscipline } from './../../models/IDiscipline';
import {
  fetchStudents,
  createStudent,
  deleteStudent,
  updateStudent
} from './StudentActions';
import { IStudent } from './../../models/IStudent';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setLessonState } from './LessonActions';
import { ILesson } from '../../models/ILesson';

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
    resetStudent: () => initialState,
    updateStudentDisciplines: (
      state,
      action: PayloadAction<{ disciplines: IDiscipline[]; id: number }>
    ) => {
      const student = state.data.find(
        (student) => student.id === action.payload.id
      );
      if (student && student.disciplines) {
        student.disciplines = [...action.payload.disciplines];
      }
    }
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
    },

    [setLessonState.fulfilled.type]: (
      state,
      action: PayloadAction<{
        updatedLesson: ILesson;
        updatedStudent: IStudent;
      }>
    ) => {
      const updatedStudent = action.payload.updatedStudent;
      state.data = state.data.map((item) =>
        item.id === updatedStudent.id ? updatedStudent : item
      );
    }
  }
});

export const { resetStudent, updateStudentDisciplines } = studentSlice.actions;

export default studentSlice.reducer;
