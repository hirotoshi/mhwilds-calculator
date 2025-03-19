"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  Checkbox,
  ExportDialog,
  ImportDialog,
  Notice,
  NumberDisplay,
  NumberInput,
  Select,
  SkillSelect,
} from "@/components";
import { MovesTable } from "@/components/MovesTable";
import {
  Buffs,
  FieldBuffs,
  HuntingHornBuffs,
  Sharpnesses,
  WeaponBuffs,
  Weapons,
} from "@/data";
import { WeaponNames, SharpnessNames } from "@/data/translations";
import Attacks from "@/data/attacks";
import { ArmorSkills, SetSkills, WeaponSkills } from "@/data/skills";
import { useCalcs, useGetters, useModel } from "@/store";
import { Attack, Buff, LocalizedString, Sharpness, Weapon, isBowgun, isRanged } from "@/types";
import { useLocaleContext } from "@/contexts/LocaleContext";
import { getLocalizedString } from "@/utils/i18n";

export default function Home() {
  const { locale } = useLocaleContext();
  // 簡易的な翻訳関数（メモ化）
  const t = useCallback((key: string) => {
    const translations: Record<string, Record<string, string>> = {
      'en': {
        'ui.weapon': 'Weapon',
        'ui.weapon_notice': 'Set your weapon and its stats',
        'ui.raw_attack': 'Raw Attack',
        'ui.element': 'Element',
        'ui.affinity': 'Affinity',
        'ui.sharpness': 'Sharpness',
        'ui.skills': 'Skills',
        'ui.skills_notice': 'Add skills to your build',
        'ui.buffs': 'Buffs',
        'ui.buffs_notice': 'Add buffs to your character',
        'ui.miscellaneous': 'Miscellaneous',
        'ui.custom_attack': 'Custom Attack',
        'ui.sections.weapon': 'Weapon Skills',
        'ui.sections.armor': 'Armor Skills',
        'ui.sections.set': 'Set Skills',
        'ui.sections.hunting_horn': 'Hunting Horn Buffs',
        'ui.stats': 'Stats',
        'ui.damage': 'Damage',
        'ui.wound': 'Tenderized',
        'ui.hitzone.raw': 'Raw HZV',
        'ui.hitzone.element': 'Ele HZV',
        'ui.motion_value': 'Motion Value',
        'ui.modifier.raw': 'Raw Modifier %',
        'ui.modifier.element': 'Ele Modifier %',
        'ui.effective.attack': 'Effective Raw',
        'ui.effective.element': 'Effective Element',
        'ui.attack.flat': 'Attack +',
        'ui.attack.percent': 'Attack %',
        'ui.element.flat': 'Element +',
        'ui.element.percent': 'Element %',
        'ui.affinity_percent': 'Affinity %',
        'system.bowgun_notice': 'Bowgun calculation is not yet supported'
      },
      'ja': {
        'ui.weapon': '武器',
        'ui.weapon_notice': '武器とその性能を設定',
        'ui.raw_attack': '物理攻撃力',
        'ui.element': '属性値',
        'ui.affinity': '会心率',
        'ui.sharpness': '斬れ味',
        'ui.skills': 'スキル',
        'ui.skills_notice': 'ビルドにスキルを追加',
        'ui.buffs': 'バフ',
        'ui.buffs_notice': 'キャラクターにバフを追加',
        'ui.miscellaneous': 'その他',
        'ui.custom_attack': 'カスタム攻撃',
        'ui.sections.weapon': '武器スキル',
        'ui.sections.armor': '防具スキル',
        'ui.sections.set': '装備スキル',
        'ui.sections.hunting_horn': '狩猟笛バフ',
        'ui.stats': 'ステータス',
        'ui.damage': 'ダメージ',
        'ui.wound': '軟化',
        'ui.hitzone.raw': '物理肉質',
        'ui.hitzone.element': '属性肉質',
        'ui.motion_value': 'モーション値',
        'ui.modifier.raw': '物理補正 %',
        'ui.modifier.element': '属性補正 %',
        'ui.effective.attack': '実効物理攻撃力',
        'ui.effective.element': '実効属性値',
        'ui.attack.flat': '攻撃力 +',
        'ui.attack.percent': '攻撃力 %',
        'ui.element.flat': '属性値 +',
        'ui.element.percent': '属性値 %',
        'ui.affinity_percent': '会心率 %',
        'system.bowgun_notice': 'ボウガンの計算はまだサポートされていません'
      }
    };
    
    return translations[locale]?.[key] || translations['en']?.[key] || key;
  }, [locale]);
  
  // LocalizedString型の値から現在のロケールに基づいて文字列を取得する
  const getLocalText = useCallback((text: LocalizedString | string): string => {
    if (typeof text === 'string') return text;
    return getLocalizedString(text, locale);
  }, [locale]);
  
  const {
    weapon,
    attack,
    affinity,
    element,
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
    setBuff,
    setRawHzv,
    setEleHzv,
    setIsWound,
  } = useModel();
  const { uiAttack, uiElement, uiAffinity } = useGetters();
  const { calcEffectiveRaw, calcEffectiveEle } = useCalcs();

  const [miscAttack, setMiscAttack] = useState(0);
  const [miscAttackMul, setMiscAttackMul] = useState(0);
  const [miscElement, setMiscElement] = useState(0);
  const [miscElementMul, setMiscElementMul] = useState(0);
  const [miscAffinity, setMiscAffinity] = useState(0);

  // miscBuffNameをメモ化して不要なレンダリングを防ぐ
  const miscBuffName = useMemo(() => t('ui.miscellaneous'), [t]);

  // TODO: refactor
  const miscBuff: Buff = useMemo(() => {
    return {
      name: miscBuffName,
      attack: miscAttack,
      element: miscElement,
      elementMul: 1 + miscElementMul / 100,
      attackMul: 1 + miscAttackMul / 100,
      affinity: miscAffinity,
    };
  }, [miscAttack, miscAttackMul, miscAffinity, miscElement, miscElementMul, miscBuffName]);

  const [hideSkills, setHideSkills] = useState(false);
  const [hideBuffs, setHideBuffs] = useState(false);
  const [custom, setCustom] = useState(true);

  const [mv, setMv] = useState(45);
  const [rawMul, setRawMul] = useState(100);
  const [eleMul, setEleMul] = useState(100);
  const [fixedEle] = useState(0);

  const efr = useMemo(() => calcEffectiveRaw(), [calcEffectiveRaw]);
  const efe = useMemo(() => calcEffectiveEle(), [calcEffectiveEle]);

  const notice = useMemo(() => {
    if (isBowgun(weapon)) return t('system.bowgun_notice');
  }, [weapon, t]);

  const customAttack: Attack = useMemo(
    () => ({
      name: t('ui.custom_attack'),
      mv,
      rawMul: rawMul / 100,
      eleMul: eleMul / 100,
      fixedEle,
    }),
    [mv, rawMul, eleMul, fixedEle, t],
  );

  // miscBuffの値が変わった時のみreactするように依存配列を調整
  useEffect(() => {
    if (miscAttack !== 0 || miscAttackMul !== 0 || miscElement !== 0 || 
        miscElementMul !== 0 || miscAffinity !== 0) {
      setBuff("Miscellaneous", miscBuff);
    }
  }, [miscBuff, setBuff]);

  useEffect(() => {
    if (Attacks[weapon].length > 0) setCustom(false);
    else setCustom(true);
  }, [weapon, setCustom]);

  return (
    <div className="flex flex-col gap-2 md:flex-row">
      <div className="flex flex-2 flex-col gap-2">
        <Card>
          <div>
            <h1>{t('ui.weapon')}</h1>
            <h3>{t('ui.weapon_notice')}</h3>
          </div>
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
            <div className="col-span-2 lg:col-span-4">
              <Select
                label={t('ui.weapon')}
                value={weapon}
                options={Weapons}
                onChangeValue={setWeapon}
                labelFn={(weapon) => getLocalText(WeaponNames[weapon])}
              />
            </div>
            <NumberInput
              label={t('ui.raw_attack')}
              value={attack}
              onChangeValue={setAttack}
              min={0}
              step={5}
            />
            <NumberInput
              label={t('ui.element')}
              value={element}
              onChangeValue={setElement}
              min={0}
              step={10}
              disabled={["Light Bowgun", "Heavy Bowgun"].includes(weapon)}
            />
            <NumberInput
              label={t('ui.affinity')}
              value={affinity}
              onChangeValue={setAffinity}
              step={5}
              min={-100}
              max={100}
            />
            <Select
              label={t('ui.sharpness')}
              value={sharpness}
              disabled={isRanged(weapon)}
              onChangeValue={setSharpness}
              options={Sharpnesses}
              labelFn={(sharpness) => getLocalText(SharpnessNames[sharpness])}
            />
            {Object.entries(WeaponBuffs).map(([k, s]) => {
              if (!s.weapons?.includes(weapon)) return undefined;
              return (
                <SkillSelect
                  key={k}
                  skill={s}
                  value={buffs[k]}
                  label={getLocalText(s.name)}
                  placeholder=""
                  onChangeValue={(buff) => setBuff(k, buff)}
                />
              );
            })}
          </div>
        </Card>
        <Card>
          <div>
            <div className="flex justify-between">
              <div>
                <h1>{t('ui.skills')}</h1>
              </div>
              <Button
                variant="text"
                size="icon"
                onClick={() => setHideSkills((c) => !c)}
              >
                {hideSkills ? <ChevronUp /> : <ChevronDown />}
              </Button>
            </div>
            {!hideSkills && <h3>{t('ui.skills_notice')}</h3>}
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xs">{t('ui.sections.weapon')}</p>
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
            <p className="text-xs">{t('ui.sections.armor')}</p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {Object.entries(ArmorSkills).map(([k, s]) => {
                if (hideSkills && !buffs[k]) return undefined;
                if (s.weapons && !s.weapons.includes(weapon)) return undefined;
                return (
                  <SkillSelect
                    key={k}
                    skill={s}
                    value={buffs[k]}
                    label={getLocalText(s.name)}
                    placeholder=""
                    onChangeValue={(buff) => setBuff(k, buff)}
                  />
                );
              })}
            </div>
            <p className="text-xs">{t('ui.sections.set')}</p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {Object.entries(SetSkills).map(([k, s]) => {
                if (hideSkills && !buffs[k]) return undefined;
                return (
                  <SkillSelect
                    key={k}
                    skill={s}
                    value={buffs[k]}
                    label={getLocalText(s.name)}
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
              <h1>{t('ui.buffs')}</h1>
              <Button
                variant="text"
                size="icon"
                onClick={() => setHideBuffs((c) => !c)}
              >
                {hideBuffs ? <ChevronUp /> : <ChevronDown />}
              </Button>
            </div>
            {!hideBuffs && <h3>{t('ui.buffs_notice')}</h3>}
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-0">
            {Object.entries(Buffs).map(([k, b]) => {
              if (hideBuffs && !buffs[k]) return undefined;
              return (
                <Checkbox
                  key={k}
                  label={getLocalText(b.name)}
                  value={buffs[k] === b.levels[0]}
                  onChangeValue={(checked) =>
                    setBuff(k, checked ? b.levels[0] : undefined)
                  }
                />
              );
            })}
          </div>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
            {Object.entries(FieldBuffs).map(([k, s]) => {
              if (hideBuffs && !buffs[k]) return undefined;
              return (
                <SkillSelect
                  key={k}
                  value={buffs[k]}
                  skill={s}
                  label={getLocalText(s.name)}
                  placeholder=""
                  onChangeValue={(buff) => setBuff(k, buff)}
                />
              );
            })}
            {(!hideBuffs || miscAttack !== 0) && (
              <NumberInput
                label={t('ui.attack.flat')}
                value={miscAttack}
                onChangeValue={setMiscAttack}
              />
            )}
            {(!hideBuffs || miscAttackMul !== 0) && (
              <NumberInput
                label={t('ui.attack.percent')}
                value={miscAttackMul}
                onChangeValue={setMiscAttackMul}
              />
            )}
            {(!hideBuffs || miscElement !== 0) && (
              <NumberInput
                label={t('ui.element.flat')}
                value={miscElement}
                onChangeValue={setMiscElement}
              />
            )}
            {(!hideBuffs || miscElementMul !== 0) && (
              <NumberInput
                label={t('ui.element.percent')}
                value={miscElementMul}
                onChangeValue={setMiscElementMul}
              />
            )}
            {(!hideBuffs || miscAffinity !== 0) && (
              <NumberInput
                label={t('ui.affinity_percent')}
                value={miscAffinity}
                onChangeValue={setMiscAffinity}
              />
            )}
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-xs">{t('ui.sections.hunting_horn')}</h2>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
              {Object.entries(HuntingHornBuffs).map(([k, b]) => {
                if (hideBuffs && !buffs[k]) return undefined;
                return (
                  <SkillSelect
                    key={k}
                    value={buffs[k]}
                    skill={b}
                    placeholder={getLocalText(b.name)}
                    onChangeValue={(buff) => setBuff(k, buff)}
                  />
                );
              })}
            </div>
          </div>
        </Card>
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <Card>
          <div>
            <h1>{t('ui.stats')}</h1>
          </div>
          <div>
            <NumberDisplay label={t('ui.raw_attack')} value={uiAttack} />
            <NumberDisplay label={t('ui.element')} value={uiElement} />
            <NumberDisplay label={t('ui.affinity')} value={uiAffinity} suffix="%" />
            <NumberDisplay label={t('ui.effective.attack')} value={efr} />
            <NumberDisplay label={t('ui.effective.element')} value={efe} />
          </div>
        </Card>
        <div className="flex justify-end gap-2">
          <ImportDialog />
          <ExportDialog />
        </div>
        <Card>
          <h1>{t('ui.damage')}</h1>
          <div className="flex place-items-center">
            <Checkbox
              label={t('ui.wound')}
              value={isWound}
              onChangeValue={setIsWound}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <NumberInput
              label={t('ui.hitzone.raw')}
              value={rawHzv}
              onChangeValue={setRawHzv}
            />
            <NumberInput
              label={t('ui.hitzone.element')}
              value={eleHzv}
              onChangeValue={setEleHzv}
            />
          </div>
          {custom && (
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
              <NumberInput
                label={t('ui.motion_value')}
                value={mv}
                onChangeValue={setMv}
              />
              <NumberInput
                label={t('ui.modifier.raw')}
                value={rawMul}
                onChangeValue={setRawMul}
              />
              <NumberInput
                label={t('ui.modifier.element')}
                value={eleMul}
                onChangeValue={setEleMul}
              />
            </div>
          )}
          {notice && <Notice>{notice}</Notice>}
          <MovesTable custom={custom ? [customAttack] : undefined} />
        </Card>
      </div>
    </div>
  );
}
