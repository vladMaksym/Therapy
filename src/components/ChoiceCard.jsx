export default function ChoiceCard({
  children,
  selected,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full border p-5 text-left
        transition-all duration-300
        ${
          selected
            ? "border-red-500 bg-red-950/10"
            : "border-neutral-800 bg-neutral-950 hover:border-neutral-600"
        }
      `}
    >
      <div className="text-sm leading-6 text-neutral-300">
        {children}
      </div>
    </button>
  );
}