import { IUser } from '../../models/IUser';
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserRegistration {
  email: string;
  password: string;
  name: string;
}

export interface AxiosErrorMessage {
  message: string;
  statusCode: string;
}

export const fetchUsers = createAsyncThunk(
  'auth/login',
  async (payload: IUserLogin, thunkAPI) => {
    try {
      const response = await axios.post<IUser>(
        'http://localhost:5050/auth/login',
        payload
      );
      return response.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
  }
);

export const registration = createAsyncThunk(
  'auth/registration',
  async (payload: IUserRegistration, thunkAPI) => {
    try {
      const { data } = await axios.post<IUser>(
        'http://localhost:5050/auth/registration',
        payload
      );
      return thunkAPI.fulfillWithValue(data);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        return thunkAPI.rejectWithValue(
          (err.response?.data as AxiosErrorMessage).message
        );
      }
    }
  }
);
