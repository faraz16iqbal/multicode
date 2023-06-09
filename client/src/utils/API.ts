import axios, { AxiosInstance } from "axios";
const API: AxiosInstance = axios.create({
  baseURL: "https://multicode-api.onrender.com",
});

export default API;
