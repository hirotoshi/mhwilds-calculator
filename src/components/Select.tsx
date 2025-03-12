"use client";

import { InputContainer, type InputContainerProps } from "./InputContainer";

export interface SelectProps<T> extends InputContainerProps {
  options: T[];
  value?: T;
  labelFn?: (option: T) => string;
  keyFn?: (option: T) => string;
  onChangeValue: (value: T) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function Select<T>({
  label,
  options,
  value,
  labelFn = (o) => String(o),
  keyFn = labelFn,
  description,
  onChangeValue,
  placeholder,
  ...props
}: SelectProps<T>) {
  return (
    <InputContainer label={label} description={description}>
      <div className="relative">
        <select
          className="border-divider bg-content text-primary hover:bg-content-alt focus:border-primary disabled:text-placeholder w-full rounded-sm border px-2 py-1 text-sm"
          value={value ? labelFn(value) : undefined}
          onChange={(e) => {
            const { value } = e.target;
            const option = options.find((o) => value === labelFn(o));
            if (option) onChangeValue(option);
            else onChangeValue(options[0]);
          }}
          {...props}
        >
          {options.map((option) => (
            <option key={keyFn(option)} value={keyFn(option)}>
              {labelFn(option)}
            </option>
          ))}
        </select>
        {!value && placeholder && (
          <p className="text-placeholder pointer-events-none absolute top-1/2 left-2 w-[calc(100%-2rem)] -translate-y-1/2 truncate pl-[1px] text-sm">
            {placeholder}
          </p>
        )}
      </div>
    </InputContainer>
  );
}
