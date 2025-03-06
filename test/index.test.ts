import { expect, test } from "vitest";
import { calculateHit, calculateUI } from "@/model";

test("calculateUI", () => {
  expect(calculateUI(210, [1.04], [17])).toBe(235);
  expect(calculateUI(180, [1.2], [60])).toBe(276);
});

test("calculateRawHit", () => {
  // expect(calculateHit(223, 0, 45, 80, 30, "White")).toBe(106);
  // expect(calculateHit(223, 0, 45, 80, 30, "Blue")).toBe(96.3);
  // expect(calculateHit(260, 0, 21, 80, 30, "White")).toBe(57.8);
  // expect(calculateHit(260, 0, 35, 80, 30, "White")).toBe(96.3);
  expect(calculateHit(260, 0, 45, 80, 30, "White")).toBe(123.8);
});

test("calculateFuckedUpHit", () => {
  const a = calculateHit(215, 0, 45, 80, 30, "White");
  const b = calculateHit(45, 0, 45, 80, 30, "White");
  console.log({ a, b, c: a + b });
  expect(a + b).toBe(123.8);
});

// test("calculateHit", () => {
//   expect(calculateHit(211, 290, 45, 80, 30, "White")).toBe(110.3);
//   expect(calculateHit(188, 260, 45, 80, 30, "Green")).toBe(78.9);
//   expect(calculateHit(188, 260, 21, 80, 30, "Green")).toBe(41);
//   expect(calculateHit(225, 276, 45, 80, 30, "White")).toBe(116.4);
//   expect(calculateHit(233, 220, 45, 80, 30, "White")).toBe(118.5);
//   expect(calculateHit(235, 220, 21, 80, 30, "White")).toBe(59.8);
//   expect(calculateHit(235, 220, 35, 80, 30, "White")).toBe(94.6);
//   expect(calculateHit(235, 220, 45, 80, 30, "White")).toBe(119.5);
//   expect(calculateHit(255, 220, 21, 80, 30, "White")).toBe(64.2);
//   expect(calculateHit(255, 220, 35, 80, 30, "White")).toBe(102.0);
//   expect(calculateHit(255, 220, 45, 80, 30, "White")).toBe(129.0);
// });
