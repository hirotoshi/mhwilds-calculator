import { useMemo } from "react";
import {
  DualBladesAttacks,
  GreatSwordAttacks,
  HuntingHornAttacks,
  LongSwordAttacks,
  SwitchAxeAttacks,
  SwordAndShieldAttacks,
} from "@/data/attacks";
import { useCalcs, useModel } from "@/store";
import { Attack } from "@/types";
import { cn } from "@/utils";

export function MovesTable({ override }: { override?: Attack[] }) {
  const { weapon } = useModel();
  const { calcHit, calcCrit, calcAverage } = useCalcs();

  const attacks: Attack[] = useMemo(() => {
    if (override) return override;
    if (weapon === "Sword and Shield") return SwordAndShieldAttacks;
    if (weapon === "Dual Blades") return DualBladesAttacks;
    if (weapon === "Great Sword") return GreatSwordAttacks;
    if (weapon === "Long Sword") return LongSwordAttacks;
    if (weapon === "Switch Axe") return SwitchAxeAttacks;
    if (weapon === "Hunting Horn") return HuntingHornAttacks;
    return [];
  }, [override, weapon]);

  const cellCn = cn(
    "text-secondary px-2 py-1.5 text-right first:w-full first:pl-0 first:text-left last:pr-0",
  );

  return (
    <table className="w-full table-auto border-collapse text-xs">
      <thead>
        <tr className="border-primary border-b">
          <th className={cellCn}></th>
          <th className={cellCn}>Hit</th>
          <th className={cellCn}>Crit</th>
          <th className={cellCn}>Avg</th>
        </tr>
      </thead>
      <tbody>
        {attacks.map((a) => {
          const hit = calcHit(a);
          const crit = calcCrit(a);
          const avg = calcAverage(hit, crit);
          return (
            <tr
              className="border-b border-zinc-800 p-1.5 last:border-0"
              key={a.name}
            >
              <td className={cellCn}>{a.name}</td>
              <td className={cn(cellCn, "font-mono")}>{hit}</td>
              <td className={cn(cellCn, "font-mono")}>{!a.cantCrit && crit}</td>
              <td className={cn(cellCn, "text-primary font-mono font-bold")}>
                {avg}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
