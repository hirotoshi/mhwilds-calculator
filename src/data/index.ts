import { Skill } from "./skills";

export const Sharpnesses = [
  "Ranged",
  "Red",
  "Orange",
  "Yellow",
  "Green",
  "Blue",
  "White",
] as const;

export type Sharpness = (typeof Sharpnesses)[number];

// TODO: confirm Wilds values
export const SharpnessRawMultipliers: { [K in Sharpness]: number } = {
  Ranged: 1,
  Red: 0.5,
  Orange: 0.75,
  Yellow: 1,
  Green: 1.05,
  Blue: 1.2,
  White: 1.32,
} as const;

// TODO: confirm Wilds values
export const SharpnessEleMultipliers: { [K in Sharpness]: number } = {
  Ranged: 1,
  Red: 0.25,
  Orange: 0.5,
  Yellow: 0.75,
  Green: 1,
  Blue: 1.0625,
  White: 1.15,
} as const;

export interface IWeapon {
  raw: number;
  element: number;
  affinity: number;
  isRanged?: boolean;
  sharpness?: Sharpness;
}

export type MeleeWeapon = IWeapon & { isRanged: false; sharpness: Sharpness };
export type RangedWeapon = IWeapon & { isRanged: true };
export type Weapon = MeleeWeapon | RangedWeapon;

export type Buff = {
  name: string;
  attack?: number;
  attackMul?: number;
  element?: number;
  elementMul?: number;
  affinity?: number;
  weaknessAffinity?: number;
  woundAffinity?: number;
  criticalBoost?: number;
  criticalElement?: number;
};

export const Buffs: Record<string, Buff> = {
  Powercharm: { name: "Powercharm", attack: 6 },
  MightSeed: { name: "Might Seed", attack: 10 },
  DemonPowder: { name: "Demon Powder", attack: 10 },
  Demondrug: { name: "Demondrug", attack: 5 },
  MegaDemondrug: { name: "Mega Demondrug", attack: 7 },
  OvercameFrenzy: { name: "Overcame Frenzy", affinity: 15 },
};

export const Demondrug: Skill = {
  name: "Demondrug",
  levels: [
    { name: "Demondrug", attack: 5 },
    { name: "Mega Demondrug", attack: 7 },
  ],
};
