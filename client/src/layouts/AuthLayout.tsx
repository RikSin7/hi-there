import { Outlet } from "react-router-dom";

export default function 
AuthLayout() {
    return (
        <div className="min-h-[100dvh] flex items-center justify-center">
            <div className="w-full max-w-md">
                <Outlet />
            </div>
        </div>
    );
}
