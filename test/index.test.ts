import { expect, test } from "vitest";
import { calculateCrit, calculateHit, calculateUI } from "@/model";

// expected values are in-game values with decimals enabled

// 230 Attack, Attack Boost 4, Offensive Guard 3, Powercharm
const a = calculateUI(230, [1.15, 1.02], [8, 6]);
// 210 Attack, Attack Boost 5, Powercharm
const b = calculateUI(210, [1.04], [9, 6]);
// 180 Element, Element Boost 1
const c = calculateUI(180, [], [40]);

test("calculateUI", () => {
  expect(a).toBe(283.8);
  expect(b).toBe(233.4);
  expect(c).toBe(220);
});

test("calculateHit", () => {
  expect(calculateHit(a, 0, 27, 80, 30, "Blue")).toBe(73.6);
  expect(calculateHit(b, c, 21, 80, 30, "White")).toBe(59.4);
  expect(calculateHit(b, c, 45, 80, 30, "White")).toBe(118.5);
});

test("calculateCrit", () => {
  expect(calculateCrit(b, c, 21, 80, 30, "White", 1.25, 1)).toBe(72.3);
  expect(calculateCrit(b, c, 45, 80, 30, "White", 1.25, 1)).toBe(146.2);
});
