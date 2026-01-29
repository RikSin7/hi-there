export interface AuthState {
    isAuthenticated: boolean;
    accessToken: string | null;
    buttonLoading: boolean;
    screenLoading: boolean;
    error: string | null;
}

export interface LoginPayload {
    username: string;
    password: string;
}

export interface SignupPayload {
    name: string;
    username: string;
    email?: string;
    password: string;
    gender: "male" | "female" | "";
}

export interface AuthResponse {
    success: boolean;
    data: {
        _id: string;
        name: string;
        username: string;
        avatar?: string;
        email?: string;
        role: "user" | "admin";
        gender: "male" | "female" | "";
    };
    accessToken: string;
}

export interface RefreshResponse {
    success: boolean;
    accessToken: string;
}
