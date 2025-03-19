import { Sharpnesses, Weapons } from "@/data";
import { InitialStore, useGetters } from "./store";

export type Weapon =
  | "Sword and Shield"
  | "Dual Blades"
  | "Great Sword"
  | "Long Sword"
  | "Hammer"
  | "Hunting Horn"
  | "Lance"
  | "Gunlance"
  | "Switch Axe"
  | "Charge Blade"
  | "Insect Glaive"
  | "Light Bowgun"
  | "Heavy Bowgun"
  | "Bow";

export type Sharpness = "Ranged" | "Red" | "Orange" | "Yellow" | "Green" | "Blue" | "White";

export type BuffValues = {
  attack?: number;
  attackMul?: number;
  affinity?: number;
  element?: number;
  elementMul?: number;
};

export type LocalizedString = {
  en: string;
  ja: string;
};

export type Buff = BuffValues & {
  name?: string | LocalizedString;
  criticalBoost?: number;
  criticalElement?: number;
  frenzy?: BuffValues;
  weakness?: BuffValues;
  wound?: BuffValues;
  cbShieldElement?: boolean;
  saPhial?: "Power" | "Element";
  powerAxe?: boolean;
  meleeChargeEleMul?: number;
  rangedChargeEleMul?: number;
  coatingRawMul?: number;
  artilleryBaseMul?: number; // base attack multiplier
  artilleryEle?: number; // bonus fixed fire damage
  normalShotsRawMul?: number;
  piercingShotsRawMul?: number;
  spreadPowerShotsRawMul?: number;
  specialAmmoBoostRawMul?: number;
  stickyBaseMul?: number;
  demonBoost?: boolean;
  coalEleMul?: number;
  tetradEleMul?: number;
  openingShotEleMul?: number;
  offsetAttack?: number;
};

export type BuffLevel = {
  name: LocalizedString;
  attack?: number;
  element?: number;
  elementMul?: number;
  attackMul?: number;
  affinity?: number;
  criticalBoost?: number;
  criticalElement?: number;
  normalShotsRawMul?: number;
  piercingShotsRawMul?: number;
  spreadPowerShotsRawMul?: number;
  specialAmmoBoostRawMul?: number;
  coatingRawMul?: number;
  cbShieldElement?: boolean;
  demonBoost?: boolean;
  powerAxe?: boolean;
  saPhial?: "Power" | "Element";
  frenzy?: { affinity: number };
  weakness?: { affinity: number };
  wound?: { affinity: number };
  offsetAttack?: number;
  openingShotEleMul?: number;
  tetradEleMul?: number;
  coalEleMul?: number;
  meleeChargeEleMul?: number;
  rangedChargeEleMul?: number;
  artilleryEle?: number;
  artilleryBaseMul?: number;
  stickyBaseMul?: number;
};

export type BuffGroup = {
  name: LocalizedString;
  weapons?: Weapon[];
  levels: BuffLevel[];
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
  cbAxe?: boolean;
  cbPhial?: boolean;
  saType?: "Sword" | "Axe"; // Switch Axe mode
  charge?: boolean; // Charge Master
  ignoreCoating?: boolean; // ignore Bow Coating
  total?: boolean;
  hits?: number;
  shelling?: boolean;
  normalShot?: boolean;
  piercingShot?: boolean;
  spreadPowerShot?: boolean;
  specialAmmo?: boolean;
  stickyAmmo?: boolean;
  airborne?: boolean; // TODO
};

export type ComputedStore = InitialStore & ReturnType<typeof useGetters>;

export const isRanged = (weapon?: Weapon) => {
  return (
    weapon === "Light Bowgun" || weapon === "Heavy Bowgun" || weapon === "Bow"
  );
};

export const isBowgun = (weapon?: Weapon) => {
  return weapon === "Light Bowgun" || weapon === "Heavy Bowgun";
};
