import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./features/product/productSlice";
import { filterReducer } from "./features/filter/filterSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    filters: filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
