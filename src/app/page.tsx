"use client";

import { ChevronDown, ChevronUp, SwordsIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  Checkbox,
  NumberDisplay,
  NumberInput,
  Select,
  SkillSelect,
} from "@/components";
import { MovesTable } from "@/components/MovesTable";
import {
  type Buff,
  Buffs,
  FieldBuffs,
  Sharpnesses,
  sharpnessEle,
  sharpnessRaw,
} from "@/data";
import { ArmorSkills, SetSkills, WeaponSkills } from "@/data/skills";
import { useCalcs, useGetters, useModel } from "@/store";
import { Attack, Weapons, isRanged } from "@/types";

export default function Home() {
  const {
    weapon,
    attack,
    affinity,
    element,
    frenzy,
    sharpness,
    buffs,
    rawHzv,
    eleHzv,
    isWound,
    setAttack,
    setAffinity,
    setWeapon,
    setElement,
    setSharpness,
    setFrenzy,
    setBuff,
    setRawHzv,
    setEleHzv,
    setIsWound,
  } = useModel();
  const { uiAttack, uiElement, uiAffinity } = useGetters();
  const { calcEffectiveRaw } = useCalcs();

  const [miscAttack, setMiscAttack] = useState(0);
  const [miscAttackMul, setMiscAttackMul] = useState(0);
  const [miscElement, setMiscElement] = useState(0);
  const [miscElementMul, setMiscElementMul] = useState(0);
  const [miscAffinity, setMiscAffinity] = useState(0);

  // TODO: refactor
  const miscBuff: Buff = useMemo(() => {
    return {
      name: "Miscellaneous",
      attack: miscAttack,
      element: miscElement,
      elementMul: 1 + miscElementMul / 100,
      attackMul: 1 + miscAttackMul / 100,
      affinity: miscAffinity,
    };
  }, [miscAttack, miscAttackMul, miscAffinity, miscElement, miscElementMul]);

  useEffect(() => {
    setBuff("Miscellaneous", miscBuff);
  }, [miscBuff, setBuff]);

  const [hideSkills, setHideSkills] = useState(false);
  const [hideBuffs, setHideBuffs] = useState(false);
  const [custom, setCustom] = useState(true);

  const [mv, setMv] = useState(45);
  const [rawMul, setRawMul] = useState(100);
  const [eleMul, setEleMul] = useState(100);
  const [fixedEle, setFixedEle] = useState(0);

  const efr = useMemo(() => calcEffectiveRaw(), [calcEffectiveRaw]);

  const customAttack: Attack = useMemo(
    () => ({
      name: "Custom Attack",
      mv,
      rawMul: rawMul / 100,
      eleMul: eleMul / 100,
      fixedEle,
    }),
    [mv, rawMul, eleMul, fixedEle],
  );

  return (
    <div className="flex flex-col gap-2 md:flex-row">
      <div className="flex flex-2 flex-col gap-2">
        <Card>
          <div>
            <h1>Weapon</h1>
            <p className="text-secondary text-xs">
              {`Enable "Display Without Coefficient" in game options. Don't divide Element by 10.`}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <div className="col-span-4">
              <Select
                label="Weapon"
                value={weapon}
                options={[...Weapons]}
                onChangeValue={setWeapon}
              />
            </div>
            <NumberInput
              label="Attack"
              value={attack}
              onChangeValue={setAttack}
              min={0}
              step={5}
            />
            <NumberInput
              label="Element"
              value={element}
              onChangeValue={setElement}
              min={0}
              step={10}
            />
            <NumberInput
              label="Affinity"
              value={affinity}
              onChangeValue={setAffinity}
              step={5}
              min={-100}
              max={100}
            />
            <Select
              label="Sharpness"
              value={sharpness}
              disabled={isRanged(weapon)}
              onChangeValue={setSharpness}
              options={[...Sharpnesses]}
              description={`Raw: ${sharpnessRaw[sharpness]} Element: ${sharpnessEle[sharpness]}`}
            />
          </div>
        </Card>
        <Card>
          <div>
            <div className="flex justify-between">
              <div>
                <h1>Skills</h1>
              </div>
              <Button
                variant="text"
                size="icon"
                onClick={() => setHideSkills((c) => !c)}
              >
                {hideSkills ? <ChevronUp /> : <ChevronDown />}
              </Button>
            </div>
            {!hideSkills && (
              <p className="text-secondary text-xs">
                {
                  "Tick 'Overcame Frenzy' to enable related skills. Weakness Exploit activates on HZV ≥ 45 and Wound. Convert Element only buffs Dragon."
                }
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xs">Weapon</p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {Object.entries(WeaponSkills).map(([k, s]) => {
                if (hideSkills && !buffs[k]) return undefined;
                return (
                  <SkillSelect
                    key={k}
                    skill={s}
                    value={buffs[k]}
                    onChangeValue={(buff) => setBuff(k, buff)}
                  />
                );
              })}
            </div>
            <p className="text-xs">Armor</p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {Object.entries(ArmorSkills).map(([k, s]) => {
                if (hideSkills && !buffs[k]) return undefined;
                if (s.weapons && !s.weapons.includes(weapon)) return undefined;
                return (
                  <SkillSelect
                    key={k}
                    skill={s}
                    value={buffs[k]}
                    onChangeValue={(buff) => setBuff(k, buff)}
                  />
                );
              })}
            </div>
            <p className="text-xs">Set</p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {Object.entries(SetSkills).map(([k, s]) => {
                if (hideSkills && !buffs[k]) return undefined;
                return (
                  <SkillSelect
                    key={k}
                    skill={s}
                    value={buffs[k]}
                    onChangeValue={(buff) => setBuff(k, buff)}
                  />
                );
              })}
            </div>
          </div>
        </Card>
        <Card>
          <div>
            <div className="flex justify-between">
              <h1>Buffs</h1>
              <Button
                variant="text"
                size="icon"
                onClick={() => setHideBuffs((c) => !c)}
              >
                {hideBuffs ? <ChevronUp /> : <ChevronDown />}
              </Button>
            </div>
            {!hideBuffs && (
              <p className="text-secondary text-xs">
                {"Add other unsupported buffs here."}
              </p>
            )}
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-0">
            {(!hideBuffs || frenzy) && (
              <Checkbox
                label="Overcame Frenzy"
                value={frenzy}
                onChangeValue={setFrenzy}
              />
            )}
            {Object.entries(Buffs).map(([k, b]) => {
              if (hideBuffs && !buffs[k]) return undefined;
              return (
                <Checkbox
                  key={k}
                  label={b.name}
                  value={!!buffs[k]}
                  onChangeValue={(checked) =>
                    setBuff(k, checked ? b : undefined)
                  }
                />
              );
            })}
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Object.entries(FieldBuffs).map(([k, s]) => {
              if (hideBuffs && !buffs[k]) return undefined;
              return (
                <SkillSelect
                  key={k}
                  value={buffs[k]}
                  skill={s}
                  label={s.name}
                  placeholder=""
                  onChangeValue={(buff) => setBuff(k, buff)}
                />
              );
            })}
            {(!hideBuffs || miscAttack !== 0) && (
              <NumberInput
                label="Attack (Flat)"
                value={miscAttack}
                onChangeValue={setMiscAttack}
              />
            )}
            {(!hideBuffs || miscAttackMul !== 0) && (
              <NumberInput
                label="Attack (%)"
                value={miscAttackMul}
                onChangeValue={setMiscAttackMul}
              />
            )}
            {(!hideBuffs || miscElement !== 0) && (
              <NumberInput
                label="Element (Flat)"
                value={miscElement}
                onChangeValue={setMiscElement}
              />
            )}
            {(!hideBuffs || miscElementMul !== 0) && (
              <NumberInput
                label="Element (%)"
                value={miscElementMul}
                onChangeValue={setMiscElementMul}
              />
            )}
            {(!hideBuffs || miscAffinity !== 0) && (
              <NumberInput
                label="Affinity (%)"
                value={miscAffinity}
                onChangeValue={setMiscAffinity}
              />
            )}
          </div>
        </Card>
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <Card>
          <div>
            <h1>Stats</h1>
          </div>
          <div>
            <NumberDisplay label="Attack" value={uiAttack} />
            <NumberDisplay label="Element" value={uiElement} />
            <NumberDisplay label="Affinity" value={uiAffinity} suffix="%" />
            <NumberDisplay label="Effective Raw" value={efr} />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between gap-2">
            <div>
              <h1>Damage</h1>
              <h3>Motion value tables are still a work in progress.</h3>
            </div>
            <Button size="sm" onClick={() => setCustom((c) => !c)}>
              <SwordsIcon className="h-4 w-4" />
              {custom ? "Attacks" : "Custom"}
            </Button>
          </div>
          <div className="flex place-items-center">
            <Checkbox
              label="Wound"
              value={isWound}
              onChangeValue={setIsWound}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
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
          </div>
          {custom && (
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
              <NumberInput
                label="Motion Value"
                value={mv}
                onChangeValue={setMv}
              />
              <NumberInput
                label="Raw Mod (%)"
                value={rawMul}
                onChangeValue={setRawMul}
              />
              <NumberInput
                label="Element Mod (%)"
                value={eleMul}
                onChangeValue={setEleMul}
              />
            </div>
          )}
          <MovesTable override={custom ? [customAttack] : undefined} />
        </Card>
      </div>
    </div>
  );
}
