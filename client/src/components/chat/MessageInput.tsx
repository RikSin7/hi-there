import { useState } from "react";
import { useAppDispatch } from "../../hooks/useRedux";
import { fetchMessagesThunk, sendMessageThunk } from "../../store/chat/chat.thunk";

type Props = {
    receiverId: string;
};

function MessageInput({ receiverId }: Props) {
    const [message, setMessage] = useState("");
    const dispatch = useAppDispatch();

    const handleSend = async () => {
        if (!message.trim()) return;

        await dispatch(sendMessageThunk({ receiverId, message })).unwrap();

        // Re-fetch messages to get populated sender
        dispatch(fetchMessagesThunk({ otherUserId: receiverId }));

        setMessage("");
    };

    return (
        <div className="h-16 border-t border-neutral-800 px-4 flex items-center gap-3 bg-red-50">
            <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type a message…"
                className="flex-1 bg-neutral-900 rounded-full px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-white transition"
            />
            <button
                onClick={handleSend}
                className="px-4 py-2 rounded-full bg-white text-black text-sm font-medium hover:bg-neutral-200 transition"
            >
                Send
            </button>
        </div>
    );
}

export default MessageInput;
