export interface Error {
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
}
