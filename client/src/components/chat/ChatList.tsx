import { useEffect, useRef } from "react";
import type { Message } from "../../store/chat/chat.types";

type Props = {
    messages: Message[];
    loading: boolean;
    currentUserId: string;
};

function ChatList({ messages, loading, currentUserId }: Props) {
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages?.length]);

    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center text-neutral-500">
                Loading messages…
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-3 custom-scrollbar">
            {messages.map((msg) => {
                if (!msg.sender) return null;
                const isMe = msg.sender._id !== currentUserId;

                return (
                    <div
                        key={msg._id}
                        className={`max-w-[70%] px-4 py-2 rounded-xl text-sm transition-all duration-200 ${
                            isMe
                                ? "ml-auto bg-white text-black rounded-br-sm"
                                : "mr-auto bg-neutral-800 text-white rounded-bl-sm"
                        }`}
                    >
                        {msg.message}
                        <div className="mt-1 text-[10px] text-neutral-400 text-right">
                            {new Date(msg.createdAt).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </div>
                    </div>
                );
            })}
            <div ref={bottomRef} />
        </div>
    );
}

export default ChatList;
