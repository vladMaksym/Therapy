import { useEffect, useState } from "react";

export default function StatBar({
  label,
  value,
}) {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(value);
    }, 80);

    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className="mb-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[10px] tracking-[0.2em] text-neutral-500">
          {label}
        </span>

        <span className="text-xs text-neutral-300">
          {value}%
        </span>
      </div>

      <div className="h-1 w-full overflow-hidden bg-neutral-900">
        <div
          className="h-full bg-neutral-500 transition-[width] duration-1000 ease-out"
          style={{
            width: `${animatedValue}%`,
          }}
        />
      </div>
    </div>
  );
}