import axios from "axios";

const instance = axios.create({
    baseURL:"https://scan-clean-app.netlify.app/",
    withCredentials:true,
});

export default instance;