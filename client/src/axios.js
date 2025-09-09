import axios from "axios";

const instance = axios.create({
    baseURL:meta.env.VITE_API_URL || "http://localhost:6000/api",
    withCredentials:true,
});

export default instance;