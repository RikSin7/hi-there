import { useToast } from "../../hooks/useToast";

function Login() {
    const { show } = useToast("dark");
    const handleLogin = () => {
        show("Login successful", "success");
    };
    return (
        <div className="">
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;
