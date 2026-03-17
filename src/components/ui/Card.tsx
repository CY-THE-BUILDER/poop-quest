import type { HTMLAttributes, PropsWithChildren } from 'react'
import { cn } from '../../lib/utils'

export const Card = ({
  className,
  children,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => (
  <div
    className={cn(
      'rounded-[28px] border border-amber-100/80 bg-[rgba(255,251,235,0.84)] p-5 shadow-[0_18px_60px_rgba(120,53,15,0.08)] backdrop-blur',
      className,
    )}
    {...props}
  >
    {children}
  </div>
)
