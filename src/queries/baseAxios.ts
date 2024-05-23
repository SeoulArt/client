import axios from "axios";

const baseAxios = axios.create({
    // production에서는 프록시 지원 안함
    baseURL:
        import.meta.env.MODE === "development"
            ? "/back"
            : import.meta.env.VITE_API_URL + "/api",
    // 쿠키
    withCredentials: true,
    // CORS 허용
    headers: {
        "Access-Control-Allow-Origin": import.meta.env.VITE_API_URL,
        "Access-Control-Allow-Credentials": "true",
    },
});

export default baseAxios;
