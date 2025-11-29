import { createSlice } from "@reduxjs/toolkit";

const initialEmail = localStorage.getItem("userEmail");
const initialLoginState = localStorage.getItem("isLogin") === "true";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogin: initialLoginState || false,
    userEmail: initialEmail || "",
  },

  reducers: {
    login: (state, action) => {
      state.isLogin = true;
      state.userEmail = action.payload;

      localStorage.setItem("isLogin", "true");
      localStorage.setItem("userEmail", action.payload);
    },

    logout: (state) => {
      state.isLogin = false;
      state.userEmail = "";

      localStorage.removeItem("isLogin");
      localStorage.removeItem("userEmail");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
