import {
  Buff,
  BuffValues,
  Sharpness,
  sharpnessEle,
  sharpnessRaw,
} from "@/data";
import { Attack } from "@/types";

export const sum = (...args: (number | undefined)[]) => {
  return args.reduce<number>((sum, a) => (a ? sum + a : sum), 0);
};

export const mul = (...args: (number | undefined)[]) => {
  return args.reduce<number>((sum, a) => (a !== undefined ? sum * a : sum), 1);
};

export const round = (value: number, places = 1) => {
  const p = 10 ** places;
  return Number((Math.round(value * p) / p).toFixed(places));
};

export const calculate = (
  base: number,
  multipliers: number[] = [],
  bonuses: number[] = [],
): number => {
  return round(base * mul(...multipliers) + sum(...bonuses));
};

const get = (k: keyof BuffValues, n: number, b?: BuffValues) => {
  return b ? (b[k] ?? n) : n;
};

const getAttack = (b?: BuffValues) => get("attack", 0, b);
const getAttackMul = (b?: BuffValues) => get("attackMul", 1, b);
const getAffinity = (b?: BuffValues) => get("affinity", 0, b);
const getElement = (b?: BuffValues) => get("element", 0, b);
const getElementMul = (b?: BuffValues) => get("elementMul", 1, b);

export const calculateAttack = ({
  attack,
  buffs = {},
  frenzy,
}: {
  attack: number;
  buffs?: Record<string, Buff>;
  frenzy?: boolean;
}) => {
  return calculate(
    attack,
    Object.values(buffs).map(getAttackMul),
    Object.values(buffs).map((b) => {
      return sum(getAttack(b), frenzy ? getAttack(b.frenzy) : 0);
    }),
  );
};

export const calculateElement = ({
  element,
  buffs = {},
  frenzy,
}: {
  element: number;
  buffs?: Record<string, Buff>;
  frenzy?: boolean;
}) => {
  if (element === 0) return 0;
  return calculate(
    element,
    Object.values(buffs).map((b) => {
      return mul(getElementMul(b), frenzy ? getElementMul(b.frenzy) : 1);
    }),
    Object.values(buffs).map(getElement),
  );
};

export const calculateAffinity = ({
  affinity,
  buffs = {},
  frenzy,
  rawHzv = 0,
  isWound,
}: {
  affinity: number;
  buffs?: Record<string, Buff>;
  frenzy?: boolean;
  rawHzv?: number;
  isWound?: boolean;
}) => {
  const n = sum(
    affinity,
    frenzy ? 15 : 0,
    ...Object.values(buffs).map((b) =>
      sum(
        getAffinity(b),
        frenzy ? getAffinity(b.frenzy) : 0,
        rawHzv >= 45 ? getAffinity(b.weakness) : 0,
        isWound ? getAffinity(b.wound) : 0,
      ),
    ),
  );

  return n > 0 ? Math.min(n, 100) : Math.max(n, -100);
};

type RawHitParams = Attack & {
  uiAttack: number;
  sharpness: Sharpness;
  rawHzv: number;
};
export const calculateRawHit = ({
  uiAttack,
  mv,
  ignoreHzv,
  rawHzv,
  ignoreSharpness,
  sharpness,
  rawMul,
}: RawHitParams) => {
  return mul(
    uiAttack,
    mv / 100,
    ignoreHzv ? 1 : rawHzv / 100,
    ignoreSharpness ? 1 : sharpnessRaw[sharpness],
    rawMul,
  );
};

type EleHitParams = Attack & {
  uiElement: number;
  sharpness: Sharpness;
  eleHzv: number;
};
export const calculateEleHit = ({
  uiElement,
  sharpness,
  eleHzv,
  ignoreSharpness,
  fixedEle,
  eleMul,
}: EleHitParams) => {
  if (fixedEle) return fixedEle * (eleHzv / 100);
  return mul(
    uiElement,
    0.1,
    eleHzv / 100,
    ignoreSharpness ? 1 : sharpnessEle[sharpness],
    eleMul,
  );
};

type HitParams = RawHitParams & EleHitParams;
export const calculateHit = (params: HitParams) => {
  const r = calculateRawHit(params);
  const e = calculateEleHit(params);
  return round(round(r) + round(e));
};

type CritParams = HitParams & {
  critMulti: number;
  eleCritMulti: number;
};
export const calculateCrit = (params: CritParams) => {
  const { critMulti, eleCritMulti } = params;
  const r = calculateRawHit(params);
  const e = calculateEleHit(params);
  return round(round(r * critMulti) + round(e * eleCritMulti));
};

export const calculateAverage = (
  hit: number,
  crit: number,
  affinity: number,
) => {
  const a = Math.abs(affinity) / 100;
  const avg = crit * a + (1 - a) * hit;
  return round(avg, 2);
};
