import { SquareCodeIcon } from "lucide-react";

export function Header() {
  return (
    <header className="flex items-center justify-between gap-2 bg-white p-3">
      <h2>MH: Wilds Damage Calculator</h2>
      <a
        href="https://github.com/chanleyou/mhwilds-calculator"
        target="_blank"
        rel="noopener noreferrer"
      >
        <SquareCodeIcon className="h-6 w-6" />
      </a>
    </header>
  );
}
