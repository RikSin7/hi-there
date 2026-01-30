import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import { useAppDispatch } from "../hooks/useRedux";
import { fetchChatsThunk } from "../store/chat/chat.thunk";
import { useEffect } from "react";

export default function AppLayout() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchChatsThunk());
    }, [dispatch]);

    return (
        <div className="h-[100dvh] bg-black text-white flex">
            <Sidebar />
            <main className="flex-1 overflow-hidden flex flex-col">
                <Outlet />
            </main>
        </div>
    );
}
