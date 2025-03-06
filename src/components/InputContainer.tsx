type Props = {
  label: string;
  description?: string;
  children: React.ReactNode;
};

export type InputContainerProps = Omit<Props, "children">;

export function InputContainer({ label, description, children }: Props) {
  return (
    <div className="flex flex-col gap-0.5">
      <label htmlFor={label} className="pl-0.5 text-xs text-zinc-800">
        {label}
      </label>
      {children}
      {description && (
        <p className="pl-0.5 text-xs text-zinc-700">{description}</p>
      )}
    </div>
  );
}
