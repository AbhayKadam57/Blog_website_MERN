import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "users",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isLoading: false,
    error: false,
    message: "",
    searchPost: null,
  },

  reducers: {
    LoginStarted: (state, action) => {
      state.isLoading = true;
    },

    LoginSuccessFull: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      state.error = false;
    },
    LoginFailed: (state, action) => {
      state.isLoading = false;
      state.error = true;
      state.message = action.payload;
    },

    RegisterStarted: (state, action) => {
      state.isLoading = true;
    },

    RegisterSuccessFull: (state, action) => {
      state.message = action.payload;
      state.isLoading = false;
      state.error = false;
    },
    RegisterFailed: (state, action) => {
      state.isLoading = false;
      state.error = true;
      state.message = action.payload;
    },

    searchingPost: (state, action) => {
      state.searchPost = action.payload;
    },
  },
});

export const {
  LoginStarted,
  LoginSuccessFull,
  LoginFailed,
  RegisterStarted,
  RegisterSuccessFull,
  RegisterFailed,
  searchingPost,
} = UserSlice.actions;

export default UserSlice.reducer;
