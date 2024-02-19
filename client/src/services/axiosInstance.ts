import axios from "axios";

const { VITE_BASE_URL } = import.meta.env;

const axiosInstance = axios.create({
  baseURL: VITE_BASE_URL,
});

export default axiosInstance;
