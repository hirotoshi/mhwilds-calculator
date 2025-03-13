import { Attack } from "@/types";

export const SwitchAxeAttacks = [
  { name: "Axe: Spiral Burst Slash 1", mv: 30 },
  { name: "Axe: Spiral Burst Slash 2", mv: 41 },
  { name: "Sword: Overhead Slash", mv: 33, sword: true },
  { name: "Sword: Left Rising Slash", mv: 42, sword: true },
  { name: "Sword: Right Rising Slash", mv: 48, sword: true },
  { name: "Sword: Triple Slash 1", mv: 15, sword: true },
  { name: "Sword: Double Slash 1 / Triple Slash 2", mv: 22, sword: true },
  { name: "Sword: Double Slash 2 / Triple Slash 3", mv: 26, sword: true },
  {
    name: "Sword: Amped State Phial Explosion",
    mv: 12,
    eleMul: 0.35,
    cantCrit: true,
    sword: true,
  },
  { name: "Unbridled Slash", mv: 70, sword: true },
  { name: "Unbridled Slash Explosion", mv: 17, eleMul: 0.35, sword: true },
  { name: "Full Release Slash 1", mv: 50, sword: true },
  { name: "Full Release Slash 2", mv: 82, sword: true },
  {
    name: "Full Release Slash Explosion 1",
    mv: 20,
    eleMul: 0.35,
    sword: true,
  },
  {
    name: "Full Release Slash Explosion 2",
    mv: 35,
    eleMul: 0.35,
    sword: true,
  },
  { name: "Full Release Slash (Total)", mv: 367, eleMul: 4.8, sword: true },
] satisfies Attack[];
