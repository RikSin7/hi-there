import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import AppLayout from "../layouts/AppLayout";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Chat from "../pages/home/Chat";
import App from "../App";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
    {
        element: <App />,
        children: [
            {
                path: "/",
                element: <Navigate to="/auth/login" replace />,
            },

            // 🔓 Public routes
            {
                element: <PublicRoute />,
                children: [
                    {
                        path: "/auth",
                        element: <AuthLayout />,
                        children: [
                            { path: "login", element: <Login /> },
                            { path: "signup", element: <Signup /> },
                        ],
                    },
                ],
            },

            // 🔐 Protected routes
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        path: "/home",
                        element: <AppLayout />,
                        children: [{ path: "chat", element: <Chat /> }],
                    },
                ],
            },
        ],
    },
]);
