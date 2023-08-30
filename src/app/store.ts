import { configureStore } from "@reduxjs/toolkit";
import cryptoReducer from "./cryptoSlice";
import newsReducer from "./newsSlice";
const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
    news: newsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
