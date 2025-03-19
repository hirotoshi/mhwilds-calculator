"use client";

import type { Buff, BuffGroup, LocalizedString } from "@/types";
import { Select, type SelectProps } from ".";
import { useLocaleContext } from "@/contexts/LocaleContext";
import { getLocalizedString } from "@/utils/i18n";

type Props = Omit<SelectProps<Buff | undefined>, "options"> & {
  skill: BuffGroup;
};

export function SkillSelect({
  skill,
  onChangeValue,
  label,
  placeholder,
  value,
}: Props) {
  const { name, levels } = skill;
  const options = [undefined, ...levels];
  const { locale } = useLocaleContext();

  // LocalizedString型からテキストを取得する関数
  const getLocalText = (text: LocalizedString | string | undefined): string => {
    if (!text) return "";
    if (typeof text === 'string') return text;
    return getLocalizedString(text, locale);
  };

  // 選択項目がnullでないことを確認し、名前を取得するラベル関数
  const labelFunction = (opt: Buff | undefined): string => {
    if (!opt || !opt.name) return "";
    return getLocalText(opt.name);
  };

  return (
    <Select
      options={options}
      label={label}
      value={value}
      labelFn={labelFunction}
      onChangeValue={onChangeValue}
      placeholder={placeholder ?? getLocalText(name)}
      // description={""}
    />
  );
}
