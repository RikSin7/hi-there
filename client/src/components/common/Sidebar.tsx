import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/useRedux";
import type { RootState } from "../../store/store";
import Avatar from "./Avatar";

function Sidebar() {
    const chats = useAppSelector((state: RootState) => state.chat.chats);
    const navigate = useNavigate();
    const { userId } = useParams();

    return (
        <aside className="hidden md:flex w-80 flex-col border-r border-neutral-800 bg-neutral-950">
            {/* Header */}
            <div className="h-16 px-4 flex items-center border-b border-neutral-800">
                <h1 className="text-lg font-semibold tracking-tight">
                    HiThere
                </h1>
            </div>

            {/* Chat list */}
            <div className="flex-1 overflow-y-auto">
                {chats.length === 0 && (
                    <div className="px-4 py-6 text-sm text-neutral-400">
                        No conversations yet
                    </div>
                )}

                {chats.map((chat) => {
                    if (!chat.user) return null;
                    const otherUser = chat.user;
                    const isActive = otherUser._id === userId;

                    return (
                        <button
                            key={chat._id}
                            onClick={() => navigate(`/chat/${otherUser._id}`)}
                            className={[
                                "w-full text-left px-4 py-3 flex items-center gap-3 transition",
                                "hover:bg-neutral-900",
                                isActive
                                    ? "bg-neutral-900 border-l-2 border-white"
                                    : "border-l-2 border-transparent",
                            ].join(" ")}
                        >
                            {/* Avatar */}
                            <Avatar
                                src={otherUser.avatar}
                                name={otherUser.name}
                            />

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium truncate">
                                        {otherUser.name}
                                    </p>

                                    {chat.lastMessage?.createdAt && (
                                        <span className="text-xs text-neutral-500">
                                            {new Date(
                                                chat.lastMessage.createdAt
                                            ).toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </span>
                                    )}
                                </div>

                                <p className="text-xs text-neutral-400 truncate mt-0.5">
                                    {chat.lastMessage?.message ??
                                        "Start a conversation"}
                                </p>
                            </div>
                        </button>
                    );
                })}
            </div>
        </aside>
    );
}

export default Sidebar;
