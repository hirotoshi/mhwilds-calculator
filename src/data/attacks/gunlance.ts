import { Attack } from "@/types";

export const GunlanceAttacks: Attack[] = [
  { name: "Lateral Thrust I / II", mv: 24 },
  { name: "Lunging Upthrust", mv: 30 },
  { name: "Rising Slash", mv: 30 },
  { name: "Guard Thrust", mv: 18 },
  { name: "Overhead Smash", mv: 48 },
  {
    name: "Wide Sweep / Moving Wide Sweep / Aerial Burst",
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
  {
    name: "Wyrmstake Lv1 Ticks",
    mv: 4,
    eleMul: 0,
    shelling: true,
    ignoreSharpness: true,
    cantCrit: true,
  },
  {
    name: "Wyrmstake Lv2 Ticks",
    mv: 5,
    eleMul: 0,
    shelling: true,
    ignoreSharpness: true,
    cantCrit: true,
  },
  {
    name: "Wyrmstake Lv3 Ticks",
    mv: 7,
    eleMul: 0,
    shelling: true,
    ignoreSharpness: true,
    cantCrit: true,
  },
  {
    name: "Multi Wyrmstake Lv1 Ticks",
    mv: 4,
    eleMul: 0,
    shelling: true,
    ignoreSharpness: true,
  },
  {
    name: "Multi Wyrmstake Lv2 Ticks",
    mv: 5,
    eleMul: 0,
    shelling: true,
    ignoreSharpness: true,
  },
  {
    name: "Multi Wyrmstake Lv3 Ticks",
    mv: 7,
    eleMul: 0,
    shelling: true,
    ignoreSharpness: true,
  },
  {
    name: "Wide Lv3 Shell",
    mv: 24,
    fixedEle: 12,
    shelling: true,
    ignoreSharpness: true,
    ignoreHzv: true,
    cantCrit: true,
  },
  {
    name: "Wide Lv3 Charged Shell",
    mv: 43.2,
    fixedEle: 12,
    shelling: true,
    ignoreSharpness: true,
    ignoreHzv: true,
    cantCrit: true,
  },
  {
    name: "Wide Lv3 Full Burst Shell",
    mv: 28.8,
    fixedEle: 12,
    shelling: true,
    ignoreSharpness: true,
    ignoreHzv: true,
    cantCrit: true,
  },
  {
    name: "Wide Lv3 Wyvern Fire 1st Hit",
    mv: 54,
    fixedEle: 30,
    shelling: true,
    ignoreSharpness: true,
    ignoreHzv: true,
    cantCrit: true,
  },

  // { // TODO
  //   name: "Wide Lv3 Wyvern Fire Hits",
  //   mv: 54,
  //   fixedEle: 30,
  //   eleMul: 0.1667,
  //   shelling: true,
  //   ignoreSharpness: true,
  //   ignoreHzv: true,
  //   cantCrit: true,
  // },
  {
    name: "Wide Lv3 Wyrmstake Explosion",
    mv: 28,
    fixedEle: 25,
    shelling: true,
    ignoreSharpness: true,
    ignoreHzv: true,
    cantCrit: true,
  },
];
