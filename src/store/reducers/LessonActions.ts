import { ILesson } from './../../models/ILesson';
import { getTokenHeader } from './../../components/helpers/getTokenHeader';
import { AxiosErr } from './../../types/types';
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface GetLessons {
  userId: number;
  dateStart: moment.Moment;
  dateEnd: moment.Moment;
}

interface CreateLesson {
  userId: number;
  studentId: number;
  date: moment.Moment;
  category?: string;
}

interface UpdateLesson extends Partial<ILesson> {}

export const getLessons = createAsyncThunk(
  'lesson/all',
  async (payload: GetLessons, thunkAPI) => {
    try {
      const response = await axios.post<ILesson[]>(
        `${process.env.REACT_APP_API_URL}/lesson/all`,
        payload,
        getTokenHeader()
      );
      return response.data;
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        return thunkAPI.rejectWithValue(
          (err.response?.data as AxiosErr).message
        );
      }
    }
  }
);

export const createLesson = createAsyncThunk(
  'lesson/create',
  async (payload: CreateLesson, thunkAPI) => {
    try {
      const response = await axios.post<ILesson>(
        `${process.env.REACT_APP_API_URL}/lesson/create`,
        payload,
        getTokenHeader()
      );
      return response.data;
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        return thunkAPI.rejectWithValue(
          (err.response?.data as AxiosErr).message
        );
      }
    }
  }
);

export const deleteLesson = createAsyncThunk(
  'lesson/delete/:id',
  async (payload: { id: number }, thunkAPI) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/lesson/delete/${payload.id}`,
        getTokenHeader()
      );
      return { id: payload.id };
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const updateLesson = createAsyncThunk(
  'lesson/update/:id',
  async (payload: UpdateLesson, thunkAPI) => {
    try {
      const { data } = await axios.patch(
        `${process.env.REACT_APP_API_URL}/lesson/update/${payload.id}`,
        payload,
        getTokenHeader()
      );
      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const deleteSomeLesson = createAsyncThunk(
  'lesson/deleteSome/:studentId',
  async (payload: { studentId: number }, thunkAPI) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/lesson/deleteSome/${payload.studentId}`,
        getTokenHeader()
      );
      return payload.studentId;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const copyLessonsWeek = createAsyncThunk(
  'lesson/copyLessonsWeek',
  async (payload: { userId: number; dateStart: Date }, thunkAPI) => {
    try {
      const response = await axios.post<ILesson[]>(
        `${process.env.REACT_APP_API_URL}/lesson/copyLessonsWeek`,
        payload,
        getTokenHeader()
      );
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const deleteLessonsWeek = createAsyncThunk(
  'lesson/deleteLessonsWeek',
  async (payload: { userId: number; dateStart: Date }, thunkAPI) => {
    try {
      const response = await axios.post<ILesson[]>(
        `${process.env.REACT_APP_API_URL}/lesson/deleteLessonsWeek`,
        payload,
        getTokenHeader()
      );
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const deleteLessonsDay = createAsyncThunk(
  'lesson/deleteLessonsDay',
  async (
    payload: { userId: number; dateStart: Date; date: Date },
    thunkAPI
  ) => {
    try {
      const response = await axios.post<ILesson[]>(
        `${process.env.REACT_APP_API_URL}/lesson/deleteLessonsDay`,
        payload,
        getTokenHeader()
      );
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
