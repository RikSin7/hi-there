import type { LoginPayload, AuthResponse, SignupPayload, RefreshResponse } from "../store/auth/auth.types";
import { api } from "./api/axiosInstance";
import { AUTH } from "./api/endpoints";

export const login = async (payload: LoginPayload) => {
    const { data } = await api.post<AuthResponse>(AUTH.LOGIN, payload);
    return data;
};

export const signup = async (payload: SignupPayload) => {
    const { data } = await api.post<AuthResponse>(AUTH.SIGNUP, payload);
    return data;
};

export const refresh = async () => {
    const { data } = await api.get<RefreshResponse>(AUTH.REFRESH);
    return data;
};

export const logout = async () => {
    const { data } = await api.post(AUTH.LOGOUT);
    return data;
};