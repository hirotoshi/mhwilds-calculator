import { expect, test } from "vitest";
import { Buffs, FieldBuffs, WeaponBuffs } from "@/data";
import {
  BowAttacks,
  HeavyBowgunAttacks,
  HuntingHornAttacks,
  LightBowgunAttacks,
} from "@/data/attacks";
import { ArmorSkills, WeaponSkills } from "@/data/skills";
import {
  calculateAttack,
  calculateCrit,
  calculateElement,
  calculateHit,
} from "@/model";
import { Sharpness } from "@/types";

const { AttackBoost, ElementAttack, OffensiveGuard } = WeaponSkills;
const { Coalescence } = ArmorSkills;

const display = (n: number) => Math.floor(n + 0.1);

// 230 Attack, Attack Boost 4, Offensive Guard 3, Powercharm
const a = calculateAttack({
  attack: 230,
  buffs: {
    AttackBoost: AttackBoost.levels[3],
    OffensiveGuard: OffensiveGuard.levels[2],
    Powercharm: Buffs.Powercharm.levels[0],
  },
});
// 210 Attack, Attack Boost 5, Powercharm
const b = calculateAttack({
  attack: 210,
  buffs: {
    AttackBoost: AttackBoost.levels[4],
    Powercharm: Buffs.Powercharm.levels[0],
  },
});
// 180 Element, Element Attack 1
const c = calculateElement({
  element: 180,
  buffs: { ElementAttack: ElementAttack.levels[0] },
});
// 180 Element, Element Attack 3, Coalescence 1, Frenzy
const d = calculateElement({
  element: 180,
  buffs: {
    ElementAttack: ElementAttack.levels[2],
    Coalescence: Coalescence.levels[0],
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
      uiAttack: a,
      uiElement: 0,
      sharpness: "Blue",
      rawHzv: 80,
      eleHzv: 30,
      mv: 27,
    }),
  ).toBe(73.6);
  expect(
    calculateHit({
      uiAttack: b,
      uiElement: c,
      sharpness: "White",
      rawHzv: 80,
      eleHzv: 30,
      mv: 21,
    }),
  ).toBe(59.4);
  expect(
    calculateHit({
      uiAttack: b,
      uiElement: c,
      sharpness: "White",
      rawHzv: 80,
      eleHzv: 30,
      mv: 45,
    }),
  ).toBe(118.5);

  expect(
    calculateHit({
      uiAttack: h3,
      uiElement: 400,
      mv: 32,
      rawHzv: 80,
      eleHzv: 30,
      sharpness: "White",
    }),
  ).toBe(109.5);
});

test("calculateCrit", () => {
  expect(
    calculateCrit({
      uiAttack: b,
      uiElement: c,
      rawHzv: 80,
      eleHzv: 30,
      sharpness: "White",
      critMulti: 1.25,
      eleCritMulti: 1,
      mv: 21,
    }),
  ).toBe(72.3);
  expect(
    calculateCrit({
      uiAttack: h3,
      uiElement: 400,
      rawHzv: 80,
      eleHzv: 30,
      sharpness: "White",
      critMulti: 1.34,
      eleCritMulti: 1,
      mv: 32,
    }),
  ).toBe(142);
});

test("Hunting Horn", () => {
  const m1 = HuntingHornAttacks.find((a) => a.name === "Echo Bubble")!;
  const m2 = HuntingHornAttacks.find((a) => a.name === "Echo Bubble (Note)")!;
  const m3 = HuntingHornAttacks.find((a) => a.name === "Echo Bubble (Song)")!;

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
    uiAttack: 236,
    uiElement: 410,
    sharpness: "Green" as Sharpness,
    rawHzv: 80,
    eleHzv: 30,
  };

  expect(calculateHit({ ...a2, ...m1 })).toBe(74.5);
  expect(calculateHit({ ...a2, ...m2 })).toBe(15.5);
  expect(calculateHit({ ...a2, ...m3 })).toBe(32);
});

test("Light Bowgun", () => {
  const a1 = {
    uiAttack: 131,
    uiElement: 0,
    sharpness: "Ranged" as Sharpness,
    rawHzv: 80,
    eleHzv: 30,
  };

  const sp1 = LightBowgunAttacks.find((a) => a.name === "Spread Lv1")!;
  const e2 = LightBowgunAttacks.find((a) => a.name === "Element Lv2")!;

  expect(calculateHit({ ...a1, ...sp1 })).toBe(8.1);
  expect(calculateHit({ ...a1, ...e2 })).toBe(13.2);
});

test("Heavy Bowgun", () => {
  const a1 = {
    uiAttack: 191,
    uiElement: 0,
    sharpness: "Ranged" as Sharpness,
    rawHzv: 80,
    eleHzv: 30,
  };

  const e1 = HeavyBowgunAttacks.find((a) => a.name === "Element Lv1")!;
  const e2 = HeavyBowgunAttacks.find((a) => a.name === "Element Lv2")!;
  const p1 = HeavyBowgunAttacks.find((a) => a.name === "Pierce Lv1")!;
  const sp2 = HeavyBowgunAttacks.find((a) => a.name === "Spread Lv2")!;
  const st1 = HeavyBowgunAttacks.find((a) => a.name === "Sticky Lv1")!;
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
  const cs1 = BowAttacks.find((a) => a.name === "Charged Shot Lv1")!;
  const cs2 = BowAttacks.find((a) => a.name === "Charged Shot Lv2")!;
  const cs3 = BowAttacks.find((a) => a.name === "Charged Shot Lv3")!;
  const qs = BowAttacks.find((a) => a.name === "Quick Shot")!;
  const ps2 = BowAttacks.find(
    (a) => a.name === "Power Shot / Flying Sparrow Shot Lv2",
  )!;
  const ps3 = BowAttacks.find(
    (a) => a.name === "Power Shot / Flying Sparrow Shot Lv3",
  )!;
  const pv1 = BowAttacks.find((a) => a.name === "Power Volley Lv1")!;
  const pv2 = BowAttacks.find((a) => a.name === "Power Volley Lv2")!;
  const pv3 = BowAttacks.find((a) => a.name === "Power Volley Lv3")!;
  // const as1 = BowAttacks.find((a) => a.name === "Arc Shot Lv1")!;
  // const as2 = BowAttacks.find((a) => a.name === "Arc Shot Lv2")!;
  // const as3 = BowAttacks.find((a) => a.name === "Arc Shot Lv3")!;
  const dp = BowAttacks.find((a) => a.name === "Dragon Piercer")!;
  const td = BowAttacks.find((a) => a.name === "Thousand Dragons")!;
  const pcs3 = BowAttacks.find((a) => a.name === "Pierce Charge Shot Lv3")!;
  // const ptd = BowAttacks.find((a) => a.name === "Pierce Thousand Dragons")!;
  // const t = BowAttacks.find((a) => a.name === "Tracer Arrow")!;
  // const te = BowAttacks.find((a) => a.name === "Tracer Arrow (Explosion)")!;
  // const tptpd = BowAttacks.find(
  //   (a) => a.name === "Tracer Pierce Thousand Dragons",
  // )!;

  const a1 = {
    uiAttack: 101,
    uiElement: 0,
    sharpness: "Bow" as Sharpness,
    rawHzv: 80,
    eleHzv: 30,
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
    ...a1,
    uiAttack: 176,
    uiElement: 230,
    chargeEleMul: 1.1,
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
