import { createSlice } from '@reduxjs/toolkit';
import { fetchCategories } from '../services/categories';
import CategoryName from '../types/categories';

const initialState: {
  data: CategoryName;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
} = {
  data: [],
  status: 'idle',
  error: null,
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'An error occurred.';
      });
  },
});

export default categorySlice.reducer;
