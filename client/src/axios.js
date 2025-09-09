import axios from "axios";

const instance = axios.create({
    baseURL:"https://scanclean-backend.onrender.com"
    withCredentials:true,
});

export default instances;