import type { Buff } from ".";

export type Skill = {
  name: string;
  levels: Buff[];
  conditional?: boolean;
  description?: string;
};

const Skills: Record<string, Skill> = {
  Agitator: {
    name: "Agitator",
    conditional: true,
    description:
      "Increases attack power and affinity when large monsters become enraged.",
    levels: [
      { name: "Agitator 1", attack: 4, affinity: 3 },
      { name: "Agitator 2", attack: 8, affinity: 5 },
      { name: "Agitator 3", attack: 12, affinity: 7 },
      { name: "Agitator 4", attack: 16, affinity: 10 },
      { name: "Agitator 5", attack: 20, affinity: 15 },
    ],
  },
  Ambush: {
    name: "Ambush",
    conditional: true,
    description:
      "Temporarily increases damage to large monsters with a successful Sneak Attack.",
    levels: [
      { name: "Ambush 1", attackMul: 1.05 },
      { name: "Ambush 2", attackMul: 1.1 },
      { name: "Ambush 3", attackMul: 1.15 },
    ],
  },
  Antivirus: {
    name: "Antivirus",
    conditional: true,
    description:
      "Once infected, makes it easier to overcome the Frenzy and increases affinity if cured.",
    levels: [
      { name: "Antivirus 1", affinity: 3 },
      { name: "Antivirus 2", affinity: 6 },
      { name: "Antivirus 3", affinity: 10 },
    ],
  },
  AttackBoost: {
    name: "Attack Boost",
    levels: [
      { name: "Attack Boost 1", attack: 3 },
      { name: "Attack Boost 2", attack: 5 },
      { name: "Attack Boost 3", attack: 7 },
      { name: "Attack Boost 4", attack: 8, attackMul: 1.02 },
      { name: "Attack Boost 5", attack: 9, attackMul: 1.04 },
    ],
  },
  Counterstrike: {
    name: "Counterstrike",
    description: "Temporarily increases attack power after being knocked back.",
    levels: [
      { name: "Counterstrike 1", attack: 10 },
      { name: "Counterstrike 2", attack: 15 },
      { name: "Counterstrike 3", attack: 25 },
    ],
  },
  CriticalBoost: {
    name: "Critical Boost",
    levels: [
      { name: "Critical Boost 1", criticalBoost: 1.28 },
      { name: "Critical Boost 2", criticalBoost: 1.31 },
      { name: "Critical Boost 3", criticalBoost: 1.34 },
      { name: "Critical Boost 4", criticalBoost: 1.37 },
      { name: "Critical Boost 5", criticalBoost: 1.4 },
    ],
  },
  CriticalElement: {
    name: "Critical Element",
    levels: [
      { name: "Critical Element 1", criticalElement: 1.05 },
      { name: "Critical Element 2", criticalElement: 1.1 },
      { name: "Critical Element 3", criticalElement: 1.15 },
    ],
  },
  CriticalEye: {
    name: "Critical Eye",
    levels: [
      { name: "Critical Eye 1", affinity: 4 },
      { name: "Critical Eye 2", affinity: 8 },
      { name: "Critical Eye 3", affinity: 12 },
      { name: "Critical Eye 4", affinity: 16 },
      { name: "Critical Eye 5", affinity: 20 },
    ],
  },
  DoshagumasMight: {
    name: "Doshaguma's Might",
    description:
      "Temporarily grants attack after a successful Power Clash or Offset attack.",
    levels: [
      { name: "Doshaguma's Might 1", attack: 10 },
      { name: "Doshaguma's Might 2", attack: 25 },
    ],
  },
  ElementAttack: {
    name: "Element Attack",
    levels: [
      { name: "Element Attack 1", element: 40 },
      { name: "Element Attack 2", element: 50, elementMul: 1.1 },
      { name: "Element Attack 3", element: 60, elementMul: 1.2 },
    ],
  },
  Foray: {
    name: "Foray",
    conditional: true,
    description:
      "Increases attack power and affinity against large monsters affected by poison or paralysis.",
    levels: [
      { name: "Foray 1", attack: 6 },
      { name: "Foray 2", attack: 8, affinity: 5 },
      { name: "Foray 3", attack: 10, affinity: 10 },
      { name: "Foray 4", attack: 12, affinity: 15 },
      { name: "Foray 5", attack: 15, affinity: 20 },
    ],
  },
  Heroics: {
    name: "Heroics",
    conditional: true,
    description:
      "Increases attack power and defense when health drops to 35% or lower.",
    levels: [
      { name: "Heroics 1" },
      { name: "Heroics 2", attackMul: 1.05 },
      { name: "Heroics 3", attackMul: 1.05 },
      { name: "Heroics 4", attackMul: 1.1 },
      { name: "Heroics 5", attackMul: 1.3 },
    ],
  },
  LatentPower: {
    name: "Latent Power",
    conditional: true,
    description:
      "Temporarily increases affinity and reduces stamina depletion when certain conditions are met.",
    levels: [
      { name: "Latent Power 1", affinity: 10 },
      { name: "Latent Power 2", affinity: 20 },
      { name: "Latent Power 3", affinity: 30 },
      { name: "Latent Power 4", affinity: 40 },
      { name: "Latent Power 5", affinity: 50 },
    ],
  },
  MaximumMight: {
    name: "Maximum Might",
    conditional: true,
    levels: [
      { name: "Maximum Might 1", affinity: 10 },
      { name: "Maximum Might 2", affinity: 20 },
      { name: "Maximum Might 3", affinity: 30 },
    ],
  },
  OffensiveGuard: {
    name: "Offensive Guard",
    conditional: true,
    levels: [
      { name: "Offensive Guard 1", attackMul: 1.05 },
      { name: "Offensive Guard 2", attackMul: 1.1 },
      { name: "Offensive Guard 3", attackMul: 1.15 },
    ],
  },
  PeakPerformance: {
    name: "Peak Performance",
    conditional: true,
    description: "Increases attack when your health is full.",
    levels: [
      { name: "Peak Performance 1", attack: 3 },
      { name: "Peak Performance 2", attack: 6 },
      { name: "Peak Performance 3", attack: 10 },
      { name: "Peak Performance 4", attack: 15 },
      { name: "Peak Performance 5", attack: 20 },
    ],
  },
  Resentment: {
    name: "Resentment",
    conditional: true,
    description:
      "Increases attack when you have recoverable damage (the red portion of your Health Gauge).",
    levels: [
      { name: "Resentment 1", attack: 5 },
      { name: "Resentment 2", attack: 10 },
      { name: "Resentment 3", attack: 15 },
      { name: "Resentment 4", attack: 20 },
      { name: "Resentment 5", attack: 15 },
    ],
  },
  WeaknessExploit: {
    name: "Weakness Exploit",
    levels: [
      { name: "Weakness Exploit 1", weaknessAffinity: 5, woundAffinity: 3 },
      {
        name: "Weakness Exploit 2",
        weaknessAffinity: 10,
        woundAffinity: 5,
      },
      {
        name: "Weakness Exploit 3",
        weaknessAffinity: 15,
        woundAffinity: 10,
      },
      {
        name: "Weakness Exploit 4",
        weaknessAffinity: 20,
        woundAffinity: 15,
      },
      {
        name: "Weakness Exploit 5",
        weaknessAffinity: 30,
        woundAffinity: 20,
      },
    ],
  },
  XuWusVigor: {
    name: "Xu Wu's Vigor",
    description:
      "Temporarily grants attack after eating items such as well-done steak.",
    levels: [
      { name: "Xu Wu's Vigor 1", attack: 15 },
      { name: "Xu Wu's Vigor 2", attack: 25 },
    ],
  },
};

export default Skills;
