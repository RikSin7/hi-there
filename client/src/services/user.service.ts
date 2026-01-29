import { api } from "./api/axiosInstance";
import { USER } from "./api/endpoints";

export const getUsers = async () => {
    const { data } = await api.get(USER.OTHERS);
    return data;
};

export const fetchMyProfile = async () => {
    const { data } = await api.get(USER.ME);
    return data;
};
