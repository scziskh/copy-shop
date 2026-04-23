import { configureStore } from "@reduxjs/toolkit";
import { priceApi } from "./api/priceApi";
import { exchangeApi } from "./api/exchangeApi";
import cartSliceReducer from "./slice/cartSlice";

// eslint-disable-next-line no-unused-vars
export const makeStore = (initialState, options) =>
  configureStore({
    reducer: {
      [exchangeApi.reducerPath]: exchangeApi.reducer,
      [priceApi.reducerPath]: priceApi.reducer,
      cart: cartSliceReducer,
    },
    devTools: true,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      })
        .concat(exchangeApi.middleware)
        .concat(priceApi.middleware),
  });
