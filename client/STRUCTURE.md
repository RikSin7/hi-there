# Frontend Structure Documentation

## 📐 New Folder Structure

```
client/src/
├── components/              # Reusable UI components
│   ├── chat/               # Chat-related components
│   │   ├── ChatList.tsx
│   │   ├── ChatWindow.tsx
│   │   ├── MessageInput.tsx
│   │   └── index.ts        # ✨ Barrel export
│   ├── common/             # Shared components
│   │   ├── Avatar.tsx
│   │   ├── Sidebar.tsx
│   │   └── index.ts        # ✨ Barrel export
│   └── index.ts            # ✨ Main components export
│
├── hooks/                   # Custom React hooks
│   ├── useRedux.ts
│   ├── useToast.ts
│   └── index.ts            # ✨ Barrel export
│
├── layouts/                 # Layout wrappers
│   ├── AppLayout.tsx
│   ├── AuthLayout.tsx
│   └── index.ts            # ✨ Barrel export
│
├── pages/                   # Page components
│   ├── auth/
│   │   ├── Login.tsx
│   │   ├── Signup.tsx
│   │   └── index.ts        # ✨ Barrel export
│   ├── chat/
│   │   ├── Chat.tsx
│   │   └── index.ts        # ✨ Barrel export
│   ├── home/
│   │   ├── Home.tsx
│   │   └── index.ts        # ✨ Barrel export
│   ├── system/
│   │   ├── NotFound.tsx
│   │   └── index.ts        # ✨ Barrel export
│   └── index.ts            # ✨ Main pages export
│
├── router/                  # Routing configuration
│   ├── routes.tsx          # ✨ Route definitions with lazy loading
│   ├── routes.constants.ts # ✨ Centralized route paths
│   ├── ProtectedRoute.tsx  # Auth guard
│   ├── PublicRoute.tsx     # Public route wrapper
│   └── index.ts            # ✨ Barrel export
│
├── services/                # API & business logic
│   ├── api/
│   │   ├── axiosInstance.ts
│   │   └── endpoints.ts
│   ├── auth.service.ts
│   ├── chat.service.ts
│   ├── user.service.ts
│   └── index.ts            # ✨ Barrel export
│
├── store/                   # Redux state management
│   ├── auth/
│   │   ├── auth.slice.ts
│   │   ├── auth.thunks.ts
│   │   ├── auth.types.ts
│   │   └── index.ts        # ✨ Barrel export
│   ├── chat/
│   │   ├── chat.slice.ts
│   │   ├── chat.thunk.ts
│   │   ├── chat.types.ts
│   │   └── index.ts        # ✨ Barrel export
│   ├── user/
│   │   ├── user.slice.ts
│   │   ├── user.thunks.ts
│   │   ├── user.types.ts
│   │   └── index.ts        # ✨ Barrel export
│   ├── store.ts            # ✨ Store config with persistence
│   └── index.ts            # ✨ Barrel export
│
├── utils/                   # Utility functions
│   └── token.ts
│
├── App.tsx                  # Root component
├── main.tsx                 # ✨ Entry point with PersistGate
└── index.css                # Global styles
```

## ✨ Key Improvements

### 1. **Route Constants** (Object-Based)

```typescript
// router/routes.constants.ts
export const ROUTES = {
  ROOT: "/",
  SIGNIN: "/signin",
  SIGNUP: "/signup",
  HOME: "/home",
  CHAT: "/chat/:userId",
  NOT_FOUND: "*",
} as const;

// Helper function
export const getChatRoute = (userId: string) => `/chat/${userId}`;
```

**Usage:**

```typescript
import { ROUTES, getChatRoute } from "@/router";

// Navigate to signin
navigate(ROUTES.SIGNIN);

// Navigate to chat
navigate(getChatRoute(userId));
```

### 2. **Lazy Loading** with Suspense

All page components are lazy-loaded for better performance:

