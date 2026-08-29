export default function ProgressBar({
  current,
  total,
}) {
  const percentage = (current / total) * 100;

  return (
    <div className="mb-10">
      <div className="mb-2 flex justify-between text-[10px] tracking-[0.2em] text-neutral-600">
        <span>
          {String(current).padStart(2, "0")}
        </span>

        <span>
          {String(total).padStart(2, "0")}
        </span>
      </div>

      <div className="h-px bg-neutral-900">
        <div
          className="h-px bg-red-700 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}