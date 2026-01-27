# Project Setup & Development Guide

This section explains how to **set up, run, and understand the frontend stack** used in this project.

---

## Tech Stack Overview

The project is built with a modern, production-ready frontend stack:

* **React 19** – UI library
* **TypeScript** – Type safety and maintainability
* **Vite** – Fast development server and bundler
* **React Router v7** – Routing and route guards
* **Redux Toolkit** – Global state management
* **Axios** – HTTP client
* **Tailwind CSS v4** – Utility-first styling
* **react-hot-toast** – Toast notifications

---

## Prerequisites

Make sure you have the following installed:

* **Node.js** ≥ 18
* **npm** or **pnpm** or **yarn**

You can verify with:

```bash
node -v
npm -v
```

---

## Installation

Clone the repository and install dependencies:

```bash
git clone <your-repo-url>
cd hi-there
npm install
```

---

## Environment Variables

Create a `.env` file at the root of the project:

```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

⚠️ Notes:

* Must start with `VITE_` (Vite requirement)
* Must include protocol (`http://`)
* Restart the dev server after changing env values

---

## Running the Project

### Start development server

```bash
npm run dev
```

The app will be available at:

```
http://localhost:5173
```

---

### Build for production

```bash
npm run build
```

This will:

* Type-check the project
* Create an optimized production build

---

### Preview production build

```bash
npm run preview
```

---

## Available Scripts

From `package.json`:

* `npm run dev` – Start development server
* `npm run build` – Type-check + build
* `npm run preview` – Preview production build
* `npm run lint` – Run ESLint

---

## Project Structure (Relevant Parts)

```text
src/
├── App.tsx                 # Root layout (contains Outlet + Toaster)
├── main.tsx                # App entry point
│
├── router/
│   ├── routes.tsx          # Route definitions
│   ├── ProtectedRoute.tsx  # Auth guard (private routes)
│   └── PublicRoute.tsx     # Auth guard (public routes)
│
├── layouts/
│   ├── AuthLayout.tsx      # Layout for login/signup
│   └── AppLayout.tsx       # Layout for authenticated app
│
├── store/
│   ├── store.ts            # Redux store
│   ├── auth/               # Auth slice + thunks + types
│   └── user/               # User slice + thunks + types
│
├── services/
│   ├── api/axiosInstance.ts # Axios instance + interceptors
│   └── *.service.ts         # API calls
│
├── hooks/                  # Custom hooks (redux, toast, etc.)
└── pages/                  # Route pages (Login, Signup, Chat)
```

---

## State Management Strategy

* **Redux Toolkit** manages global state
* **Auth state** lives in `auth.slice`
* Async logic is handled via `createAsyncThunk`
* API calls are isolated in `services/`

Auth state is derived from persisted token on app startup to avoid route flicker.

---

## Routing Strategy Summary

* `PublicRoute` blocks authenticated users from auth pages
* `ProtectedRoute` blocks unauthenticated users from app pages
* Layouts handle structure only
* Pages contain no routing or auth logic

See the **Routing Architecture & Protected Routes** section above for a full breakdown.

---

## Common Gotchas

* Restart dev server after changing `.env`
* Do not use `withCredentials: true` unless backend CORS is configured
* Every route with children must render an `<Outlet />`
* Guards must return `<Outlet />` to allow rendering

---

## Final Notes

This setup is intentionally designed to be:

* Scalable
* Predictable
* Easy to reason about
* Interview-ready

 ---
 ---
 ---
 ---
 ---
 ---
 ---

## Routing Architecture & Protected Routes

This document explains the **routing structure**, **rendering flow**, and **protected/public route mechanics** of the application in a clear, mental-model–driven way.

The goal is not just to show *what* the routes are, but *why* they work and *how* React Router renders them using `Outlet`.

---

## High-level Route Tree

