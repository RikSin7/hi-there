import { useState, useEffect } from 'react';
import { useAuth } from '@/features/auth';
import toast from 'react-hot-toast';

interface User {
  _id: string;
  name: string;
  username: string;
  avatar?: string;
}

interface Chat {
  _id: string;
  user: {
    _id: string;
    name: string;
    username: string;
    avatar?: string;
  };
  lastMessage?: {
    message: string;
    createdAt: string;
  };
  updatedAt: string;
}

interface Message {
  _id: string;
  sender: {
    _id: string;
    name: string;
    avatar?: string;
  };
  receiverId: string;
  message: string;
  createdAt: string;
}

/**
 * ChatsPage - Main messaging interface with real API integration
 */
export const ChatsPage = () => {
  const { user: currentUser } = useAuth();
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedUser, setSelectedUser] = useState<Chat['user'] | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [sidebarView, setSidebarView] = useState<'chats' | 'users'>('chats');
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Load chats on mount
  useEffect(() => {
    loadChats();
    // Pre-load users for search availability
    loadUsers();
  }, []);

  // Load messages when user is selected
  useEffect(() => {
    if (selectedUser) {
      loadMessages(selectedUser._id);
    }
  }, [selectedUser]);

  const loadChats = async () => {
    try {
      setLoading(true);
      const { ChatService } = await import('@/services');
      const response = await ChatService.getChats();
      
      if (response.success && response.data) {
        setChats(response.data);
      }
    } catch (error) {
      console.error('Error loading chats:', error);
      toast.error('Failed to load chats');
    } finally {
      setLoading(false);
    }
  };

  const loadUsers = async () => {
    // Fetch all users for search
    try {
      const { UserService } = await import('@/services');
      const response = await UserService.getUsers();
      if (response.success && response.data) {
        setUsers(response.data);
      }
    } catch (error) {
      console.error('Failed to load users', error);
    }
  };

  const loadMessages = async (otherUserId: string) => {
    // ... (existing logic, kept same by not replacing it if outside range, but here I'm replacing block)
      try {
      setLoading(true);
      const { ChatService } = await import('@/services');
      const response = await ChatService.getMessages(otherUserId);
      
      if (response.success && response.data) {
        setMessages(response.data);
      }
    } catch (error) {
      console.error('Error loading messages:', error);
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (!message.trim() || !selectedUser || sendingMessage) return;

    try {
      setSendingMessage(true);
      const { ChatService } = await import('@/services');
      const response = await ChatService.sendMessage(selectedUser._id, message);
      
      if (response.success && response.data) {
        // Construct message object to match UI requirements
        const newMessage = {
            ...response.data,
            sender: {
              _id: currentUser?.id || '',
              name: currentUser?.name || 'Me',
              avatar: currentUser?.avatar
            },
        };
        
        // Add new message to list
        setMessages(prev => [...prev, newMessage]);
        setMessage('');
        toast.success('Message sent!');
        
        // Refresh chats to update last message
        loadChats();
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    } finally {
      setSendingMessage(false);
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const getInitials = (name: string) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) || '??';
  };

  // Logic for filtering
  const filteredChats = chats.filter(chat => 
    chat.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chat.user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUsers = users.filter(user => 
    (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase())) &&
    !chats.some(chat => chat.user._id === user._id) // Exclude users already in chats
  );

  const displayList = searchTerm ? [...filteredChats, ...filteredUsers.map(u => ({ _id: u._id, user: u, updatedAt: '', lastMessage: undefined } as Chat))] : chats;

  const handleUserSelect = (user: User) => {
     setSelectedUser(user);
     setSearchTerm(''); // Clear search on select
  };

  return (
    <div className="flex h-full bg-gray-900">
      {/* Chat List Sidebar */}
      <div className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col">
        {/* Search */}
        <div className="p-4 border-b border-gray-700">
          <div className="relative">
            <input
              type="text"
              placeholder="Search people..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg
              className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Chat/User List */}
        <div className="flex-1 overflow-y-auto">
          {loading && chats.length === 0 ? (
            <div className="flex items-center justify-center p-8">
              <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
            </div>
          ) : (
            <>
              {/* If searching, show headers if you want, or just mixed list */}
              {searchTerm && filteredUsers.length > 0 && (
                <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-800/50">
                   People
                </div>
              )}
              
              {/* Combined Logic: Use displayList if strict manual map, OR render separately */}
              {/* Let's render filteredChats then filteredUsers for search mode */}
              
              {searchTerm ? (
                 <>
                   {filteredChats.map((chat) => (
                      <button
                        key={chat._id}
                        onClick={() => handleUserSelect(chat.user)}
                        className={`w-full p-4 flex items-start space-x-3 hover:bg-gray-700 transition-colors ${
                          selectedUser?._id === chat.user._id ? 'bg-gray-700' : ''
                        }`}
                      >
                         {/* Existing Chat Item UI */}
                        <div className="relative">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center font-bold flex-shrink-0">
                            {chat.user.avatar ? (
                              <img src={chat.user.avatar} alt={chat.user.name} className="w-full h-full rounded-full object-cover" />
                            ) : (
                              getInitials(chat.user.name)
                            )}
                          </div>
                        </div>
                        <div className="flex-1 text-left overflow-hidden">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-medium text-white truncate">{chat.user.name}</p>
                            <span className="text-xs text-green-400">Existing</span>
                          </div>
                          <p className="text-sm text-gray-400 truncate">
                             @{chat.user.username}
                          </p>
                        </div>
                      </button>
                   ))}
                   
                   {filteredUsers.map((user) => (
                      <button
                        key={user._id}
                        onClick={() => handleUserSelect(user)}
                        className={`w-full p-4 flex items-start space-x-3 hover:bg-gray-700 transition-colors ${
                          selectedUser?._id === user._id ? 'bg-gray-700' : ''
                        }`}
                      >
                         <div className="relative">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-600 to-gray-500 flex items-center justify-center font-bold flex-shrink-0">
                            {user.avatar ? (
                              <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                            ) : (
                              getInitials(user.name)
                            )}
                          </div>
                        </div>
                        <div className="flex-1 text-left overflow-hidden">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-medium text-white truncate">{user.name}</p>
                            <span className="text-xs text-blue-400">New Chat</span>
                          </div>
                          <p className="text-sm text-gray-400 truncate">
                             @{user.username}
                          </p>
                        </div>
                      </button>
                   ))}
                   
                   {filteredChats.length === 0 && filteredUsers.length === 0 && (
                      <div className="text-center p-8 text-gray-400">
                        No users found
                      </div>
                   )}
                 </>
              ) : (
                /* Default Chat List */
                chats.length === 0 ? (
                    <div className="text-center p-8 text-gray-400 flex flex-col items-center">
                      <p className="mb-4">No conversations yet</p>
                      <button onClick={() => setSearchTerm(' ')} className="text-blue-400 hover:text-blue-300">
                         Search for users to chat
                      </button>
                    </div>
                ) : (
                    chats.map((chat) => (
                      <button
                        key={chat._id}
                        onClick={() => handleUserSelect(chat.user)}
                        className={`w-full p-4 flex items-start space-x-3 hover:bg-gray-700 transition-colors ${
                          selectedUser?._id === chat.user._id ? 'bg-gray-700' : ''
                        }`}
                      >
                        <div className="relative">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center font-bold flex-shrink-0">
                            {chat.user.avatar ? (
                              <img src={chat.user.avatar} alt={chat.user.name} className="w-full h-full rounded-full object-cover" />
                            ) : (
                               getInitials(chat.user.name)
                            )}
                          </div>
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800"></div>
                        </div>
                        <div className="flex-1 text-left overflow-hidden">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-medium text-white truncate">{chat.user.name}</p>
                            {chat.lastMessage && (
                              <span className="text-xs text-gray-400">{formatTime(chat.lastMessage.createdAt)}</span>
                            )}
                          </div>
                          <p className="text-sm text-gray-400 truncate">
                            {chat.lastMessage ? chat.lastMessage.message : 'No messages yet'}
                          </p>
                        </div>
                      </button>
                    ))
                )
              )}
            </>
          )}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className="h-16 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-6 flex-shrink-0">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center font-bold">
                  {selectedUser.avatar ? (
                    <img src={selectedUser.avatar} alt={selectedUser.name} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    getInitials(selectedUser.name)
                  )}
                </div>
                <div>
                  <p className="font-medium">{selectedUser.name}</p>
                  <p className="text-xs text-green-400">@{selectedUser.username}</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {loading && messages.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
                </div>
              ) : messages.length === 0 ? (
                <div className="flex items-center justify-center h-full text-gray-400">
                  <p>No messages yet. Start the conversation!</p>
                </div>
              ) : (
                messages.map((msg) => {
                  const isMine = msg.sender._id === currentUser?.id;
                  return (
                    <div
                      key={msg._id}
                      className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                          isMine
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                            : 'bg-gray-700 text-white'
                        }`}
                      >
                        <p>{msg.message}</p>
                        <p className={`text-xs mt-1 ${isMine ? 'text-blue-100' : 'text-gray-400'}`}>
                          {formatTime(msg.createdAt)}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Message Input */}
            <div className="p-4 bg-gray-800 border-t border-gray-700">
              <div className="flex items-center space-x-3">
                <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    />
                  </svg>
                </button>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                  placeholder="Type a message..."
                  disabled={sendingMessage}
                  className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                />
                <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
                <button
                  onClick={handleSend}
                  disabled={sendingMessage || !message.trim()}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg px-6 py-3 font-medium hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {sendingMessage ? 'Sending...' : 'Send'}
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <svg
                className="w-20 h-20 mx-auto mb-4 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <p className="text-lg">Select a user to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
