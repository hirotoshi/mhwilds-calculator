import { cn } from "@/utils";

export function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-md bg-white px-2 py-4 sm:px-4",
        className,
      )}
    >
      {children}
    </div>
  );
}
