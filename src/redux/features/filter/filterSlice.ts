import { Product } from "@/types/product";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { set } from "zod";

export interface ProductState {
  filter: "Alphabetical" | "Count";
}

const initialState: ProductState = {
  filter: "Alphabetical",
};

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    changeFilter: (_, action: PayloadAction<"Alphabetical" | "Count">) => {
      return { filter: action.payload };
    },
  },
});

export const { changeFilter } = filterSlice.actions;

export const filterReducer = filterSlice.reducer;
