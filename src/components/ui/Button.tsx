import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import { cn } from '../../lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  fullWidth?: boolean
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-amber-400 text-amber-950 shadow-[0_10px_30px_rgba(245,158,11,0.35)] hover:bg-amber-300',
  secondary:
    'bg-white/80 text-amber-950 ring-1 ring-amber-200 hover:bg-white',
  ghost:
    'bg-transparent text-amber-900 hover:bg-amber-100/60',
  danger:
    'bg-orange-500 text-white shadow-[0_10px_28px_rgba(249,115,22,0.35)] hover:bg-orange-400',
}

export const Button = ({
  variant = 'primary',
  fullWidth = false,
  className,
  children,
  ...props
}: PropsWithChildren<ButtonProps>) => (
  <button
    className={cn(
      'inline-flex min-h-12 items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold transition duration-200 disabled:cursor-not-allowed disabled:opacity-50',
      variantStyles[variant],
      fullWidth && 'w-full',
      className,
    )}
    {...props}
  >
    {children}
  </button>
)
