import {
  Buff,
  Sharpness,
  SharpnessEleMultipliers,
  SharpnessRawMultipliers,
} from "@/data";

export const sum = (...args: (number | undefined)[]) => {
  return args.reduce<number>((sum, a) => (a ? sum + a : sum), 0);
};

export const mul = (...args: (number | undefined)[]) => {
  return args.reduce<number>((sum, a) => (a !== undefined ? sum * a : sum), 1);
};

export const calculateUI = (
  base: number,
  multipliers: number[] = [],
  bonuses: number[] = [],
): number => {
  return round(base * mul(...multipliers) + sum(...bonuses));
};

export const calculateAttackUI = (
  base: number,
  buffs: (Buff | undefined)[],
) => {
  return calculateUI(
    base,
    buffs.map((b) => b?.attackMul ?? 1),
    buffs.map((b) => b?.attack ?? 0),
  );
};

export const calculateElementUI = (
  base: number,
  buffs: (Buff | undefined)[],
) => {
  if (base === 0) return 0;
  return calculateUI(
    base,
    buffs.map((b) => b?.elementMul ?? 1),
    buffs.map((b) => b?.element ?? 0),
  );
};

export const calculateAffinityUI = (
  base: number,
  buffs: (Buff | undefined)[],
) => {
  return base + sum(...buffs.map((b) => b?.affinity ?? 0));
};

export const calculateRawHit = (
  uiAttack: number,
  mv: number,
  hzv: number,
  sh: Sharpness,
  multipliers: number[] = [],
) => {
  return mul(
    uiAttack,
    mv / 100,
    hzv / 100,
    SharpnessRawMultipliers[sh],
    ...multipliers,
  );
};

export const calculateElementHit = (
  uiElement: number,
  hzv: number,
  sh: Sharpness,
  multipliers: number[] = [],
) => {
  return mul(
    uiElement,
    0.1,
    hzv / 100,
    SharpnessEleMultipliers[sh],
    ...multipliers,
  );
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
  const e = calculateElementHit(uiElement, eleHzv, sh, eleMultipliers);

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
  const e = calculateElementHit(uiElement, eleHzv, sh, eleMultipliers);

  return round(round(r * rawCritMulti) + round(e * eleCritMulti));
};

export const ceil = (value: number) => {
  return Math.ceil(value * 10) / 10;
};

export const round = (value: number) => {
  return Number((Math.round(value * 10) / 10).toFixed(1));
};
