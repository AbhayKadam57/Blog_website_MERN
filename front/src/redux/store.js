import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";

const Store = configureStore({
  reducer: {
    users: userSlice,
  },
});

export default Store;
