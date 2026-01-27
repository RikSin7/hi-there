import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";

export default function AppLayout() {
    return (
        <div className="h-screen bg-black text-white flex">
            <Sidebar />
            <main className="flex-1 overflow-hidden">
                <Outlet />
            </main>
        </div>
    );
}
