import React, { useState } from "react";
import { useAppDispatch } from "../../hooks/useRedux";
import { useToast } from "../../hooks/useToast";
import { signupThunk } from "../../store/auth/auth.thunks";
import type { SignupPayload } from "../../store/auth/auth.types";
import { useNavigate } from "react-router-dom";

type ErrorType = {
    name?: string;
    username?: string;
    email?: string;
    password?: string;
    gender?: string;
};

function Signup() {
    // state
    const [formData, setFormData] = useState<SignupPayload>({
        name: "",
        username: "",
        email: "",
        password: "",
        gender: "",
    });
    const navigate = useNavigate();

    const [errors, setErrors] = useState<ErrorType>({});

    // toast
    const { show } = useToast("dark");

    // redux
    const dispatch = useAppDispatch();

    // validation
    const validate = () => {
        const newErrors: ErrorType = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!formData.username.trim()) {
            newErrors.username = "Username is required";
        }

        if (!formData.password.trim()) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        }

        if (!formData.gender) {
            newErrors.gender = "Gender is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // handlers
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSignup = async () => {
        if (!validate()) return;

        try {
            await dispatch(signupThunk(formData)).unwrap();
            show("Signup successful", "success");
        } catch (err) {
            show(String(err), "error");
        }
    };

    return (
        <div className="w-full bg-black text-white rounded-xl border border-neutral-800 p-8">
            <h1 className="text-2xl font-semibold mb-6 text-center">
                Create an account
            </h1>

            <form
                className="space-y-4"
                onSubmit={async (e) => {
                    e.preventDefault();
                    await handleSignup();
                }}
            >
                {/* Name */}
                <div>
                    <label className="block text-sm text-neutral-400 mb-1">
                        Name
                    </label>
                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full rounded-md bg-neutral-900 border border-neutral-700 px-3 py-2 text-sm outline-none focus:border-white"
                    />
                    {errors.name && (
                        <p className="text-xs text-red-500 mt-1">
                            {errors.name}
                        </p>
                    )}
                </div>

                {/* Username */}
                <div>
                    <label className="block text-sm text-neutral-400 mb-1">
                        Username
                    </label>
                    <input
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full rounded-md bg-neutral-900 border border-neutral-700 px-3 py-2 text-sm outline-none focus:border-white"
                    />
                    {errors.username && (
                        <p className="text-xs text-red-500 mt-1">
                            {errors.username}
                        </p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm text-neutral-400 mb-1">
                        Email (optional)
                    </label>
                    <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full rounded-md bg-neutral-900 border border-neutral-700 px-3 py-2 text-sm outline-none focus:border-white"
                    />
                    {errors.email && (
                        <p className="text-xs text-red-500 mt-1">
                            {errors.email}
                        </p>
                    )}
                </div>

                {/* Password */}
                <div>
                    <label className="block text-sm text-neutral-400 mb-1">
                        Password
                    </label>
                    <input
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full rounded-md bg-neutral-900 border border-neutral-700 px-3 py-2 text-sm outline-none focus:border-white"
                    />
                    {errors.password && (
                        <p className="text-xs text-red-500 mt-1">
                            {errors.password}
                        </p>
                    )}
                </div>

                {/* Gender */}
                <div>
                    <label className="block text-sm text-neutral-400 mb-1">
                        Gender
                    </label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full rounded-md bg-neutral-900 border border-neutral-700 px-3 py-2 text-sm outline-none focus:border-white"
                    >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    {errors.gender && (
                        <p className="text-xs text-red-500 mt-1">
                            {errors.gender}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full mt-6 rounded-md bg-white text-black py-2 text-sm font-medium hover:bg-neutral-200 transition"
                >
                    Sign up
                </button>
            </form>
            <p className="text-sm text-neutral-400 mt-4"> 
                Already have an account?{" "}
                <button
                    onClick={() => navigate("/signin")}
                    className="text-white hover:underline"
                >
                    Sign in
                </button>
            </p>
        </div>
    );
}

export default Signup;
