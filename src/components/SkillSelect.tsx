import type { Buff, BuffGroup } from "@/types";
import { Select, type SelectProps } from ".";

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

  return (
    <Select
      options={options}
      label={label}
      value={value}
      labelFn={(opt) => opt?.name ?? ""}
      onChangeValue={onChangeValue}
      placeholder={placeholder ?? name}
      // description={""}
    />
  );
}
