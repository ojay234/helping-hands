import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import api from "@/app/api/apiSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
