import { createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "../types/productTypes";
import axiosInstance from "./axiosInstance";

export const fetchTopRatedProducts = createAsyncThunk<Product[]>(
  "topProducts/fetchTopRatedProducts", // Use the correct slice name
  async () => {
    const response = await axiosInstance.get("/products/topRatedProducts");
    return response.data;
  }
);
