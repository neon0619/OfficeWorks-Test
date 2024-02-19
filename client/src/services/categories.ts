import { createAsyncThunk } from "@reduxjs/toolkit";
import CategoryName from "../types/categories";
import axiosInstance from "./axiosInstance";

export const fetchCategories = createAsyncThunk<CategoryName>(
  "categories/fetchCategories",
  async () => {
    const response = await axiosInstance.get<CategoryName>("/categories");
    return response.data;
  }
);
