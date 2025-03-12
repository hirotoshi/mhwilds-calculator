"use client";

import { useMemo, useState } from "react";
import {
  GreatSwordAttacks,
  HuntingHornAttacks,
  SwitchAxeAttacks,
} from "@/data/attacks";
import { useCalcs, useModel } from "@/store";
import { cn } from "@/utils";
import { Button } from "./Button";
import { Card } from "./Card";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./Dialog";
import { NumberInput } from "./NumberInput";
import { Select } from "./Select";

const WeaponOptions = ["Great Sword", "Switch Axe", "Hunting Horn"];

export function MovesDialog() {
  const { rawHzv, setRawHzv, eleHzv, setEleHzv } = useModel();
  const { calcHit, calcCrit, calcAverage } = useCalcs();

  const [weapon, setWeapon] = useState<(typeof WeaponOptions)[number]>(
    WeaponOptions[0],
  );

  const attacks = useMemo(() => {
    if (weapon === "Great Sword") return GreatSwordAttacks;
    if (weapon === "Switch Axe") return SwitchAxeAttacks;
    if (weapon === "Hunting Horn") return HuntingHornAttacks;
    return [];
  }, [weapon]);

  const cellCn = cn(
    "text-secondary p-2 text-right first:w-full first:pl-0 first:text-left last:pr-0",
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Attacks</Button>
      </DialogTrigger>
      <DialogContent>
        <Card className="sm:px-6 sm:py-6">
          <DialogTitle asChild>
            <div>
              <h1>Attacks</h1>
              <p className="text-secondary text-xs">Work in progress.</p>
            </div>
          </DialogTitle>
          <Select
            label="Weapon"
            value={weapon}
            onChangeValue={setWeapon}
            options={WeaponOptions}
          />
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <NumberInput
              label="Hitzone (Raw)"
              value={rawHzv}
              onChangeValue={setRawHzv}
            />
            <NumberInput
              label="Hitzone (Element)"
              value={eleHzv}
              onChangeValue={setEleHzv}
            />
          </div>
          <table className="w-full table-auto border-collapse text-xs">
            <thead>
              <tr className="border-primary border-b">
                <th className={cellCn}>Attack</th>
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
                    <td className={cellCn}>{hit}</td>
                    <td className={cellCn}>{!a.cantCrit && crit}</td>
                    <td className={cn(cellCn, "text-primary font-bold")}>
                      {avg}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
