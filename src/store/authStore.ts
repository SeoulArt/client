import baseAxios from "queries/baseAxios";
import { create } from "zustand";

export interface User {
    userId: number;
    username: string;
    role: "ROLE_ADMIN" | "ROLE_USER" | "ROLE_CREATOR";
    profileImage: string;
}

interface AuthStore {
    user: null | User;
    isLoading: boolean;
}

interface AuthAction {
    login: (user: User) => void;
    logout: () => Promise<void>;
}

const authStore = create<AuthStore & AuthAction>((set) => ({
    user: null,
    isLoading: true,
    login: (user) => {
        set(() => ({ user, isLoading: false }));
    },
    logout: async () => {
        try {
            set(() => ({ isLoading: true }));
            await baseAxios.post("/auth/logout");
            set(() => ({ user: null, isLoading: false }));
        } catch (error) {
            console.log(error);
        } finally {
            set(() => ({ isLoading: false }));
        }
    },
}));

export default authStore;
