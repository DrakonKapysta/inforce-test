import { ProductService } from "@/services/ProductService";
import { Comment, Product } from "@/types/product";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { revalidatePath } from "next/cache";

export const addProductAsync = createAsyncThunk(
  "product/addProduct",
  async (product: Omit<Product, "id">) => {
    const response = await fetch("http://localhost:3000/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });

    const data = await response.json();
    return data;
  }
);
export const fetchAllProducts = createAsyncThunk(
  "product/fetchAllProducts",
  async () => {
    const response = await fetch("http://localhost:3000/api/products", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    return data;
  }
);
export const deleteProductAsync = createAsyncThunk(
  "product/deleteProductAsync",
  async (id: number) => {
    const response = await fetch("http://localhost:3000/api/products", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    const data = await response.json();
    return data;
  }
);
export const deleteCommentAsync = createAsyncThunk(
  "product/deleteCommentAsync",
  async (comment: Comment) => {
    const response = await fetch(`http://localhost:3000/api/product`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(comment),
    });
    const data = await response.json();

    return data;
  }
);
export const addCommentAsync = createAsyncThunk(
  "product/addCommentAsync",
  async (comment: Omit<Comment, "id">) => {
    const response = await fetch("http://localhost:3000/api/product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comment }),
    });
    const data = await response.json();

    return data.product;
  }
);

export interface ProductState {
  products: Product[];
}

const initialState: ProductState = {
  products: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },

    updateProduct: (state, action: PayloadAction<Product>) => {
      state.products = state.products.map((product) => {
        if (product.id === action.payload.id) {
          return action.payload;
        }
        return product;
      });
    },
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addProductAsync.fulfilled, (state, action) => {
      state.products.push(action.payload.product);
    });
    builder.addCase(deleteProductAsync.fulfilled, (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload.id
      );
    });
    builder.addCase(deleteCommentAsync.fulfilled, (state, action) => {
      const productId = action.payload.product.productId;
      const commentProduct = action.payload.product.id;

      state.products = [
        ...state.products.map((product) => {
          if (product.id === productId) {
            return {
              ...product,
              comments: (product.comments || []).filter(
                (comment) => comment.id !== commentProduct
              ),
            };
          }
          return product;
        }),
      ];
    });
    builder.addCase(addCommentAsync.fulfilled, (state, action) => {
      state.products = state.products.map((product) => {
        if (product.id === action.payload[0].productId) {
          product.comments = action.payload;
          return product;
        }
        return product;
      });
    });
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.products = action.payload.products;
    });
  },
});

export const { addProduct, removeProduct, updateProduct, setProducts } =
  productSlice.actions;

export const productReducer = productSlice.reducer;
