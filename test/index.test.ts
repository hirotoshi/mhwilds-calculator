import { expect, test } from "vitest";
import { Buffs, FieldBuffs, WeaponBuffs } from "@/data";
import { CombinedBuffs } from "@/data";
import Attacks from "@/data/attacks";
import {
  calculateAttack,
  calculateCrit,
  calculateElement,
  calculateHit,
} from "@/model";
import { Sharpness, Weapon } from "@/types";

const display = (n: number) => Math.floor(n + 0.1);

const buff = (key: string, level: number = 1) => {
  const buff = CombinedBuffs[key]?.levels[level - 1];
  if (!buff) throw new Error(`Buff not found: ${key} ${level}`);
  return buff;
};

const atk = (weapon: Weapon, name: string) => {
  const attack = Attacks[weapon].find((a) => a.name === name)!;
  if (!attack) throw new Error(`Attack not found: ${name}`);
  return attack;
};

const base = {
  uiElement: 0,
  rawHzv: 80,
  eleHzv: 30,
  critMulti: 1.25,
  eleCritMulti: 1,
};

// 230 Attack, Attack Boost 4, Offensive Guard 3, Powercharm
const a = calculateAttack({
  attack: 230,
  buffs: {
    AttackBoost: buff("AttackBoost", 4),
    OffensiveGuard: buff("OffensiveGuard", 3),
    Powercharm: buff("Powercharm"),
  },
});
// 210 Attack, Attack Boost 5, Powercharm
const b = calculateAttack({
  attack: 210,
  buffs: {
    AttackBoost: buff("AttackBoost", 5),
    Powercharm: buff("Powercharm"),
  },
});
// 180 Element, Element Attack 1
const c = calculateElement({
  element: 180,
  buffs: { ElementAttack: buff("ElementAttack", 1) },
});
// 180 Element, Element Attack 3, Coalescence 1, Frenzy
const d = calculateElement({
  element: 180,
  buffs: {
    ElementAttack: buff("ElementAttack", 3),
    Coalescence: buff("Coalescence", 1),
  },
  frenzy: true,
});

// 210 Attack, 400 Element
const h1 = calculateAttack({
  attack: 210,
  buffs: {
    SelfImprovement: WeaponBuffs.SelfImprovement.levels[0],
    Powercharm: Buffs.Powercharm.levels[0],
  },
});
const h2 = calculateAttack({
  attack: 210,
  buffs: {
    SelfImprovement: WeaponBuffs.SelfImprovement.levels[0],
    HuntingHorn: FieldBuffs.HuntingHorn.levels[0],
    Powercharm: Buffs.Powercharm.levels[0],
  },
});
const h3 = calculateAttack({
  attack: 210,
  buffs: {
    SelfImprovement: WeaponBuffs.SelfImprovement.levels[0],
    HuntingHorn: FieldBuffs.HuntingHorn.levels[1],
    Powercharm: Buffs.Powercharm.levels[0],
  },
});

test("calculateAttack", () => {
  expect(a).toBe(283.8);
  expect(b).toBe(233.4);
  expect(c).toBe(220);

  expect(display(h1)).toBe(258);
  expect(display(h2)).toBe(270);
  expect(display(h3)).toBe(283);
});

test("calculateElement", () => {
  expect(Math.round(d)).toBe(298);
});

test("calculateHit", () => {
  expect(
    calculateHit({
      ...base,
      uiAttack: a,
      sharpness: "Blue",
      mv: 27,
    }),
  ).toBe(73.6);
  expect(
    calculateHit({
      ...base,
      uiAttack: b,
      uiElement: c,
      sharpness: "White",
      mv: 21,
    }),
  ).toBe(59.4);
  expect(
    calculateHit({
      ...base,
      uiAttack: b,
      uiElement: c,
      sharpness: "White",
      mv: 45,
    }),
  ).toBe(118.5);

  expect(
    calculateHit({
      ...base,
      uiAttack: h3,
      uiElement: 400,
      mv: 32,
      sharpness: "White",
    }),
  ).toBe(109.5);
});

