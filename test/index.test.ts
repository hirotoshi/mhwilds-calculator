import { expect, test } from "vitest";
import { calculateHit, calculateUI } from "@/model";

// expected values are in-game values

const a = calculateUI(230, [1.15, 1.02], [8, 6]);
const b = calculateUI(210, [1.04], [9, 6]);

test("calculateUI", () => {
  expect(a).toBe(283.8);
  expect(b).toBe(233.4);
});

test("calculateRawHit", () => {
  expect(calculateHit(a, 0, 27, 80, 30, "Blue")).toBe(73.6);
});

const c = calculateUI(180, [], [40]);

test("calculateHit", () => {
  expect(calculateHit(b, c, 21, 80, 30, "White")).toBe(59.4);
  expect(calculateHit(b, c, 45, 80, 30, "White")).toBe(118.5);
});
