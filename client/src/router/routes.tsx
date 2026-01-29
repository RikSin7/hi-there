import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import AppLayout from "../layouts/AppLayout";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import App from "../App";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import Chat from "../pages/chat/Chat";
import NotFound from "../pages/system/NotFound";
import Home from "../pages/home/Home";

export const router = createBrowserRouter([
    {
        element: <App />,
        children: [
            {
                path: "/",
                element: <Navigate to="/signin" replace />,
            },

            // 🔓 Public routes
            {
                element: <PublicRoute />,
                children: [
                    {
                        element: <AuthLayout />,
                        children: [
                            { path: "signin", element: <Login /> },
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
                        element: <AppLayout />,
                        children: [
                            { path: "home", element: <Home /> },
                            { path: "chat/:userId", element: <Chat /> },
                        ],
                    },
                ],
            },
            {
                path: "*",
                element: <NotFound />,
            },
        ],
    },
]);
