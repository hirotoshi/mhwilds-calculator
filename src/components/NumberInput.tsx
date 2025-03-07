"use client";

import { InputContainer, type InputContainerProps } from "./InputContainer";

interface Props
  extends InputContainerProps,
    React.InputHTMLAttributes<HTMLInputElement> {
  onChangeValue?: (value: number) => void;
}

export function NumberInput({
  label,
  onChangeValue,
  description,
  value,
  ...props
}: Props) {
  return (
    <InputContainer label={label} description={description}>
      <input
        className="rounded-md border border-zinc-300 px-2 py-1 text-sm text-zinc-900 disabled:bg-zinc-300 disabled:text-zinc-400"
        type="number"
        onChange={(e) => onChangeValue?.(Number(e.target.value))}
        value={value}
        pattern="-?[0-9]+"
        {...props}
      />
    </InputContainer>
  );
}
