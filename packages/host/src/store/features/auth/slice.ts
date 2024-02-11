import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '@host/config';

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
  fetchingState: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  error: string | null;
}

const initialState: SliceState = {
  token: null,
  fetchingState: 'idle',
  error: null,
};

export const auth = createAsyncThunk<
  string, // Return type of the payload creator
  AuthParams, // First argument to the payload creator
  { rejectValue: AuthError } // Types for ThunkAPI
>('auth/login', async (authData, { rejectWithValue }) => {
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
      state.fetchingState = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(auth.pending, (state) => {
        state.fetchingState = 'pending';
        state.error = null;
      })
      .addCase(auth.fulfilled, (state, action: PayloadAction<string>) => {
        state.fetchingState = 'fulfilled';
        state.token = action.payload;
        state.error = null; // Очищаем ошибку при успешной авторизации
      })
      .addCase(auth.rejected, (state, action) => {
        state.fetchingState = 'rejected';
        state.error = action.payload?.message || 'Unknown error';
        // Если нужно, можно также сохранить error и statusCode
        // state.errorDetails = {
        //   error: action.payload?.error,
        //   statusCode: action.payload?.statusCode
        // };
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
