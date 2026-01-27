import { useAppDispatch } from "../../hooks/useRedux";
import { useToast } from "../../hooks/useToast";
import { loginThunk } from "../../store/auth/auth.thunks";

function Login() {
    const { show } = useToast("dark");
    const dispatch = useAppDispatch();
    const handleLogin = () => {
        dispatch(loginThunk({ username: "rikxsin0", password: "12345678" }));
        show("Login success");
    };
    return (
        <div className="">
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;
