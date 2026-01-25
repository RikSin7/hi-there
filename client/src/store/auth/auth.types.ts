export interface AuthState {
    isAuthenticated: boolean;
    accessToken: string | null;
    loading: boolean;
    error: string | null;
}
