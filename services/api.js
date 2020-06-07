import axios from "axios";
const api = axios.create({
  baseURL: process.env.API || "http://localhost:3001",
  timeout: 10000000,
});

export default api;
