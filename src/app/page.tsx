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
  Demondrug,
  Sharpness,
  SharpnessEleMultipliers,
  SharpnessRawMultipliers,
  Sharpnesses,
} from "@/data";
import Skills from "@/data/skills";
import {
  calculateAffinityUI,
  calculateAttackUI,
  calculateElementHit,
  calculateElementUI,
  calculateHit,
  calculateRawHit,
} from "@/model";

export default function Home() {
  const [attack, setAttack] = useState(200);
  const [affinity, setAffinity] = useState(0);
  const [element, setElement] = useState(0);
  const [buffs, setBuffs] = useState<(Buff | undefined)[]>([]);
  const [sharpness, setSharpness] = useState<Sharpness>("White");

  const [miscAttack, setMiscAttack] = useState(0);
  const [miscAttackMul, setMiscAttackMul] = useState(0);
  const [miscElement, setMiscElement] = useState(0);
  const [miscElementMul, setMiscElementMul] = useState(0);
  const [miscAffinity, setMiscAffinity] = useState(0);

  const [demondrug, setDemondrug] = useState<Buff | undefined>();
  const [powercharm, setPowercharm] = useState(true);
  const [mightSeed, setMightSeed] = useState(false);
  const [demonPowder, setDemonPowder] = useState(false);
  const [overcameFrenzy, setOvercameFrenzy] = useState(false);

  const [mv, setMv] = useState(45);
  const [rawHzv, setRawHzv] = useState(80);
  const [eleHzv, setEleHzv] = useState(30);
  const [rawDamageMul, setRawDamageMul] = useState(0);
  const [eleDamageMul, setEleDamageMul] = useState(0);
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
      miscBuffs,
      demondrug ?? undefined,
      powercharm ? Buffs.Powercharm : undefined,
      mightSeed ? Buffs.MightSeed : undefined,
      demonPowder ? Buffs.DemonPowder : undefined,
      overcameFrenzy ? Buffs.OvercameFrenzy : undefined,
      ...buffs,
    ];
  }, [
    miscBuffs,
    demondrug,
    buffs,
    powercharm,
    mightSeed,
    demonPowder,
    overcameFrenzy,
  ]);

  const uiAttack = useMemo(() => {
    console.log(calculateAttackUI(attack, effectiveBuffs));
    return calculateAttackUI(attack, effectiveBuffs);
  }, [attack, effectiveBuffs]);

  const uiElement = useMemo(() => {
    return calculateElementUI(element, effectiveBuffs);
  }, [element, effectiveBuffs]);

  const uiAffinity = useMemo(() => {
    return calculateAffinityUI(affinity, effectiveBuffs);
  }, [affinity, effectiveBuffs]);

  const effectiveAffinity = useMemo(() => {
    const weaknessAffinity =
      rawHzv > 45
        ? effectiveBuffs.reduce((acc, b) => acc + (b?.weaknessAffinity ?? 0), 0)
        : 0;
    const woundAffinity = isWound
      ? effectiveBuffs.reduce((acc, b) => acc + (b?.woundAffinity ?? 0), 0)
      : 0;
    return uiAffinity + weaknessAffinity + woundAffinity;
  }, [uiAffinity, rawHzv, effectiveBuffs, isWound]);

  const rawHit = useMemo(() => {
    return calculateRawHit(uiAttack, mv, rawHzv, sharpness, [1 + rawDamageMul]);
  }, [uiAttack, mv, rawHzv, sharpness, rawDamageMul]);

  const eleHit = useMemo(() => {
    return calculateElementHit(uiElement, eleHzv, sharpness, [
      1 + eleDamageMul,
    ]);
  }, [uiElement, eleHzv, sharpness, eleDamageMul]);

  const rawCritMulti = useMemo(() => {
    if (uiAffinity < 0) return 0.75;
    const criticalBoost = effectiveBuffs.find((b) => b?.criticalBoost);
    return criticalBoost?.criticalBoost ?? 1.25;
  }, [uiAffinity, effectiveBuffs]);

  const eleCritMulti = useMemo(() => {
    if (uiAffinity < 0) return 1;
    const criticalElement = effectiveBuffs.find((b) => b?.criticalElement);
    return criticalElement?.criticalElement ?? 1;
  }, [uiAffinity, effectiveBuffs]);

  const rawCrit = useMemo(() => rawHit * rawCritMulti, [rawHit, rawCritMulti]);
  const eleCrit = useMemo(() => eleHit * eleCritMulti, [eleHit, eleCritMulti]);

  const totalHit = useMemo(() => {
    return calculateHit(
      uiAttack,
      uiElement,
      mv,
      rawHzv,
      eleHzv,
      sharpness,
      [1 + rawDamageMul, isWound ? 1.25 : 1],
      [1 + eleDamageMul, isWound ? 1.25 : 1],
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
    return Math.round((rawCrit + eleCrit) * 10 * (isWound ? 1.25 : 1)) / 10;
  }, [rawCrit, eleCrit, isWound]);

  const averageHit = useMemo(() => {
    const critChance = Math.abs(effectiveAffinity) / 100;
    const avg = totalCrit * critChance + totalHit * (1 - critChance);
    return Math.round(avg * 100) / 100;
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
              description={`Raw: ${SharpnessRawMultipliers[sharpness]} Element: ${SharpnessEleMultipliers[sharpness]}`}
            />
          </div>
        </Card>
        <Card>
          <div>
            <h1>Skills</h1>
            <p className="text-xs text-zinc-700">
              {
                "Skill bonuses are always active if enabled (besides Weakness Exploit)."
              }
            </p>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Object.values(Skills).map((s, i) => (
              <SkillSelect
                key={s.name}
                skill={s}
                onChangeValue={(buff) => {
                  setBuffs((buffs) => {
                    const newBuffs = [...buffs];
                    newBuffs[i] = buff;
                    return newBuffs;
                  });
                }}
              />
            ))}
          </div>
        </Card>
        <Card>
          <div>
            <h1>Buffs</h1>
            <p className="text-xs text-zinc-700">
              Add miscellaneous buffs from food, unsupported skills, Hunting
              Horn songs, etc. here.
            </p>
          </div>
          <div className="flex gap-2">
            <Checkbox
              label="Powercharm"
              value={powercharm}
              onChangeValue={setPowercharm}
            />
            <Checkbox
              label="Might Seed"
              value={mightSeed}
              onChangeValue={setMightSeed}
            />
            <Checkbox
              label="Demon Powder"
              value={demonPowder}
              onChangeValue={setDemonPowder}
            />
            <Checkbox
              label="Overcame Frenzy"
              value={overcameFrenzy}
              onChangeValue={setOvercameFrenzy}
            />
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4">
            <SkillSelect skill={Demondrug} onChangeValue={setDemondrug} />
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
          <div className="flex place-items-center">
            <Checkbox
              label="Wound"
              value={isWound}
              onChangeValue={setIsWound}
            />
          </div>
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
              label="Raw Damage Multiplier (%)"
              value={rawDamageMul}
              onChangeValue={setRawDamageMul}
              description="e.g. SA Phial, GS Charge Attack"
            />
            <NumberInput
              label="Element Damage Multiplier (%)"
              value={eleDamageMul}
              onChangeValue={setEleDamageMul}
              description="e.g. SA Phial, GS Charge Attack"
            />
          </div>
        </Card>
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <Card>
          <div>
            <h1>Status</h1>
            <p className="text-xs text-zinc-700">
              {"These should match what you see in-game (without rounding)."}
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
