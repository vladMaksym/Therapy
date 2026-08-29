export default function StageHeader({
  number,
  title,
  description,
}) {
  return (
    <header className="mb-10">
      <div className="mb-4 text-xs tracking-[0.35em] text-neutral-600">
        {number}
      </div>

      <h1 className="text-3xl font-light tracking-tight text-neutral-100">
        {title}
      </h1>

      {description && (
        <p className="mt-4 max-w-md whitespace-pre-line text-sm leading-7 text-neutral-500">
          {description}
        </p>
      )}
    </header>
  );
}