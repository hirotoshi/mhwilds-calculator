"use client";

import { useMemo } from "react";
import Attacks from "@/data/attacks";
import { useCalcs, useModel } from "@/store";
import { Attack } from "@/types";
import { cn } from "@/utils";
import { NumberDisplay } from "./NumberDisplay";
import { formatNumber, getLocalizedString } from "@/utils/i18n";
import { useLocaleContext } from "@/contexts/LocaleContext";
import { AttackNames } from "@/data/translations";

export function MovesTable({ custom }: { custom?: Attack[] }) {
  const { weapon } = useModel();
  const { calcHit, calcCrit, calcAverage } = useCalcs();
  const { locale } = useLocaleContext();

  const attacks: Attack[] = useMemo(() => {
    if (custom) return custom;
    return Attacks[weapon];
  }, [custom, weapon]);

  // 攻撃名を翻訳する関数
  const getLocalizedAttackName = (attackName: string): string => {
    if (AttackNames[attackName]) {
      return getLocalizedString(AttackNames[attackName], locale);
    }
    return attackName;
  };

  if (custom && attacks.length === 1)
    return (
      <div>
        <NumberDisplay label={locale === 'ja' ? 'ヒット' : 'Hit'} value={calcHit(attacks[0])} />
        <NumberDisplay label={locale === 'ja' ? '会心' : 'Crit'} value={calcCrit(attacks[0])} />
        <NumberDisplay
          className="font-bold"
          label={locale === 'ja' ? '平均' : 'Average'}
          value={calcAverage(attacks[0])}
        />
      </div>
    );

  const cellCn = cn(
    "text-secondary px-2 py-1.5 text-right first:w-full first:pl-0 first:text-left last:pr-0",
  );

  return (
    <table className="w-full table-auto border-collapse text-xs">
      <thead>
        <tr className="border-primary border-b">
          <th className={cellCn}></th>
          <th className={cellCn}></th>
          <th className={cellCn}>{locale === 'ja' ? 'ヒット' : 'Hit'}</th>
          <th className={cellCn}>{locale === 'ja' ? '会心' : 'Crit'}</th>
          <th className={cellCn}>{locale === 'ja' ? '平均' : 'Avg'}</th>
        </tr>
      </thead>
      <tbody>
        {attacks.map((a) => {
          const hit = calcHit(a);
          const crit = calcCrit(a);
          const avg = calcAverage(a);
          return (
            <tr
              className="border-b border-zinc-800 p-1.5 last:border-0"
              key={a.name}
            >
              <td className={cellCn}>{a.name ? getLocalizedAttackName(a.name) : ""}</td>
              <td className={cn(cellCn, "font-mono")}>
                {a.hits && `${a.hits}x`}
              </td>
              <td className={cn(cellCn, "font-mono")}>{formatNumber(hit, locale)}</td>
              <td className={cn(cellCn, "font-mono")}>{!a.cantCrit && formatNumber(crit, locale)}</td>
              <td className={cn(cellCn, "text-primary font-mono font-bold")}>
                {formatNumber(avg, locale)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
