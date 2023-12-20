import axios from "axios";

export const API = axios.create({
  baseURL: "  http://34.64.106.45/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default API;
