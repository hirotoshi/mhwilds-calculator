import { expect, test } from "vitest";
import { Buffs, FieldBuffs, Sharpness } from "@/data";
import { HuntingHornAttacks } from "@/data/attacks";
import { ArmorSkills, WeaponSkills } from "@/data/skills";
import {
  calculateAttack,
  calculateCrit,
  calculateElement,
  calculateHit,
} from "@/model";

const { AttackBoost, ElementAttack, OffensiveGuard } = WeaponSkills;
const { Coalescence } = ArmorSkills;

const display = (n: number) => Math.floor(n + 0.1);

// 230 Attack, Attack Boost 4, Offensive Guard 3, Powercharm
const a = calculateAttack({
  attack: 230,
  buffs: {
    AttackBoost: AttackBoost.levels[3],
    OffensiveGuard: OffensiveGuard.levels[2],
    Powercharm: Buffs.Powercharm,
  },
});
// 210 Attack, Attack Boost 5, Powercharm
const b = calculateAttack({
  attack: 210,
  buffs: {
    AttackBoost: AttackBoost.levels[4],
    Powercharm: Buffs.Powercharm,
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
    SelfImprovement: Buffs.SelfImprovement,
    Powercharm: Buffs.Powercharm,
  },
});
const h2 = calculateAttack({
  attack: 210,
  buffs: {
    SelfImprovement: Buffs.SelfImprovement,
    HuntingHorn: FieldBuffs.HuntingHorn.levels[0],
    Powercharm: Buffs.Powercharm,
  },
});
const h3 = calculateAttack({
  attack: 210,
  buffs: {
    SelfImprovement: Buffs.SelfImprovement,
    HuntingHorn: FieldBuffs.HuntingHorn.levels[1],
    Powercharm: Buffs.Powercharm,
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
      atk: { mv: 27 },
    }),
  ).toBe(73.6);
  expect(
    calculateHit({
      uiAttack: b,
      uiElement: c,
      sharpness: "White",
      rawHzv: 80,
      eleHzv: 30,
      atk: { mv: 21 },
    }),
  ).toBe(59.4);
  expect(
    calculateHit({
      uiAttack: b,
      uiElement: c,
      sharpness: "White",
      rawHzv: 80,
      eleHzv: 30,
      atk: { mv: 45 },
    }),
  ).toBe(118.5);

  expect(
    calculateHit({
      uiAttack: h3,
      uiElement: 400,
      atk: { mv: 32 },
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
      atk: { mv: 21 },
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
      atk: { mv: 32 },
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

  expect(calculateHit({ ...a1, atk: m1 })).toBe(81.6);
  expect(calculateHit({ ...a1, atk: m2 })).toBe(16.6);
  expect(calculateHit({ ...a1, atk: m3 })).toBe(34.8);

  const a2 = {
    uiAttack: 236,
    uiElement: 410,
    sharpness: "Green" as Sharpness,
    rawHzv: 80,
    eleHzv: 30,
  };

  expect(calculateHit({ ...a2, atk: m1 })).toBe(74.5);
  expect(calculateHit({ ...a2, atk: m2 })).toBe(15.5);
  expect(calculateHit({ ...a2, atk: m3 })).toBe(32);
});
