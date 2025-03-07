"use client";

import { MinusIcon, PlusIcon } from "lucide-react";
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
  step,
  min,
  max,
  ...props
}: Props) {
  return (
    <InputContainer label={label} description={description}>
      <div className="relative flex items-center">
        <input
          className="border-divider text-primary focus:border-primary hover:bg-content-alt focus:bg-content-alt w-full rounded-sm border px-2 py-1 text-sm focus:outline-none"
          type="number"
          onChange={(e) => onChangeValue?.(Number(e.target.value))}
          value={value}
          pattern="-?[0-9]+"
          {...props}
        />
        <div className="absolute right-0 flex">
          <button
            type="button"
            className="hover:text-accent h-full cursor-pointer px-1"
            onClick={() => {
              if (!onChangeValue) return;
              const s = Number(step);
              const n = Number(value) - (isNaN(s) ? 1 : s);
              const m = Number(min);
              if (isNaN(m)) onChangeValue(n);
              else onChangeValue(Math.max(m, n));
            }}
          >
            <MinusIcon size={14} />
          </button>
          <button
            type="button"
            className="hover:text-accent h-full cursor-pointer px-1"
            onClick={() => {
              if (!onChangeValue) return;
              const s = Number(step);
              const n = Number(value) + (isNaN(s) ? 1 : s);
              const m = Number(max);
              if (isNaN(m)) onChangeValue(n);
              else onChangeValue(Math.min(m, n));
            }}
          >
            <PlusIcon size={14} />
          </button>
        </div>
      </div>
    </InputContainer>
  );
}
