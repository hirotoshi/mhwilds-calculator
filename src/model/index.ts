import { Buff, Sharpness, sharpnessEle, sharpnessRaw } from "@/data";

export const sum = (...args: (number | undefined)[]) => {
  return args.reduce<number>((sum, a) => (a ? sum + a : sum), 0);
};

export const mul = (...args: (number | undefined)[]) => {
  return args.reduce<number>((sum, a) => (a !== undefined ? sum * a : sum), 1);
};

export const calculate = (
  base: number,
  multipliers: number[] = [],
  bonuses: number[] = [],
): number => {
  return round(base * mul(...multipliers) + sum(...bonuses));
};

export const calculateAttack = (
  base: number,
  buffs: (Buff | undefined)[] = [],
  frenzy?: boolean,
) => {
  return calculate(
    base,
    buffs.map((b) => b?.attackMul ?? 1),
    buffs.map((b) => sum(b?.attack, frenzy ? b?.frenzy?.attack : 0)),
  );
};

export const calculateElement = (
  base?: number,
  buffs: (Buff | undefined)[] = [],
  frenzy?: boolean,
) => {
  if (!base) return 0;
  return calculate(
    base,
    buffs.map((b) =>
      mul(b?.elementMul ?? 1, frenzy ? b?.frenzy?.elementMul : 1),
    ),
    buffs.map((b) => b?.element ?? 0),
  );
};

export const calculateAffinity = (
  base: number,
  buffs: (Buff | undefined)[],
  frenzy?: boolean,
  weakness?: boolean,
  wound?: boolean,
) => {
  console.log(buffs);
  return (
    base +
    sum(
      ...buffs.map((b) =>
        sum(
          b?.affinity,
          frenzy ? b?.frenzy?.affinity : 0,
          weakness ? b?.weakness?.affinity : 0,
          wound ? b?.wound?.affinity : 0,
        ),
      ),
    )
  );
};

export const calculateRawHit = (
  uiAttack: number,
  mv: number,
  hzv: number,
  sh: Sharpness,
  multipliers: number[] = [],
) => {
  return mul(uiAttack, mv / 100, hzv / 100, sharpnessRaw[sh], ...multipliers);
};

export const calculateEleHit = (
  uiElement: number,
  hzv: number,
  sh: Sharpness,
  multipliers: number[] = [],
) => {
  return mul(uiElement, 0.1, hzv / 100, sharpnessEle[sh], ...multipliers);
};

export const calculateHit = (
  uiAttack: number,
  uiElement: number,
  mv: number,
  rawHzv: number,
  eleHzv: number,
  sh: Sharpness,
  rawMultipliers: number[] = [],
  eleMultipliers: number[] = [],
) => {
  const r = calculateRawHit(uiAttack, mv, rawHzv, sh, rawMultipliers);
  const e = calculateEleHit(uiElement, eleHzv, sh, eleMultipliers);

  return round(round(r) + round(e));
};

export const calculateCrit = (
  uiAttack: number,
  uiElement: number,
  mv: number,
  rawHzv: number,
  eleHzv: number,
  sh: Sharpness,
  rawCritMulti: number,
  eleCritMulti: number,
  rawMultipliers: number[] = [],
  eleMultipliers: number[] = [],
) => {
  const r = calculateRawHit(uiAttack, mv, rawHzv, sh, rawMultipliers);
  const e = calculateEleHit(uiElement, eleHzv, sh, eleMultipliers);

  return round(round(r * rawCritMulti) + round(e * eleCritMulti));
};

export const ceil = (value: number) => {
  return Math.ceil(value * 10) / 10;
};

export const round = (value: number) => {
  return Number((Math.round(value * 10) / 10).toFixed(1));
};