```text
<App>
 ├── /
 │    └── redirect → /auth/login
 │
 ├── <PublicRoute>
 │    └── /auth
 │         └── <AuthLayout>
 │              ├── /auth/login  → <Login />
 │              └── /auth/signup → <Signup />
 │
 └── <ProtectedRoute>
      └── /home
           └── <AppLayout>
                └── /home/chat → <Chat />
```

### What this tree represents

* **`App`** is the root layout of the entire application
* **Public routes** (`/auth/*`) are accessible *only when the user is NOT authenticated*
* **Protected routes** (`/home/*`) are accessible *only when the user IS authenticated*
* Layouts (`AuthLayout`, `AppLayout`) control *structure*, not access
* Route guards (`PublicRoute`, `ProtectedRoute`) control *access*, not UI

---

## Core Concepts

### 1. Route Guards

Route guards are **not pages**. They are **filters** in the routing tree.

* `PublicRoute`

  * Blocks authenticated users from visiting `/login` or `/signup`
  * Redirects them to `/home/chat`

* `ProtectedRoute`

  * Blocks unauthenticated users from visiting `/home/*`
  * Redirects them to `/auth/login`

Each guard either:

* returns `<Navigate />` (deny)
* returns `<Outlet />` (allow)

---

### 2. Layouts

Layouts define *where* child routes render.

* `AuthLayout`

  * Centers auth pages
  * Wraps `Login` and `Signup`

* `AppLayout`

  * App shell for authenticated pages
  * Sidebar / navbar / main content

Layouts **do not** handle authentication logic.

---

### 3. `<Outlet />`

`<Outlet />` is a **placeholder** that renders the next matched child route.

> **Rule:** Every route that has `children` must render an `<Outlet />` if it wants those children to appear.

Each outlet renders **one level down** in the route tree.

---

## Render Flow Examples

### Case 1: User visits `/auth/login`

#### Matched route chain

```text
<App>
 → <PublicRoute>
   → <AuthLayout>
     → <Login />
```

#### Render stack

```text
<App>
 └── <Outlet>
      └── <PublicRoute>
           └── <Outlet>
                └── <AuthLayout>
                     └── <Outlet>
                          └── <Login />
```

#### What happens

1. `App` renders its `<Outlet>`
2. `PublicRoute` checks auth state

   * If authenticated → redirect to `/home/chat`
   * If not authenticated → render `<Outlet>`
3. `AuthLayout` renders and places auth UI
4. `Login` renders inside `AuthLayout`

---

### Case 2: User visits `/home/chat`

#### Matched route chain

```text
<App>
 → <ProtectedRoute>
   → <AppLayout>
     → <Chat />
```

#### Render stack

```text
<App>
 └── <Outlet>
      └── <ProtectedRoute>
           └── <Outlet>
                └── <AppLayout>
                     └── <Outlet>
                          └── <Chat />
```

#### What happens

1. `App` renders its `<Outlet>`
2. `ProtectedRoute` checks auth state

   * If NOT authenticated → redirect to `/auth/login`
   * If authenticated → render `<Outlet>`
3. `AppLayout` renders the app shell
4. `Chat` renders inside the main content area

---

## Why There Are Multiple `<Outlet />`s

Each `<Outlet />` corresponds to **one level in the route tree**.

### Protected route subtree

```text
ProtectedRoute
 └── <Outlet />  → renders AppLayout
       AppLayout
        └── <Outlet /> → renders Chat
```

* `ProtectedRoute` decides **IF** children render
* `AppLayout` decides **WHERE** children render

They solve different problems.

Removing any one outlet breaks rendering at that level.

---

## Design Principles Behind This Setup

* Auth logic is **centralized**, not duplicated
* Layouts stay dumb and reusable
* Pages contain zero routing logic
* Adding new protected routes requires no refactor
* Role-based access can be added later with ease

---

## Mental Model (TL;DR)

* Routes form a **tree**
* Guards are **filters** in the tree
* Layouts are **containers** in the tree
* `<Outlet />` is the **pipe** that lets rendering flow downward

> **Route config defines what can render.**
> **`<Outlet />` defines where it renders.**
