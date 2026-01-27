function Sidebar() {
    return (
        <aside className="w-72 h-full bg-neutral-950 border-r border-neutral-800 flex flex-col">
            {/* Header */}
            <div className="h-16 px-4 flex items-center justify-between border-b border-neutral-800">
                <h2 className="text-lg font-semibold text-white">HiThere</h2>

                {/* Placeholder for actions */}
                <button
                    type="button"
                    className="text-neutral-400 hover:text-white transition text-sm"
                >
                    +
                </button>
            </div>

            {/* User Profile */}
            <div className="px-4 py-3 border-b border-neutral-800 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-sm text-white">
                    U
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-white">
                        Username
                    </span>
                    <span className="text-xs text-neutral-400">Online</span>
                </div>
            </div>

            {/* Search */}
            <div className="px-4 py-3">
                <input
                    type="text"
                    placeholder="Search chats"
                    className="w-full rounded-md bg-neutral-900 border border-neutral-700 px-3 py-2 text-sm outline-none focus:border-white text-white placeholder:text-neutral-500"
                />
            </div>

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto">
                {/* Chat Item (placeholder) */}
                {Array.from({ length: 6 }).map((_, idx) => (
                    <div
                        key={idx}
                        className="px-4 py-3 cursor-pointer hover:bg-neutral-900 transition border-b border-neutral-800"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-sm text-white">
                                A
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-white">
                                        User {idx + 1}
                                    </span>
                                    <span className="text-xs text-neutral-500">
                                        12:30
                                    </span>
                                </div>
                                <p className="text-xs text-neutral-400 truncate">
                                    Last message preview goes here...
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </aside>
    );
}

export default Sidebar;
