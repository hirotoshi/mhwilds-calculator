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
export const sharpnessRaw: { [K in Sharpness]: number } = {
  Ranged: 1,
  Red: 0.5,
  Orange: 0.75,
  Yellow: 1,
  Green: 1.05,
  Blue: 1.2,
  White: 1.32,
} as const;

// TODO: confirm Wilds values
export const sharpnessEle: { [K in Sharpness]: number } = {
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

export type BuffNumbers = {
  attack?: number;
  attackMul?: number;
  affinity?: number;
  element?: number;
  elementMul?: number;
};

export type Buff = BuffNumbers & {
  name: string;
  criticalBoost?: number;
  criticalElement?: number;
  frenzy?: BuffNumbers;
  weakness?: BuffNumbers;
  wound?: BuffNumbers;
};

export type BuffGroup = {
  name: string;
  description?: string;
  levels: Buff[];
};

export const Buffs: Record<string, Buff> = {
  Powercharm: { name: "Powercharm", attack: 6 },
  MightSeed: { name: "Might Seed", attack: 10 },
  DemonPowder: { name: "Demon Powder", attack: 10 },
  Demondrug: { name: "Demondrug", attack: 5 },
  MegaDemondrug: { name: "Mega Demondrug", attack: 7 },
  Frenzy: { name: "Frenzy", frenzy: { affinity: 15 } },
};

export const Demondrug: BuffGroup = {
  name: "Demondrug",
  levels: [
    { name: "Demondrug", attack: 5 },
    { name: "Mega Demondrug", attack: 7 },
  ],
};

export const FieldBuffs: Record<string, BuffGroup> = {
  Food: {
    name: "Food",
    levels: [
      { name: "Attack +2", attack: 2 },
      { name: "Attack +5", attack: 5 },
    ],
  },
  Demondrug: {
    name: "Demondrug",
    levels: [
      { name: "Demondrug", attack: 5 },
      { name: "Mega Demondrug", attack: 7 },
    ],
  },
};
