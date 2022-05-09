import { getTokenHeader } from './../../components/helpers/getTokenHeader';
import { IStudent } from './../../models/IStudent';
import { AxiosErr } from './../../types/types';
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IAddStudentForm } from '../../components/Students/AddStudentForm';

interface CreateStudent extends IAddStudentForm {
  userId: number;
}

interface UpdateStudent extends Partial<IStudent> {
  studentId: number;
}

export const fetchStudents = createAsyncThunk(
  'student/all/:id',
  async (payload: number, thunkAPI) => {
    try {
      const response = await axios.get<IStudent>(
        `${process.env.REACT_APP_API_URL}/student/all/${payload}`,
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

export const createStudent = createAsyncThunk(
  'student/create',
  async (payload: CreateStudent, thunkAPI) => {
    try {
      const response = await axios.post<IStudent>(
        `${process.env.REACT_APP_API_URL}/student/create`,
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

export const deleteStudent = createAsyncThunk(
  'student/delete/:id',
  async (payload: { id: number }, thunkAPI) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/student/delete/${payload.id}`,
        getTokenHeader()
      );
      return { id: payload.id };
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

// export const updateStudent = createAsyncThunk(
//   'student/update/:id',
//   async (payload: { id: number; body: { [key: string]: any } }, thunkAPI) => {
//     try {
//       const { id, body } = payload;
//       const { data } = await axios.patch(
//         `${process.env.REACT_APP_API_URL}/student/update/${id}`,
//         body,
//         getTokenHeader()
//       );
//       return data;
//     } catch (err: any) {
//       return thunkAPI.rejectWithValue(err.response.data);
//     }
//   }
// );

export const updateStudent = createAsyncThunk(
  'student/update/:id',
  async (payload: UpdateStudent, thunkAPI) => {
    try {
      const { studentId, ...body } = payload;
      const { data } = await axios.patch(
        `${process.env.REACT_APP_API_URL}/student/update/${studentId}`,
        body,
        getTokenHeader()
      );
      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
