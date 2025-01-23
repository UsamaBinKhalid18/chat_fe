import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authApi } from 'src/apis/authApi';
import { RootState } from 'src/redux/store.ts';

interface User {
  id: number;
  email: string;
  first_name: string | null;
  last_name: string | null;
  picture: string | null;
}

interface AuthState {
  user: User | null;
  access: string | null;
  refresh: string | null;
  isGoogleSignup: boolean;
  is_active: boolean;
}
const INITIAL_STATE: AuthState = {
  user: null,
  access: null,
  refresh: null,
  isGoogleSignup: false,
  is_active: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {
    updateAccessToken: (state, action) => {
      const { access, refresh } = action.payload;
      state.access = access;
      state.refresh = refresh;
    },
    logOut: () => {
      return INITIAL_STATE;
    },
  },
  extraReducers: (builder) => {
    const handleAuthFulfilled = (state: AuthState, action: PayloadAction<AuthState>) => {
      const { user, access, refresh, is_active } = action.payload;
      return { ...state, user, access, refresh, is_active };
    };
    builder
      .addMatcher(authApi.endpoints.login.matchFulfilled, handleAuthFulfilled)
      .addMatcher(authApi.endpoints.signup.matchFulfilled, handleAuthFulfilled)
      .addMatcher(authApi.endpoints.googleLogin.matchFulfilled, handleAuthFulfilled)
      .addMatcher(authApi.endpoints.googleLogin.matchFulfilled, (state) => {
        state.isGoogleSignup = true;
      })
      .addMatcher(authApi.endpoints.activateUser.matchFulfilled, handleAuthFulfilled);
  },
});

export const { logOut, updateAccessToken } = authSlice.actions;

export default authSlice.reducer;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectAccessToken = (state: RootState) => state.auth.access;
export const selectIsGoogleSignup = (state: RootState) => state.auth.isGoogleSignup;
