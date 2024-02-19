import { configureStore } from '@reduxjs/toolkit';
import topProductsReducer from './slices/topProductSlice';
import productListReducer from './slices/productListSlice';
import productListByCategoryReducer from './slices/productListByCategorySlice';
import categoryReducer from './slices/categorySlice';

const store = configureStore({
  reducer: {
    topProducts: topProductsReducer,
    productList: productListReducer,
    productListByCategory: productListByCategoryReducer,
    categories: categoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
