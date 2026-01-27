import React, { useState } from "react";
import { useAppDispatch } from "../../hooks/useRedux";
import { useToast } from "../../hooks/useToast";
import { loginThunk } from "../../store/auth/auth.thunks";
import { useNavigate } from "react-router-dom";

type ErrorType = {
    username?: string;
    password?: string;
};

function Login() {
    //states
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const navigate = useNavigate();
    const [errors, setErrors] = useState<ErrorType>({});

    //toast
    const { show } = useToast("dark");

    //redux
    const dispatch = useAppDispatch();

    //validation
    const validate = () => {
        const newErrors: ErrorType = {};
        const { username, password } = formData;

        if (!username.trim()) {
            newErrors.username = "Username is required";
        }

        if (!password.trim()) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    //handlers
    const handleFormDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleLogin = async () => {
        if (!validate()) return;

        try {
            await dispatch(loginThunk(formData)).unwrap();
            show("Login successful", "success");
        } catch (err) {
            show(String(err), "error");
        }
    };

    return (
        <div className="w-full bg-black text-white rounded-xl border border-neutral-800 p-8">
            <h1 className="text-2xl font-semibold mb-6 text-center">
                Welcome back
            </h1>

            <form
                className="space-y-4"
                onSubmit={async (e) => {
                    e.preventDefault();
                    await handleLogin();
                }}
            >
                {/* Username */}
                <div>
                    <label
                        htmlFor="username"
                        className="block text-sm text-neutral-400 mb-1"
                    >
                        Username
                    </label>
                    <input
                        name="username"
                        type="text"
                        value={formData.username}
                        onChange={handleFormDataChange}
                        placeholder="Enter your username"
                        className="w-full rounded-md bg-neutral-900 border border-neutral-700 px-3 py-2 text-sm outline-none focus:border-white"
                    />
                    {errors.username && (
                        <p className="text-xs text-red-500 mt-1">
                            {errors.username}
                        </p>
                    )}
                </div>

                {/* Password */}
                <div>
                    <label
                        htmlFor="password"
                        className="block text-sm text-neutral-400 mb-1"
                    >
                        Password
                    </label>
                    <input
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleFormDataChange}
                        placeholder="Enter your password"
                        className="w-full rounded-md bg-neutral-900 border border-neutral-700 px-3 py-2 text-sm outline-none focus:border-white"
                    />
                    {errors.password && (
                        <p className="text-xs text-red-500 mt-1">
                            {errors.password}
                        </p>
                    )}
                </div>

                {/* Button */}
                <button
                    type="submit"
                    className="w-full mt-6 rounded-md bg-white text-black py-2 text-sm font-medium hover:bg-neutral-200 transition"
                >
                    Sign in
                </button>
            </form>
            <p className="text-sm text-neutral-400 mt-4">
                Don't have an account?{" "}
                <button
                    onClick={() => navigate("/signup")}
                    className="text-white hover:underline"
                >
                    Sign up
                </button>
            </p>
        </div>
    );
}

export default Login;
