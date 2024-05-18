import axios from "axios";
import { User } from "@/types";
import authStore from "@/store/authStore";

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

baseAxios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (
            originalRequest.url !== "/auth/refresh" &&
            error.response.status === 401 &&
            !originalRequest._retry
        ) {
            const { login } = authStore();
            try {
                originalRequest._retry = true;
                const response = await baseAxios.get<User>("/auth/refresh");
                login(response.data);
                if (response.status !== 200) {
                    throw response;
                }
                return baseAxios(originalRequest);
            } catch (refreshError) {
                return Error("인증 실패");
            }
        }
        return error.response;
    }
);
export default baseAxios;
