import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '@host/config';
import { types as SharedTypes } from 'shared';

interface RegisterParams {
  email: string;
  password: string;
  name: string;
}

interface RegisterResponse {
  data: {
    token: string;
  };
  status: string;
}

interface RegisterError {
  message: string;
  error: string;
  statusCode: number;
}

interface SliceState {
  fetchingState: SharedTypes.EnumFetch;
  error: string | null;
}

const initialState: SliceState = {
  fetchingState: SharedTypes.EnumFetch.Idle,
  error: null,
};

export const register = createAsyncThunk<
  string, // Return type of the payload creator
  RegisterParams, // First argument to the payload creator
  { rejectValue: RegisterError } // Types for ThunkAPI
>('register', async (authData, { rejectWithValue }) => {
  try {
    const response = await axios.post<RegisterResponse>(
      config.routes.auth,
      authData,
    );
    return response.data.data.token; // Only return the token
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // Преобразуем ошибку к типу AuthError
      return rejectWithValue(error.response.data as RegisterError);
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
      .addCase(
        register.fulfilled,
        (state: SliceState, action: PayloadAction<string>) => {
          state.fetchingState = SharedTypes.EnumFetch.Fulfilled;
          state.error = null;
        },
      )
      .addCase(register.rejected, (state: SliceState, action) => {
        state.fetchingState = SharedTypes.EnumFetch.Rejected;
        state.error = action.payload?.message || 'Unknown error';
      });
  },
});

export default authSlice.reducer;
