// src/api/client.js
import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://faac-backend.fly.dev/api/v1",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default apiClient;
