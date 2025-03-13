import { Buff, BuffGroup, Sharpness } from "@/types";
import { ArmorSkills, SetSkills, WeaponSkills } from "./skills";

export const Weapons = [
  "Sword and Shield",
  "Dual Blades",
  "Great Sword",
  "Long Sword",
  "Hammer",
  "Hunting Horn",
  "Lance",
  "Gunlance",
  "Switch Axe",
  "Charge Blade",
  "Insect Glaive",
  "Light Bowgun",
  "Heavy Bowgun",
  "Bow",
] as const;

export const Sharpnesses = [
  "Bowgun",
  "Bow",
  "Red",
  "Orange",
  "Yellow",
  "Green",
  "Blue",
  "White",
] as const;

export const sharpnessRaw: { [K in Sharpness]: number } = {
  Bowgun: 1,
  Bow: 1.1,
  Red: 0.5,
  Orange: 0.75,
  Yellow: 1,
  Green: 1.05,
  Blue: 1.2,
  White: 1.32,
} as const;

export const sharpnessEle: { [K in Sharpness]: number } = {
  Bowgun: 1,
  Bow: 1,
  Red: 0.25,
  Orange: 0.5,
  Yellow: 0.75,
  Green: 1,
  Blue: 1.0625,
  White: 1.15,
} as const;

export const WeaponBuffs: Record<string, BuffGroup> = {
  SelfImprovement: {
    name: "Self-Improvement",
    weapons: ["Hunting Horn"],
    levels: [{ name: "Self-Improvement", attackMul: 1.2 }],
  },
  BowCoating: {
    name: "Coating",
    weapons: ["Bow"],
    levels: [
      { name: "Power Coating", coatingRawMul: 1.3 },
      { name: "Close Range Coating", coatingRawMul: 1.4 },
    ],
  },
  SwitchAxePhial: {
    name: "Phial Type",
    weapons: ["Switch Axe"],
    levels: [
      { name: "Power Phial", saPowerPhial: true },
      { name: "Element Phial", saElementPhial: true },
    ],
  },
  SpiritGauge: {
    name: "Spirit Gauge",
    weapons: ["Long Sword"],
    levels: [
      { name: "White", attackMul: 1.025 },
      { name: "Yellow", attackMul: 1.05 },
      { name: "Red", attackMul: 1.1 },
    ],
  },
};

export const Buffs: Record<string, BuffGroup> = {
  Powercharm: {
    name: "Powercharm",
    levels: [{ name: "Powercharm", attack: 6 }],
  },
  MightSeed: {
    name: "Might Seed",
    levels: [{ name: "Might Seed", attack: 10 }],
  },
  DemonPowder: {
    name: "Demon Powder",
    levels: [{ name: "Demon Powder", attack: 10 }],
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
  ...WeaponBuffs,
  ...WeaponSkills,
  ...ArmorSkills,
  ...SetSkills,
  ...FieldBuffs,
} satisfies Record<string, BuffGroup | Buff>;
