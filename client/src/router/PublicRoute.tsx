import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/useRedux";

export default function PublicRoute() {
    const { isAuthenticated } = useAppSelector((state) => state.auth);

    if (isAuthenticated) {
        return <Navigate to="/home/chat" replace />;
    }

    return <Outlet />;
}