test("calculateCrit", () => {
  expect(
    calculateCrit({
      ...base,
      uiAttack: b,
      uiElement: c,
      sharpness: "White",
      mv: 21,
    }),
  ).toBe(72.3);
  expect(
    calculateCrit({
      ...base,
      uiAttack: h3,
      uiElement: 400,
      sharpness: "White",
      critMulti: 1.34,
      eleCritMulti: 1,
      mv: 32,
    }),
  ).toBe(142);
});

test("Hunting Horn", () => {
  const m1 = atk("Hunting Horn", "Echo Bubble");
  const m2 = atk("Hunting Horn", "Echo Bubble (Note)");
  const m3 = atk("Hunting Horn", "Echo Bubble (Song)");

  const a1 = {
    uiAttack: 260,
    uiElement: 400,
    sharpness: "White" as Sharpness,
    rawHzv: 80,
    eleHzv: 30,
  };

  expect(calculateHit({ ...a1, ...m1 })).toBe(81.6);
  expect(calculateHit({ ...a1, ...m2 })).toBe(16.6);
  expect(calculateHit({ ...a1, ...m3 })).toBe(34.8);

  const a2 = {
    ...a1,
    uiAttack: 236,
    uiElement: 410,
    sharpness: "Green" as Sharpness,
  };

  expect(calculateHit({ ...a2, ...m1 })).toBe(74.5);
  expect(calculateHit({ ...a2, ...m2 })).toBe(15.5);
  expect(calculateHit({ ...a2, ...m3 })).toBe(32);
});

test("Light Bowgun", () => {
  const a1 = {
    ...base,
    uiAttack: 131,
    sharpness: "Ranged" as Sharpness,
  };

  const sp1 = atk("Light Bowgun", "Spread Lv1");
  const e2 = atk("Light Bowgun", "Element Lv2");

  expect(calculateHit({ ...a1, ...sp1 })).toBe(8.1);
  expect(calculateHit({ ...a1, ...e2 })).toBe(13.2);
});

test("Heavy Bowgun", () => {
  const a1 = {
    ...base,
    uiAttack: 191,
    sharpness: "Ranged" as Sharpness,
  };

  const e1 = atk("Heavy Bowgun", "Element Lv1");
  const e2 = atk("Heavy Bowgun", "Element Lv2");
  const p1 = atk("Heavy Bowgun", "Pierce Lv1");
  const sp2 = atk("Heavy Bowgun", "Spread Lv2");
  const st1 = atk("Heavy Bowgun", "Sticky Lv1");
  // const st2 = HeavyBowgunAttacks.find((a) => a.name === "Sticky Lv2")!;
  // const c2 = HeavyBowgunAttacks.find((a) => a.name === "Cluster Lv2")!;

  expect(calculateHit({ ...a1, ...e1 })).toBe(23.7);
  expect(calculateHit({ ...a1, ...e2 })).toBe(29.6);
  expect(calculateHit({ ...a1, ...p1 })).toBe(16.8);
  expect(calculateHit({ ...a1, ...sp2 })).toBe(19.3);
  // expect(calculateHit({ ...a1, ...st2 })).toBe(62.6);
  // expect(calculateHit({ ...a1, ...c2 })).toBe(54.2);

  const a2 = { ...a1, uiAttack: 101 };
  expect(calculateHit({ ...a2, ...st1 })).toBe(26.8);
});

