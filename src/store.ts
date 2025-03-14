import { produce } from "immer";
import { create } from "zustand";
import { Buffs, CombinedBuffs } from "@/data";
import {
  calculateAffinity,
  calculateAttack,
  calculateAverage,
  calculateCrit,
  calculateElement,
  calculateHit,
} from "@/model";
import { Attack, Buff, Sharpness, Weapon, isBowgun, isRanged } from "@/types";

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
  buffs: { Powercharm: Buffs.Powercharm.levels[0] },
  rawHzv: 80,
  eleHzv: 30,
  isWound: false,
};

export const useModel = create<Store>((set) => ({
  ...initialStore,
  setWeapon: (weapon: Weapon) =>
    set(
      produce<Store>((d) => {
        {
          d.weapon = weapon;
          const { sharpness } = d;

          if (isBowgun(weapon)) {
            d.sharpness = "Bowgun";
            d.element = 0;
          }
          if (weapon === "Bow") d.sharpness = "Bow";

          if (!isRanged(weapon) && ["Bowgun", "Bow"].includes(sharpness)) {
            d.sharpness = "White";
          }

          Object.entries(CombinedBuffs).forEach(([key, value]) => {
            if (
              "weapons" in value &&
              value.weapons &&
              !value.weapons.includes(weapon)
            ) {
              delete d.buffs[key];
            }
          });
        }
      }),
    ),
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
  const uiAffinity = calculateAffinity(s);
  return {
    uiAttack: calculateAttack(s),
    uiElement: calculateElement(s),
    uiAffinity,
    critMulti:
      uiAffinity >= 0
        ? Object.values(s.buffs).reduce(
            (acc, b) =>
              b?.criticalBoost ? Math.max(b.criticalBoost, acc) : acc,
            1.25,
          )
        : 0.75,
    eleCritMulti:
      uiAffinity >= 0
        ? Object.values(s.buffs).reduce(
            (acc, b) =>
              b?.criticalElement ? Math.max(b.criticalElement, acc) : acc,
            1,
          )
        : 1,
    saPowerPhial: Object.values(s.buffs).some((b) => b?.saPowerPhial),
    saElementPhial: Object.values(s.buffs).some((b) => b?.saElementPhial),
    chargeEleMul: Object.values(s.buffs).reduce((acc, b) => {
      if (isRanged(s.weapon)) {
        if (b?.rangedChargeEleMul) return Math.max(b.rangedChargeEleMul, acc);
      } else {
        if (b?.meleeChargeEleMul) return Math.max(b.meleeChargeEleMul, acc);
      }
      return acc;
    }, 1),
    coatingRawMul: Object.values(s.buffs).reduce(
      (acc, b) => (b?.coatingRawMul ? Math.max(b.coatingRawMul, acc) : acc),
      1,
    ),
    artilleryBaseMul: Object.values(s.buffs).reduce((acc, b) => {
      if (b?.artilleryBaseMul) return Math.max(b.artilleryBaseMul, acc);
      return acc;
    }, 0),
    artilleryEle: Object.values(s.buffs).reduce((acc, b) => {
      if (b?.artilleryEle) return Math.max(b.artilleryEle, acc);
      return acc;
    }, 0),
  };
};

export const useCalcs = () => {
  const s = useModel();
  const g = useGetters();
  const calcHit = (atk: Attack) => calculateHit({ ...s, ...g, ...atk });
  const calcCrit = (atk: Attack) => calculateCrit({ ...s, ...g, ...atk });
  return {
    calcHit,
    calcCrit,
    calcAverage: (atk: Attack) => {
      const hit = calcHit(atk);
      const crit = calcCrit(atk);
      return calculateAverage(hit, crit, atk.cantCrit ? 0 : g.uiAffinity);
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
