import axios from "axios";

const baseAxios = axios.create({
    baseURL: "/back",
    withCredentials: true,
});

export default baseAxios;
