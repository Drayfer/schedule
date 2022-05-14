import {
  createLesson,
  deleteLesson,
  deleteSomeLesson,
  getLessons,
  updateLesson
} from './LessonActions';
import { ILesson } from '../../models/ILesson';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';

interface LessonState {
  data: ILesson[];
  isLoading: boolean;
  error: string;
}

const initialState: LessonState = {
  data: [],
  isLoading: false,
  error: ''
};

export const lessonSlice = createSlice({
  name: 'lesson',
  initialState,
  reducers: {
    resetLesson: () => initialState
  },
  extraReducers: {
    [getLessons.fulfilled.type]: (state, action: PayloadAction<ILesson[]>) => {
      state.isLoading = false;
      state.error = '';
      state.data = action.payload;
    },
    [getLessons.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getLessons.rejected.type]: (state, action: PayloadAction<string>) => {
      return { ...initialState, error: action.payload };
    },
    [createLesson.fulfilled.type]: (state, action: PayloadAction<ILesson>) => {
      state.data = [...state.data, action.payload].sort(
        (a, b) => moment(a.date).unix() - moment(b.date).unix()
      );
    },
    [deleteLesson.fulfilled.type]: (
      state,
      action: PayloadAction<{ id: number }>
    ) => {
      state.isLoading = false;
      state.data = state.data.filter(
        (lesson) => lesson.id !== action.payload.id
      );
    },

    [updateLesson.fulfilled.type]: (state, action: PayloadAction<ILesson>) => {
      state.data = state.data
        .map((item) =>
          item.id === action.payload.id ? (item = action.payload) : item
        )
        .sort((a, b) => moment(a.date).unix() - moment(b.date).unix());
    },

    [deleteSomeLesson.fulfilled.type]: (
      state,
      action: PayloadAction<{ studentId: number }>
    ) => {
      state.data = state.data.filter(
        (lesson) => lesson.id !== action.payload.studentId
      );
    }
  }
});

export const { resetLesson } = lessonSlice.actions;

export default lessonSlice.reducer;
