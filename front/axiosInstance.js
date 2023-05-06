import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_REACT_BACKEND_URL}`,
});

export default axiosInstance;
