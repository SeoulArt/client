import axios from "axios";
import { User } from "@/types";
import authStore from "@/store/authStore";

const baseAxios = axios.create({
    baseURL: "/back",
    withCredentials: true,
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
