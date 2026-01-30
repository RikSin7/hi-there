/**
 * DashboardPage - Main dashboard view after login
 */
export const DashboardPage = () => {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Welcome to your chat dashboard</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Messages */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-blue-100 text-sm font-medium">Total Messages</h3>
            <svg className="w-8 h-8 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <p className="text-3xl font-bold text-white">1,234</p>
          <p className="text-blue-200 text-sm mt-2">↑ 12% from last week</p>
        </div>

        {/* Active Chats */}
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-purple-100 text-sm font-medium">Active Chats</h3>
            <svg className="w-8 h-8 text-purple-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
            </svg>
          </div>
          <p className="text-3xl font-bold text-white">42</p>
          <p className="text-purple-200 text-sm mt-2">5 new today</p>
        </div>

        {/* Group Chats */}
        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-green-100 text-sm font-medium">Group Chats</h3>
            <svg className="w-8 h-8 text-green-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <p className="text-3xl font-bold text-white">8</p>
          <p className="text-green-200 text-sm mt-2">2 active now</p>
        </div>

        {/* Online Users */}
        <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-orange-100 text-sm font-medium">Online Users</h3>
            <svg className="w-8 h-8 text-orange-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <p className="text-3xl font-bold text-white">156</p>
          <p className="text-orange-200 text-sm mt-2">Peak: 203</p>
        </div>
      </div>

      {/* Recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Messages */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">Recent Messages</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-start space-x-3 p-3 hover:bg-gray-700/50 rounded-lg transition-colors cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-white">User {i}</p>
                    <span className="text-xs text-gray-400">2m ago</span>
                  </div>
                  <p className="text-sm text-gray-400 truncate">Hey! How are you doing today?</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Groups */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">Active Groups</h2>
          <div className="space-y-4">
            {['Design Team', 'Development', 'Marketing', 'General'].map((group, i) => (
              <div key={i} className="flex items-center justify-between p-3 hover:bg-gray-700/50 rounded-lg transition-colors cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white font-bold">
                    {group.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-white">{group}</p>
                    <p className="text-xs text-gray-400">{12 + i} members</p>
                  </div>
                </div>
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
