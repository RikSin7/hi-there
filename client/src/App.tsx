import { Outlet } from "react-router-dom"
import { Toaster } from "react-hot-toast"

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Outlet />
      <Toaster position="top-right" />
    </div>
  )
}

export default App