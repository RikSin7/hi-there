export interface User {
    name: string;
    username: string;
    password: string;
    avatar: string;
    email: string;
    role: "user" | "admin";
    gender: "male" | "female";
}

export interface UserState {
    profile: User | null;
    loading: boolean;
    error: string | null;
}