import { RootState } from "@/redux/store";
import { createSelector } from "@reduxjs/toolkit";

export const selectProducts = (state: RootState) => state.product.products;
export const selectActiveFilter = (state: RootState) => state.filters.filter;

export const selectSortedProducts = createSelector(
  [selectProducts, selectActiveFilter],
  (products, filter) => {
    if (products.length === 0) {
      return [];
    }
    switch (filter) {
      case "Alphabetical":
        return [...products].sort((a, b) => a.name.localeCompare(b.name));
      case "Count":
        return [...products].sort((a, b) => b.count - a.count);
      default:
        return products;
    }
  }
);
