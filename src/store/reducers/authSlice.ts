import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  auth: { accessToken: string; currentUserId: string };
};

const initialState: AuthState = {
  auth: {
    accessToken: "",
    currentUserId: "",
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn: (
      state,
      action: PayloadAction<{
        accessToken: string;
        currentUserId: string;
      }>
    ) => {
      const { accessToken, currentUserId } = action.payload;
      state.auth.accessToken = accessToken;
      state.auth.currentUserId = currentUserId;
    },

    logOut: (state) => {
      state.auth.accessToken = "";
      state.auth.currentUserId = "";
    },
  },
});

export const authReducer = authSlice.reducer;

export const { logIn, logOut } = authSlice.actions;
