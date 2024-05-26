import { PlayId } from "@/constants";

export interface CustomError {
    code: string;
    message: string;
    status: number;
    timestamp: string;
}

// models
export interface User {
    userId: number;
    username: string;
    role: "ROLE_ADMIN" | "ROLE_USER" | "ROLE_CREATOR";
    description: string | null;
    profileImage: string;
    phoneNumber: string | null;
    ticketPlayList: { playId: PlayId | 2 | 4 | 6; ticketId: number }[];
    playList: string;
}

export interface Token {
    accessToken: string;
    refreshToken: string;
}
