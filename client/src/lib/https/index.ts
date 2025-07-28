import axios from "axios";
import { getApiUrl } from "../../../config";

const api = axios.create({
    baseURL: getApiUrl(),
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
})

const apiwithAuth = axios.create({
    baseURL: getApiUrl(),
    withCredentials: true, 
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
});

export { api, apiwithAuth }; 