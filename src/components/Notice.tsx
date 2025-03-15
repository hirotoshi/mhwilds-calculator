import { InfoIcon } from "lucide-react";

export function Notice({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row items-center gap-2 rounded border p-2 text-xs text-blue-300">
      <InfoIcon className="h-4 w-4" />
      {children}
    </div>
  );
}
