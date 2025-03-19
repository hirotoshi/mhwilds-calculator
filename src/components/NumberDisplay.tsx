"use client";

import { cn } from "@/utils";
import { formatNumber } from "@/utils/i18n";
import { useLocaleContext } from "@/contexts/LocaleContext";

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
  const { locale } = useLocaleContext();

  return (
    <div
      className={cn(
        "border-divider text-primary flex justify-between gap-2 border-b py-1 text-sm last:border-0",
        className,
      )}
      {...props}
    >
      <p>{label}</p>
      <p>
        {formatNumber(value, locale)}
        {suffix}
      </p>
    </div>
  );
}
