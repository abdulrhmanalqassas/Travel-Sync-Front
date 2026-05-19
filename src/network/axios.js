import axios from "axios";
import { mockAxiosAdapter } from "../mocks/mockApi";

export const instance = axios.create({
  baseURL: "/",
  adapter: mockAxiosAdapter,
});
