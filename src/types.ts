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
    profileImage: string;
    phoneNumber: string | null;
    ticketPlayPairs: { playId: PlayId | 2 | 4 | 6; ticketId: number }[];
}
