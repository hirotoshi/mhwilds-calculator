import { cn } from "@/utils";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: number;
  suffix?: string;
}

export function NumberDisplay({
  label,
  value,
  suffix,
  className,
  ...props
}: Props) {
  return (
    <div
      className={cn(
        "flex justify-between gap-2 border-b border-zinc-300 py-1 text-sm text-zinc-800 last:border-0",
        className,
      )}
      {...props}
    >
      <p>{label}</p>
      <p>
        {value}
        {suffix}
      </p>
    </div>
  );
}
