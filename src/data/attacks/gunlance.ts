import { Attack } from "@/types";

export const GunlanceAttacks: Attack[] = [
  { name: "Lateral Thrust I / II", mv: 24 },
  { name: "Lunging Upthrust", mv: 30 },
  { name: "Rising Slash", mv: 30 },
  { name: "Guard Thrust", mv: 18 },
  { name: "Overhead Smash", mv: 48 },
  {
    name: "(Moving) Wide Sweep / Aerial Burst",
    mv: 40,
    eleMul: 1.5,
  },
  { name: "(Multi) Wyrmstake Full Blast Sweep", mv: 30 },
  { name: "Wyrmstake Thrust", mv: 18 },
  { name: "Wyrmstake Full Blast Thrust", mv: 20 },
  { name: "Wyrmstake Attach", mv: 5 },
  { name: "Jumping Thrust", mv: 25 },
  { name: "Jumping Smash", mv: 44 },
  { name: "Jumping Rising Slash", mv: 35 },
  { name: "Focus Strike: Drake Auger", mv: 18 },
  { name: "Focus Strike: Drake Auger Ticks", mv: 7, eleMul: 0.1 },
];
