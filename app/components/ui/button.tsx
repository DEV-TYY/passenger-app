import Link from "next/link";
import type { ButtonHTMLAttributes, ComponentProps, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "dark" | "light" | "ghost" | "outline" | "unstyled";

type BaseButtonProps = {
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  variant?: ButtonVariant;
};

type LinkButtonProps = BaseButtonProps & {
  href: string;
  type?: never;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

type NativeButtonProps = BaseButtonProps & {
  href?: never;
} & ButtonHTMLAttributes<HTMLButtonElement>;

type AppButtonProps = LinkButtonProps | NativeButtonProps;

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-brand text-white shadow-sm shadow-emerald-900/20 hover:bg-brand-hover",
  secondary: "border border-slate-300 bg-white text-slate-800 hover:border-slate-400 hover:bg-slate-50",
  dark: "bg-slate-950 text-white shadow-sm shadow-slate-950/20 hover:bg-slate-800",
  light: "bg-white text-slate-950 shadow-sm shadow-slate-950/10 hover:bg-slate-100",
  ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
  outline: "border border-white/35 bg-white/10 text-white backdrop-blur-md hover:bg-white hover:text-slate-950",
  unstyled: "",
};

export function AppButton({ children, className = "", icon, variant = "primary", ...props }: AppButtonProps) {
  const baseClasses = variant === "unstyled" ? "transition duration-200" : "inline-flex items-center justify-center gap-2 rounded-md px-4 py-3 font-bold transition duration-200";
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if ("href" in props && props.href) {
    const { href, ...linkProps } = props as LinkButtonProps;

    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
        {icon}
      </Link>
    );
  }

  const buttonProps = props as NativeButtonProps;

  return (
    <button className={classes} {...buttonProps}>
      {children}
      {icon}
    </button>
  );
}
