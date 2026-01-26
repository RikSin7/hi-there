import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import AppLayout from "../layouts/AppLayout";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Chat from "../pages/home/Chat";
import App from "../App";

export const router = createBrowserRouter([
    {
        element: <App />, // root layout
        children: [
            {
                path: "/",
                element: <Navigate to="/auth/login" replace />,
            },
            {
                path: "/auth",
                element: <AuthLayout />,
                children: [
                    { path: "login", element: <Login /> },
                    { path: "signup", element: <Signup /> },
                ],
            },
            {
                path: "/home",
                element: <AppLayout />,
                children: [{ path: "chat", element: <Chat /> }],
            },
        ],
    },
]);
