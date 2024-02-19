import { createSlice } from '@reduxjs/toolkit';
import { Product } from '../types/productTypes';
import { fetchTopRatedProducts } from '../services/topProduct'

// Define the initial state
const initialState: {
  data: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
} = {
  data: [],
  status: 'idle',
  error: null,
};


// Create a slice for products
const TopProductsSlice = createSlice({
  name: 'TopProducts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopRatedProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTopRatedProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchTopRatedProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'An error occurred.';
      });
  },
});

export default TopProductsSlice.reducer;
