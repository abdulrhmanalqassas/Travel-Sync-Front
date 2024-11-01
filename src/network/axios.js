import axios from "axios";

export const instance = axios.create({
  // baseURL: "http://localhost:3000/",
  baseURL: "https://travel-api-5lpf.onrender.com/",
  // baseURL:"https://some-otters-send.loca.lt/"
});
