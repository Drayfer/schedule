import { IUser } from '../../models/IUser';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUsers, updateGuide, updateProfile } from './UserActions';

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
    },
    [updateProfile.fulfilled.type]: (
      state,
      { payload }: PayloadAction<Partial<IUser>>
    ) => {
      if (state.data?.name && state.data?.email) {
        state.data.name = payload.name as string;
        state.data.email = payload.email as string;
      }
    },
    [updateGuide.fulfilled.type]: (state) => {
      if (state.data?.guide === false) {
        state.data.guide = true;
      }
    }
  }
});

export const { resetUser, saveUser } = userSlice.actions;

export default userSlice.reducer;
