export default function StatBar({
  label,
  value,
}) {
  return (
    <div className="mb-4">
      <div className="mb-1 flex items-center justify-between">
        <span className="text-[10px] tracking-[0.2em] text-neutral-500">
          {label}
        </span>

        <span className="text-xs text-neutral-400">
          {value}%
        </span>
      </div>

      <div className="h-1 bg-neutral-900">
        <div
          className="h-1 bg-neutral-500 transition-all duration-1000"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}