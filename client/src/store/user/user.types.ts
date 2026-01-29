export interface User {
    _id: string;
    name: string;
    username: string;
    avatar?: string;
    email?: string;
    role: "user" | "admin";
    gender: "male" | "female";
}

export interface UserState {
    profile: User | null;
    loading: boolean;
    error: string | null;
    users: User[];
}