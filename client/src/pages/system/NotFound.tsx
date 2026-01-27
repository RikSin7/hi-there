import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white px-6">
            <div className="max-w-md text-center">
                <h1 className="text-7xl font-bold mb-4">404</h1>

                <p className="text-neutral-400 mb-6">
                    The page you’re looking for doesn’t exist or was moved.
                </p>

                <div className="flex items-center justify-center gap-4">
                    <Link
                        to="/chat"
                        className="px-4 py-2 rounded-md bg-white text-black text-sm font-medium hover:bg-neutral-200 transition"
                    >
                        Go to Chat
                    </Link>

                    <Link
                        to="/login"
                        className="px-4 py-2 rounded-md border border-neutral-700 text-sm hover:border-neutral-500 transition"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
