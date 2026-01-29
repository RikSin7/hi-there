import { toast } from "react-hot-toast";

type Theme = "light" | "dark";
type Variant = "success" | "error" | "loading" | "default";

interface ToastConfig {
    duration?: number;
    position?: "top-right" | "top-center" | "bottom-right";
    style?: React.CSSProperties;
}

export const useToast = (theme: Theme = "light") => {
    const isDark = theme === "dark";

    const baseStyle: React.CSSProperties = {
        background: isDark ? "#111" : "#fff",
        color: isDark ? "#fff" : "#111",
        borderRadius: "10px",
        padding: "12px 16px",
    };

    const show = (
        message: string,
        variant: Variant = "default",
        config?: ToastConfig
    ) => {
        const options = {
            duration: config?.duration ?? 3000,
            position: config?.position ?? "top-right",
            style: {
                ...baseStyle,
                ...config?.style,
            },
        };

        switch (variant) {
            case "success":
                return toast.success(message, options);
            case "error":
                return toast.error(message, options);
            case "loading":
                return toast.loading(message, options);
            default:
                return toast(message, options);
        }
    };

    return { show };
};
