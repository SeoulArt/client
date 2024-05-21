import { PlayId } from "@/constants";
import baseAxios from "@/queries/baseAxios";
import { User } from "@/types";
import { create } from "zustand";

interface AuthStore {
    user: null | User;
    isLoading: boolean;
    isTypingPhoneNumber: boolean;
}

interface AuthAction {
    login: (user: User) => void;
    logout: () => Promise<void>;
    addTicket: (playObj: {
        playId: PlayId | 2 | 4 | 6;
        ticketId: number;
    }) => void;
    cancelTicket: (ticketId: number) => void;
    addPhoneNumber: (phoneNumber: string) => void;
    startTypingPhoneNumber: () => void;
    endTypingPhoneNumber: () => void;
}

const authStore = create<AuthStore & AuthAction>((set) => ({
    user: null,
    isLoading: true,
    isTypingPhoneNumber: false,
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
    addTicket: (playObj) => {
        set((state) => {
            if (!state.user) return state;
            return {
                user: {
                    ...state.user,
                    ticketPlayPairs: [...state.user.ticketPlayPairs, playObj],
                },
            };
        });
    },
    cancelTicket: (ticketId) => {
        set((state) => {
            if (!state.user) return state;
            return {
                user: {
                    ...state.user,
                    ticketPlayPairs: [
                        ...state.user.ticketPlayPairs.filter(
                            (obj) => obj.ticketId !== ticketId
                        ),
                    ],
                },
            };
        });
    },
    addPhoneNumber: (phoneNumber: string) => {
        set((state) => {
            if (!state.user) return state;
            return {
                user: {
                    ...state.user,
                    phoneNumber: phoneNumber,
                },
            };
        });
    },
    startTypingPhoneNumber: () => {
        set(() => ({ isTypingPhoneNumber: true }));
    },
    endTypingPhoneNumber: () => {
        set(() => ({ isTypingPhoneNumber: false }));
    },
}));

export default authStore;
