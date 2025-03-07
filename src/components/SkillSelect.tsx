import { type Buff, BuffGroup } from "@/data";
import { Select } from ".";

type Props = {
  skill: BuffGroup;
  onChangeValue: (value: Buff) => void;
};

export function SkillSelect({ skill, onChangeValue }: Props) {
  const { name, levels } = skill;
  const options = [{ name: "" }, ...levels];

  return (
    <Select
      label={name}
      options={options}
      labelFn={(opt) => opt.name}
      onChangeValue={onChangeValue}
      // description={""}
    />
  );
}
