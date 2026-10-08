export function Heading({
  eyebrow,
  title,
  text,
  right,
  className = '',
}) {
  return (
    <div
      className={`mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between ${className}`}
    >
      <div>
        {eyebrow && (
          <p className="text-xs font-bold tracking-[0.2em] text-teal dark:text-aqua">
            {eyebrow}
          </p>
        )}

        <h2 className="mt-2 font-heading text-3xl font-bold sm:text-4xl">
          {title}
        </h2>

        {text && (
          <p className="mt-2 max-w-xl text-mortar dark:text-white/70">
            {text}
          </p>
        )}
      </div>

      {right && <div>{right}</div>}
    </div>
  )
}