```typescript
// router/routes.tsx
const Login = lazy(() => import('../pages/auth/Login'));
const Chat = lazy(() => import('../pages/chat/Chat'));

// Wrapped with Suspense
<Suspense fallback={<PageLoader />}>
  <Login />
</Suspense>
```

### 3. **Barrel Exports** (index.ts files)

Every folder has an `index.ts` file for cleaner imports:

```typescript
// ❌ Before (verbose imports)
import ChatList from "../../components/chat/ChatList";
import ChatWindow from "../../components/chat/ChatWindow";
import MessageInput from "../../components/chat/MessageInput";

// ✅ After (clean single import)
import { ChatList, ChatWindow, MessageInput } from "@/components";
```

### 4. **Redux Persistence**

Auth state persists across page reloads:

```typescript
// store/store.ts
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // Only persist auth state
};

// main.tsx
<PersistGate loading={<Loader />} persistor={persistor}>
  <RouterProvider router={router} />
</PersistGate>
```

**What's persisted:**

- ✅ `isAuthenticated` flag
- ✅ `accessToken`
- ❌ Chat data (fetched fresh)
- ❌ User data (fetched fresh)

### 5. **Protected & Public Routes**

```typescript
// Protected routes (require authentication)
{
  element: <ProtectedRoute />,
  children: [
    { path: ROUTES.HOME, element: <Home /> },
    { path: ROUTES.CHAT, element: <Chat /> },
  ],
}

// Public routes (redirect if authenticated)
{
  element: <PublicRoute />,
  children: [
    { path: ROUTES.SIGNIN, element: <Login /> },
    { path: ROUTES.SIGNUP, element: <Signup /> },
  ],
}
```

## 📝 Import Examples

### Components

```typescript
// Import all chat components
import { ChatList, ChatWindow, MessageInput } from "@/components";

// Import specific components
import { Avatar, Sidebar } from "@/components";
```

### Pages

```typescript
// Import auth pages
import { Login, Signup } from "@/pages";

// Import specific page
import { Chat } from "@/pages";
```

### Services

```typescript
// Import services
import { AuthService, ChatService, UserService } from "@/services";

// Import API client
import { api, AUTH, CHAT, USER } from "@/services";
```

### Store

```typescript
// Import store
import { store, persistor } from "@/store";

// Import types
import type { RootState, AppDispatch } from "@/store";

// Import specific slice
import { loginThunk, logoutThunk } from "@/store";
```

### Router

```typescript
// Import routes
import { ROUTES, getChatRoute } from "@/router";

// Use in navigation
navigate(ROUTES.HOME);
navigate(getChatRoute(userId));
```

### Hooks

```typescript
// Import custom hooks
import { useAppSelector, useAppDispatch } from "@/hooks";
import { useToast } from "@/hooks";
```

## 🎯 Benefits

1. **Cleaner Imports**: Use barrel exports for single-line imports
2. **Better Performance**: Lazy loading reduces initial bundle size
3. **Type Safety**: Route constants prevent typos
4. **Persistence**: Auth state survives page refreshes
5. **Scalability**: Easy to add new features
6. **Maintainability**: Clear folder structure
7. **DX**: Better developer experience

## 🚀 Next Steps

### Recommended Path Aliases

Add to `tsconfig.json` for even cleaner imports:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@/components": ["./src/components"],
      "@/pages": ["./src/pages"],
      "@/hooks": ["./src/hooks"],
      "@/store": ["./src/store"],
      "@/services": ["./src/services"],
      "@/router": ["./src/router"],
      "@/utils": ["./src/utils"]
    }
  }
}
```

Then update `vite.config.ts`:

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

## 🔄 Migration from Old Structure

All existing functionality remains intact:

- ✅ Authentication works
- ✅ Chat functionality works
- ✅ User management works
- ✅ All Redux actions work
- ✅ Routing works as before
- ✅ **New**: Auth persists on refresh!
- ✅ **New**: Pages lazy-load for better performance!
