import { Outlet } from "react-router-dom";

export default function AppLayout() {
    return (
        <div className="h-screen bg-black text-white flex">
            {/* Sidebar / Navbar later */}
            <main className="flex-1 overflow-hidden">
                <Outlet />
            </main>
        </div>
    );
}
