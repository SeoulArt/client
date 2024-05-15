import baseAxios from "@/queries/baseAxios";
import { User } from "@/types";
import { create } from "zustand";

interface AuthStore {
    user: null | User;
    isLoading: boolean;
}

interface AuthAction {
    login: (user: User) => void;
    logout: () => Promise<void>;
    addPlayId: (playObj: { playId: number; ticketId: number }) => void;
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
    addPlayId: (playObj) => {
        set((state) => {
            if (!state.user) return state;
            return {
                user: {
                    ...state.user,
                    plays: [...state.user.plays, playObj],
                },
            };
        });
    },
}));

export default authStore;
