import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '@host/config';
import { types as SharedTypes } from 'shared';

// interface RegisterParams {
//   email: string;
//   password: string;
//   name: string;
// }

interface SliceState {
  fetchingState: SharedTypes.EnumFetch;
  error: string | null;
}

const initialState: SliceState = {
  fetchingState: SharedTypes.EnumFetch.Idle,
  error: null,
};

export const register = createAsyncThunk(
  'register',
  async (registerData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(config.routes.register, registerData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const authSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    reset: (state: SliceState) => {
      state.fetchingState = SharedTypes.EnumFetch.Idle;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state: SliceState) => {
        state.fetchingState = SharedTypes.EnumFetch.Pending;
        state.error = null;
      })
      .addCase(register.fulfilled, (state: SliceState) => {
        state.fetchingState = SharedTypes.EnumFetch.Fulfilled;
        state.error = null;
      })
      .addCase(register.rejected, (state: SliceState, action) => {
        state.fetchingState = SharedTypes.EnumFetch.Rejected;
      });
  },
});

export default authSlice.reducer;
