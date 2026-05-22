import type { InputHTMLAttributes, ReactNode } from "react";

type TextInputProps = {
  icon?: ReactNode;
  label: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function TextInput({ icon, label, className = "", ...props }: TextInputProps) {
  return (
    <label className="grid gap-2 text-sm font-bold text-slate-700">
      {label}
      <span className="flex items-center gap-3 rounded-md border border-slate-200 bg-slate-50 px-3 py-3">
        {icon}
        <input className={`w-full bg-transparent outline-none ${className}`} {...props} />
      </span>
    </label>
  );
}
