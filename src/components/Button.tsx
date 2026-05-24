import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "outline" | "ghost";

const base =
  "inline-flex items-center justify-center px-7 py-3 text-xs font-medium uppercase tracking-[0.18em] transition-colors disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-accent text-accent-foreground hover:bg-accent-hover",
  outline:
    "border border-foreground/25 text-foreground hover:border-foreground hover:bg-foreground hover:text-background",
  ghost: "text-foreground hover:text-accent",
};

export function buttonClasses(
  variant: ButtonVariant = "primary",
  className?: string,
) {
  return cn(base, variants[variant], className);
}

export function Button({
  variant = "primary",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
}) {
  return <button className={buttonClasses(variant, className)} {...props} />;
}
