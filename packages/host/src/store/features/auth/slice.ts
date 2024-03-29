import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '@host/config';
import { types as SharedTypes } from 'shared';

interface AuthParams {
  email: string;
  password: string;
}

interface AuthResponse {
  data: {
    token: string;
  };
  status: string;
}

interface AuthError {
  message: string;
  error: string;
  statusCode: number;
}

interface SliceState {
  token: string | null;
  fetchingState: SharedTypes.EnumFetch;
  error: string | null;
}

const initialState: SliceState = {
  token: null,
  fetchingState: SharedTypes.EnumFetch.Idle,
  error: null,
};

export const auth = createAsyncThunk<
  string, // Return type of the payload creator
  AuthParams, // First argument to the payload creator
  { rejectValue: AuthError } // Types for ThunkAPI
>('auth', async (authData, { rejectWithValue }) => {
  try {
    const response = await axios.post<AuthResponse>(
      config.routes.auth,
      authData,
    );
    return response.data.data.token; // Only return the token
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // Преобразуем ошибку к типу AuthError
      return rejectWithValue(error.response.data as AuthError);
    } else {
      // Возвращаем обобщенную ошибку, если ответ сервера не содержит данных
      return rejectWithValue({
        message: 'An unknown error occurred',
        error: 'UnknownError',
        statusCode: 500,
      });
    }
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.fetchingState = SharedTypes.EnumFetch.Idle;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(auth.pending, (state) => {
        state.fetchingState = SharedTypes.EnumFetch.Pending;
        state.error = null;
      })
      .addCase(auth.fulfilled, (state, action: PayloadAction<string>) => {
        state.fetchingState = SharedTypes.EnumFetch.Fulfilled;
        state.token = action.payload;
        state.error = null; // Очищаем ошибку при успешной авторизации
      })
      .addCase(auth.rejected, (state, action) => {
        state.fetchingState = SharedTypes.EnumFetch.Rejected;
        state.error = action.payload?.message || 'Unknown error';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
