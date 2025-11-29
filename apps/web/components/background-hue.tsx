const DEFAULT_COLORS_SCALE = {
  0: 'hsl(var(--primary))',
  1: 'hsl(var(--primary))',
  2: 'hsl(var(--primary))',
};

export function BackgroundHue({
  className,
  opacity = 0.03,
  colorsScale = DEFAULT_COLORS_SCALE,
}: {
  className?: string;
  opacity?: number;
  colorsScale?: Record<number, string>;
}) {
  const colors = Object.values(colorsScale).map((color, index, array) => {
    const offset = array.length > 1 ? index / (array.length - 1) : 0;
    const stopOpacity = 1 - index / (array.length - 1);

    return (
      <stop
        offset={offset}
        key={index}
        style={{ stopColor: color, stopOpacity }}
      />
    );
  });

  return (
    <svg
      className={`pointer-events-none fixed top-0 left-0 m-0! hidden h-full w-full dark:block ${className}`}
      style={{ opacity }}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient
          id="purpleGradient"
          x1="10%"
          y1="70%"
          x2="50%"
          y2="20%"
          gradientUnits="userSpaceOnUse"
        >
          {colors}
        </linearGradient>
      </defs>
      <rect width="100" height="100" fill="url(#purpleGradient)" />
    </svg>
  );
}
