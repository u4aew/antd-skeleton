import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import config from '@host/config';
import { types as SharedTypes } from 'shared';
import axios from 'axios';
export interface ResponseError {
  code?: string;
  description?: string;
  message?: string;
}

interface AuthParams {
  email: string;
  password: string;
}

interface AuthResponse {
  data: {
    data: {
      token: string;
    };
  };
}

interface AuthError {
  message: string;
}

export interface SliceState {
  fetchingState: SharedTypes.EnumFetch;
  error: ResponseError | null;
}

const initialState: SliceState = {
  fetchingState: SharedTypes.EnumFetch.Idle,
  error: null,
};

/**
 * Auth
 */
export const auth = createAsyncThunk<
  AuthResponse,
  AuthParams,
  { rejectValue: AuthError }
>('auth', async ({ email, password }, { rejectWithValue }) => {
  try {
    const { data } = await axios.post<AuthResponse>(config.routes.auth, {
      email,
      password,
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data as AuthError);
    } else {
      throw error;
    }
  }
});
const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (): SliceState => initialState,
  },
  extraReducers: (builder) => {
    /** auth */
    builder.addCase(auth.pending, (state) => {
      state.fetchingState = SharedTypes.EnumFetch.Pending;
      state.error = null;
    });
    builder.addCase(auth.fulfilled, (state, data) => {
      state.fetchingState = SharedTypes.EnumFetch.Fulfilled;
    });
    builder.addCase(auth.rejected, (state, action) => {
      state.fetchingState = SharedTypes.EnumFetch.Rejected;
      state.error = action.error;
    });
  },
});

export default slice.reducer;
