import { BuffGroup, LocalizedString, Sharpness, Weapon } from "@/types";
import { ArmorSkills, SetSkills, WeaponSkills } from "./skills";
import {
  WeaponNames,
  SharpnessNames,
  WeaponBuffNames,
  BuffNames,
  HornBuffNames
} from "./translations";
import { createLocalizedString } from "@/utils/i18n";

export const Weapons: Weapon[] = [
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
];

export const Sharpnesses: Sharpness[] = [
  "Ranged",
  "Red",
  "Orange",
  "Yellow",
  "Green",
  "Blue",
  "White",
];

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

export const WeaponBuffs: Record<string, BuffGroup> = {
  BowCoating: {
    name: WeaponBuffNames["Coating"],
    weapons: ["Bow"],
    levels: [
      { name: WeaponBuffNames["Power Coating"], coatingRawMul: 1.3 },
      { name: WeaponBuffNames["Close Range Coating"], coatingRawMul: 1.4 },
    ],
  },
  ChargeBladeShieldElement: {
    name: WeaponBuffNames["Shield: Element Boost"],
    weapons: ["Charge Blade"],
    levels: [{ name: WeaponBuffNames["Shield: Element Boost"], cbShieldElement: true }],
  },
  DualBladesDemonBoost: {
    name: WeaponBuffNames["Demon Boost"],
    weapons: ["Dual Blades"],
    levels: [{ name: WeaponBuffNames["Demon Boost"], attackMul: 1.2, demonBoost: true }],
  },
  HornSelfImprovement: {
    name: WeaponBuffNames["Self-Improvement"],
    weapons: ["Hunting Horn"],
    levels: [{ name: WeaponBuffNames["Self-Improvement"], attackMul: 1.2 }],
  },
  KinsectExtracts: {
    name: WeaponBuffNames["Extracts"],
    weapons: ["Insect Glaive"],
    levels: [
      { name: WeaponBuffNames["Red + White"], attackMul: 1.1 },
      { name: WeaponBuffNames["Red + White + Yellow"], attackMul: 1.15 },
    ],
  },
  SpiritGauge: {
    name: WeaponBuffNames["Spirit Gauge"],
    weapons: ["Long Sword"],
    levels: [
      { name: WeaponBuffNames["White"], attackMul: 1.025 },
      { name: WeaponBuffNames["Yellow"], attackMul: 1.05 },
      { name: WeaponBuffNames["Red"], attackMul: 1.1 },
    ],
  },
  SwitchAxePhial: {
    name: WeaponBuffNames["Phial Type"],
    weapons: ["Switch Axe"],
    levels: [
      { name: WeaponBuffNames["Power Phial"], saPhial: "Power" },
      { name: WeaponBuffNames["Element Phial"], saPhial: "Element" },
    ],
  },
  SwitchAxePowerAxe: {
    name: WeaponBuffNames["Power Axe"],
    weapons: ["Switch Axe"],
    levels: [{ name: WeaponBuffNames["Power Axe"], powerAxe: true }],
  },
};

export const Buffs: Record<string, BuffGroup> = {
  Frenzy: {
    name: BuffNames["Overcame Frenzy"],
    levels: [{ name: BuffNames["Overcame Frenzy"], affinity: 15 }],
  },
  Powercharm: {
    name: BuffNames["Powercharm"],
    levels: [{ name: BuffNames["Powercharm"], attack: 6 }],
  },
  DemonPowder: {
    name: BuffNames["Demon Powder"],
    levels: [{ name: BuffNames["Demon Powder"], attack: 10 }],
  },
};

export const FieldBuffs: Record<string, BuffGroup> = {
  Food: {
    name: BuffNames["Food"],
    levels: [
      { name: BuffNames["Attack +2"], attack: 2 },
      { name: BuffNames["Attack +5"], attack: 5 },
    ],
  },
  Demondrug: {
    name: BuffNames["Demondrug"],
    levels: [
      { name: BuffNames["Demondrug"], attack: 5 },
      { name: BuffNames["Mega Demondrug"], attack: 7 },
    ],
  },
  MightSeedPill: {
    name: BuffNames["Might Seed / Pill"],
    levels: [
      { name: BuffNames["Might Seed"], attack: 10 },
      { name: BuffNames["Might Pill"], attack: 25 },
    ],
  },
  CorruptedMantle: {
    name: BuffNames["Corrupted Mantle"],
    levels: [
      { name: BuffNames["Stage 1"], affinity: 10 },
      { name: BuffNames["Stage 2"], attackMul: 1.1, affinity: 30 },
    ],
  },
};

export const HuntingHornBuffs: Record<string, BuffGroup> = {
  HornAttackUp: {
    name: HornBuffNames["Attack Up"],
    levels: [
      { name: HornBuffNames["Attack Up (S)"], attackMul: 1.05 },
      { name: HornBuffNames["Attack Up (L)"], attackMul: 1.1 },
    ],
  },
  HornElementUp: {
    name: HornBuffNames["Elem Attack Boost"],
    levels: [{ name: HornBuffNames["Elem Attack Up"], elementMul: 1.1 }],
  },
  HornAffinityUp: {
    name: HornBuffNames["Affinity Up"],
    levels: [{ name: HornBuffNames["Affinity Up"], affinity: 15 }],
  },
  HornEchoBubble: {
    name: HornBuffNames["Echo Bubble"],
    levels: [{ name: HornBuffNames["Attack & Affinity Up"], attackMul: 1.1, affinity: 25 }],
  },
};

// TODO: make TypeScript complain if two buffs share a key
export const CombinedBuffs: Record<string, BuffGroup> = {
  ...Buffs,
  ...WeaponBuffs,
  ...WeaponSkills,
  ...ArmorSkills,
  ...SetSkills,
  ...FieldBuffs,
  ...HuntingHornBuffs,
};
