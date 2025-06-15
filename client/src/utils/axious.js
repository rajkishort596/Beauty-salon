import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/v1", //backend API base URL
  withCredentials: true,
});

export default axiosInstance;
