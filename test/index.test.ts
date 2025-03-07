import { expect, test } from "vitest";
import { Buffs, FieldBuffs } from "@/data";
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
const a = calculateAttack(230, [
  AttackBoost.levels[3],
  OffensiveGuard.levels[2],
  Buffs.Powercharm,
]);
// 210 Attack, Attack Boost 5, Powercharm
const b = calculateAttack(210, [AttackBoost.levels[4], Buffs.Powercharm]);
// 180 Element, Element Attack 1
const c = calculateElement(180, [ElementAttack.levels[0]]);
// 180 Element, Element Attack 3, Coalescence 1, Frenzy
const d = calculateElement(180, [
  ElementAttack.levels[2],
  Coalescence.levels[0],
]);

// 210 Attack, 400 Element
const h1 = calculateAttack(210, [Buffs.SelfImprovement, Buffs.Powercharm]);
const h2 = calculateAttack(210, [
  Buffs.SelfImprovement,
  FieldBuffs.HuntingHorn.levels[0],
  Buffs.Powercharm,
]);
const h3 = calculateAttack(210, [
  Buffs.SelfImprovement,
  FieldBuffs.HuntingHorn.levels[1],
  Buffs.Powercharm,
]);

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
  expect(calculateHit(a, 0, 27, 80, 30, "Blue")).toBe(73.6);
  expect(calculateHit(b, c, 21, 80, 30, "White")).toBe(59.4);
  expect(calculateHit(b, c, 45, 80, 30, "White")).toBe(118.5);

  expect(calculateHit(h3, 400, 32, 80, 30, "White")).toBe(109.5);
});

test("calculateCrit", () => {
  expect(calculateCrit(b, c, 21, 80, 30, "White", 1.25, 1)).toBe(72.3);
  expect(calculateCrit(b, c, 45, 80, 30, "White", 1.25, 1)).toBe(146.2);

  expect(calculateCrit(h3, 400, 32, 80, 30, "White", 1.34, 1)).toBe(142);
});
