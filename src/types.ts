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
export type Weapon = (typeof Weapons)[number];

export type Attack = {
  name?: string;
  mv: number;
  rawMul?: number;
  eleMul?: number;
  fixedEle?: number;
  ignoreHzv?: boolean;
  cantCrit?: boolean;
  ignoreSharpness?: boolean;
};

export const isRanged = (weapon: Weapon) => {
  return (
    weapon === "Light Bowgun" || weapon === "Heavy Bowgun" || weapon === "Bow"
  );
};