test("Bow", () => {
  const cs1 = atk("Bow", "Charged Shot Lv1");
  const cs2 = atk("Bow", "Charged Shot Lv2");
  const cs3 = atk("Bow", "Charged Shot Lv3");
  const qs = atk("Bow", "Quick Shot");
  const ps2 = atk("Bow", "Power Shot / Flying Sparrow Shot Lv2");
  const ps3 = atk("Bow", "Power Shot / Flying Sparrow Shot Lv3");
  const pv1 = atk("Bow", "Power Volley Lv1");
  const pv2 = atk("Bow", "Power Volley Lv2");
  const pv3 = atk("Bow", "Power Volley Lv3");
  // const as1 = BowAttacks.find((a) => a.name === "Arc Shot Lv1")!;
  // const as2 = BowAttacks.find((a) => a.name === "Arc Shot Lv2")!;
  // const as3 = BowAttacks.find((a) => a.name === "Arc Shot Lv3")!;
  const dp = atk("Bow", "Dragon Piercer");
  const td = atk("Bow", "Thousand Dragons");
  const pcs3 = atk("Bow", "Pierce Charge Shot Lv3");
  // const ptd = BowAttacks.find((a) => a.name === "Pierce Thousand Dragons")!;
  // const t = BowAttacks.find((a) => a.name === "Tracer Arrow")!;
  // const te = BowAttacks.find((a) => a.name === "Tracer Arrow (Explosion)")!;
  // const tptpd = BowAttacks.find(
  //   (a) => a.name === "Tracer Pierce Thousand Dragons",
  // )!;

  const a1 = {
    ...base,
    uiAttack: 101,
    sharpness: "Bow" as Sharpness,
  };

  expect(calculateHit({ ...a1, ...qs })).toBe(8);
  expect(calculateHit({ ...a1, ...cs2 })).toBe(8.9);
  expect(calculateHit({ ...a1, ...cs3 })).toBe(9.8);
  // // power volley 10.7

  // // power coating
  // // quick shot 10.4
  // // charge 11.6
  // // charge 2 12.7

  const a2 = {
    ...base,
    uiAttack: 176,
    uiElement: 230,
    chargeEleMul: 1.1,
    sharpness: "Bow" as Sharpness,
  };

  expect(calculateHit({ ...a2, ...cs1 })).toBe(15.4);
  expect(calculateHit({ ...a2, ...cs2 })).toBe(18.2);
  expect(calculateHit({ ...a2, ...cs3 })).toBe(20.8);
  expect(calculateHit({ ...a2, ...qs })).toBe(16);
  expect(calculateHit({ ...a2, ...ps2 })).toBe(19);
  expect(calculateHit({ ...a2, ...ps3 })).toBe(21.1);
  expect(calculateHit({ ...a2, ...pv1 })).toBe(21);
  expect(calculateHit({ ...a2, ...pv2 })).toBe(23.9);
  expect(calculateHit({ ...a2, ...pv3 })).toBe(26.2);
  // expect(calculateHit({ ...a2, ...as1 })).toBe(11.1);
  // expect(calculateHit({ ...a2, ...as2 })).toBe(12.7);
  // expect(calculateHit({ ...a2, ...as3 })).toBe(14.1);
  expect(calculateHit({ ...a2, ...dp })).toBe(37.7);
  expect(calculateHit({ ...a2, ...td })).toBe(30);
  expect(calculateHit({ ...a2, ...pcs3 })).toBe(9.2);
  // expect(calculateHit({ ...a2, ...t })).toBe(42.1);

  const a3 = { ...a1, uiAttack: 96 };
  expect(calculateHit({ ...a3, ...qs })).toBe(7.6);
  expect(calculateHit({ ...a3, ...qs, rawMul: 1.3 })).toBe(9.9);
  expect(calculateHit({ ...a3, ...cs2 })).toBe(8.4);
  expect(calculateHit({ ...a3, ...cs3 })).toBe(9.3);
  expect(calculateHit({ ...a3, ...cs3, rawMul: 1.3 })).toBe(12.1);
  // expect(calculateHit({ ...a3, ...tptpd })).toBe(21.8);

  const a4 = { ...a1, uiAttack: 216, uiElement: 130 };
  expect(calculateHit({ ...a4, ...qs })).toBe(18.3);
  expect(calculateHit({ ...a4, ...qs, rawMul: 1.4 })).toBe(25.2);
  expect(calculateHit({ ...a4, ...cs3, rawMul: 1.4 })).toBe(31.3);
});

test("Charge Master", () => {
  const a1 = {
    ...base,
    uiAttack: 211,
    uiElement: 480,
    sharpness: "White" as Sharpness,
  };

  const tcs3p = atk("Great Sword", "True Charged Slash Lv3 2 (Power)");
  const eleMul = tcs3p.eleMul! * buff("ChargeMaster", 3).meleeChargeEleMul!;

  expect(calculateHit({ ...a1, ...tcs3p })).toBe(561.8);
  expect(calculateHit({ ...a1, ...tcs3p, eleMul })).toBe(568.1);
});
