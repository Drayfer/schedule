import { IUser } from '../../models/IUser';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUsers } from './UserActions';

interface UserState {
  data: IUser | null;
  isLoading: boolean;
  error: string;
}

const initialState: UserState = {
  data: null,
  isLoading: false,
  error: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUser: () => initialState,
    saveUser: (state, action: PayloadAction<IUser>) => {
      state.data = action.payload;
    }
  },
  extraReducers: {
    [fetchUsers.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
      state.isLoading = false;
      state.error = '';
      state.data = action.payload;
    },
    [fetchUsers.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchUsers.rejected.type]: (state, action: PayloadAction<string>) => {
      return { ...initialState, error: action.payload };
    }

    // [registration.rejected.type]: (_, action: PayloadAction<string>) => {
    //   return { ...initialState, error: action.payload };
    // },
    // [registration.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
    //   state.isLoading = false;
    //   state.error = '';
    //   state.data = action.payload;
    // },
    // [registration.pending.type]: (state) => {
    //   state.isLoading = true;
    //   state.error = '';
    // }
  }
});

export const { resetUser, saveUser } = userSlice.actions;

export default userSlice.reducer;
