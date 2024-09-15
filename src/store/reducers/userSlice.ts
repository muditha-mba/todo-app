import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { encryptPassword } from "../../lib/helper-functions/encrypt-decrypt";

//Type definitions
type Profile = {
  email: string;
  firstName: string;
  lastName: string;
  password?: string;
};

type AllUsers = {
  [key: string]: Profile;
};

type UserState = {
  allUsers: AllUsers;
};

//Initial state
const initialState: UserState = {
  allUsers: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateProfile: (state, action: PayloadAction<Profile>) => {
      const { email, firstName, lastName, password } = action.payload;

      state.allUsers[email] = {
        email,
        firstName,
        lastName,
        password,
      };
    },
  },
});

export const userReducer = userSlice.reducer;
export const { updateProfile } = userSlice.actions;
