import type { UserDocument } from "../types/model.types.js";

// user dto ( data transfer object )
export interface UserDTO {
    _id: string;
    name: string;
    username: string;
    avatar: string;
    email: string;
    role: string;
    gender: string;
}

export const toUserDTO = (user: UserDocument): UserDTO => {
    return {
        _id: user._id.toString(),
        name: user.name,
        username: user.username,
        avatar: user.avatar,
        email: user.email,
        role: user.role,
        gender: user.gender,
    };
};
