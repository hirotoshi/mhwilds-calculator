"use client";

import { InputContainer, type InputContainerProps } from "./InputContainer";

export interface SelectProps<T> extends InputContainerProps {
  options: T[];
  value?: T;
  labelFn?: (option: T) => string;
  keyFn?: (option: T, index: number) => string | number;
  onChangeValue: (value: T) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function Select<T>({
  label,
  options,
  value,
  labelFn = (o) => String(o),
  keyFn = (o, i) => {
    if (typeof o === 'string' || typeof o === 'number') return String(o);
    // オブジェクトの場合はインデックスをキーとして使用
    return i;
  },
  description,
  onChangeValue,
  placeholder,
  ...props
}: SelectProps<T>) {
  // 選択されているオプションのインデックスと表示用のラベルを取得
  let selectedIndex = -1;
  let displayLabel = "";
  
  if (value !== undefined) {
    // valueがある場合はインデックスを探す
    for (let i = 0; i < options.length; i++) {
      if (options[i] === value) {
        selectedIndex = i;
        displayLabel = labelFn(options[i]);
        break;
      }
    }
  }
  
  // 選択項目の有無
  const hasSelectedItem = selectedIndex !== -1 && displayLabel !== "";
  
  return (
    <InputContainer label={label} description={description}>
      <div className="relative">
        {/* 実際のセレクトボックス */}
        <select
          className="border-divider bg-content text-primary hover:bg-content-alt focus:border-primary disabled:hover:bg-content disabled:text-placeholder w-full rounded-sm border px-2 py-1 text-sm"
          onChange={(e) => {
            const index = parseInt(e.target.value, 10);
            if (!isNaN(index) && index >= 0 && index < options.length) {
              onChangeValue(options[index]);
            }
          }}
          value={selectedIndex === -1 ? "" : String(selectedIndex)}
          {...props}
        >
          {/* 未選択時の空オプション */}
          <option value="" disabled style={{ display: "none" }}></option>
          
          {/* 選択肢 */}
          {options.map((option, index) => (
            <option key={keyFn(option, index)} value={String(index)}>
              {labelFn(option)}
            </option>
          ))}
        </select>
        
        {/* 選択がない場合、プレースホルダーを表示 */}
        {!hasSelectedItem && placeholder && (
          <p className="text-placeholder pointer-events-none absolute top-1/2 left-2 w-[calc(100%-2rem)] -translate-y-1/2 truncate pl-[1px] text-sm z-10">
            {placeholder}
          </p>
        )}
      </div>
    </InputContainer>
  );
}
