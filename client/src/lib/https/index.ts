import axios from "axios";
import { getApiUrl } from "../../../config";

const api = axios.create({
    baseURL: getApiUrl(),
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
})

export default api; 