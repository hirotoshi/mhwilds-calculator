import type { BuffGroup, Weapon } from "@/types";
import { WeaponNames, SkillNames } from "./translations";

const DBGroup: Weapon[] = ["Dual Blades"];
const BowGroup: Weapon[] = ["Bow"];
const LightGroup: Weapon[] = ["Dual Blades", "Bow"];
const HeavyGroup: Weapon[] = ["Great Sword", "Hunting Horn"];
const BowgunGroup: Weapon[] = ["Light Bowgun", "Heavy Bowgun"];
const OthersGroup: Weapon[] = [
  "Sword and Shield",
  "Long Sword",
  "Hammer",
  "Switch Axe",
  "Charge Blade",
  "Insect Glaive",
  "Lance",
  "Gunlance",
];

export const WeaponSkills: Record<string, BuffGroup> = {
  AttackBoost: {
    name: SkillNames["Attack Boost"],
    levels: [
      { name: SkillNames["Attack Boost 1"], attack: 3 },
      { name: SkillNames["Attack Boost 2"], attack: 5 },
      { name: SkillNames["Attack Boost 3"], attack: 7 },
      { name: SkillNames["Attack Boost 4"], attack: 8, attackMul: 1.02 },
      { name: SkillNames["Attack Boost 5"], attack: 9, attackMul: 1.04 },
    ],
  },
  ChargeMaster: {
    name: SkillNames["Charge Master"],
    levels: [
      {
        name: SkillNames["Charge Master 1"],
        meleeChargeEleMul: 1.15,
        rangedChargeEleMul: 1.05,
      },
      {
        name: SkillNames["Charge Master 2"],
        meleeChargeEleMul: 1.2,
        rangedChargeEleMul: 1.1,
      },
      {
        name: SkillNames["Charge Master 3"],
        meleeChargeEleMul: 1.25,
        rangedChargeEleMul: 1.15,
      },
    ],
  },
  Artillery: {
    name: SkillNames["Artillery"],
    levels: [
      {
        name: SkillNames["Artillery 1"],
        artilleryEle: 3,
        artilleryBaseMul: 0.05,
        stickyBaseMul: 0.1,
      },
      {
        name: SkillNames["Artillery 2"],
        artilleryEle: 6,
        artilleryBaseMul: 0.1,
        stickyBaseMul: 0.2,
      },
      {
        name: SkillNames["Artillery 3"],
        artilleryEle: 9,
        artilleryBaseMul: 0.15,
        stickyBaseMul: 0.3,
      },
    ],
  },
  CriticalBoost: {
    name: SkillNames["Critical Boost"],
    levels: [
      { name: SkillNames["Critical Boost 1"], criticalBoost: 1.28 },
      { name: SkillNames["Critical Boost 2"], criticalBoost: 1.31 },
      { name: SkillNames["Critical Boost 3"], criticalBoost: 1.34 },
      { name: SkillNames["Critical Boost 4"], criticalBoost: 1.37 },
      { name: SkillNames["Critical Boost 5"], criticalBoost: 1.4 },
    ],
  },
  CriticalElement: {
    name: SkillNames["Critical Element"],
    levels: [
      { name: SkillNames["Critical Element 1"], criticalElement: 1.07 },
      { name: SkillNames["Critical Element 2"], criticalElement: 1.14 },
      { name: SkillNames["Critical Element 3"], criticalElement: 1.21 },
    ],
  },
  CriticalEye: {
    name: SkillNames["Critical Eye"],
    levels: [
      { name: SkillNames["Critical Eye 1"], affinity: 4 },
      { name: SkillNames["Critical Eye 2"], affinity: 8 },
      { name: SkillNames["Critical Eye 3"], affinity: 12 },
      { name: SkillNames["Critical Eye 4"], affinity: 16 },
      { name: SkillNames["Critical Eye 5"], affinity: 20 },
    ],
  },
  ElementAttack: {
    name: SkillNames["Element Attack"],
    levels: [
      { name: SkillNames["Element Attack 1"], element: 40 },
      { name: SkillNames["Element Attack 2"], element: 50, elementMul: 1.1 },
      { name: SkillNames["Element Attack 3"], element: 60, elementMul: 1.2 },
    ],
  },
  NormalShots: {
    name: SkillNames["Normal Shots"],
    levels: [{ name: SkillNames["Normal Shots 1"], normalShotsRawMul: 1.05 }],
  },
  OffensiveGuard: {
    name: SkillNames["Offensive Guard"],
    levels: [
      { name: SkillNames["Offensive Guard 1"], attackMul: 1.05 },
      { name: SkillNames["Offensive Guard 2"], attackMul: 1.1 },
      { name: SkillNames["Offensive Guard 3"], attackMul: 1.15 },
    ],
  },
  OpeningShot: {
    name: SkillNames["Opening Shot"],
    levels: [
      {
        name: SkillNames["Opening Shot 1"],
        attack: 5,
        offsetAttack: 5,
        openingShotEleMul: 1.1,
      },
      {
        name: SkillNames["Opening Shot 2"],
        attack: 10,
        offsetAttack: 10,
        openingShotEleMul: 1.1,
      },
      {
        name: SkillNames["Opening Shot 3"],
        attack: 15,
        offsetAttack: 15,
        openingShotEleMul: 1.1,
      },
    ],
  },
  PiercingShots: {
    name: SkillNames["Piercing Shots"],
    levels: [{ name: SkillNames["Piercing Shots 1"], piercingShotsRawMul: 1.05 }],
  },
  SpecialAmmoBoost: {
    name: SkillNames["Special Ammo Boost"],
    levels: [
      { name: SkillNames["Special Ammo Boost 1"], specialAmmoBoostRawMul: 1.1 },
      { name: SkillNames["Special Ammo Boost 2"], specialAmmoBoostRawMul: 1.2 },
    ],
  },
  SpreadPowerShots: {
    name: SkillNames["Spread/Power Shots"],
    levels: [{ name: SkillNames["Spread/Power Shots 1"], spreadPowerShotsRawMul: 1.05 }],
  },
  TetradShot: {
    name: SkillNames["Tetrad Shot"],
    levels: [
      { name: SkillNames["Tetrad Shot 1"], affinity: 8 },
      {
        name: SkillNames["Tetrad Shot 1 Attack"],
        affinity: 8,
        attack: 3,
        offsetAttack: 3,
        elementMul: 1.05,
        tetradEleMul: 1.05,
      },
      { name: SkillNames["Tetrad Shot 2"], affinity: 10 },
      {
        name: SkillNames["Tetrad Shot 2 Attack"],
        affinity: 10,
        attack: 6,
        offsetAttack: 6,
        elementMul: 1.05,
        tetradEleMul: 1.05,
      },
      { name: SkillNames["Tetrad Shot 3"], affinity: 12 },
      {
        name: SkillNames["Tetrad Shot 3 Attack"],
        affinity: 12,
        attack: 10,
        offsetAttack: 10,
        elementMul: 1.05,
        tetradEleMul: 1.05,
      },
    ],
  },
};

