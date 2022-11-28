import {
  copyCurrentDay,
  copyLessonsWeek,
  createLesson,
  deleteLesson,
  deleteLessonsDay,
  deleteLessonsWeek,
  deleteSomeLesson,
  getLessons,
  setLessonState,
  updateLesson
} from './LessonActions';
import { ILesson } from '../../models/ILesson';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';
import { IStudent } from '../../models/IStudent';

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
      state.isLoading = false;
    },
    [createLesson.pending.type]: (state) => {
      state.isLoading = true;
    },
    [createLesson.rejected.type]: (state) => {
      state.isLoading = false;
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

    [setLessonState.fulfilled.type]: (
      state,
      action: PayloadAction<{
        updatedLesson: ILesson;
        updatedStudent: IStudent;
      }>
    ) => {
      const updatedLesson = action.payload.updatedLesson;
      state.data = state.data.map((item) =>
        item.id === updatedLesson.id ? updatedLesson : item
      );
    },

    [deleteSomeLesson.fulfilled.type]: (
      state,
      action: PayloadAction<{ studentId: number }>
    ) => {
      state.data = state.data.filter(
        (lesson) => lesson.id !== action.payload.studentId
      );
    },

    [copyLessonsWeek.fulfilled.type]: (
      state,
      action: PayloadAction<ILesson[]>
    ) => {
      state.isLoading = false;
      state.error = '';
      state.data = action.payload;
    },
    [copyLessonsWeek.pending.type]: (state) => {
      state.isLoading = true;
    },
    [copyLessonsWeek.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
    },

    [deleteLessonsWeek.fulfilled.type]: (
      state,
      action: PayloadAction<ILesson[]>
    ) => {
      state.isLoading = false;
      state.error = '';
      state.data = action.payload;
    },
    [deleteLessonsWeek.pending.type]: (state) => {
      state.isLoading = true;
    },
    [deleteLessonsWeek.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoading = false;
    },

    [deleteLessonsDay.fulfilled.type]: (
      state,
      action: PayloadAction<ILesson[]>
    ) => {
      state.isLoading = false;
      state.error = '';
      state.data = action.payload;
    },
    [deleteLessonsDay.pending.type]: (state) => {
      state.isLoading = true;
    },
    [deleteLessonsDay.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoading = false;
    },

    [copyCurrentDay.fulfilled.type]: (
      state,
      action: PayloadAction<ILesson[]>
    ) => {
      state.isLoading = false;
      state.error = '';
      state.data = action.payload;
    }
  }
});

export const { resetLesson } = lessonSlice.actions;

export default lessonSlice.reducer;
