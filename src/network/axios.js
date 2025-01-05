import axios from "axios";

export const instance = axios.create({
  baseURL: "http://localhost:3000/",
  // baseURL: "https://travel-api-5lpf.onrender.com/",
  // baseURL: "http://10.15.156.8:3000/",
  // baseURL: "https://ghost-honest-muskrat.ngrok-free.app/",
});
