export interface User {
    name: string;
    username: string;
    avatar: string;
    email: string;
    password: string;
    role: "user" | "admin";
    gender: "male" | "female";
}

export interface UserState {
    profile: User | null;
    loading: boolean;
    error: string | null;
}