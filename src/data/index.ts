import { Weapon } from "@/types";
import { ArmorSkills, SetSkills, WeaponSkills } from "./skills";

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

export const sharpnessRaw: { [K in Sharpness]: number } = {
  Ranged: 1,
  Red: 0.5,
  Orange: 0.75,
  Yellow: 1,
  Green: 1.05,
  Blue: 1.2,
  White: 1.32,
} as const;

export const sharpnessEle: { [K in Sharpness]: number } = {
  Ranged: 1,
  Red: 0.25,
  Orange: 0.5,
  Yellow: 0.75,
  Green: 1,
  Blue: 1.0625,
  White: 1.15,
} as const;

export type BuffValues = {
  attack?: number;
  attackMul?: number;
  affinity?: number;
  element?: number;
  elementMul?: number;
};

export type Buff = BuffValues & {
  name?: string;
  criticalBoost?: number;
  criticalElement?: number;
  frenzy?: BuffValues;
  weakness?: BuffValues;
  wound?: BuffValues;
};

export type BuffGroup = {
  name: string;
  description?: string;
  weapons?: Weapon[];
  levels: Buff[];
};

export const Buffs: Record<string, Buff> = {
  Powercharm: { name: "Powercharm", attack: 6 },
  MightSeed: { name: "Might Seed", attack: 10 },
  DemonPowder: { name: "Demon Powder", attack: 10 },
  SelfImprovement: {
    name: "Self-Improvement (HH)",
    attackMul: 1.2,
    // weapons: ["Hunting Horn"],
  },
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
  CorruptedMantle: {
    name: "Corrupted Mantle",
    levels: [
      { name: "Stage 1", affinity: 10 },
      { name: "Stage 2", attackMul: 1.1, affinity: 30 },
    ],
  },
  HuntingHorn: {
    name: "Hunting Horn",
    levels: [
      { name: "Attack Up (S)", attackMul: 1.05 },
      { name: "Attack Up (L)", attackMul: 1.1 },
    ],
  },
};

// make TypeScript complain if two buffs share a key
export const CombinedBuffs = {
  Miscellaneous: { name: "Miscellaneous" },
  ...Buffs,
  ...WeaponSkills,
  ...ArmorSkills,
  ...SetSkills,
  ...FieldBuffs,
} satisfies Record<string, BuffGroup | Buff>;
