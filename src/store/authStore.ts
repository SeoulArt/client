import { create } from "zustand";

interface User {
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
    logout: () => void;
}

const authStore = create<AuthStore & AuthAction>((set) => ({
    user: null,
    isLoading: true,
    login: (user) => {
        set((state) => ({ ...state, user, isLoading: false }));
    },
    logout: () => {
        set((state) => ({ ...state, user: null, isLoading: false }));
    },
}));

export default authStore;
