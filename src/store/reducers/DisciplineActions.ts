import { IDiscipline } from './../../models/IDiscipline';
import { IAddDisciplineForm } from './../../components/Disciplines/AddDisciplineForm';
import { getTokenHeader } from './../../components/helpers/getTokenHeader';
import { IStudent } from './../../models/IStudent';
import { AxiosErr } from './../../types/types';
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IAddStudentForm } from '../../components/Students/AddStudentForm';

interface CreateDiscipline extends IAddDisciplineForm {
  userId: number;
}

interface UpdateDiscipline extends Partial<IDiscipline> {
  id: number;
  studentId: number[];
}

export const fetchDisciplines = createAsyncThunk(
  'discipline/all/:id',
  async (payload: number, thunkAPI) => {
    try {
      const response = await axios.get<IDiscipline[]>(
        `${process.env.REACT_APP_API_URL}/discipline/all/${payload}`
        // getTokenHeader()
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

export const createDiscipline = createAsyncThunk(
  'discipline/create',
  async (payload: CreateDiscipline, thunkAPI) => {
    try {
      const response = await axios.post<IDiscipline>(
        `${process.env.REACT_APP_API_URL}/discipline/create`,
        payload
        // getTokenHeader()
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

export const deleteDiscipline = createAsyncThunk(
  'discipline/delete/:id',
  async (payload: { id: number }, thunkAPI) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/discipline/${payload.id}`
        // getTokenHeader()
      );
      return { id: payload.id };
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const updateDiscipline = createAsyncThunk(
  'discipline/update/:id',
  async (payload: UpdateDiscipline, thunkAPI) => {
    try {
      const { id, ...body } = payload;
      const { data } = await axios.patch<IDiscipline>(
        `${process.env.REACT_APP_API_URL}/discipline/update/${id}`,
        body
        // getTokenHeader()
      );
      return data;
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        return thunkAPI.rejectWithValue(
          (err.response?.data as AxiosErr).message
        );
      }
    }
  }
);
