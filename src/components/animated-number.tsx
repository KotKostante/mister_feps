export function AnimatedNumber({
  value,
  suffix = "",
  prefix = "",
  separator = " ",
  duration = 1100
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  separator?: string;
  duration?: number;
}) {
  const formatted = Math.round(value).toLocaleString("ru-RU").replace(/\u00a0/g, separator);

  return (
    <span
      className="animated-number"
      data-count-to={value}
      data-count-prefix={prefix}
      data-count-suffix={suffix}
      data-count-separator={separator}
      data-count-duration={duration}
    >
      {prefix}{formatted}{suffix}
    </span>
  );
}
