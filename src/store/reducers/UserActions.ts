import { AxiosErr } from './../../types/types';
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

interface IUpdateProfile extends IUserRegistration {
  id: number;
}

export const fetchUsers = createAsyncThunk(
  'auth/login',
  async (payload: IUserLogin, thunkAPI) => {
    try {
      const response = await axios.post<IUser>(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        payload
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

export const updateProfile = createAsyncThunk(
  'user/updateProfile/:userId',
  async (payload: IUpdateProfile, thunkAPI) => {
    try {
      const response = await axios.put<Partial<IUser>>(
        `${process.env.REACT_APP_API_URL}/user/updateProfile/${payload.id}`,
        {
          name: payload.name,
          email: payload.email,
          password: payload.password
        }
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

export const updateGuide = createAsyncThunk(
  'user/guide/:userId',
  async (payload: number, thunkAPI) => {
    try {
      await axios.get<Partial<IUser>>(
        `${process.env.REACT_APP_API_URL}/user/guide/${payload}`
      );
      return;
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        return thunkAPI.rejectWithValue(
          (err.response?.data as AxiosErr).message
        );
      }
    }
  }
);
