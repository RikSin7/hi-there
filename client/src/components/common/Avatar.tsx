type AvatarProps = {
    src?: string;
    name: string;
    size?: number;
};

function Avatar({ src, name, size = 40 }: AvatarProps) {
    return (
        <div
            className="rounded-full overflow-hidden bg-neutral-800 flex items-center justify-center text-sm font-medium text-white shrink-0"
            style={{ width: size, height: size }}
        >
            {src ? (
                <img
                    src={src}
                    alt={name}
                    className="w-full h-full object-cover"
                />
            ) : (
                name.charAt(0).toUpperCase()
            )}
        </div>
    );
}

export default Avatar;
