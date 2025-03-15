import { Sharpnesses, Weapons } from "@/data";

export type Weapon = (typeof Weapons)[number];
export type Sharpness = (typeof Sharpnesses)[number];

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
  saPhial?: "Power" | "Element";
  powerAxe?: boolean;
  meleeChargeEleMul?: number;
  rangedChargeEleMul?: number;
  coatingRawMul?: number;
  artilleryBaseMul?: number; // base attack multiplier
  artilleryEle?: number; // bonus fixed fire damage
};

export type BuffGroup = {
  name: string;
  description?: string;
  weapons?: Weapon[];
  levels: Buff[];
};

export type WeaponFlags = {
  saPowerPhial?: boolean;
  saElementPhial?: boolean;
};

export type Attack = {
  name?: string;
  mv: number;
  rawMul?: number;
  eleMul?: number;
  fixedEle?: number;
  eleHzvCap?: number;
  rawEle?: number;
  ignoreHzv?: boolean; // only applies to raw hitzone
  cantCrit?: boolean;
  ignoreSharpness?: boolean;
  axe?: boolean; // Switch Axe Axe Mode
  saType?: "Sword" | "Axe"; // Switch Axe Sword Mode
  charge?: boolean; // Charge Master
  total?: boolean;
  hits?: number;
  shelling?: boolean;
};

export const isRanged = (weapon: Weapon) => {
  return (
    weapon === "Light Bowgun" || weapon === "Heavy Bowgun" || weapon === "Bow"
  );
};

export const isBowgun = (weapon: Weapon) => {
  return weapon === "Light Bowgun" || weapon === "Heavy Bowgun";
};
