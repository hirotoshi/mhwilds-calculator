import { produce } from "immer";
import { create } from "zustand";
import { type Buff, Buffs, Sharpness } from "@/data";
import { Attack, Weapon, isRanged } from "@/types";
import { ArmorSkills } from "./data/skills";
import {
  calculateAffinity,
  calculateAttack,
  calculateAverage,
  calculateCrit,
  calculateElement,
  calculateHit,
} from "./model";

export type InitialStore = {
  weapon: Weapon;
  attack: number;
  affinity: number;
  element: number;
  sharpness: Sharpness;
  frenzy: boolean;
  buffs: Record<string, Buff>;
  rawHzv: number;
  eleHzv: number;
  isWound: boolean;
};

export type Store = InitialStore & {
  setWeapon: (weaponType: Weapon) => void;
  setAttack: (attack: number) => void;
  setAffinity: (affinity: number) => void;
  setElement: (element: number) => void;
  setSharpness: (sharpness: Sharpness) => void;
  setFrenzy: (frenzy: boolean) => void;
  setBuff: (id: string, buff?: Buff) => void;
  setRawHzv: (rawHzv: number) => void;
  setEleHzv: (eleHzv: number) => void;
  setIsWound: (isWound: boolean) => void;
};

const initialStore: InitialStore = {
  weapon: "Sword and Shield",
  attack: 200,
  affinity: 0,
  element: 0,
  sharpness: "White",
  frenzy: false,
  buffs: { Powercharm: Buffs.Powercharm },
  rawHzv: 80,
  eleHzv: 30,
  isWound: false,
};

export const useModel = create<Store>((set, get) => ({
  ...initialStore,
  setWeapon: (weapon: Weapon) => {
    set({ weapon });
    const { buffs, sharpness } = get();

    if (isRanged(weapon)) {
      set({ sharpness: "Ranged" });
    } else {
      if (sharpness === "Ranged") set({ sharpness: "White" });
    }

    const replaceSkill = (key: string) => {
      const skill = Object.entries(buffs).find(([k]) => k.includes(key));
      if (!skill) return;
      const newSkill = Object.entries(ArmorSkills).find(([k, s]) => {
        return k.includes(key) && s.weapons?.includes(weapon);
      });
      if (!newSkill) return;
      const [oldKey, oldValue] = skill;
      const [newKey, newValue] = newSkill;
      const newLevel = newValue.levels.find((l) => l.name === oldValue.name);
      if (!newLevel) return;
      set(
        produce((d) => {
          delete d.buffs[oldKey];
          d.buffs[newKey] = newLevel;
        }),
      );
    };

    replaceSkill("Burst");
    replaceSkill("ElementalAbsorption");
  },
  setAttack: (attack: number) => set({ attack: attack }),
  setAffinity: (affinity: number) => set({ affinity: affinity }),
  setElement: (element: number) => set({ element: element }),
  setSharpness: (sharpness: Sharpness) => set({ sharpness }),
  setFrenzy: (frenzy: boolean) => set({ frenzy }),
  setRawHzv: (rawHzv: number) => set({ rawHzv }),
  setEleHzv: (eleHzv: number) => set({ eleHzv }),
  setBuff: (id: string, buff?: Buff) => {
    set(
      produce((d) => {
        if (buff) d.buffs[id] = buff;
        else delete d.buffs[id];
      }),
    );
  },
  setIsWound: (isWound: boolean) => set({ isWound }),
}));

export const useGetters = () => {
  const s = useModel();
  return {
    uiAttack: calculateAttack(s),
    uiElement: calculateElement(s),
    uiAffinity: calculateAffinity(s),
    critMulti: Object.values(s.buffs).reduce(
      (acc, b) => (b?.criticalBoost ? Math.max(b.criticalBoost, acc) : acc),
      1.25,
    ),
    eleCritMulti: Object.values(s.buffs).reduce(
      (acc, b) => (b?.criticalElement ? Math.max(b.criticalElement, acc) : acc),
      1,
    ),
  };
};

export const useCalcs = () => {
  const s = useModel();
  const g = useGetters();
  return {
    calcHit: (atk: Attack) => calculateHit({ ...s, ...g, ...atk }),
    calcCrit: (atk: Attack) => calculateCrit({ ...s, ...g, ...atk }),
    calcAverage: (hit: number, crit: number) => {
      return calculateAverage(hit, crit, g.uiAffinity);
    },
    calcEffectiveRaw: () => {
      const params = { ...s, ...g, mv: 100, rawHzv: 100, eleHzv: 0 };
      const hit = calculateHit(params);
      const crit = calculateCrit(params);
      const avg = calculateAverage(hit, crit, g.uiAffinity);
      return avg;
    },
  };
};
