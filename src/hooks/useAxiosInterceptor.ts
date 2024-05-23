import { TOKENS } from "@/constants";
import baseAxios from "@/queries/baseAxios";
import authStore from "@/store/authStore";
import { Token, User } from "@/types";
import { useEffect } from "react";

const useAxiosInterceptor = () => {
    const { login, logout } = authStore();
    const requestInterceptor = baseAxios.interceptors.request.use((config) => {
        if (config.url === "/auth/refresh") {
            config.headers.Authorization = `Bearer ${localStorage.getItem(
                TOKENS.REFRESH
            )}`;
        }
        return config;
    });

    const responseInterceptor = baseAxios.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;
            if (
                originalRequest.url !== "/auth/refresh" &&
                error.response.status === 403 &&
                !originalRequest._retry
            ) {
                try {
                    originalRequest._retry = true;
                    const response = await baseAxios.post<
                        { user: User } & Token
                    >("/auth/refresh");
                    if (response.status !== 200) {
                        throw response;
                    }
                    login(response.data);
                    originalRequest.headers[
                        "Authorization"
                    ] = `Bearer ${response.data.accessToken}`;
                    return baseAxios(originalRequest);
                } catch (refreshError) {
                    logout();
                    console.log(refreshError);
                    return refreshError;
                }
            }
            return error;
        }
    );

    useEffect(() => {
        return () => {
            baseAxios.interceptors.request.eject(requestInterceptor);
            baseAxios.interceptors.response.eject(responseInterceptor);
        };
    }, []);
};

export default useAxiosInterceptor;
