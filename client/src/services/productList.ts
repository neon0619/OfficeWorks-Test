import { createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "../types/productTypes";
import axiosInstance from "./axiosInstance";

export const fetchProductList = createAsyncThunk<Product[]>(
  "products/fetchProductList",
  async () => {
    const response = await axiosInstance.get("/products/");
    return response.data;
  }
);

export const fetchProductsByCategory = createAsyncThunk<Product[], string>(
  "products/fetchProductsByCategory",
  async (category: string) => {
    const response = await axiosInstance.get(`/products/category/${category}`);
    return response.data;
  }
);
