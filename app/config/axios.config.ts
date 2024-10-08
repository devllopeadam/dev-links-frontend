import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    `${process.env.NEXT_PUBLIC_API_URL}/api` || "http://localhost:1337/api",
});

export default axiosInstance;