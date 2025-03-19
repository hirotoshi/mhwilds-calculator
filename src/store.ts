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
import { Attack, Buff, BuffLevel, Sharpness, Weapon, isBowgun, isRanged } from "@/types";

export type InitialStore = {
  weapon: Weapon;
  attack: number;
  affinity: number;
  element: number;
  sharpness: Sharpness;
  buffs: Record<string, Buff>;
  rawHzv: number;
  eleHzv: number;
  isWound: boolean;
};

export type Store = InitialStore & {
  emptyBuffs: () => void;
  setWeapon: (weaponType: Weapon) => void;
  setAttack: (attack: number) => void;
  setAffinity: (affinity: number) => void;
  setElement: (element: number) => void;
  setSharpness: (sharpness: Sharpness) => void;
  setBuff: (id: string, buff?: Buff | BuffLevel) => void;
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
  buffs: { Powercharm: Buffs.Powercharm.levels[0] },
  rawHzv: 80,
  eleHzv: 30,
  isWound: false,
};

export const useModel = create<Store>((set) => ({
  ...initialStore,
  emptyBuffs: () => set({ buffs: {} }),
  setWeapon: (weapon: Weapon) =>
    set(
      produce<Store>((d) => {
        {
          d.weapon = weapon;

          if (isRanged(weapon)) d.sharpness = "Ranged";
          if (isBowgun(weapon)) d.element = 0;
          if (!isRanged(weapon) && d.sharpness === "Ranged") {
            d.sharpness = "White";
          }

          Object.entries(CombinedBuffs).forEach(([key, group]) => {
            if (
              "weapons" in group &&
              group.weapons &&
              !group.weapons.includes(weapon)
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
  setRawHzv: (rawHzv: number) => set({ rawHzv }),
  setEleHzv: (eleHzv: number) => set({ eleHzv }),
  setBuff: (id: string, buff?: Buff | BuffLevel) => {
    set(
      produce((d) => {
        if (buff) {
          // LocalizedString型のnameプロパティをそのまま保持する
          const buffToStore: Buff = {
            ...buff,
            // nameプロパティはそのまま保持
          };
          d.buffs[id] = buffToStore;
        }
        else delete d.buffs[id];
      }),
    );
  },
  setIsWound: (isWound: boolean) => set({ isWound }),
}));

export const useGetters = () => {
  const s = useModel();
  const frenzy = s.buffs.Frenzy !== undefined;
  const uiAffinity = calculateAffinity({ ...s, frenzy });
  const buffs = Object.values(s.buffs);
  const saPhial = buffs.find((b) => b?.saPhial)?.saPhial;

  return {
    uiAttack: calculateAttack({ ...s, frenzy }),
    uiElement: calculateElement({ ...s, frenzy }),
    swordAttack: calculateAttack(
      produce(s, (d) => {
        if (d.buffs.SwitchAxePhial?.saPhial === "Power") {
          d.buffs.SwitchAxePhialBuff = { attackMul: 1.17 };
        }
      }),
    ),
    swordElement: calculateElement(
      produce(s, (d) => {
        if (d.buffs.SwitchAxePhial?.saPhial === "Element") {
          d.buffs.SwitchAxePhialBuff = { elementMul: 1.45 };
        }
      }),
    ),
    offsetAttack: Object.values(s.buffs).reduce((acc, buff) => {
      if (buff.offsetAttack) return acc + buff.offsetAttack;
      return acc;
    }, 0),
    uiAffinity,
    frenzy: s.buffs.Frenzy?.name === "Overcame Frenzy",
    critMulti:
      uiAffinity >= 0 ? (s.buffs.CriticalBoost?.criticalBoost ?? 1.25) : 0.75,
    eleCritMulti:
      uiAffinity >= 0 ? (s.buffs.CriticalElement?.criticalElement ?? 1) : 1,
    powerAxe: s.buffs.SwitchAxePowerAxe?.powerAxe,
    saPhial,
    chargeEleMul: isRanged(s.weapon)
      ? (s.buffs.ChargeMaster?.rangedChargeEleMul ?? 1)
      : (s.buffs.ChargeMaster?.meleeChargeEleMul ?? 1),
    coatingRawMul: s.buffs.BowCoating?.coatingRawMul ?? 1,
    artilleryBaseMul: s.buffs.Artillery?.artilleryBaseMul ?? 0,
    artilleryEle: s.buffs.Artillery?.artilleryEle ?? 0,
    normalShotsRawMul: s.buffs.NormalShots?.normalShotsRawMul ?? 1,
    spreadPowerShotsRawMul:
      s.buffs.SpreadPowerShots?.spreadPowerShotsRawMul ?? 1,
    specialAmmoBoostRawMul:
      s.buffs.SpecialAmmoBoost?.specialAmmoBoostRawMul ?? 1,
    piercingShotsRawMul: s.buffs.PiercingShots?.piercingShotsRawMul ?? 1,
    cbShieldElement: s.buffs.ChargeBladeShieldElement?.cbShieldElement,
    demonBoost: s.buffs.DualBladesDemonBoost?.demonBoost,
    coalEleMul: s.buffs.Coalescence?.coalEleMul ?? 1,
    stickyBaseMul: s.buffs.Artillery?.stickyBaseMul ?? 1,
    tetradEleMul: s.buffs.TetradShot?.tetradEleMul ?? 1,
    openingShotEleMul: s.buffs.OpeningShot?.openingShotEleMul ?? 1,
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
    calcEffectiveEle: () => {
      const params = { ...s, ...g, mv: 0, rawHzv: 0, eleHzv: 100 };
      const hit = calculateHit(params);
      const crit = calculateCrit(params);
      const avg = calculateAverage(hit, crit, g.uiAffinity);
      return avg;
    },
  };
};
