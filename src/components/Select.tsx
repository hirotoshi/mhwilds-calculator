"use client";

import { InputContainer, type InputContainerProps } from "./InputContainer";

interface Props<T> extends InputContainerProps {
  options: T[];
  value?: T;
  labelFn?: (option: T) => string;
  keyFn?: (option: T) => string;
  onChangeValue: (value: T) => void;
}

export function Select<T>({
  label,
  options,
  value,
  labelFn = (o) => String(o),
  keyFn = labelFn,
  description,
  onChangeValue,
}: Props<T>) {
  return (
    <InputContainer label={label} description={description}>
      <select
        className="border-divider bg-content text-primary hover:bg-content-alt focus:border-primary rounded-sm border px-0.5 py-1 text-sm disabled:bg-zinc-300 disabled:text-zinc-400"
        value={value ? labelFn(value) : undefined}
        onChange={(e) => {
          const { value } = e.target;
          const option = options.find((o) => value === labelFn(o));
          if (option) onChangeValue(option);
          else onChangeValue(options[0]);
        }}
      >
        {options.map((option) => (
          <option key={keyFn(option)} value={keyFn(option)}>
            {labelFn(option)}
          </option>
        ))}
      </select>
    </InputContainer>
  );
}