export const ArmorSkills: Record<string, BuffGroup> = {
  AdrenalineRush: {
    name: SkillNames["Adrenaline Rush"],
    levels: [
      { name: SkillNames["Adrenaline Rush 1"], attack: 10 },
      { name: SkillNames["Adrenaline Rush 2"], attack: 15 },
      { name: SkillNames["Adrenaline Rush 3"], attack: 20 },
      { name: SkillNames["Adrenaline Rush 4"], attack: 25 },
      { name: SkillNames["Adrenaline Rush 5"], attack: 30 },
    ],
  },
  Agitator: {
    name: SkillNames["Agitator"],
    levels: [
      { name: SkillNames["Agitator 1"], attack: 4, affinity: 3 },
      { name: SkillNames["Agitator 2"], attack: 8, affinity: 5 },
      { name: SkillNames["Agitator 3"], attack: 12, affinity: 7 },
      { name: SkillNames["Agitator 4"], attack: 16, affinity: 10 },
      { name: SkillNames["Agitator 5"], attack: 20, affinity: 15 },
    ],
  },
  Ambush: {
    name: SkillNames["Ambush"],
    levels: [
      { name: SkillNames["Ambush 1"], attackMul: 1.05 },
      { name: SkillNames["Ambush 2"], attackMul: 1.1 },
      { name: SkillNames["Ambush 3"], attackMul: 1.15 },
    ],
  },
  Antivirus: {
    name: SkillNames["Antivirus"],
    levels: [
      { name: SkillNames["Antivirus 1"], frenzy: { affinity: 3 } },
      { name: SkillNames["Antivirus 2"], frenzy: { affinity: 6 } },
      { name: SkillNames["Antivirus 3"], frenzy: { affinity: 10 } },
    ],
  },
  BurstDB: {
    name: SkillNames["Burst"],
    weapons: DBGroup,
    levels: [
      { name: SkillNames["Burst 1"], attack: 8, element: 40 },
      { name: SkillNames["Burst 2"], attack: 10, element: 60 },
      { name: SkillNames["Burst 3"], attack: 12, element: 80 },
      { name: SkillNames["Burst 4"], attack: 15, element: 100 },
      { name: SkillNames["Burst 5"], attack: 18, element: 120 },
    ],
  },
  BurstBow: {
    name: SkillNames["Burst"],
    weapons: BowGroup,
    levels: [
      { name: SkillNames["Burst 1"], attack: 6, element: 40 },
      { name: SkillNames["Burst 2"], attack: 7, element: 60 },
      { name: SkillNames["Burst 3"], attack: 8, element: 80 },
      { name: SkillNames["Burst 4"], attack: 9, element: 100 },
      { name: SkillNames["Burst 5"], attack: 10, element: 120 },
    ],
  },
  BurstBowgun: {
    name: SkillNames["Burst"],
    weapons: BowgunGroup,
    levels: [
      { name: SkillNames["Burst 1"], attack: 6 },
      { name: SkillNames["Burst 2"], attack: 7 },
      { name: SkillNames["Burst 3"], attack: 8 },
      { name: SkillNames["Burst 4"], attack: 9 },
      { name: SkillNames["Burst 5"], attack: 10 },
    ],
  },
  BurstHeavy: {
    name: SkillNames["Burst"],
    weapons: HeavyGroup,
    levels: [
      { name: SkillNames["Burst 1"], attack: 10, element: 80 },
      { name: SkillNames["Burst 2"], attack: 12, element: 100 },
      { name: SkillNames["Burst 3"], attack: 14, element: 120 },
      { name: SkillNames["Burst 4"], attack: 16, element: 160 },
      { name: SkillNames["Burst 5"], attack: 18, element: 200 },
    ],
  },
  BurstOthers: {
    name: SkillNames["Burst"],
    weapons: OthersGroup,
    levels: [
      { name: SkillNames["Burst 1"], attack: 8, element: 60 },
      { name: SkillNames["Burst 2"], attack: 10, element: 80 },
      { name: SkillNames["Burst 3"], attack: 12, element: 100 },
      { name: SkillNames["Burst 4"], attack: 15, element: 120 },
      { name: SkillNames["Burst 5"], attack: 18, element: 140 },
    ],
  },
  Coalescence: {
    name: SkillNames["Coalescence"],
    levels: [
      { name: SkillNames["Coalescence 1"], elementMul: 1.05, coalEleMul: 1.1 },
      { name: SkillNames["Coalescence 2"], elementMul: 1.1, coalEleMul: 1.2 },
      { name: SkillNames["Coalescence 3"], elementMul: 1.15, coalEleMul: 1.3 },
    ],
  },
  ConvertElement: {
    name: SkillNames["Convert Element"],
    levels: [
      { name: SkillNames["Convert Element 1"], element: 80 },
      { name: SkillNames["Convert Element 2"], element: 120 },
      { name: SkillNames["Convert Element 3"], element: 180 },
    ],
  },
  Counterstrike: {
    name: SkillNames["Counterstrike"],
    levels: [
      { name: SkillNames["Counterstrike 1"], attack: 10 },
      { name: SkillNames["Counterstrike 2"], attack: 15 },
      { name: SkillNames["Counterstrike 3"], attack: 25 },
    ],
  },
  ElementalAbsorptionLight: {
    name: SkillNames["Elemental Absorption"],
    weapons: LightGroup,
    levels: [
      { name: SkillNames["Elemental Absorption 1"], element: 30 },
      { name: SkillNames["Elemental Absorption 1+"], element: 40 },
      { name: SkillNames["Elemental Absorption 1++"], element: 50 },
      { name: SkillNames["Elemental Absorption 2"], element: 40 },
      { name: SkillNames["Elemental Absorption 2+"], element: 50 },
      { name: SkillNames["Elemental Absorption 2++"], element: 60 },
      { name: SkillNames["Elemental Absorption 3"], element: 50 },
      { name: SkillNames["Elemental Absorption 3+"], element: 60 },
      { name: SkillNames["Elemental Absorption 3++"], element: 70 },
    ],
  },
  ElementalAbsorptionHeavy: {
    name: SkillNames["Elemental Absorption"],
    weapons: HeavyGroup,
    levels: [
      { name: SkillNames["Elemental Absorption 1"], element: 50 },
      { name: SkillNames["Elemental Absorption 1+"], element: 60 },
      { name: SkillNames["Elemental Absorption 1++"], element: 70 },
      { name: SkillNames["Elemental Absorption 2"], element: 80 },
      { name: SkillNames["Elemental Absorption 2+"], element: 90 },
      { name: SkillNames["Elemental Absorption 2++"], element: 100 },
      { name: SkillNames["Elemental Absorption 3"], element: 100 },
      { name: SkillNames["Elemental Absorption 3+"], element: 110 },
      { name: SkillNames["Elemental Absorption 3++"], element: 120 },
    ],
  },
  ElementalAbsorptionBowgun: {
    name: SkillNames["Elemental Absorption"],
    weapons: BowgunGroup,
    levels: [
      { name: SkillNames["Elemental Absorption 1"] },
      { name: SkillNames["Elemental Absorption 1+"], element: 40 },
      { name: SkillNames["Elemental Absorption 1++"], element: 50 },
      { name: SkillNames["Elemental Absorption 2"], element: 40 },
      { name: SkillNames["Elemental Absorption 2+"], element: 50 },
      { name: SkillNames["Elemental Absorption 2++"], element: 60 },
      { name: SkillNames["Elemental Absorption 3"], element: 50 },
      { name: SkillNames["Elemental Absorption 3+"], element: 60 },
      { name: SkillNames["Elemental Absorption 3++"], element: 70 },
    ],
  },
  ElementalAbsorptionOthers: {
    name: SkillNames["Elemental Absorption"],
    weapons: OthersGroup,
    levels: [
      { name: SkillNames["Elemental Absorption 1"], element: 40 },
      { name: SkillNames["Elemental Absorption 1+"], element: 50 },
      { name: SkillNames["Elemental Absorption 1++"], element: 60 },
      { name: SkillNames["Elemental Absorption 2"], element: 50 },
      { name: SkillNames["Elemental Absorption 2+"], element: 60 },
      { name: SkillNames["Elemental Absorption 2++"], element: 70 },
      { name: SkillNames["Elemental Absorption 3"], element: 60 },
      { name: SkillNames["Elemental Absorption 3+"], element: 70 },
      { name: SkillNames["Elemental Absorption 3++"], element: 80 },
    ],
  },
  Foray: {
    name: SkillNames["Foray"],
    levels: [
      { name: SkillNames["Foray 1"], attack: 6 },
      { name: SkillNames["Foray 2"], attack: 8, affinity: 5 },
      { name: SkillNames["Foray 3"], attack: 10, affinity: 10 },
      { name: SkillNames["Foray 4"], attack: 12, affinity: 15 },
      { name: SkillNames["Foray 5"], attack: 15, affinity: 20 },
    ],
  },
  Heroics: {
    name: SkillNames["Heroics"],
    levels: [
      { name: SkillNames["Heroics 1"] },
      { name: SkillNames["Heroics 2"], attackMul: 1.05 },
      { name: SkillNames["Heroics 3"], attackMul: 1.05 },
      { name: SkillNames["Heroics 4"], attackMul: 1.1 },
      { name: SkillNames["Heroics 5"], attackMul: 1.3 },
    ],
  },
  LatentPower: {
    name: SkillNames["Latent Power"],
    levels: [
      { name: SkillNames["Latent Power 1"], affinity: 10 },
      { name: SkillNames["Latent Power 2"], affinity: 20 },
      { name: SkillNames["Latent Power 3"], affinity: 30 },
      { name: SkillNames["Latent Power 4"], affinity: 40 },
      { name: SkillNames["Latent Power 5"], affinity: 50 },
    ],
  },
  MaximumMight: {
    name: SkillNames["Maximum Might"],
    levels: [
      { name: SkillNames["Maximum Might 1"], affinity: 10 },
      { name: SkillNames["Maximum Might 2"], affinity: 20 },
      { name: SkillNames["Maximum Might 3"], affinity: 30 },
    ],
  },
  PeakPerformance: {
    name: SkillNames["Peak Performance"],
    levels: [
      { name: SkillNames["Peak Performance 1"], attack: 3 },
      { name: SkillNames["Peak Performance 2"], attack: 6 },
      { name: SkillNames["Peak Performance 3"], attack: 10 },
      { name: SkillNames["Peak Performance 4"], attack: 15 },
      { name: SkillNames["Peak Performance 5"], attack: 20 },
    ],
  },
  Resentment: {
    name: SkillNames["Resentment"],
    levels: [
      { name: SkillNames["Resentment 1"], attack: 5 },
      { name: SkillNames["Resentment 2"], attack: 10 },
      { name: SkillNames["Resentment 3"], attack: 15 },
      { name: SkillNames["Resentment 4"], attack: 20 },
      { name: SkillNames["Resentment 5"], attack: 25 },
    ],
  },
  WeaknessExploit: {
    name: SkillNames["Weakness Exploit"],
    levels: [
      {
        name: SkillNames["Weakness Exploit 1"],
        weakness: { affinity: 5 },
        wound: { affinity: 3 },
      },
      {
        name: SkillNames["Weakness Exploit 2"],
        weakness: { affinity: 10 },
        wound: { affinity: 5 },
      },
      {
        name: SkillNames["Weakness Exploit 3"],
        weakness: { affinity: 15 },
        wound: { affinity: 10 },
      },
      {
        name: SkillNames["Weakness Exploit 4"],
        weakness: { affinity: 20 },
        wound: { affinity: 15 },
      },
      {
        name: SkillNames["Weakness Exploit 5"],
        weakness: { affinity: 30 },
        wound: { affinity: 20 },
      },
    ],
  },
};

export const SetSkills: Record<string, BuffGroup> = {
  DoshagumasMight: {
    name: SkillNames["Doshaguma's Might"],
    levels: [
      { name: "Powerhouse I", attack: 10 },
      { name: "Powerhouse II", attack: 25 },
    ],
  },
  EbonyOdogaronsPower: {
    name: "Ebony Odogaron's Power",
    levels: [
      { name: "Burst Boost I", attack: 3 },
      { name: "Burst Boost II", attack: 10 },
    ],
  },
  JinDahaadsRevolt: {
    name: "Jin Dahaad's Revolt",
    levels: [
      { name: "Binding Counter I", attack: 25 },
      { name: "Binding Counter II", attack: 50 },
    ],
  },
  GoreMagalasTyranny: {
    name: "Gore Magala's Tyranny",
    levels: [
      { name: "Black Eclipse I" },
      { name: "Black Eclipse II", attack: 10, frenzy: { attack: 5 } },
    ],
  },
  XuWusVigor: {
    name: "Xu Wu's Vigor",
    levels: [
      { name: "Protein Fiend I", attack: 15 },
      { name: "Protein Fiend II", attack: 25 },
    ],
  },
};
