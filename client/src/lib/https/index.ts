import axios from "axios";
import { getApiUrl } from "../../../config";

const api = axios.create({
  baseURL: getApiUrl(),
  withCredentials: true,
});

export default api;