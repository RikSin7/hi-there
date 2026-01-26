import { api } from "./api/axiosInstance";
import { AUTH } from "./api/endpoints";

export const login = async (payload: {
    username: string;
    password: string;
}) => {
    const { data } = await api.post(AUTH.LOGIN, payload);
    return data;
};

export const signup = async (payload: {
    name: string;
    username: string;
    email: string;
    password: string;
    gender: "male" | "female";
}) => {
    const { data } = await api.post(AUTH.SIGNUP, payload);
    return data;
};
