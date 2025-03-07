"use client";

import { useMemo, useState } from "react";
import {
  Card,
  NumberDisplay,
  NumberInput,
  Select,
  SkillSelect,
} from "@/components";
import Checkbox from "@/components/Checkbox";
import {
  type Buff,
  Buffs,
  FieldBuffs,
  FrenzyBuff,
  Sharpness,
  Sharpnesses,
  sharpnessEle,
  sharpnessRaw,
} from "@/data";
import { ArmorSkills, SetSkills, WeaponSkills } from "@/data/skills";
import {
  calculateAffinity,
  calculateAttack,
  calculateCrit,
  calculateElement,
  calculateHit,
} from "@/model";

type UBuff = Buff | undefined;

export default function Home() {
  const [attack, setAttack] = useState(200);
  const [affinity, setAffinity] = useState(0);
  const [element, setElement] = useState(0);
  const [weaponBuffs, setWeaponBuffs] = useState<UBuff[]>([]);
  const [armorBuffs, setArmorBuffs] = useState<UBuff[]>([]);
  const [setBuffs, setSetBuffs] = useState<UBuff[]>([]);
  const [boolBuffs, setBoolBuffs] = useState<UBuff[]>([Buffs.Powercharm]);
  const [fieldBuffs, setFieldBuffs] = useState<UBuff[]>([]);
  const [sharpness, setSharpness] = useState<Sharpness>("White");

  const [miscAttack, setMiscAttack] = useState(0);
  const [miscAttackMul, setMiscAttackMul] = useState(0);
  const [miscElement, setMiscElement] = useState(0);
  const [miscElementMul, setMiscElementMul] = useState(0);
  const [miscAffinity, setMiscAffinity] = useState(0);

  const [frenzy, setFrenzy] = useState(false);

  const [mv, setMv] = useState(45);
  const [rawHzv, setRawHzv] = useState(80);
  const [eleHzv, setEleHzv] = useState(30);
  const [rawDamageMul, setRawDamageMul] = useState(100);
  const [eleDamageMul, setEleDamageMul] = useState(100);
  const [isWound, setIsWound] = useState(false);

  const miscBuffs: Buff = useMemo(() => {
    return {
      name: "",
      attack: miscAttack,
      element: miscElement,
      elementMul: 1 + miscElementMul / 100,
      attackMul: 1 + miscAttackMul / 100,
      affinity: miscAffinity,
    };
  }, [miscAttack, miscAttackMul, miscAffinity, miscElement, miscElementMul]);

  const effectiveBuffs: (Buff | undefined)[] = useMemo(() => {
    return [
      FrenzyBuff,
      ...weaponBuffs,
      ...armorBuffs,
      ...setBuffs,
      ...boolBuffs,
      ...fieldBuffs,
      miscBuffs,
    ];
  }, [miscBuffs, weaponBuffs, armorBuffs, setBuffs, boolBuffs, fieldBuffs]);

  const uiAttack = useMemo(() => {
    return calculateAttack(attack, effectiveBuffs, frenzy);
  }, [attack, effectiveBuffs, frenzy]);

  const uiElement = useMemo(() => {
    return calculateElement(element, effectiveBuffs);
  }, [element, effectiveBuffs]);

  const uiAffinity = useMemo(() => {
    return Math.min(calculateAffinity(affinity, effectiveBuffs, frenzy), 100);
  }, [affinity, effectiveBuffs, frenzy]);

  const effectiveAffinity = useMemo(() => {
    return Math.min(
      calculateAffinity(
        affinity,
        effectiveBuffs,
        frenzy,
        rawHzv >= 45,
        isWound,
      ),
      100,
    );
  }, [affinity, effectiveBuffs, frenzy, rawHzv, isWound]);

  const rawCritMulti = useMemo(() => {
    if (uiAffinity < 0) return 0.75;
    return effectiveBuffs.reduce(
      (acc, b) => (b?.criticalBoost ? Math.max(b.criticalBoost, acc) : acc),
      1.25,
    );
  }, [uiAffinity, effectiveBuffs]);

  const eleCritMulti = useMemo(() => {
    if (uiAffinity < 0) return 1;
    return effectiveBuffs.reduce(
      (acc, b) => (b?.criticalElement ? Math.max(b.criticalElement, acc) : acc),
      1,
    );
  }, [uiAffinity, effectiveBuffs]);

  const totalHit = useMemo(() => {
    return calculateHit(
      uiAttack,
      uiElement,
      mv,
      rawHzv,
      eleHzv,
      sharpness,
      [rawDamageMul / 100, isWound ? 1.25 : 1],
      [eleDamageMul / 100, isWound ? 1.25 : 1],
    );
  }, [
    uiAttack,
    uiElement,
    mv,
    rawHzv,
    eleHzv,
    sharpness,
    rawDamageMul,
    eleDamageMul,
    isWound,
  ]);

  const totalCrit = useMemo(() => {
    return calculateCrit(
      uiAttack,
      uiElement,
      mv,
      rawHzv,
      eleHzv,
      sharpness,
      rawCritMulti,
      eleCritMulti,
      [rawDamageMul / 100, isWound ? 1.25 : 1],
      [eleDamageMul / 100, isWound ? 1.25 : 1],
    );
  }, [
    uiAttack,
    uiElement,
    mv,
    rawHzv,
    eleHzv,
    sharpness,
    rawCritMulti,
    eleCritMulti,
    rawDamageMul,
    eleDamageMul,
    isWound,
  ]);

  const averageHit = useMemo(() => {
    const critChance = Math.abs(effectiveAffinity) / 100;
    const avg = totalCrit * critChance + totalHit * (1 - critChance);
    return Math.round(avg * 1000) / 1000;
  }, [totalHit, totalCrit, effectiveAffinity]);

  return (
    <div className="flex flex-col gap-2 md:flex-row">
      <div className="flex flex-2 flex-col gap-2">
        <Card>
          <div>
            <h1>Weapon</h1>
            <p className="text-xs text-zinc-700">
              {'Enable "Display Without Coefficient" in game options.'}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <NumberInput
              label="Attack"
              value={attack}
              onChangeValue={setAttack}
              min={0}
            />
            <NumberInput
              label="Element"
              value={element}
              onChangeValue={setElement}
              min={0}
            />
            <NumberInput
              label="Affinity"
              value={affinity}
              onChangeValue={setAffinity}
            />
            <Select
              label="Sharpness"
              value={sharpness}
              onChangeValue={setSharpness}
              options={[...Sharpnesses]}
              description={`Raw: ${sharpnessRaw[sharpness]} Element: ${sharpnessEle[sharpness]}`}
            />
          </div>
        </Card>
        <Card>
          <div>
            <h1>Skills</h1>
            <p className="text-xs text-zinc-700"></p>
          </div>
          <div className="flex flex-col gap-1">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {Object.values(WeaponSkills).map((s, i) => {
                return (
                  <SkillSelect
                    key={s.name}
                    skill={s}
                    onChangeValue={(buff) => {
                      setWeaponBuffs((buffs) => {
                        const newBuffs = [...buffs];
                        newBuffs[i] = buff;
                        return newBuffs;
                      });
                    }}
                  />
                );
              })}
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {Object.values(ArmorSkills).map((s, i) => (
                <SkillSelect
                  key={s.name}
                  skill={s}
                  onChangeValue={(buff) => {
                    setArmorBuffs((buffs) => {
                      const newBuffs = [...buffs];
                      newBuffs[i] = buff;
                      return newBuffs;
                    });
                  }}
                />
              ))}
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {Object.values(SetSkills).map((s, i) => (
                <SkillSelect
                  key={s.name}
                  skill={s}
                  onChangeValue={(buff) => {
                    setSetBuffs((buffs) => {
                      const newBuffs = [...buffs];
                      newBuffs[i] = buff;
                      return newBuffs;
                    });
                  }}
                />
              ))}
            </div>
          </div>
        </Card>
        <Card>
          <div>
            <h1>Buffs</h1>
            <p className="text-xs text-zinc-700">
              Add miscellaneous buffs from unsupported skills, Hunting Horn
              songs, etc. here.
            </p>
          </div>
          <div className="flex gap-2">
            <Checkbox
              label="Overcame Frenzy"
              value={frenzy}
              onChangeValue={setFrenzy}
            />
            {Object.values(Buffs).map((b, i) => (
              <Checkbox
                key={b.name}
                label={b.name}
                value={boolBuffs.includes(b)}
                onChangeValue={(checked) => {
                  setBoolBuffs((buffs) => {
                    if (checked) {
                      return [...buffs, b];
                    } else {
                      return buffs.filter((buff) => buff !== b);
                    }
                  });
                }}
              />
            ))}
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4">
            {Object.values(FieldBuffs).map((s, i) => (
              <SkillSelect
                key={s.name}
                skill={s}
                onChangeValue={(buff) => {
                  setFieldBuffs((buffs) => {
                    const newBuffs = [...buffs];
                    newBuffs[i] = buff;
                    return newBuffs;
                  });
                }}
              />
            ))}
            <NumberInput
              label="Attack (Flat)"
              value={miscAttack}
              onChangeValue={setMiscAttack}
            />
            <NumberInput
              label="Attack (%)"
              value={miscAttackMul}
              onChangeValue={setMiscAttackMul}
            />
            <NumberInput
              label="Element (Flat)"
              value={miscElement}
              onChangeValue={setMiscElement}
            />
            <NumberInput
              label="Element (%)"
              value={miscElementMul}
              onChangeValue={setMiscElementMul}
            />
            <NumberInput
              label="Affinity (%)"
              value={miscAffinity}
              onChangeValue={setMiscAffinity}
            />
          </div>
        </Card>
        <Card>
          <h1>Target</h1>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <NumberInput
              label="Motion Value"
              value={mv}
              onChangeValue={setMv}
            />
            <NumberInput
              label="Hitzone (Raw)"
              value={rawHzv}
              onChangeValue={setRawHzv}
            />
            <NumberInput
              label="Hitzone (Element)"
              value={eleHzv}
              onChangeValue={setEleHzv}
            />
            <NumberInput
              label="Raw Modifier (%)"
              value={rawDamageMul}
              onChangeValue={setRawDamageMul}
            />
            <NumberInput
              label="Element Modifier (%)"
              value={eleDamageMul}
              onChangeValue={setEleDamageMul}
            />
          </div>
          <div className="flex place-items-center">
            <Checkbox
              label="Wound"
              value={isWound}
              onChangeValue={setIsWound}
            />
          </div>
        </Card>
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <Card>
          <div>
            <h1>Status</h1>
            <p className="text-xs text-zinc-700">
              {
                "In-game display rounds but decimals are stored for damage calculations."
              }
            </p>
          </div>
          <div>
            <NumberDisplay label="Attack" value={uiAttack} />
            <NumberDisplay label="Element" value={uiElement} />
            <NumberDisplay label="Affinity" value={uiAffinity} suffix="%" />
          </div>
          <div></div>
        </Card>
        <Card>
          <div>
            <h1>Damage</h1>
            <p className="text-xs text-zinc-700">
              These should match what you see in-game with decimals enabled.
            </p>
          </div>
          <div>
            <NumberDisplay
              className="font-bold"
              label="Average Hit"
              value={averageHit}
            />
            <NumberDisplay label="Hit" value={totalHit} />
            <NumberDisplay
              label="Critical Chance"
              value={effectiveAffinity}
              suffix="%"
            />
            <NumberDisplay label="Critical Hit" value={totalCrit} />
          </div>
        </Card>
      </div>
    </div>
  );
}
