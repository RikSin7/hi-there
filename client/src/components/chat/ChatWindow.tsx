import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { fetchMessagesThunk } from "../../store/chat/chat.thunk";
import ChatList from "./ChatList";
import MessageInput from "./MessageInput";

function ChatWindow() {
    const { userId } = useParams<{ userId: string }>();
    const dispatch = useAppDispatch();

    const chat = useAppSelector((state) =>
        state.chat.chats.find((c) => c.user?._id === userId)
    );

    const messages = useAppSelector((state) =>
        userId ? state.chat.messagesByUserId[userId] : []
    );

    const loading = useAppSelector((state) =>
        userId ? state.chat.loadingByUserId[userId] : false
    );

    useEffect(() => {
        if (!userId) return;
        if (!messages) {
            dispatch(fetchMessagesThunk({ otherUserId: userId }));
        }
    }, [userId, messages, dispatch]);

    if (!userId) {
        return (
            <div className="flex-1 flex items-center justify-center text-neutral-400">
                Select a conversation to start chatting
            </div>
        );
    }

    if (!chat) {
        return (
            <div className="flex-1 flex items-center justify-center text-neutral-500">
                Chat not found
            </div>
        );
    }

    return (
        <section className="flex flex-col h-full overflow-hidden">
            {/* Header */}
            <header className="h-16 px-4 flex items-center border-b border-neutral-800">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-neutral-800 flex items-center justify-center text-sm font-medium">
                        {chat.user.avatar ? (
                            <img
                                src={chat.user.avatar}
                                alt={chat.user.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            chat.user.name[0].toUpperCase()
                        )}
                    </div>
                    <div>
                        <p className="text-sm font-medium">{chat.user.name}</p>
                        <p className="text-xs text-neutral-400">Online</p>
                    </div>
                </div>
            </header>

            {/* Messages */}
            <ChatList
                messages={messages ?? []}
                loading={loading}
                currentUserId={chat.user._id}
            />

            {/* Input */}
            <MessageInput receiverId={chat.user._id} />
        </section>
    );
}

export default ChatWindow;
