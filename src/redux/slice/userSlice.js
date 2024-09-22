// userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const initialState = {
  token: null,
  isLoggedIn: false,
  expirationTime: null, // To store token expiration time
  isLawyer: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      const decodedToken = jwtDecode(action.payload.token);
      state.id = action.payload.id;
      state.token = action.payload.token;
      state.isLawyer = action.payload.isLawyer;
      state.isLoggedIn = true;
      state.expirationTime = decodedToken.exp * 1000; // Store expiration time in milliseconds
    },
    logout: (state) => {
      state.id = null;
      state.token = null;
      state.isLawyer = null;
      state.expirationTime = null;
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
