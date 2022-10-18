import { INotification, IOption } from './../../models/IOption';
import { getTokenHeader } from './../../components/helpers/getTokenHeader';
import { ILesson } from './../../models/ILesson';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AxiosErr } from '../../types/types';
import { lang } from '../../assets/constants/lang';

export interface IBillingInfo {
  demo: boolean;
  daysFromReg: number;
  demoDays: number;
  paidDays: number;
}
interface UserState {
  activeBoard: string;
  fullMenu: boolean;
  todayLessons: ILesson[];
  searchedStudentId: number | null;
  data: IOption;
  lang: any;
  billing: IBillingInfo | null;
}

const initialState: UserState = {
  activeBoard: 'schedule',
  fullMenu: true,
  todayLessons: [],
  searchedStudentId: null,
  lang: lang.en,
  data: {
    currency: '',
    notification: true,
    notifyMinutes: 3,
    notifyVolume: 100,
    rateWithBalance: 0,
    rateWithoutBalance: 0,
    deletedStudents: 0,
    monthLessons: 0,
    totalLessons: 0,
    monthIncome: 0,
    totalIncome: 0,
    weekIncome: 0,
    notificationsArr: [],
    locale: 'en'
  },
  billing: null
};

interface GetTodayLessons {
  userId: number;
  date: Date;
}

interface IUpdateDataOption extends Partial<IOption> {
  userId: number;
}
interface ICreateNotification extends INotification {
  userId: number;
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

export const fetchOptionsData = createAsyncThunk(
  'option/all/:id',
  async (payload: number, thunkAPI) => {
    try {
      const response = await axios.get<IOption>(
        `${process.env.REACT_APP_API_URL}/option/all/${payload}`,
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

export const updateDataOption = createAsyncThunk(
  'option/update/:id',
  async (payload: IUpdateDataOption, thunkAPI) => {
    try {
      const { userId, ...body } = payload;
      const { data } = await axios.patch(
        `${process.env.REACT_APP_API_URL}/option/update/${userId}`,
        body,
        getTokenHeader()
      );
      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const getSttistic = createAsyncThunk(
  'option/statistic/:userId',
  async (payload: number, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/option/statistic/${payload}`,
        getTokenHeader()
      );
      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const createNotification = createAsyncThunk(
  'option/notification/:userId',
  async (payload: ICreateNotification, thunkAPI) => {
    try {
      const { data } = await axios.post<INotification[]>(
        `${process.env.REACT_APP_API_URL}/option/notification/${payload.userId}`,
        {
          id: payload.id,
          text: payload.text,
          date: payload.date,
          complete: payload.complete
        },
        getTokenHeader()
      );
      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const removeNotification = createAsyncThunk(
  'option/notification/:noteId/:userId',
  async (payload: { userId: number; noteId: number }, thunkAPI) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/option/notification/${payload.noteId}/${payload.userId}`,
        getTokenHeader()
      );
      return payload.noteId;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const editNotification = createAsyncThunk(
  'option/notification/:userId',
  async (payload: ICreateNotification, thunkAPI) => {
    try {
      const { data } = await axios.patch<INotification[]>(
        `${process.env.REACT_APP_API_URL}/option/notification/${payload.userId}`,
        {
          id: payload.id,
          text: payload.text,
          date: payload.date,
          complete: payload.complete
        },
        getTokenHeader()
      );
      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const allCompleteNotification = createAsyncThunk(
  'option/notification/allComplete/:userId',
  async (payload: { userId: number }, thunkAPI) => {
    try {
      const { data } = await axios.delete<INotification[]>(
        `${process.env.REACT_APP_API_URL}/option/all/${payload.userId}`,
        getTokenHeader()
      );
      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const setLocale = createAsyncThunk(
  'option/locale/:userId/:locale',
  async ({ userId, locale }: { userId: number; locale: string }, thunkAPI) => {
    try {
      const { data } = await axios.get<string>(
        `${process.env.REACT_APP_API_URL}/option/locale/${userId}/${locale}`
      );
      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const getBilling = createAsyncThunk(
  'option/billinginfo/:userId',
  async (payload: number, thunkAPI) => {
    try {
      const { data } = await axios.get<IBillingInfo>(
        `${process.env.REACT_APP_API_URL}/option/billinginfo/${payload}`,
        getTokenHeader()
      );
      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
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
    },
    setSearchedStudent: (state, action: PayloadAction<number | null>) => {
      state.searchedStudentId = action.payload;
    },
    setLang: (state, action: PayloadAction<any>) => {
      state.lang = action.payload;
    },
    setAppLocale: (state, action: PayloadAction<string>) => {
      state.data.locale = action.payload;
    }
  },
  extraReducers: {
    [getTodayLessons.fulfilled.type]: (
      state,
      action: PayloadAction<ILesson[]>
    ) => {
      state.todayLessons = action.payload;
    },
    [fetchOptionsData.fulfilled.type]: (
      state,
      action: PayloadAction<IOption>
    ) => {
      state.data = action.payload;
    },
    [updateDataOption.fulfilled.type]: (
      state,
      action: PayloadAction<IOption>
    ) => {
      state.data = { ...state.data, ...action.payload };
    },
    [getSttistic.fulfilled.type]: (state, action: PayloadAction<IOption>) => {
      state.data = { ...state.data, ...action.payload };
    },
    [createNotification.fulfilled.type]: (
      state,
      action: PayloadAction<INotification[]>
    ) => {
      if (state.data?.notificationsArr) {
        state.data.notificationsArr = action.payload;
      }
    },
    [removeNotification.fulfilled.type]: (
      state,
      action: PayloadAction<number>
    ) => {
      if (state.data?.notificationsArr) {
        state.data.notificationsArr = state.data.notificationsArr.filter(
          (note) => note.id !== action.payload
        );
      }
    },
    [editNotification.fulfilled.type]: (
      state,
      action: PayloadAction<INotification[]>
    ) => {
      if (state.data?.notificationsArr) {
        state.data.notificationsArr = action.payload;
      }
    },
    [allCompleteNotification.fulfilled.type]: (
      state,
      action: PayloadAction<INotification[]>
    ) => {
      if (state.data?.notificationsArr) {
        state.data.notificationsArr = action.payload;
      }
    },
    [setLocale.fulfilled.type]: (state, action: PayloadAction<string>) => {
      state.data.locale = action.payload;
    },
    [getBilling.fulfilled.type]: (
      state,
      action: PayloadAction<IBillingInfo>
    ) => {
      state.billing = action.payload;
    }
  }
});

export const {
  setActiveBoard,
  setFullMenu,
  resetOpions,
  setSearchedStudent,
  setLang,
  setAppLocale
} = optionsSlice.actions;

export default optionsSlice.reducer;
