import { PlayId, TOKENS } from "@/constants";
import baseAxios from "@/queries/baseAxios";
import { Token, User } from "@/types";
import getValidProfileUrl from "@/utils/getValidProfileUrl";
import { create } from "zustand";

interface AuthStore {
    user: null | User;
    isLoading: boolean;
    isTypingPhoneNumber: boolean;
}

interface AuthAction {
    setIsLoading: (isLoading: boolean) => void;
    login: ({
        user,
        accessToken,
        refreshToken,
    }: { user: User } & Token) => void;
    logout: () => void;
    addTicket: (playObj: {
        playId: PlayId | 2 | 4 | 6;
        ticketId: number;
    }) => void;
    cancelTicket: (ticketId: number) => void;
    addPhoneNumber: (phoneNumber: string) => void;
    startTypingPhoneNumber: () => void;
    endTypingPhoneNumber: () => void;
    changeCreatorDescription: (description: string) => void;
    changeProfileImage: (url: string) => void;
    changePhoneNumber: (phoneNumber: string) => void;
}

const authStore = create<AuthStore & AuthAction>((set) => ({
    user: null,
    isLoading: true,
    isTypingPhoneNumber: false,
    setIsLoading: (isLoading) => {
        set(() => ({ isLoading }));
    },
    login: ({ user, accessToken, refreshToken }) => {
        localStorage.setItem(TOKENS.ACCESS, accessToken);
        localStorage.setItem(TOKENS.REFRESH, refreshToken);
        baseAxios.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${accessToken}`;
        set(() => ({
            user: {
                ...user,
                profileImage: getValidProfileUrl(user.profileImage),
            },
            isLoading: false,
        }));
    },
    logout: () => {
        localStorage.removeItem(TOKENS.ACCESS);
        localStorage.removeItem(TOKENS.REFRESH);
        delete baseAxios.defaults.headers.common["Authorization"];
        set(() => ({ user: null, isLoading: false }));
    },
    addTicket: (playObj) => {
        set((state) => {
            if (!state.user) return state;
            return {
                ...state,
                user: {
                    ...state.user,
                    ticketPlayList: [...state.user.ticketPlayList, playObj],
                },
            };
        });
    },
    cancelTicket: (ticketId) => {
        set((state) => {
            if (!state.user) return state;
            return {
                ...state,
                user: {
                    ...state.user,
                    ticketPlayList: [
                        ...state.user.ticketPlayList.filter(
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
                ...state,
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
    changeCreatorDescription: (description) => {
        set((state) => {
            if (!state.user) return state;
            return {
                user: {
                    ...state.user,
                    description,
                },
            };
        });
    },
    changeProfileImage(url) {
        set((state) => {
            if (!state.user) return state;
            return {
                user: {
                    ...state.user,
                    profileImage: url,
                },
            };
        });
    },
    changePhoneNumber(phoneNumber) {
        set((state) => {
            if (!state?.user) return state;
            return {
                user: {
                    ...state.user,
                    phoneNumber,
                },
            };
        });
    },
}));

export default authStore;
