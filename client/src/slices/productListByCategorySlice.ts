import { createSlice } from '@reduxjs/toolkit';
import { Product } from '../types/productTypes';
import { fetchProductsByCategory } from '../services/productList';

const initialState: {
  data: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
} = {
  data: [],
  status: 'idle',
  error: null,
};

const productListByCategorySlice = createSlice({
  name: 'productListByCategory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'An error occurred.';
      });
  },
});

export default productListByCategorySlice.reducer;
