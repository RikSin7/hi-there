import mongoose from "mongoose";
import type { UserDocument } from "../types/model.types.js";

const userSchema = new mongoose.Schema<UserDocument>(
    {
        name: { type: String, required: true, trim: true },
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            index: true,
        },
        password: { type: String, required: true, select: false },
        avatar: { type: String, default: "" },
        email: { type: String, unique: true, lowercase: true, index: true },
        role: { type: String, enum: ["user", "admin"], default: "user" },
        gender: {
            type: String,
            enum: ["male", "female", "other"],
            default: "male",
        },
    },
    { timestamps: true }
);

// avatar
userSchema.pre("save", function () {
    if (!this.avatar) {
        const style =
            this.gender === "female"
                ? "avataaars"
                : this.gender === "male"
                ? "personas"
                : "identicon";

        this.avatar = `https://api.dicebear.com/7.x/${style}/svg?seed=${this._id}`;
    }
});

export const UserModel = mongoose.model<UserDocument>("User", userSchema);
