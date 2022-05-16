import { getTokenHeader } from './../../components/helpers/getTokenHeader';
import { ILesson } from './../../models/ILesson';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AxiosErr } from '../../types/types';
interface UserState {
  activeBoard: string;
  fullMenu: boolean;
  todayLessons: ILesson[];
}

const initialState: UserState = {
  activeBoard: 'schedule',
  fullMenu: true,
  todayLessons: []
};

interface GetTodayLessons {
  userId: number;
  date: Date;
}

export const getTodayLessons = createAsyncThunk(
  'lesson/today',
  async (payload: GetTodayLessons, thunkAPI) => {
    try {
      const response = await axios.post<ILesson[]>(
        `${process.env.REACT_APP_API_URL}/lesson/today`,
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

export const optionsSlice = createSlice({
  name: 'options',
  initialState,
  reducers: {
    resetOpions: () => initialState,
    setActiveBoard: (state, action: PayloadAction<string>) => {
      state.activeBoard = action.payload;
    },
    setFullMenu: (state) => {
      state.fullMenu = !state.fullMenu;
    }
  },
  extraReducers: {
    [getTodayLessons.fulfilled.type]: (
      state,
      action: PayloadAction<ILesson[]>
    ) => {
      state.todayLessons = action.payload;
    }
  }
});

export const { setActiveBoard, setFullMenu, resetOpions } =
  optionsSlice.actions;

export default optionsSlice.reducer;
