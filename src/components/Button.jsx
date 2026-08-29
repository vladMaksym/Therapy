export default function Button({
  children,
  onClick,
  disabled = false,
  variant = "primary",
}) {
  const styles =
    variant === "secondary"
      ? "border border-neutral-800 bg-transparent text-neutral-400 hover:border-neutral-600"
      : "bg-neutral-100 text-neutral-950 hover:bg-white";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full rounded-none px-6 py-4
        text-xs font-bold tracking-[0.25em]
        transition duration-300
        disabled:cursor-not-allowed disabled:opacity-30
        ${styles}
      `}
    >
      {children}
    </button>
  );
}